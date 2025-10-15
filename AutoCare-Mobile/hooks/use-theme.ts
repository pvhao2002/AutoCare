import {Colors, Fonts} from '@/constants/theme';
import {useColorScheme} from '@/hooks/use-color-scheme';

export function useTheme() {
    const scheme = useColorScheme() ?? 'light';
    const colorSet = Colors[scheme];
    return {
        scheme,
        colors: colorSet,
        fonts: Fonts,
        isDark: scheme === 'dark',
        isLight: scheme === 'light',
    };
}
