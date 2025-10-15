import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView,
} from 'react-native';
import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {useRouter} from 'expo-router';

export default function ProfileEditScreen() {
    const {colors} = useTheme();
    const router = useRouter();

    const [avatar, setAvatar] = useState(require('@/assets/images/auto-care-logo.png'));
    const [name, setName] = useState('Nguyễn van A');
    const [email, setEmail] = useState('user@email.com');
    const [phone, setPhone] = useState('0909 123 456');
    const [address, setAddress] = useState('TP. Hồ Chí Minh');

    // Chọn ảnh đại diện
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets.length > 0) {
            setAvatar({uri: result.assets[0].uri});
        }
    };

    // Lưu thay đổi
    const handleSave = () => {
        Alert.alert('✅ Cập nhật thành công', 'Thông tin cá nhân của bạn đã được lưu.');
        router.back();
    };

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <ScrollView contentContainerStyle={{padding: 20}}>
                {/* Avatar */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                        <Image
                            source={avatar}
                            style={[styles.avatar, {borderColor: colors.primary}]}
                            resizeMode="cover"
                        />
                        <View style={[styles.cameraIcon, {backgroundColor: colors.primary}]}>
                            <Ionicons name="camera-outline" size={16} color="#fff"/>
                        </View>
                    </TouchableOpacity>
                    <ThemedText type="title" style={{color: colors.text, marginTop: 12}}>
                        Chỉnh sửa hồ sơ
                    </ThemedText>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <ThemedText type="defaultSemiBold" style={[styles.label, {color: colors.text}]}>
                        Họ và tên
                    </ThemedText>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={[styles.input, {borderColor: colors.border, color: colors.text}]}
                        placeholder="Nhập họ và tên"
                        placeholderTextColor={colors.mutedText}
                    />

                    <ThemedText type="defaultSemiBold" style={[styles.label, {color: colors.text}]}>
                        Email
                    </ThemedText>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={[styles.input, {borderColor: colors.border, color: colors.text}]}
                        placeholder="Nhập email"
                        placeholderTextColor={colors.mutedText}
                        keyboardType="email-address"
                    />

                    <ThemedText type="defaultSemiBold" style={[styles.label, {color: colors.text}]}>
                        Số điện thoại
                    </ThemedText>
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        style={[styles.input, {borderColor: colors.border, color: colors.text}]}
                        placeholder="Nhập số điện thoại"
                        placeholderTextColor={colors.mutedText}
                        keyboardType="phone-pad"
                    />

                    <ThemedText type="defaultSemiBold" style={[styles.label, {color: colors.text}]}>
                        Địa chỉ
                    </ThemedText>
                    <TextInput
                        value={address}
                        onChangeText={setAddress}
                        style={[styles.input, {borderColor: colors.border, color: colors.text}]}
                        placeholder="Nhập địa chỉ"
                        placeholderTextColor={colors.mutedText}
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={[styles.saveBtn, {backgroundColor: colors.primary}]}
                    activeOpacity={0.9}
                    onPress={handleSave}
                >
                    <Ionicons name="save-outline" size={20} color="#fff"/>
                    <ThemedText style={{color: '#fff', fontWeight: '600', marginLeft: 8}}>
                        Lưu thay đổi
                    </ThemedText>
                </TouchableOpacity>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1},
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 65,
        borderWidth: 3,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    form: {
        marginTop: 10,
    },
    label: {
        fontSize: 14,
        marginTop: 16,
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 14,
    },
    saveBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 14,
        marginTop: 30,
    },
});
