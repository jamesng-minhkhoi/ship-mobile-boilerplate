/**
 * Welcome Screen - Onboarding Entry
 */

import { AppButton, AppText } from "@/components/ui";
import { designTokens } from "@/constants/colors";
import { spacingTokens } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import useStore from "@/store";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
    const theme = useThemeColor();
    const { setOnboardingComplete } = useStore();

    const handleGetStarted = () => {
        setOnboardingComplete(true);
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.background,
                padding: spacingTokens["5xl"],
            }}
        >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* App Icon Placeholder */}
                <View
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 30,
                        backgroundColor: designTokens.primary.blue[500],
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: spacingTokens["7xl"],
                    }}
                >
                    <AppText
                        type="headlineLarge"
                        weight="bold"
                        color="white"
                    >
                        🚀
                    </AppText>
                </View>

                <AppText
                    type="headlineLarge"
                    weight="bold"
                    align="center"
                    style={{ marginBottom: spacingTokens["3xl"] }}
                >
                    Welcome to Your App
                </AppText>

                <AppText
                    type="bodyLarge"
                    color="secondary"
                    align="center"
                    style={{ marginBottom: spacingTokens["8xl"], paddingHorizontal: spacingTokens["4xl"] }}
                >
                    Build and ship your next idea in record time with this production-ready boilerplate.
                </AppText>
            </View>

            <View style={{ paddingBottom: spacingTokens["5xl"] }}>
                <AppButton
                    color="primary"
                    block
                    size="large"
                    onPress={handleGetStarted}
                >
                    Get Started
                </AppButton>
            </View>
        </SafeAreaView>
    );
}
