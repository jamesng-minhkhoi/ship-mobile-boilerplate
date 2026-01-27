/**
 * AppAvatar - Design System Avatar Component
 */

import { designTokens } from "@/constants/colors";
import { radiusTokens, sizeTokens } from "@/constants/sizes";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Image, View, ViewStyle } from "react-native";
import { AppText } from "./AppText";

interface AppAvatarProps {
    /** Image source URI */
    source?: string;
    /** Fallback initials */
    initials?: string;
    /** Avatar size */
    size?: "sm" | "md" | "lg" | "xl";
    /** Style override */
    style?: ViewStyle;
}

export function AppAvatar({
    source,
    initials,
    size = "md",
    style,
}: AppAvatarProps) {
    const theme = useThemeColor();

    const sizeMap = {
        sm: sizeTokens.avatarSm,
        md: sizeTokens.avatarMd,
        lg: sizeTokens.avatarLg,
        xl: sizeTokens.avatarXl,
    };

    const fontSize = {
        sm: "labelSmall" as const,
        md: "labelMedium" as const,
        lg: "titleMedium" as const,
        xl: "titleLarge" as const,
    };

    const avatarSize = sizeMap[size];

    const containerStyle: ViewStyle = {
        width: avatarSize,
        height: avatarSize,
        borderRadius: radiusTokens.full,
        backgroundColor: designTokens.primary.blue[100],
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    };

    if (source) {
        return (
            <View style={[containerStyle, style]}>
                <Image
                    source={{ uri: source }}
                    style={{ width: avatarSize, height: avatarSize }}
                    resizeMode="cover"
                />
            </View>
        );
    }

    return (
        <View style={[containerStyle, style]}>
            <AppText
                type={fontSize[size]}
                weight="semibold"
                color={designTokens.primary.blue[600]}
            >
                {initials?.slice(0, 2).toUpperCase() || "?"}
            </AppText>
        </View>
    );
}
