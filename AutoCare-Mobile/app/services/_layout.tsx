import {Stack, useRouter} from 'expo-router';
import {useTheme} from '@/hooks/use-theme';
import {Ionicons} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';

export default function ServicesLayout() {
    const {colors} = useTheme();
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.surface,
                },
                headerTitleStyle: {
                    color: colors.text,
                    fontSize: 18,
                    fontWeight: '600',
                },
                headerTintColor: colors.primary,
                headerShadowVisible: false,
                animation: 'slide_from_right',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} style={{paddingHorizontal: 10}}>
                        <Ionicons name="arrow-back-outline" size={24} color={colors.primary}/>
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Screen name="checkout" options={{title: 'Xác nhận đặt lịch'}}/>
        </Stack>
    );
}
