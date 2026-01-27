/**
 * useThemeColor Hook
 * Returns theme colors based on current color scheme
 */
import { useColorScheme } from 'react-native';
import { themeColors, ThemeColors } from '@/constants/colors';

export function useThemeColor(): ThemeColors {
    const colorScheme = useColorScheme() ?? 'light';
    return themeColors[colorScheme];
}
