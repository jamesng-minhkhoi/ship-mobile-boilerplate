/**
 * Root Layout
 * Enhanced with Expo skill best practices:
 * - React Query provider for data fetching
 * - Network status monitoring
 * - Proper provider hierarchy
 */

import { QueryProvider } from "@/contexts/QueryProvider";
import useStore from "@/store";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { session, initializeAuth, hasCompletedOnboarding } = useStore();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                // Initialize auth
                await initializeAuth();
                setIsInitialized(true);
                SplashScreen.hideAsync();
            } catch (error) {
                console.error("Failed to initialize app:", error);
                setIsInitialized(true);
                SplashScreen.hideAsync();
            }
        };
        initializeApp();
    }, [initializeAuth]);

    // Don't render until initialization is complete
    if (!isInitialized) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <QueryProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        {/* Onboarding first if not completed */}
                        <Stack.Protected guard={!hasCompletedOnboarding}>
                            <Stack.Screen name="(onboarding)" />
                        </Stack.Protected>

                        {/* Auth if onboarding done but not signed in */}
                        <Stack.Protected guard={hasCompletedOnboarding && !session}>
                            <Stack.Screen name="(auth)" />
                        </Stack.Protected>

                        {/* Protected routes if authenticated */}
                        <Stack.Protected guard={Boolean(session) && hasCompletedOnboarding}>
                            <Stack.Screen name="(protected)" />
                        </Stack.Protected>

                        <Stack.Screen
                            name="paywall"
                            options={{
                                presentation: "formSheet",
                                sheetGrabberVisible: true,
                                sheetAllowedDetents: [0.75, 1.0],
                            }}
                        />

                        <Stack.Screen name="+not-found" />
                    </Stack>
                    <StatusBar style="auto" />
                </QueryProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
