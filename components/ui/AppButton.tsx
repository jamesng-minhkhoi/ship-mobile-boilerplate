/**
 * AppButton - Design System Button Component
 * 
 * Full-featured button with variants, sizes, loading states, and haptic feedback
 */

import { designTokens } from "@/constants/colors";
import { radiusTokens } from "@/constants/sizes";
import { spacingTokens } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as Haptics from "expo-haptics";
import React from "react";
import {
    ActivityIndicator,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { AppText, AppTypographyType } from "./AppText";

interface AppButtonProps extends TouchableOpacityProps {
    /** Button color theme */
    color?: "primary" | "success" | "warning" | "danger" | "default" | "ghost";
    /** Fill mode */
    fill?: "solid" | "outline" | "none";
    /** Button size */
    size?: "mini" | "small" | "middle" | "large";
    /** Full width button */
    block?: boolean;
    /** Button shape */
    shape?: "default" | "rounded" | "rectangular";
    /** Loading state */
    loading?: boolean;
    /** Custom loading text */
    loadingText?: string;
    /** Custom loading icon */
    loadingIcon?: React.ReactNode;
    /** Left icon */
    icon?: React.ReactNode;
    /** Right icon */
    iconRight?: React.ReactNode;
    /** Shadow level */
    shadow?: "none" | "xs" | "sm" | "md" | "lg";
    /** Haptic feedback on press */
    hapticEnabled?: boolean;
    /** Custom text style */
    textStyle?: TextStyle;
    /** Background opacity for solid fill */
    backgroundOpacity?: number;
    /** Custom border radius */
    borderRadius?: number;
    /** Custom background color */
    backgroundColor?: string;
}

export function AppButton({
    color = "default",
    fill = "solid",
    size: sizeProp = "middle",
    block = false,
    shape = "default",
    disabled = false,
    loading = false,
    loadingText,
    loadingIcon,
    icon,
    iconRight,
    children,
    shadow = "none",
    hapticEnabled = true,
    style,
    backgroundOpacity = 1,
    textStyle,
    borderRadius,
    backgroundColor,
    ...props
}: AppButtonProps) {
    const theme = useThemeColor();

    const handlePressIn = (event: any) => {
        if (hapticEnabled && !disabled && !loading) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(event);
    };

    const getContainerStyles = (): ViewStyle => {
        const heightMap = {
            mini: moderateScale(24),
            small: moderateScale(32),
            middle: moderateScale(40),
            large: moderateScale(48),
        };

        const paddingMap = {
            mini: spacingTokens.lg,
            small: spacingTokens["3xl"],
            middle: spacingTokens["4xl"],
            large: spacingTokens["5xl"],
        };

        const baseStyles: ViewStyle = {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            opacity: disabled || loading ? 0.6 : 1,
            minHeight: heightMap[sizeProp],
            paddingHorizontal: paddingMap[sizeProp],
            paddingVertical: sizeProp === 'mini' ? 0 : spacingTokens.sm,
        };

        // Shape
        const shapeStyles: Record<string, ViewStyle> = {
            default: { borderRadius: radiusTokens.md },
            rounded: { borderRadius: radiusTokens.full },
            rectangular: { borderRadius: 0 },
        };

        const finalBorderRadius = borderRadius !== undefined
            ? { borderRadius }
            : (shapeStyles[shape] || {});

        if (block) {
            baseStyles.alignSelf = "stretch";
            baseStyles.width = "100%";
        }

        // Colors
        const colorMap = {
            primary: { solid: designTokens.primary.blue[500], outline: designTokens.primary.blue[500] },
            success: { solid: designTokens.secondary.green[600], outline: designTokens.secondary.green[600] },
            warning: { solid: designTokens.secondary.orange[500], outline: designTokens.secondary.orange[500] },
            danger: { solid: designTokens.secondary.red[500], outline: designTokens.secondary.red[500] },
            default: { solid: designTokens.tertiary.neutral[200], outline: designTokens.tertiary.neutral[300] },
            ghost: { solid: "transparent", outline: "transparent" },
        };

        let bg = "transparent";
        let border = "transparent";
        let borderWidth = 0;

        const targetColor = colorMap[color] || colorMap.default;

        if (fill === 'solid') {
            bg = backgroundColor || targetColor.solid;
        } else if (fill === 'outline') {
            border = targetColor.outline;
            borderWidth = 1;
        }

        // Shadow styles
        const shadowStyles: Record<string, ViewStyle> = {
            none: {},
            xs: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
            sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
            md: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 },
            lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
        };

        return {
            ...baseStyles,
            ...finalBorderRadius,
            backgroundColor: bg,
            borderColor: border,
            borderWidth,
            ...(shadowStyles[shadow] ?? {}),
        };
    };

    const resolveTextColor = (): string => {
        if (disabled) return designTokens.tertiary.neutral[400];

        if (color === 'default') return designTokens.tertiary.neutral[800];
        if (color === 'ghost') return designTokens.tertiary.neutral[600];
        if (fill === 'solid') return 'white';

        const colorMap = {
            primary: designTokens.primary.blue[600],
            success: designTokens.secondary.green[600],
            warning: designTokens.secondary.orange[600],
            danger: designTokens.secondary.red[600],
            default: designTokens.tertiary.neutral[800],
            ghost: designTokens.tertiary.neutral[600],
        };

        return colorMap[color] || designTokens.tertiary.neutral[800];
    };

    const getTextType = (): AppTypographyType => {
        switch (sizeProp) {
            case 'mini': return 'labelSmall';
            case 'small': return 'labelMedium';
            case 'large': return 'labelLarge';
            case 'middle':
            default: return 'labelLarge';
        }
    };

    const effectiveIcon = loading ? null : icon;
    const content = loading && loadingText ? loadingText : children;

    return (
        <TouchableOpacity
            style={[getContainerStyles(), style]}
            disabled={disabled || loading}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{
                disabled: disabled || loading,
                busy: loading,
            }}
            onPressIn={handlePressIn}
            {...props}
        >
            {loading && (
                <View style={{ marginRight: content ? spacingTokens.md : 0 }}>
                    {loadingIcon || (
                        <ActivityIndicator
                            size="small"
                            color={fill === 'solid' && color !== 'default' ? 'white' : designTokens.primary.blue[500]}
                        />
                    )}
                </View>
            )}

            {effectiveIcon && (
                <View style={{ marginRight: content ? spacingTokens.md : 0 }}>
                    {effectiveIcon}
                </View>
            )}

            {content && (
                <>
                    {typeof content === 'string' || typeof content === 'number' ? (
                        <AppText
                            type={getTextType()}
                            style={[{
                                color: resolveTextColor(),
                                fontWeight: fill === 'solid' ? '600' : '500',
                            }, textStyle]}
                        >
                            {content}
                        </AppText>
                    ) : (
                        content
                    )}
                </>
            )}

            {iconRight && !loading && (
                <View style={{ marginLeft: content ? spacingTokens.md : 0 }}>
                    {iconRight}
                </View>
            )}
        </TouchableOpacity>
    );
}
