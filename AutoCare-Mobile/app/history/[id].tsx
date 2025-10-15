import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {Ionicons} from '@expo/vector-icons';
import {useLocalSearchParams, useRouter} from 'expo-router';

export default function BookingDetailScreen() {
    const {colors} = useTheme();
    const router = useRouter();
    const {id} = useLocalSearchParams<{ id: string }>();

    // ✅ dữ liệu mẫu giả lập (bạn có thể sau này fetch theo id)
    const details = {
        id,
        service: 'Thay nhớt động cơ',
        datetime: '12/10/2025 - 14:00',
        cost: '450.000đ',
        payment: 'Tiền mặt',
        status: 'Hoàn thành',
        note: 'Thay nhớt Shell Helix Ultra, kiểm tra lọc gió và vệ sinh động cơ.',
    };

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
            {/* Tiêu đề */}
            <ThemedText type="title" style={{color: colors.primary, marginBottom: 16}}>
                Chi tiết đơn đặt lịch
            </ThemedText>

            {/* Dòng dịch vụ + trạng thái */}
            <View style={[styles.rowBetween, {marginBottom: 12}]}>
                <ThemedText type="defaultSemiBold" style={{color: colors.text, fontSize: 16}}>
                    {details.service}
                </ThemedText>
                <View style={styles.statusContainer}>
                    <Ionicons
                        name={getStatusIcon(details.status) as any}
                        size={18}
                        color={getStatusColor(details.status)}
                        style={{marginRight: 4}}
                    />
                    <ThemedText
                        style={{
                            color: getStatusColor(details.status),
                            fontWeight: '600',
                            fontSize: 13,
                        }}
                    >
                        {details.status}
                    </ThemedText>
                </View>
            </View>

            {/* Thời gian */}
            <ThemedText style={{color: colors.mutedText, marginBottom: 8}}>
                🗓 {details.datetime}
            </ThemedText>

            {/* Phí dịch vụ */}
            <ThemedText style={{color: colors.text, marginBottom: 4}}>
                💰 Phí dịch vụ:{' '}
                <ThemedText type="defaultSemiBold" style={{color: colors.primary}}>
                    {details.cost}
                </ThemedText>
            </ThemedText>

            {/* Phương thức thanh toán */}
            <ThemedText style={{color: colors.text, marginBottom: 12}}>
                💳 Thanh toán: {details.payment}
            </ThemedText>

            {/* Ghi chú */}
            <View
                style={[
                    styles.noteBox,
                    {backgroundColor: colors.surface, borderColor: colors.border},
                ]}
            >
                <ThemedText
                    type="defaultSemiBold"
                    style={{color: colors.text, marginBottom: 6}}
                >
                    Ghi chú
                </ThemedText>
                <ThemedText style={{color: colors.mutedText, lineHeight: 20}}>
                    {details.note}
                </ThemedText>
            </View>

            {/* Nút đặt lại */}
            <TouchableOpacity
                style={[styles.rebookBtn, {backgroundColor: colors.primary}]}
                activeOpacity={0.85}
                onPress={() => router.push('/services')}
            >
                <Ionicons name="repeat-outline" size={20} color="#fff"/>
                <ThemedText style={{color: '#fff', fontWeight: '600', marginLeft: 6}}>
                    Đặt lại dịch vụ này
                </ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    noteBox: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
    },
    rebookBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: 14,
        marginTop: 24,
    },
});
