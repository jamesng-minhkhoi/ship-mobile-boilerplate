/**
 * Settings Screen
 */

import { AppText } from "@/components/ui";
import { spacingTokens } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
    const theme = useThemeColor();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <View style={{ padding: spacingTokens["5xl"] }}>
                <AppText type="bodyLarge" color="secondary">
                    Additional settings will be added here.
                </AppText>
            </View>
        </SafeAreaView>
    );
}
