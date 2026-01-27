/**
 * AppInputField - Design System Input Component
 * 
 * Input field with validation, icons, and react-hook-form integration
 */

import { designTokens } from "@/constants/colors";
import { radiusTokens, sizeTokens } from "@/constants/sizes";
import { spacingTokens } from "@/constants/spacing";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import {
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
    Pressable,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { AppText } from "./AppText";

interface AppInputFieldProps extends TextInputProps {
    /** Input label */
    label?: string;
    /** Error message */
    error?: string;
    /** Helper text */
    helperText?: string;
    /** Left icon */
    leftIcon?: React.ReactNode;
    /** Right icon */
    rightIcon?: React.ReactNode;
    /** Input size */
    size?: "small" | "medium" | "large";
    /** Disabled state */
    disabled?: boolean;
    /** Container style */
    containerStyle?: ViewStyle;
    /** Show clear button */
    showClear?: boolean;
    /** On clear callback */
    onClear?: () => void;
}

export function AppInputField({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    size = "medium",
    disabled = false,
    containerStyle,
    showClear = false,
    onClear,
    value,
    style,
    ...props
}: AppInputFieldProps) {
    const theme = useThemeColor();
    const [isFocused, setIsFocused] = useState(false);

    const heightMap = {
        small: sizeTokens.inputSmall,
        medium: sizeTokens.inputMedium,
        large: sizeTokens.inputLarge,
    };

    const getBorderColor = () => {
        if (error) return theme.error;
        if (isFocused) return theme.tint;
        return theme.border;
    };

    const inputContainerStyle: ViewStyle = {
        flexDirection: "row",
        alignItems: "center",
        height: heightMap[size],
        backgroundColor: disabled ? designTokens.tertiary.neutral[100] : theme.background,
        borderWidth: 1,
        borderColor: getBorderColor(),
        borderRadius: radiusTokens.md,
        paddingHorizontal: spacingTokens["3xl"],
    };

    return (
        <View style={containerStyle}>
            {label && (
                <AppText
                    type="labelMedium"
                    weight="medium"
                    style={{ marginBottom: spacingTokens.sm }}
                >
                    {label}
                </AppText>
            )}

            <View style={inputContainerStyle}>
                {leftIcon && (
                    <View style={{ marginRight: spacingTokens.lg }}>
                        {leftIcon}
                    </View>
                )}

                <TextInput
                    value={value}
                    style={[
                        {
                            flex: 1,
                            fontSize: moderateScale(14),
                            color: disabled ? theme.textDisabled : theme.textPrimary,
                        },
                        style,
                    ]}
                    placeholderTextColor={theme.textDisabled}
                    editable={!disabled}
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        props.onBlur?.(e);
                    }}
                    {...props}
                />

                {showClear && value && value.length > 0 && (
                    <Pressable onPress={onClear} style={{ marginLeft: spacingTokens.lg }}>
                        <AppText color="secondary">✕</AppText>
                    </Pressable>
                )}

                {rightIcon && (
                    <View style={{ marginLeft: spacingTokens.lg }}>
                        {rightIcon}
                    </View>
                )}
            </View>

            {(error || helperText) && (
                <AppText
                    type="labelSmall"
                    color={error ? "error" : "secondary"}
                    style={{ marginTop: spacingTokens.sm }}
                >
                    {error || helperText}
                </AppText>
            )}
        </View>
    );
}
