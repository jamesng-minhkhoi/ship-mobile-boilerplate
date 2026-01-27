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
            if (!session?.user) return;

            // Fetch user profile
            await fetchProfile(session.user.id);

            // Add more data fetching here as needed
        };

        initializeUserData();
    }, [session?.user?.id]);

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
