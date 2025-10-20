import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack, useRouter, useSegments} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {isLoggedIn} from '@/hooks/useAuth';
import {useColorScheme} from '@/hooks/use-color-scheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync().then();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const segments = useSegments();
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            try {
                const status = await isLoggedIn();
                setLogged(status);
            } catch (e) {
                console.warn(e);
            } finally {
                setIsReady(true);
                await SplashScreen.hideAsync();
            }
        };

        prepare().then();
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!logged && !inAuthGroup) {
            router.replace('/(auth)/login');
        } else if (logged && inAuthGroup) {
            router.replace('/(tabs)');
        }
    }, [segments, logged, isReady, router]);

    if (!isReady) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="modal" options={{presentation: 'modal', title: 'Modal'}}/>
                </Stack>
                <StatusBar style="auto"/>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
