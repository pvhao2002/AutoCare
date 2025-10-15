import React, {useEffect, useState} from 'react';
import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {
    StyleSheet, TouchableOpacity, Image, View, ScrollView,
    Pressable,
    Platform,
    Animated
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";

export default function ServicesScreen() {
    const {colors} = useTheme();
    const router = useRouter();

    const services = [
        {
            id: 1,
            name: 'Thay nhớt động cơ',
            desc: 'Giúp động cơ vận hành êm ái, tiết kiệm nhiên liệu hơn.',
            price: 300000,
            image: require('@/assets/images/react-logo.png'),
        },
        {
            id: 2,
            name: 'Rửa xe toàn bộ',
            desc: 'Làm sạch nội – ngoại thất, đánh bóng bề mặt sơn.',
            price: 150000,
            image: require('@/assets/images/react-logo.png'),
        },
        {
            id: 3,
            name: 'Kiểm tra phanh',
            desc: 'Đảm bảo an toàn khi di chuyển, phát hiện hao mòn phanh.',
            price: 200000,
            image: require('@/assets/images/react-logo.png'),
        },
        {
            id: 4,
            name: 'Cân chỉnh lốp',
            desc: 'Tăng tuổi thọ lốp, tiết kiệm nhiên liệu và vận hành ổn định.',
            price: 250000,
            image: require('@/assets/images/react-logo.png'),
        },
        {
            id: 5,
            name: 'Thay ắc quy',
            desc: 'Thay ắc quy mới, kiểm tra hệ thống điện toàn xe.',
            price: 1200000,
            image: require('@/assets/images/react-logo.png'),
        },
    ];
    const [selected, setSelected] = useState<number[]>([]);
    const [slideAnim] = useState(new Animated.Value(100));
    const toggleSelect = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const handleCheckout = () => {
        const selectedItems = services.filter((s) => selected.includes(s.id));
        router.push({
            pathname: '/services/checkout',
            params: {
                items: JSON.stringify(selectedItems),
            },
        });
    };

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: selected.length > 0 ? 0 : 100,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [selected, slideAnim]);
    
    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <ThemedText type="title" style={{color: colors.primary, marginBottom: 16}}>
                Dịch vụ bảo dưỡng
            </ThemedText>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 120}}>
                {services.map((item) => {
                    const isSelected = selected.includes(item.id);
                    return (
                        <View
                            key={item.id}
                            style={[
                                styles.card,
                                {backgroundColor: colors.surface, borderColor: colors.border},
                            ]}
                        >
                            <Image source={item.image} style={styles.image} resizeMode="cover"/>

                            <View style={styles.cardContent}>
                                <ThemedText type="defaultSemiBold" style={{color: colors.text, fontSize: 16}}>
                                    {item.name}
                                </ThemedText>
                                <ThemedText
                                    style={{
                                        color: colors.mutedText,
                                        fontSize: 13,
                                        marginTop: 2,
                                        marginBottom: 6,
                                    }}
                                >
                                    {item.desc}
                                </ThemedText>
                                <View style={styles.row}>
                                    <ThemedText type="defaultSemiBold" style={{color: colors.primary, fontSize: 15}}>
                                        {item.price.toLocaleString()}đ
                                    </ThemedText>

                                    <TouchableOpacity
                                        style={[
                                            styles.button,
                                            {
                                                backgroundColor: isSelected ? colors.primary : colors.surface,
                                                borderColor: colors.primary,
                                                borderWidth: 1,
                                            },
                                        ]}
                                        activeOpacity={0.8}
                                        onPress={() => toggleSelect(item.id)}
                                    >
                                        <ThemedText
                                            style={{
                                                color: isSelected ? '#fff' : colors.primary,
                                                fontWeight: '600',
                                                fontSize: 13,
                                            }}
                                        >
                                            {isSelected ? 'Đã chọn' : 'Thêm vào giỏ'}
                                        </ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>

            {/* Thanh đặt lịch chung */}
            {selected.length > 0 && (
                <TouchableOpacity
                    style={[styles.cartBar, {backgroundColor: colors.primary}]}
                    activeOpacity={0.85}
                    onPress={handleCheckout}
                >
                    <Ionicons name="calendar-outline" size={20} color="#fff" style={{marginRight: 6}}/>
                    <ThemedText style={{color: '#fff', fontWeight: '600'}}>
                        Đặt {selected.length} dịch vụ ({services
                        .filter((s) => selected.includes(s.id))
                        .reduce((sum, s) => sum + s.price, 0)
                        .toLocaleString()}đ)
                    </ThemedText>
                </TouchableOpacity>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    card: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 14,
        overflow: 'hidden',
    },
    image: {
        width: 100,
        height: 100,
    },
    cardContent: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    cartBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
