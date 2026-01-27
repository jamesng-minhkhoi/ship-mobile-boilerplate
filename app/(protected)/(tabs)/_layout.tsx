/**
 * Tab Layout
 * Bottom tab navigation for the main app
 */

import { designTokens } from "@/constants/colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { moderateScale } from "react-native-size-matters";

export default function TabLayout() {
    const theme = useThemeColor();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.tint,
                tabBarInactiveTintColor: designTokens.tertiary.neutral[400],
                tabBarStyle: {
                    backgroundColor: theme.background,
                    borderTopColor: theme.border,
                    height: Platform.OS === "ios" ? moderateScale(85) : moderateScale(65),
                    paddingBottom: Platform.OS === "ios" ? moderateScale(25) : moderateScale(10),
                    paddingTop: moderateScale(10),
                },
                tabBarLabelStyle: {
                    fontSize: moderateScale(11),
                    fontWeight: "500",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <TabIcon emoji="🏠" color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color }) => <TabIcon emoji="🔍" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <TabIcon emoji="👤" color={color} />,
                }}
            />
        </Tabs>
    );
}

// Simple tab icon component using emoji (replace with SVG icons)
function TabIcon({ emoji, color }: { emoji: string; color: string }) {
    return (
        <span style={{ fontSize: moderateScale(22) }}>{emoji}</span>
    );
}
