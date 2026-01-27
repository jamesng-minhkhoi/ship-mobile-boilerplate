/**
 * Spacing Constants
 * Consistent spacing scale for margins, paddings, and gaps
 */
import { moderateScale } from 'react-native-size-matters';

export const spacingTokens = {
    /** 2px */
    xs: moderateScale(2),
    /** 4px */
    sm: moderateScale(4),
    /** 6px */
    md: moderateScale(6),
    /** 8px */
    lg: moderateScale(8),
    /** 10px */
    xl: moderateScale(10),
    /** 12px */
    "2xl": moderateScale(12),
    /** 14px */
    "3xl": moderateScale(14),
    /** 16px */
    "4xl": moderateScale(16),
    /** 20px */
    "5xl": moderateScale(20),
    /** 24px */
    "6xl": moderateScale(24),
    /** 32px */
    "7xl": moderateScale(32),
    /** 40px */
    "8xl": moderateScale(40),
    /** 48px */
    "9xl": moderateScale(48),
    /** 64px */
    "10xl": moderateScale(64),
} as const;

export type SpacingToken = keyof typeof spacingTokens;
