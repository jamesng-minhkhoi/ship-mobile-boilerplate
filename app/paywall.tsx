/**
 * Paywall Screen
 */

import { AppButton, AppCard, AppText } from "@/components/ui";
import { designTokens } from "@/constants/colors";
import { spacingTokens } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaywallScreen() {
    const theme = useThemeColor();

    const handleSubscribe = () => {
        // TODO: Integrate with RevenueCat
        console.log("Subscribe pressed");
        router.back();
    };

    const handleRestore = () => {
        // TODO: Integrate with RevenueCat
        console.log("Restore purchases pressed");
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <View
                style={{
                    flex: 1,
                    padding: spacingTokens["5xl"],
                    justifyContent: "center",
                }}
            >
                <View style={{ alignItems: "center", marginBottom: spacingTokens["7xl"] }}>
                    <View
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 20,
                            backgroundColor: designTokens.secondary.yellow[400],
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: spacingTokens["5xl"],
                        }}
                    >
                        <AppText type="headlineMedium">⭐</AppText>
                    </View>

                    <AppText type="headlineMedium" weight="bold" align="center">
                        Unlock Premium
                    </AppText>
                    <AppText
                        type="bodyLarge"
                        color="secondary"
                        align="center"
                        style={{ marginTop: spacingTokens["3xl"] }}
                    >
                        Get access to all features and content
                    </AppText>
                </View>

                <AppCard shadow="lg" style={{ marginBottom: spacingTokens["6xl"] }}>
                    <FeatureRow title="Unlimited access" />
                    <FeatureRow title="No ads" />
                    <FeatureRow title="Premium support" />
                    <FeatureRow title="Early access to new features" />
                </AppCard>

                <AppButton
                    color="primary"
                    block
                    size="large"
                    onPress={handleSubscribe}
                >
                    Subscribe Now
                </AppButton>

                <AppButton
                    color="ghost"
                    block
                    style={{ marginTop: spacingTokens["3xl"] }}
                    onPress={handleRestore}
                >
                    Restore Purchases
                </AppButton>

                <AppButton
                    color="ghost"
                    block
                    style={{ marginTop: spacingTokens["3xl"] }}
                    onPress={() => router.back()}
                >
                    Maybe Later
                </AppButton>
            </View>
        </SafeAreaView>
    );
}

function FeatureRow({ title }: { title: string }) {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: spacingTokens["3xl"],
            }}
        >
            <AppText style={{ marginRight: spacingTokens["3xl"] }}>✓</AppText>
            <AppText type="bodyMedium">{title}</AppText>
        </View>
    );
}
