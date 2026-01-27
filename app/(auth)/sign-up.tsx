/**
 * Sign Up Screen
 */

import { AppButton, AppCard, AppInputField, AppText } from "@/components/ui";
import { spacingTokens } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import useStore from "@/store";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
    const theme = useThemeColor();
    const { signUpWithEmail, isLoading } = useStore();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async () => {
        if (!username || !email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        if (password.length < 8) {
            Alert.alert("Error", "Password must be at least 8 characters");
            return;
        }

        const { error } = await signUpWithEmail(email, password, username);

        if (error) {
            Alert.alert("Sign Up Failed", error);
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
                            Create Account
                        </AppText>
                        <AppText
                            type="bodyLarge"
                            color="secondary"
                            align="center"
                            style={{ marginTop: spacingTokens.lg }}
                        >
                            Start your journey today
                        </AppText>
                    </View>

                    <AppCard padding="lg" shadow="md" style={{ marginBottom: spacingTokens["5xl"] }}>
                        <AppInputField
                            label="Username"
                            placeholder="Your username"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            containerStyle={{ marginBottom: spacingTokens["3xl"] }}
                        />

                        <AppInputField
                            label="Email"
                            placeholder="your@email.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            containerStyle={{ marginBottom: spacingTokens["3xl"] }}
                        />

                        <AppInputField
                            label="Password"
                            placeholder="Create a password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            containerStyle={{ marginBottom: spacingTokens["3xl"] }}
                        />

                        <AppInputField
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            containerStyle={{ marginBottom: spacingTokens["5xl"] }}
                        />

                        <AppButton
                            color="primary"
                            block
                            size="large"
                            onPress={handleSignUp}
                            loading={isLoading}
                        >
                            Create Account
                        </AppButton>
                    </AppCard>

                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <AppText color="secondary">Already have an account? </AppText>
                        <Link href="/(auth)/sign-in">
                            <AppText color="link" weight="semibold">
                                Sign In
                            </AppText>
                        </Link>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
