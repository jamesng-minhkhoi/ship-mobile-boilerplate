/**
 * Sign In Screen
 */

import { AppButton, AppCard, AppInputField, AppText } from "@/components/ui";
import { spacingTokens } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import useStore from "@/store";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
    const theme = useThemeColor();
    const { signInWithEmail, isLoading } = useStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        const { error } = await signInWithEmail(email, password);

        if (error) {
            Alert.alert("Sign In Failed", error);
        }
    };

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
                            Welcome Back
                        </AppText>
                        <AppText
                            type="bodyLarge"
                            color="secondary"
                            align="center"
                            style={{ marginTop: spacingTokens.lg }}
                        >
                            Sign in to continue
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
                            containerStyle={{ marginBottom: spacingTokens["4xl"] }}
                        />

                        <AppInputField
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoComplete="password"
                            containerStyle={{ marginBottom: spacingTokens["5xl"] }}
                        />

                        <AppButton
                            color="primary"
                            block
                            size="large"
                            onPress={handleSignIn}
                            loading={isLoading}
                        >
                            Sign In
                        </AppButton>

                        <Link href="/(auth)/forgot-password" asChild>
                            <AppButton
                                color="ghost"
                                block
                                style={{ marginTop: spacingTokens["3xl"] }}
                            >
                                Forgot Password?
                            </AppButton>
                        </Link>
                    </AppCard>

                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <AppText color="secondary">Don&apos;t have an account? </AppText>
                        <Link href="/(auth)/sign-up">
                            <AppText color="link" weight="semibold">
                                Sign Up
                            </AppText>
                        </Link>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
