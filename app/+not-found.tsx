/**
 * Not Found Screen
 */

import { AppButton, AppText } from "@/components/ui";
import { spacingTokens } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack, router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
    const theme = useThemeColor();

    return (
        <>
            <Stack.Screen options={{ title: "Oops!" }} />
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: theme.background,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: spacingTokens["5xl"],
                }}
            >
                <AppText type="headlineLarge" style={{ marginBottom: spacingTokens["3xl"] }}>
                    404
                </AppText>
                <AppText type="bodyLarge" color="secondary" align="center" style={{ marginBottom: spacingTokens["6xl"] }}>
                    This screen doesn't exist.
                </AppText>
                <AppButton color="primary" onPress={() => router.replace("/")}>
                    Go Home
                </AppButton>
            </SafeAreaView>
        </>
    );
}
