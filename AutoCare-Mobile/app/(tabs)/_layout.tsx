import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {useTheme} from '@/hooks/use-theme';
import {SafeAreaView} from "react-native-safe-area-context";

export default function TabsLayout() {
    const {colors} = useTheme();
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.mutedText,
                    tabBarStyle: {
                        backgroundColor: colors.surface,
                        borderTopColor: colors.border,
                        height: 50,
                        paddingBottom: 0,
                    },
                    tabBarLabelStyle: {fontSize: 12},
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Trang chủ',
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name="home-outline" color={color} size={size}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="vehicles"
                    options={{
                        title: 'Xe của tôi',
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name="car-outline" color={color} size={size}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="services"
                    options={{
                        title: 'Dịch vụ',
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name="construct-outline" color={color} size={size}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="history"
                    options={{
                        title: 'Lịch sử',
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name="time-outline" color={color} size={size}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Tài khoản',
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name="person-circle-outline" color={color} size={size}/>
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}
