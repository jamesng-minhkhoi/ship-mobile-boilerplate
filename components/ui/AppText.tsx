/**
 * AppText - Design System Text Component
 * 
 * Typography component using design tokens
 */

import { typographyTokens } from '@/constants/typography';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Text, type TextProps, TextStyle } from 'react-native';

export type AppTypographyType =
    | 'headlineLarge' | 'headlineMedium' | 'headlineSmall'
    | 'titleLarge' | 'titleMedium' | 'titleSmall'
    | 'labelLarge' | 'labelMedium' | 'labelSmall' | 'labelExtraSmall'
    | 'bodyLarge' | 'bodyMedium' | 'bodySmall'
    | 'caption' | 'overline'
    | 'button' | 'link';

export type AppTextColor =
    | 'primary'
    | 'secondary'
    | 'disabled'
    | 'inverse'
    | 'link'
    | 'success'
    | 'warning'
    | 'error'
    | string;

export type AppTextProps = TextProps & {
    type?: AppTypographyType;
    color?: AppTextColor;
    weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
    align?: 'left' | 'center' | 'right' | 'justify' | 'auto';
};

export function AppText({
    style,
    type = 'bodyMedium',
    color,
    weight: overrideWeight,
    align,
    ...rest
}: AppTextProps) {
    const theme = useThemeColor();

    const getTypographyStyle = (): TextStyle => {
        const tokens = typographyTokens.baseline;

        let selectedToken;

        switch (type) {
            case 'headlineLarge': selectedToken = tokens.headline.large; break;
            case 'headlineMedium': selectedToken = tokens.headline.medium; break;
            case 'headlineSmall': selectedToken = tokens.headline.small; break;
            case 'titleLarge': selectedToken = tokens.title.large; break;
            case 'titleMedium': selectedToken = tokens.title.medium; break;
            case 'titleSmall': selectedToken = tokens.title.small; break;
            case 'labelLarge': selectedToken = tokens.label.large; break;
            case 'labelMedium': selectedToken = tokens.label.medium; break;
            case 'labelSmall': selectedToken = tokens.label.small; break;
            case 'labelExtraSmall': selectedToken = tokens.label.extraSmall; break;
            case 'bodyLarge': selectedToken = tokens.body.large; break;
            case 'bodyMedium': selectedToken = tokens.body.medium; break;
            case 'bodySmall': selectedToken = tokens.body.small; break;
            case 'caption': selectedToken = typographyTokens.caption; break;
            case 'overline': selectedToken = typographyTokens.overline; break;
            case 'button': selectedToken = tokens.label.large; break;
            case 'link': selectedToken = tokens.body.large; break;
            default: selectedToken = tokens.body.medium;
        }

        // @ts-ignore - tokens have 'size' but we want 'fontSize'
        const { size, tracking, ...restToken } = selectedToken;
        const baseStyle: TextStyle = {
            ...restToken,
            fontSize: size,
            letterSpacing: tracking,
        };

        if (type === 'link') {
            baseStyle.textDecorationLine = 'underline';
        }

        return baseStyle;
    };

    const getTextColor = (): string => {
        if (!color) {
            if (type === 'link') return theme.tint;
            if (type === 'caption' || type === 'overline') return theme.textSecondary;
            return theme.textPrimary;
        }

        switch (color) {
            case 'primary': return theme.textPrimary;
            case 'secondary': return theme.textSecondary;
            case 'disabled': return theme.textDisabled;
            case 'inverse': return theme.foreground;
            case 'link': return theme.tint;
            case 'success': return theme.success;
            case 'warning': return theme.warning;
            case 'error': return theme.error;
            default: return color;
        }
    };

    const getWeightStyle = (): TextStyle => {
        if (!overrideWeight) return {};

        const weightMap: Record<string, TextStyle['fontWeight']> = {
            light: '300',
            regular: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        };

        return { fontWeight: weightMap[overrideWeight] };
    };

    const baseTokenStyle = getTypographyStyle();
    const colorStyle = { color: getTextColor() };
    const alignStyle = align ? { textAlign: align } : {};
    const weightStyle = getWeightStyle();

    return (
        <Text
            style={[
                baseTokenStyle,
                colorStyle,
                alignStyle,
                weightStyle,
                style,
            ]}
            {...rest}
        />
    );
}
