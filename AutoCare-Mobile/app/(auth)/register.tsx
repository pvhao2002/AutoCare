import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    Image,
    View,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Link, useRouter } from 'expo-router';

export default function RegisterScreen() {
    const { colors, fonts, isDark } = useTheme();
    const router = useRouter();

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const handleRegister = () => {
        const { fullName, email, phone, password, confirmPassword } = form;
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
            return;
        }

        Alert.alert('Thành công', 'Tài khoản của bạn đã được tạo!');
        router.replace('/(auth)/login');
    };

    return (
        <ThemedView style={[styles.root, { backgroundColor: colors.background }]}>
            {/* Decorative gear image */}
            <Image
                source={require('@/assets/images/garage-bg.jpg')}
                style={[StyleSheet.absoluteFillObject, { opacity: 0.07 }]}
                resizeMode="cover"
            />

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: colors.surface,
                            shadowColor: isDark ? '#000' : '#1976D2',
                        },
                    ]}
                >
                    <Image
                        source={require('@/assets/images/auto-care-logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <ThemedText
                        type="title"
                        style={[
                            styles.title,
                            { color: colors.primary, fontFamily: fonts.rounded },
                        ]}
                    >
                        Đăng ký AutoCare
                    </ThemedText>

                    <ThemedText
                        style={[
                            styles.subtitle,
                            { color: colors.mutedText, fontFamily: fonts.sans },
                        ]}
                    >
                        Tạo tài khoản để đặt lịch bảo dưỡng, theo dõi xe và nhận ưu đãi.
                    </ThemedText>

                    {/** Form inputs */}
                    <TextInput
                        style={[
                            styles.input,
                            {
                                borderColor: colors.border,
                                backgroundColor: colors.background,
                                color: colors.text,
                                fontFamily: fonts.sans,
                            },
                        ]}
                        placeholder="Họ và tên"
                        placeholderTextColor={colors.mutedText}
                        value={form.fullName}
                        onChangeText={(v) => handleChange('fullName', v)}
                    />

                    <TextInput
                        style={[
                            styles.input,
                            {
                                borderColor: colors.border,
                                backgroundColor: colors.background,
                                color: colors.text,
                            },
                        ]}
                        placeholder="Email"
                        placeholderTextColor={colors.mutedText}
                        keyboardType="email-address"
                        value={form.email}
                        onChangeText={(v) => handleChange('email', v)}
                    />

                    <TextInput
                        style={[
                            styles.input,
                            {
                                borderColor: colors.border,
                                backgroundColor: colors.background,
                                color: colors.text,
                            },
                        ]}
                        placeholder="Số điện thoại"
                        placeholderTextColor={colors.mutedText}
                        keyboardType="phone-pad"
                        value={form.phone}
                        onChangeText={(v) => handleChange('phone', v)}
                    />

                    <TextInput
                        style={[
                            styles.input,
                            {
                                borderColor: colors.border,
                                backgroundColor: colors.background,
                                color: colors.text,
                            },
                        ]}
                        placeholder="Mật khẩu"
                        placeholderTextColor={colors.mutedText}
                        secureTextEntry
                        value={form.password}
                        onChangeText={(v) => handleChange('password', v)}
                    />

                    <TextInput
                        style={[
                            styles.input,
                            {
                                borderColor: colors.border,
                                backgroundColor: colors.background,
                                color: colors.text,
                            },
                        ]}
                        placeholder="Xác nhận mật khẩu"
                        placeholderTextColor={colors.mutedText}
                        secureTextEntry
                        value={form.confirmPassword}
                        onChangeText={(v) => handleChange('confirmPassword', v)}
                    />

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        activeOpacity={0.9}
                        onPress={handleRegister}
                    >
                        <ThemedText
                            type="defaultSemiBold"
                            style={[styles.buttonText, { color: '#fff' }]}
                        >
                            Đăng ký ngay
                        </ThemedText>
                    </TouchableOpacity>

                    <Link href="/login" asChild>
                        <TouchableOpacity>
                            <ThemedText
                                type="link"
                                style={{
                                    color: colors.accent,
                                    marginTop: 18,
                                    textAlign: 'center',
                                    fontFamily: fonts.sans,
                                }}
                            >
                                Đã có tài khoản? Đăng nhập
                            </ThemedText>
                        </TouchableOpacity>
                    </Link>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 40,
    },
    card: {
        borderRadius: 20,
        paddingVertical: 28,
        paddingHorizontal: 22,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 6,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 15,
        marginBottom: 14,
    },
    button: {
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 6,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
