/**
 * AppToggleSwitch - Design System Toggle Component
 */

import { designTokens } from "@/constants/colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, ViewStyle } from "react-native";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";

interface AppToggleSwitchProps {
    /** Toggle state */
    value: boolean;
    /** Change handler */
    onValueChange: (value: boolean) => void;
    /** Disabled state */
    disabled?: boolean;
    /** Size */
    size?: "sm" | "md";
    /** Active color */
    activeColor?: string;
    /** Style override */
    style?: ViewStyle;
}

export function AppToggleSwitch({
    value,
    onValueChange,
    disabled = false,
    size = "md",
    activeColor,
    style,
}: AppToggleSwitchProps) {
    const theme = useThemeColor();
    const progress = useSharedValue(value ? 1 : 0);

    const dimensions = {
        sm: { width: moderateScale(40), height: moderateScale(24), thumbSize: moderateScale(20) },
        md: { width: moderateScale(51), height: moderateScale(31), thumbSize: moderateScale(27) },
    };

    const { width, height, thumbSize } = dimensions[size];
    const padding = (height - thumbSize) / 2;

    React.useEffect(() => {
        progress.value = withSpring(value ? 1 : 0, { damping: 15, stiffness: 200 });
    }, [progress, value]);

    const trackStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            progress.value,
            [0, 1],
            [designTokens.tertiary.neutral[300], activeColor || theme.tint]
        ),
    }));

    const thumbStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: progress.value * (width - thumbSize - padding * 2) },
        ],
    }));

    const handlePress = () => {
        if (disabled) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onValueChange(!value);
    };

    return (
        <Pressable onPress={handlePress} disabled={disabled} style={style}>
            <Animated.View
                style={[
                    {
                        width,
                        height,
                        borderRadius: height / 2,
                        justifyContent: "center",
                        paddingHorizontal: padding,
                        opacity: disabled ? 0.5 : 1,
                    },
                    trackStyle,
                ]}
            >
                <Animated.View
                    style={[
                        {
                            width: thumbSize,
                            height: thumbSize,
                            borderRadius: thumbSize / 2,
                            backgroundColor: "white",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 2,
                            elevation: 2,
                        },
                        thumbStyle,
                    ]}
                />
            </Animated.View>
        </Pressable>
    );
}
