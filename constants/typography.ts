/**
 * Typography Constants
 * Uses react-native-size-matters for responsive sizing
 */
import { Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const Fonts = Platform.select({
    ios: {
        sans: "System",
        serif: "Georgia",
        rounded: "System",
        mono: 'Menlo',
    },
    default: {
        sans: "System",
        serif: "Georgia",
        rounded: "System",
        mono: 'monospace',
    },
});

export const typographyTokens = {
    baseline: {
        headline: {
            large: { fontFamily: Fonts.sans, size: moderateScale(32), lineHeight: moderateScale(40), weight: "400" as const, tracking: moderateScale(0.04) },
            medium: { fontFamily: Fonts.sans, size: moderateScale(28), lineHeight: moderateScale(36), weight: "400" as const, tracking: moderateScale(0.04) },
            small: { fontFamily: Fonts.sans, size: moderateScale(24), lineHeight: moderateScale(32), weight: "400" as const, tracking: moderateScale(0.04) },
        },
        title: {
            large: { fontFamily: Fonts.sans, size: moderateScale(22), lineHeight: moderateScale(28), weight: "400" as const, tracking: 0 },
            medium: { fontFamily: Fonts.sans, size: moderateScale(16), lineHeight: moderateScale(24), weight: "400" as const, tracking: moderateScale(0.04) },
            small: { fontFamily: Fonts.sans, size: moderateScale(14), lineHeight: moderateScale(20), weight: "400" as const, tracking: moderateScale(0.04) },
        },
        label: {
            large: { fontFamily: Fonts.sans, size: moderateScale(16), lineHeight: moderateScale(24), weight: "400" as const, tracking: moderateScale(0.16) },
            medium: { fontFamily: Fonts.sans, size: moderateScale(14), lineHeight: moderateScale(20), weight: "400" as const, tracking: moderateScale(0.16) },
            small: { fontFamily: Fonts.sans, size: moderateScale(12), lineHeight: moderateScale(16), weight: "400" as const, tracking: moderateScale(0.16) },
            extraSmall: { fontFamily: Fonts.sans, size: moderateScale(11), lineHeight: moderateScale(16), weight: "400" as const, tracking: moderateScale(0.16) },
        },
        body: {
            large: { size: moderateScale(16), lineHeight: moderateScale(24), weight: "400" as const, tracking: 0 },
            medium: { size: moderateScale(14), lineHeight: moderateScale(20), weight: "400" as const, tracking: 0 },
            small: { size: moderateScale(12), lineHeight: moderateScale(16), weight: "400" as const, tracking: 0 },
        },
    },
    emphasis: {
        headline: {
            large: { fontFamily: Fonts.sans, size: moderateScale(32), lineHeight: moderateScale(40), weight: "600" as const, tracking: moderateScale(0.16) },
            medium: { fontFamily: Fonts.sans, size: moderateScale(28), lineHeight: moderateScale(36), weight: "600" as const, tracking: moderateScale(0.16) },
            small: { fontFamily: Fonts.sans, size: moderateScale(24), lineHeight: moderateScale(32), weight: "600" as const, tracking: moderateScale(0.16) },
        },
        title: {
            large: { fontFamily: Fonts.sans, size: moderateScale(22), lineHeight: moderateScale(28), weight: "600" as const, tracking: moderateScale(0.04) },
            medium: { fontFamily: Fonts.sans, size: moderateScale(16), lineHeight: moderateScale(24), weight: "600" as const, tracking: moderateScale(0.04) },
            small: { fontFamily: Fonts.sans, size: moderateScale(14), lineHeight: moderateScale(20), weight: "600" as const, tracking: moderateScale(0.04) },
        },
        label: {
            large: { fontFamily: Fonts.sans, size: moderateScale(16), lineHeight: moderateScale(24), weight: "600" as const, tracking: moderateScale(0.36) },
            medium: { fontFamily: Fonts.sans, size: moderateScale(14), lineHeight: moderateScale(20), weight: "600" as const, tracking: moderateScale(0.36) },
            small: { fontFamily: Fonts.sans, size: moderateScale(12), lineHeight: moderateScale(16), weight: "600" as const, tracking: moderateScale(0.36) },
            extraSmall: { fontFamily: Fonts.sans, size: moderateScale(11), lineHeight: moderateScale(18), weight: "600" as const, tracking: moderateScale(0.36) },
        },
        body: {
            large: { fontFamily: Fonts.sans, size: moderateScale(16), lineHeight: moderateScale(24), weight: "600" as const, tracking: 0 },
            medium: { fontFamily: Fonts.sans, size: moderateScale(14), lineHeight: moderateScale(20), weight: "600" as const, tracking: 0 },
            small: { fontFamily: Fonts.sans, size: moderateScale(12), lineHeight: moderateScale(16), weight: "600" as const, tracking: 0 },
        },
    },
    caption: { fontFamily: Fonts.sans, size: moderateScale(11), lineHeight: moderateScale(16), weight: "500" as const, tracking: moderateScale(0.04) },
    overline: { fontFamily: Fonts.sans, size: moderateScale(11), lineHeight: moderateScale(16), weight: "500" as const, tracking: moderateScale(0.64) },
} as const;
