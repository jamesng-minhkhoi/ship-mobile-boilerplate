/**
 * AppBadge - Design System Badge Component
 */

import { designTokens } from "@/constants/colors";
import { radiusTokens } from "@/constants/sizes";
import { spacingTokens } from "@/constants/spacing";
import React from "react";
import { View, ViewStyle } from "react-native";
import { AppText } from "./AppText";

interface AppBadgeProps {
    /** Badge text */
    text: string;
    /** Badge color variant */
    variant?: "primary" | "success" | "warning" | "danger" | "neutral";
    /** Badge size */
    size?: "sm" | "md";
    /** Style override */
    style?: ViewStyle;
}

export function AppBadge({
    text,
    variant = "primary",
    size = "md",
    style,
}: AppBadgeProps) {
    const colorMap = {
        primary: { bg: designTokens.primary.blue[100], text: designTokens.primary.blue[700] },
        success: { bg: designTokens.secondary.green[100], text: designTokens.secondary.green[700] },
        warning: { bg: designTokens.secondary.yellow[100], text: designTokens.secondary.yellow[700] },
        danger: { bg: designTokens.secondary.red[100], text: designTokens.secondary.red[700] },
        neutral: { bg: designTokens.tertiary.neutral[100], text: designTokens.tertiary.neutral[700] },
    };

    const colors = colorMap[variant];

    const containerStyle: ViewStyle = {
        backgroundColor: colors.bg,
        borderRadius: radiusTokens.full,
        paddingHorizontal: size === "sm" ? spacingTokens.lg : spacingTokens.xl,
        paddingVertical: size === "sm" ? spacingTokens.xs : spacingTokens.sm,
    };

    return (
        <View style={[containerStyle, style]}>
            <AppText
                type={size === "sm" ? "labelExtraSmall" : "labelSmall"}
                weight="medium"
                color={colors.text}
            >
                {text}
            </AppText>
        </View>
    );
}
