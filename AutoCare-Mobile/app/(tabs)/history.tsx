import React from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';
import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';

export default function HistoryScreen() {
    const {colors} = useTheme();
    const router = useRouter();

    const bookings = [
        {
            id: '1',
            service: 'Thay nhớt động cơ',
            datetime: '12/10/2025 - 14:00',
            cost: '450.000đ',
            payment: 'Tiền mặt',
            status: 'Hoàn thành',
        },
        {
            id: '2',
            service: 'Cân chỉnh lốp',
            datetime: '02/10/2025 - 09:30',
            cost: '300.000đ',
            payment: 'Ví điện tử',
            status: 'Đang xử lý',
        },
        {
            id: '3',
            service: 'Rửa xe toàn bộ',
            datetime: '25/09/2025 - 16:45',
            cost: '200.000đ',
            payment: 'Tiền mặt',
            status: 'Đã hủy',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Hoàn thành':
                return '#10b981';
            case 'Đang xử lý':
                return '#f59e0b';
            case 'Đã hủy':
                return '#ef4444';
            default:
                return colors.text;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Hoàn thành':
                return 'checkmark-circle-outline';
            case 'Đang xử lý':
                return 'time-outline';
            case 'Đã hủy':
                return 'close-circle-outline';
            default:
                return 'help-circle-outline';
        }
    };

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <ThemedText type="title" style={{color: colors.primary, marginBottom: 12}}>
                Lịch sử đặt lịch dịch vụ
            </ThemedText>

            <FlatList
                data={bookings}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{paddingBottom: 80}}
                renderItem={({item}) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => router.push({
                            pathname: '/history/[id]',
                            params: {id: item.id},
                        })}
                        style={[
                            styles.card,
                            {backgroundColor: colors.surface, borderColor: colors.border},
                        ]}
                    >
                        <View style={styles.rowBetween}>
                            <ThemedText
                                type="defaultSemiBold"
                                style={{color: colors.text, fontSize: 16}}
                            >
                                {item.service}
                            </ThemedText>
                            <View style={styles.statusContainer}>
                                <Ionicons
                                    name={getStatusIcon(item.status) as any}
                                    size={18}
                                    color={getStatusColor(item.status)}
                                    style={{marginRight: 4}}
                                />
                                <ThemedText
                                    style={{
                                        color: getStatusColor(item.status),
                                        fontWeight: '600',
                                        fontSize: 13,
                                    }}
                                >
                                    {item.status}
                                </ThemedText>
                            </View>
                        </View>

                        <ThemedText
                            style={{
                                color: colors.mutedText,
                                marginTop: 4,
                                fontSize: 13,
                            }}
                        >
                            🗓 {item.datetime}
                        </ThemedText>

                        <View style={styles.rowBetween}>
                            <ThemedText
                                style={{
                                    color: colors.text,
                                    marginTop: 6,
                                    fontSize: 13,
                                }}
                            >
                                💰 Phí dịch vụ:{' '}
                                <ThemedText type="defaultSemiBold" style={{color: colors.primary}}>
                                    {item.cost}
                                </ThemedText>
                            </ThemedText>

                            <ThemedText
                                style={{
                                    color: colors.mutedText,
                                    marginTop: 6,
                                    fontSize: 13,
                                }}
                            >
                                💳 {item.payment}
                            </ThemedText>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginBottom: 12,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
