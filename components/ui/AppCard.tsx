/**
 * AppCard - Design System Card Component
 * 
 * Flexible card with shadow presets and press handling
 */

import { radiusTokens } from "@/constants/sizes";
import { spacingTokens } from "@/constants/spacing";
import { shadowTokens } from "@/constants/shadows";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
    Pressable,
    PressableProps,
    View,
    ViewProps,
    ViewStyle,
} from "react-native";

interface AppCardProps extends Omit<PressableProps, 'style'> {
    /** Shadow level */
    shadow?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
    /** Border radius */
    radius?: "sm" | "md" | "lg" | "xl" | "2xl";
    /** Padding size */
    padding?: "none" | "sm" | "md" | "lg" | "xl";
    /** Custom background color */
    backgroundColor?: string;
    /** Show border */
    bordered?: boolean;
    /** Child components */
    children?: React.ReactNode;
    /** Style override */
    style?: ViewStyle;
}

export function AppCard({
    shadow = "sm",
    radius = "lg",
    padding = "md",
    backgroundColor,
    bordered = false,
    children,
    style,
    onPress,
    ...props
}: AppCardProps) {
    const theme = useThemeColor();

    const paddingMap = {
        none: 0,
        sm: spacingTokens.lg,
        md: spacingTokens["4xl"],
        lg: spacingTokens["5xl"],
        xl: spacingTokens["6xl"],
    };

    const cardStyles: ViewStyle = {
        backgroundColor: backgroundColor || theme.background,
        borderRadius: radiusTokens[radius],
        padding: paddingMap[padding],
        ...shadowTokens[shadow],
        ...(bordered && {
            borderWidth: 1,
            borderColor: theme.border,
        }),
    };

    if (onPress) {
        return (
            <Pressable
                style={({ pressed }) => [
                    cardStyles,
                    pressed && { opacity: 0.95 },
                    style,
                ]}
                onPress={onPress}
                {...props}
            >
                {children}
            </Pressable>
        );
    }

    return (
        <View style={[cardStyles, style]}>
            {children}
        </View>
    );
}
