/**
 * Protected Layout
 * Main app layout for authenticated users
 */

import { useThemeColor } from "@/hooks/useThemeColor";
import useStore from "@/store";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function ProtectedLayout() {
    const theme = useThemeColor();
    const { session, fetchProfile } = useStore();

    useEffect(() => {
        const initializeUserData = async () => {
            const userId = session?.user?.id;
            if (!userId) return;

            // Fetch user profile
            await fetchProfile(userId);

            // Add more data fetching here as needed
        };

        initializeUserData();
    }, [fetchProfile, session?.user?.id]);

    return (
        <View style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: theme.background },
                }}
            >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(settings)" />
            </Stack>
        </View>
    );
}
