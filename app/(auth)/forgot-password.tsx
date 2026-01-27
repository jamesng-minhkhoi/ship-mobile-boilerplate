/**
 * Forgot Password Screen
 */

import { AppButton, AppCard, AppInputField, AppText } from "@/components/ui";
import { spacingTokens } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import useStore from "@/store";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
    const theme = useThemeColor();
    const { resetPasswordWithOTP, isLoading } = useStore();

    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email");
            return;
        }

        const { error } = await resetPasswordWithOTP(email);

        if (error) {
            Alert.alert("Error", error);
        } else {
            setSubmitted(true);
        }
    };

    if (submitted) {
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
                        <AppText type="headlineMedium" weight="bold" align="center">
                            Check Your Email
                        </AppText>
                        <AppText
                            type="bodyLarge"
                            color="secondary"
                            align="center"
                            style={{ marginTop: spacingTokens.lg }}
                        >
                            We've sent a password reset link to {email}
                        </AppText>
                    </View>

                    <AppButton
                        color="primary"
                        block
                        size="large"
                        onPress={() => router.back()}
                    >
                        Back to Sign In
                    </AppButton>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        padding: spacingTokens["5xl"],
                        justifyContent: "center",
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ marginBottom: spacingTokens["7xl"] }}>
                        <AppText type="headlineLarge" weight="bold" align="center">
                            Reset Password
                        </AppText>
                        <AppText
                            type="bodyLarge"
                            color="secondary"
                            align="center"
                            style={{ marginTop: spacingTokens.lg }}
                        >
                            Enter your email to receive a reset link
                        </AppText>
                    </View>

                    <AppCard padding="lg" shadow="md" style={{ marginBottom: spacingTokens["5xl"] }}>
                        <AppInputField
                            label="Email"
                            placeholder="your@email.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            containerStyle={{ marginBottom: spacingTokens["5xl"] }}
                        />

                        <AppButton
                            color="primary"
                            block
                            size="large"
                            onPress={handleResetPassword}
                            loading={isLoading}
                        >
                            Send Reset Link
                        </AppButton>

                        <AppButton
                            color="ghost"
                            block
                            style={{ marginTop: spacingTokens["3xl"] }}
                            onPress={() => router.back()}
                        >
                            Back to Sign In
                        </AppButton>
                    </AppCard>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
