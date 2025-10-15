import React, {useState} from 'react';
import {Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {Link, useRouter} from 'expo-router';
import {loginUser} from '@/hooks/useAuth';


export default function LoginScreen() {
    const {colors, fonts} = useTheme();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Vui lòng nhập email và mật khẩu');
            return;
        }

        // TODO: validate via API call
        // Example:
        // const res = await fetch('/api/login', { ... });
        // const token = res.token;
        const fakeToken = 'autocare123';
        await loginUser(fakeToken);
        router.replace('/(tabs)');
    };

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <Image
                source={require('@/assets/images/auto-care-logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <ThemedText type="title" style={[styles.title, {color: colors.primary, fontFamily: fonts.rounded}]}>
                AutoCare Login
            </ThemedText>

            <TextInput
                style={[
                    styles.input,
                    {backgroundColor: colors.surface, color: colors.text, borderColor: colors.border},
                ]}
                placeholder="Email hoặc Số điện thoại"
                placeholderTextColor={colors.mutedText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={[
                    styles.input,
                    {backgroundColor: colors.surface, color: colors.text, borderColor: colors.border},
                ]}
                placeholder="Mật khẩu"
                placeholderTextColor={colors.mutedText}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.primary}]}
                onPress={handleLogin}
                activeOpacity={0.8}
            >
                <ThemedText type="defaultSemiBold" style={[styles.buttonText, {color: '#fff'}]}>
                    Đăng nhập
                </ThemedText>
            </TouchableOpacity>

            <Link href="/forgot-password" asChild>
                <TouchableOpacity>
                    <ThemedText
                        type="link"
                        style={{color: colors.accent, marginTop: 16, fontFamily: fonts.sans}}
                    >
                        Quên mật khẩu?
                    </ThemedText>
                </TouchableOpacity>
            </Link>

            <Link href="/register" asChild>
                <TouchableOpacity>
                    <ThemedText
                        type="link"
                        style={{color: colors.primary, marginTop: 8, fontFamily: fonts.sans}}
                    >
                        Tạo tài khoản mới
                    </ThemedText>
                </TouchableOpacity>
            </Link>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    logo: {
        width: 160,
        height: 160,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 14,
    },
    button: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
