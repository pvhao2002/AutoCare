import {Stack, useRouter} from 'expo-router';
import {useTheme} from '@/hooks/use-theme';
import {Ionicons} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';

export default function VehiclesLayout() {
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
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} style={{paddingHorizontal: 10}}>
                        <Ionicons name="arrow-back-outline" size={24} color={colors.primary}/>
                    </TouchableOpacity>
                ),
            }}
        >
            {/* Trang thêm xe */}
            <Stack.Screen name="add" options={{title: 'Thêm xe mới'}}/>

            {/* Trang chi tiết xe */}
            <Stack.Screen name="details/[id]" options={{title: 'Chi tiết xe'}}/>

            {/* Trang chỉnh sửa xe */}
            <Stack.Screen name="edit/[id]" options={{title: 'Chỉnh sửa xe'}}/>
        </Stack>
    );
}
