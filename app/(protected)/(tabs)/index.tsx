/**
 * Home Screen
 * Enhanced with Expo skill best practices:
 * - ScrollView with contentInsetAdjustmentBehavior
 * - borderCurve: 'continuous' for rounded corners
 * - selectable text for important data
 */

import { AppButton, AppCard, AppText } from "@/components/ui";
import { spacingTokens } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useOfflineNotice } from "@/hooks/useNetworkStatus";
import useStore from "@/store";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function HomeScreen() {
    const theme = useThemeColor();
    const { profile } = useStore();
    const { isOffline, showReconnected } = useOfflineNotice();

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            {/* Offline Banner */}
            {isOffline && (
                <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={{
                        backgroundColor: theme.warning,
                        padding: spacingTokens.lg,
                        alignItems: "center",
                    }}
                >
                    <AppText type="labelSmall" color="white">
                        You&apos;re offline
                    </AppText>
                </Animated.View>
            )}

            {showReconnected && (
                <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={{
                        backgroundColor: theme.success,
                        padding: spacingTokens.lg,
                        alignItems: "center",
                    }}
                >
                    <AppText type="labelSmall" color="white">
                        Back online!
                    </AppText>
                </Animated.View>
            )}

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{
                    padding: spacingTokens["5xl"],
                    gap: spacingTokens["4xl"],
                }}
            >
                <AppText type="headlineMedium" weight="bold">
                    Hello, {profile?.username || "there"}! 👋
                </AppText>

                <AppCard
                    shadow="md"
                    style={{ borderCurve: 'continuous' }}
                >
                    <AppText type="titleMedium" weight="semibold" style={{ marginBottom: spacingTokens.lg }}>
                        Quick Start
                    </AppText>
                    <AppText type="bodyMedium" color="secondary" selectable>
                        This is your home screen. Start building your app by customizing
                        this template with your own components and features.
                    </AppText>
                </AppCard>

                <AppCard shadow="sm" style={{ borderCurve: 'continuous' }}>
                    <AppText type="titleMedium" weight="semibold" style={{ marginBottom: spacingTokens["3xl"] }}>
                        Features Included
                    </AppText>

                    <View style={{ gap: spacingTokens["3xl"] }}>
                        <FeatureItem emoji="🎨" title="Design System" description="Complete color, typography, and spacing tokens" />
                        <FeatureItem emoji="🧩" title="UI Components" description="Button, Card, Input, Avatar, Badge, and more" />
                        <FeatureItem emoji="🔐" title="Authentication" description="Email/password with Supabase" />
                        <FeatureItem emoji="📱" title="Navigation" description="Expo Router with protected routes" />
                        <FeatureItem emoji="💾" title="State Management" description="Zustand with persist middleware" />
                        <FeatureItem emoji="🌐" title="Data Fetching" description="React Query with offline support" />
                        <FeatureItem emoji="🔒" title="Secure Storage" description="Tokens stored securely with SecureStore" />
                    </View>
                </AppCard>

                <AppButton
                    color="primary"
                    block
                    onPress={() => router.push("/(protected)/(tabs)/explore")}
                >
                    Explore More
                </AppButton>
            </ScrollView>
        </View>
    );
}

function FeatureItem({ emoji, title, description }: { emoji: string; title: string; description: string }) {
    return (
        <View style={{ flexDirection: "row" }}>
            <AppText style={{ marginRight: spacingTokens["3xl"], fontSize: 24 }}>{emoji}</AppText>
            <View style={{ flex: 1 }}>
                <AppText type="labelLarge" weight="medium">{title}</AppText>
                <AppText type="bodySmall" color="secondary">{description}</AppText>
            </View>
        </View>
    );
}
