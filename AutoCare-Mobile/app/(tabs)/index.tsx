import React from 'react';
import {StyleSheet, Image, TouchableOpacity, View, ScrollView} from 'react-native';
import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';

export default function HomeScreen() {
    const {colors} = useTheme();
    const router = useRouter();

    const shortcuts = [
        {
            id: 1,
            icon: 'car-outline',
            label: 'Xe của tôi',
            route: '/vehicles',
            color: '#3b82f6',
        },
        {
            id: 2,
            icon: 'construct-outline',
            label: 'Đặt dịch vụ',
            route: '/services',
            color: '#10b981',
        },
        {
            id: 3,
            icon: 'time-outline',
            label: 'Lịch sử',
            route: '/history',
            color: '#f59e0b',
        },
        {
            id: 4,
            icon: 'help-circle-outline',
            label: 'Hỗ trợ',
            route: '/profile/help',
            color: '#ef4444',
        },
    ];

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 60}}
            >
                {/* Header logo */}
                <View style={styles.header}>
                    <Image
                        source={require('@/assets/images/auto-care-logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View>
                        <ThemedText type="title" style={{color: colors.primary}}>
                            AutoCare
                        </ThemedText>
                        <ThemedText
                            style={{color: colors.mutedText, fontSize: 13, marginTop: 2}}
                        >
                            Dịch vụ chăm sóc xe toàn diện 🚗✨
                        </ThemedText>
                    </View>
                </View>

                {/* Banner chào */}
                <View
                    style={[
                        styles.banner,
                        {backgroundColor: colors.surface, borderColor: colors.border},
                    ]}
                >
                    <ThemedText type="defaultSemiBold" style={{color: colors.text, fontSize: 18}}>
                        Xin chào 👋
                    </ThemedText>
                    <ThemedText style={{color: colors.mutedText, marginTop: 4}}>
                        Hãy cùng AutoCare chăm sóc chiếc xe của bạn thật tốt hôm nay nhé!
                    </ThemedText>
                </View>

                {/* Quick actions */}
                <ThemedText
                    type="defaultSemiBold"
                    style={{
                        color: colors.text,
                        fontSize: 16,
                        marginTop: 16,
                        marginBottom: 10,
                    }}
                >
                    Tính năng nhanh
                </ThemedText>

                <View style={styles.grid}>
                    {shortcuts.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.card,
                                {backgroundColor: colors.surface, borderColor: colors.border},
                            ]}
                            activeOpacity={0.8}
                            onPress={() => router.push(item.route as any)}
                        >
                            <View
                                style={[
                                    styles.iconBox,
                                    {backgroundColor: item.color + '22', borderColor: item.color},
                                ]}
                            >
                                <Ionicons name={item.icon as any} size={28} color={item.color}/>
                            </View>
                            <ThemedText
                                type="defaultSemiBold"
                                style={{color: colors.text, marginTop: 8, fontSize: 14}}
                            >
                                {item.label}
                            </ThemedText>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Promo / tip section */}
                <View
                    style={[
                        styles.tipBox,
                        {backgroundColor: colors.primary + '15', borderColor: colors.primary},
                    ]}
                >
                    <Ionicons name="bulb-outline" size={24} color={colors.primary}/>
                    <ThemedText
                        style={{
                            color: colors.text,
                            marginLeft: 8,
                            flex: 1,
                            fontSize: 13,
                            lineHeight: 18,
                        }}
                    >
                        💡 Mẹo: Bạn có thể đặt nhiều dịch vụ cùng lúc và thanh toán một lần trong
                        phần &#34;Đặt dịch vụ&#34;.
                    </ThemedText>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 60,
        height: 60,
        marginRight: 12,
    },
    banner: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        marginBottom: 14,
    },
    iconBox: {
        width: 54,
        height: 54,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tipBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginTop: 12,
    },
});
