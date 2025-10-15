import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Link, useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
    const { colors, fonts } = useTheme();
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleReset = async () => {
        if (!email.trim()) {
            Alert.alert('Thông báo', 'Vui lòng nhập email hoặc số điện thoại.');
            return;
        }
        // TODO: Gọi API reset password thật
        Alert.alert('Thành công', 'Hướng dẫn khôi phục mật khẩu đã được gửi tới email của bạn.');
        router.replace('/(auth)/login');
    };

    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            <ThemedText
                type="title"
                style={[styles.title, { color: colors.primary, fontFamily: fonts.rounded }]}
            >
                Quên mật khẩu
            </ThemedText>

            <ThemedText style={[styles.subtitle, { color: colors.mutedText }]}>
                Nhập email hoặc số điện thoại đã đăng ký để nhận liên kết khôi phục.
            </ThemedText>

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: colors.border,
                        fontFamily: fonts.sans,
                    },
                ]}
                placeholder="Email hoặc số điện thoại"
                placeholderTextColor={colors.mutedText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleReset}
                activeOpacity={0.8}
            >
                <ThemedText
                    type="defaultSemiBold"
                    style={[styles.buttonText, { color: '#fff', fontFamily: fonts.sans }]}
                >
                    Gửi yêu cầu
                </ThemedText>
            </TouchableOpacity>

            <Link href="/login" asChild>
                <TouchableOpacity style={{ marginTop: 20 }}>
                    <ThemedText
                        style={{
                            color: colors.accent,
                            fontFamily: fonts.sans,
                            fontWeight: '500',
                        }}
                    >
                        Quay lại đăng nhập
                    </ThemedText>
                </TouchableOpacity>
            </Link>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
