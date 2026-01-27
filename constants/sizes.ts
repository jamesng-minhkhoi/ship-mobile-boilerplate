/**
 * Size Constants
 * Border radius and component size tokens
 */
import { moderateScale } from 'react-native-size-matters';

export const radiusTokens = {
    /** 0px - No radius */
    none: 0,
    /** 4px */
    sm: moderateScale(4),
    /** 6px */
    default: moderateScale(6),
    /** 8px */
    md: moderateScale(8),
    /** 12px */
    lg: moderateScale(12),
    /** 16px */
    xl: moderateScale(16),
    /** 20px */
    xlPlus: moderateScale(20),
    /** 24px */
    "2xl": moderateScale(24),
    /** 32px */
    "3xl": moderateScale(32),
    /** 9999px - Full rounded */
    full: 9999,
} as const;

export const sizeTokens = {
    /** Icon sizes */
    iconXs: moderateScale(12),
    iconSm: moderateScale(16),
    iconMd: moderateScale(20),
    iconLg: moderateScale(24),
    iconXl: moderateScale(32),

    /** Avatar sizes */
    avatarSm: moderateScale(32),
    avatarMd: moderateScale(40),
    avatarLg: moderateScale(56),
    avatarXl: moderateScale(80),

    /** Button heights */
    buttonMini: moderateScale(24),
    buttonSmall: moderateScale(32),
    buttonMedium: moderateScale(40),
    buttonLarge: moderateScale(48),

    /** Input heights */
    inputSmall: moderateScale(36),
    inputMedium: moderateScale(44),
    inputLarge: moderateScale(52),
} as const;

export type RadiusToken = keyof typeof radiusTokens;
export type SizeToken = keyof typeof sizeTokens;
