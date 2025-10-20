import React from 'react';
import {StyleSheet, Image, TouchableOpacity, ScrollView, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {Href, useRouter} from 'expo-router';
import {getUserToken, logoutUser} from '@/hooks/useAuth';

export default function ProfileScreen() {
    const {colors} = useTheme();
    const router = useRouter();

    const handleLogout = async () => {
        console.log('Logging out...');
        const u = await getUserToken();
        console.log('Current token:', u);
        await logoutUser();
        const u2 = await getUserToken();
        console.log('Token after logout:', u2);
        router.replace('/login');
    };

    const settings: { icon: string; label: string; route: Href }[] = [
        {icon: 'person-outline', label: 'Thông tin cá nhân', route: '/profile/details'},
        {icon: 'lock-closed-outline', label: 'Bảo mật & quyền riêng tư', route: '/profile/security'},
        {icon: 'help-circle-outline', label: 'Trung tâm hỗ trợ', route: '/profile/help'},
        {icon: 'information-circle-outline', label: 'Giới thiệu ứng dụng', route: '/profile/about'},
    ];

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                {/* Header user info */}
                <View style={styles.header}>
                    <Image
                        source={require('@/assets/images/auto-care-logo.png')}
                        style={styles.avatar}
                        resizeMode="contain"
                    />
                    <View style={{alignItems: 'center'}}>
                        <ThemedText type="title" style={{color: colors.text}}>
                            HUFI
                        </ThemedText>
                        <ThemedText style={{color: colors.mutedText}}>ID: #AC12345</ThemedText>
                    </View>
                </View>

                {/* Settings list */}
                <View style={[styles.section, {backgroundColor: colors.surface}]}>
                    {settings.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.item, {borderBottomColor: colors.border}]}
                            activeOpacity={0.7}
                            onPress={() => router.push(item.route)}
                        >
                            <View style={styles.itemLeft}>
                                <Ionicons name={item.icon as any} size={22} color={colors.primary}/>
                                <ThemedText style={[styles.itemLabel, {color: colors.text}]}>
                                    {item.label}
                                </ThemedText>
                            </View>
                            <Ionicons name="chevron-forward-outline" size={18} color={colors.mutedText}/>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout */}
                <TouchableOpacity
                    style={[styles.logoutBtn, {backgroundColor: colors.error || '#E53935'}]}
                    activeOpacity={0.8}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={20} color="#fff" style={{marginRight: 6}}/>
                    <ThemedText style={{color: '#fff', fontWeight: '600'}}>Đăng xuất</ThemedText>
                </TouchableOpacity>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        marginBottom: 12,
        borderRadius: 50,
    },
    section: {
        borderRadius: 12,
        marginHorizontal: 16,
        overflow: 'hidden',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    itemLabel: {
        fontSize: 15,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 10,
    },
});
