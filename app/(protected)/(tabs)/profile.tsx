/**
 * Profile Screen
 */

import { AppAvatar, AppButton, AppCard, AppText, AppToggleSwitch } from "@/components/ui";
import { spacingTokens } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import useStore from "@/store";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
    const theme = useThemeColor();
    const { profile, signOut, session } = useStore();
    const [notifications, setNotifications] = useState(true);

    const handleSignOut = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: () => signOut(),
                },
            ]
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView
                contentContainerStyle={{
                    padding: spacingTokens["5xl"],
                }}
            >
                <AppText type="headlineMedium" weight="bold" style={{ marginBottom: spacingTokens["5xl"] }}>
                    Profile
                </AppText>

                {/* Profile Header */}
                <AppCard shadow="md" style={{ marginBottom: spacingTokens["5xl"] }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <AppAvatar
                            initials={profile?.username?.slice(0, 2) || "U"}
                            size="lg"
                            source={profile?.avatar_url}
                        />
                        <View style={{ marginLeft: spacingTokens["4xl"], flex: 1 }}>
                            <AppText type="titleLarge" weight="semibold">
                                {profile?.username || "User"}
                            </AppText>
                            <AppText type="bodySmall" color="secondary">
                                {session?.user?.email || "No email"}
                            </AppText>
                        </View>
                    </View>
                </AppCard>

                {/* Settings */}
                <AppCard shadow="sm" style={{ marginBottom: spacingTokens["5xl"] }}>
                    <AppText type="labelLarge" weight="semibold" style={{ marginBottom: spacingTokens["4xl"] }}>
                        Settings
                    </AppText>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: spacingTokens["3xl"],
                        }}
                    >
                        <AppText type="bodyMedium">Push Notifications</AppText>
                        <AppToggleSwitch
                            value={notifications}
                            onValueChange={setNotifications}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <AppText type="bodyMedium">Dark Mode</AppText>
                        <AppText type="labelSmall" color="secondary">
                            Follow System
                        </AppText>
                    </View>
                </AppCard>

                {/* Sign Out */}
                <AppButton
                    color="danger"
                    fill="outline"
                    block
                    onPress={handleSignOut}
                >
                    Sign Out
                </AppButton>
            </ScrollView>
        </SafeAreaView>
    );
}
