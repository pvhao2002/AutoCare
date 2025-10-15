/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import {Platform} from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
    light: {
        tint: tintColorLight,
        icon: '#687076',
        primary: '#1976D2',
        accent: '#FF9800',
        background: '#F5F7FA',
        surface: '#FFFFFF',
        text: '#1A1C1E',
        mutedText: '#5F6368',
        border: '#E0E0E0',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        tabIconDefault: '#9E9E9E',
        tabIconSelected: '#1976D2',
    },
    dark: {
        tint: tintColorDark,
        icon: '#9BA1A6',
        primary: '#64B5F6',
        accent: '#FFA726',
        background: '#0E141B',
        surface: '#1E252D',
        text: '#EAECEE',
        mutedText: '#A0A4A8',
        border: '#2E343A',
        success: '#81C784',
        warning: '#FFD54F',
        error: '#E57373',
        tabIconDefault: '#A0A4A8',
        tabIconSelected: '#64B5F6',
    },
};

export const Fonts = Platform.select({
    ios: {
        /** iOS `UIFontDescriptorSystemDesignDefault` */
        sans: 'system-ui',
        /** iOS `UIFontDescriptorSystemDesignSerif` */
        serif: 'ui-serif',
        /** iOS `UIFontDescriptorSystemDesignRounded` */
        rounded: 'ui-rounded',
        /** iOS `UIFontDescriptorSystemDesignMonospaced` */
        mono: 'ui-monospace',
    },
    default: {
        sans: 'normal',
        serif: 'serif',
        rounded: 'normal',
        mono: 'monospace',
    },
    web: {
        sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
});
