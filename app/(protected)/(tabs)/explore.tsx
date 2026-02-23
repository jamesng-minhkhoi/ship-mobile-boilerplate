/**
 * Explore Screen
 */

import { AppCard, AppText } from "@/components/ui";
import { spacingTokens } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
    const theme = useThemeColor();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView
                contentContainerStyle={{
                    padding: spacingTokens["5xl"],
                }}
            >
                <AppText type="headlineMedium" weight="bold" style={{ marginBottom: spacingTokens["4xl"] }}>
                    Explore
                </AppText>

                <AppText type="bodyLarge" color="secondary" style={{ marginBottom: spacingTokens["6xl"] }}>
                    Discover content and features. Customize this screen for your app&apos;s needs.
                </AppText>

                <View style={{ gap: spacingTokens["3xl"] }}>
                    {[1, 2, 3].map((item) => (
                        <AppCard key={item} shadow="sm" onPress={() => console.log(`Pressed item ${item}`)}>
                            <AppText type="titleMedium" weight="semibold">
                                Item {item}
                            </AppText>
                            <AppText type="bodySmall" color="secondary" style={{ marginTop: spacingTokens.sm }}>
                                Tap to interact with this card
                            </AppText>
                        </AppCard>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
