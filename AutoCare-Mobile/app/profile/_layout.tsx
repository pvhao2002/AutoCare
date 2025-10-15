import {Stack, useRouter} from 'expo-router';
import {useTheme} from '@/hooks/use-theme';
import {Ionicons} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';


export default function ProfileLayout() {
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
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{paddingHorizontal: 10}}
                    >
                        <Ionicons name="arrow-back-outline" size={24} color={colors.primary}/>
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Screen
                name="details"
                options={{title: 'Thông tin cá nhân'}}
            />
            <Stack.Screen
                name="security"
                options={{title: 'Bảo mật & Quyền riêng tư'}}
            />
            <Stack.Screen
                name="help"
                options={{title: 'Trung tâm hỗ trợ'}}
            />
            <Stack.Screen
                name="about"
                options={{title: 'Giới thiệu ứng dụng'}}
            />
            <Stack.Screen name="edit" options={{title: 'Chỉnh sửa hồ sơ'}}/>
        </Stack>
    );
}
