import React, {useState} from 'react';
import {Image, Modal, Platform, Pressable, StyleSheet, TouchableOpacity, View,} from 'react-native';
import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {useLocalSearchParams, useRouter} from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Ionicons} from '@expo/vector-icons';


export default function CheckoutScreen() {
    const {colors} = useTheme();
    const router = useRouter();
    const {items} = useLocalSearchParams<{ items: string }>();
    const selected = JSON.parse(items || '[]');

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [payment, setPayment] = useState<'cash' | 'wallet' | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const total = selected.reduce((sum: number, s: any) => sum + s.price, 0);

    const onChange = (_: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') setShowPicker(false);
        if (selectedDate) setDate(selectedDate);
    };

    const confirmBooking = () => {
        if (!payment) {
            alert('⚠️ Vui lòng chọn phương thức thanh toán!');
            return;
        }
        setShowSuccess(true);
    };

    const handleFinish = () => {
        setShowSuccess(false);
        router.replace('/'); // quay về Trang chủ
    };

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <ThemedText type="title" style={{color: colors.primary, marginBottom: 16}}>
                Xác nhận đặt lịch
            </ThemedText>

            {/* Danh sách dịch vụ */}
            {selected.map((s: any) => (
                <View
                    key={s.id}
                    style={[
                        styles.item,
                        {backgroundColor: colors.surface, borderColor: colors.border},
                    ]}
                >
                    <Image source={s.image} style={styles.image}/>
                    <View style={{flex: 1}}>
                        <ThemedText type="defaultSemiBold" style={{color: colors.text}}>
                            {s.name}
                        </ThemedText>
                        <ThemedText style={{color: colors.primary, marginTop: 4}}>
                            {s.price.toLocaleString()}đ
                        </ThemedText>
                    </View>
                </View>
            ))}

            <ThemedText
                type="defaultSemiBold"
                style={{
                    color: colors.primary,
                    marginTop: 16,
                    marginBottom: 8,
                    fontSize: 16,
                }}
            >
                Tổng cộng: {total.toLocaleString()}đ
            </ThemedText>

            {/* Chọn ngày giờ */}
            <TouchableOpacity
                style={[styles.dateButton, {borderColor: colors.border}]}
                onPress={() => setShowPicker(true)}
                activeOpacity={0.8}
            >
                <ThemedText style={{color: colors.text}}>
                    🗓 {date.toLocaleDateString()} — ⏰{' '}
                    {date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </ThemedText>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="datetime"
                    display={'default'}
                    onChange={onChange}
                    minimumDate={new Date()}
                />
            )}

            {/* Phương thức thanh toán */}
            <View style={{marginTop: 20}}>
                <ThemedText type="defaultSemiBold" style={{color: colors.text, marginBottom: 8}}>
                    Chọn phương thức thanh toán
                </ThemedText>
                <View style={styles.paymentRow}>
                    <Pressable
                        style={[
                            styles.paymentButton,
                            {
                                borderColor: payment === 'cash' ? colors.primary : colors.border,
                                backgroundColor:
                                    payment === 'cash' ? colors.primary + '22' : colors.surface,
                            },
                        ]}
                        onPress={() => setPayment('cash')}
                    >
                        <Ionicons name="cash-outline" size={20} color={colors.primary}/>
                        <ThemedText style={{marginLeft: 8, color: colors.text}}>Tiền mặt</ThemedText>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.paymentButton,
                            {
                                borderColor: payment === 'wallet' ? colors.primary : colors.border,
                                backgroundColor:
                                    payment === 'wallet' ? colors.primary + '22' : colors.surface,
                            },
                        ]}
                        onPress={() => setPayment('wallet')}
                    >
                        <Ionicons name="wallet-outline" size={20} color={colors.primary}/>
                        <ThemedText style={{marginLeft: 8, color: colors.text}}>Ví điện tử</ThemedText>
                    </Pressable>
                </View>
            </View>

            {/* Nút xác nhận */}
            <TouchableOpacity
                style={[styles.confirmButton, {backgroundColor: colors.primary}]}
                activeOpacity={0.85}
                onPress={confirmBooking}
            >
                <ThemedText style={{color: '#fff', fontWeight: '600', fontSize: 15}}>
                    Xác nhận đặt lịch
                </ThemedText>
            </TouchableOpacity>

            {/* Modal thành công */}
            <Modal
                visible={showSuccess}
                transparent
                animationType="fade"
                statusBarTranslucent
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, {backgroundColor: colors.surface}]}>
                        <Ionicons
                            name="checkmark-circle"
                            size={64}
                            color={colors.primary}
                            style={{marginBottom: 12}}
                        />
                        <ThemedText
                            type="title"
                            style={{color: colors.text, marginBottom: 6, textAlign: 'center'}}
                        >
                            Đặt lịch thành công!
                        </ThemedText>
                        <ThemedText
                            style={{
                                color: colors.mutedText,
                                textAlign: 'center',
                                marginBottom: 20,
                            }}
                        >
                            Hẹn gặp bạn vào ngày{' '}
                            {date.toLocaleDateString()} lúc{' '}
                            {date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}.
                        </ThemedText>
                        <TouchableOpacity
                            style={[styles.doneButton, {backgroundColor: colors.primary}]}
                            onPress={handleFinish}
                            activeOpacity={0.8}
                        >
                            <ThemedText style={{color: '#fff', fontWeight: '600'}}>Xong</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 10,
    },
    dateButton: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginTop: 12,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paymentButton: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    confirmButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: 14,
        marginTop: 24,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000099',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        width: '90%',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
    },
    doneButton: {
        marginTop: 10,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 24,
    },
});
