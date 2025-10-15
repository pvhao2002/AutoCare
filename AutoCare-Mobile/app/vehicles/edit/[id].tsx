import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {useLocalSearchParams} from 'expo-router';

export default function EditVehicleScreen() {
    const {id} = useLocalSearchParams();
    const {colors} = useTheme();

    // Giả lập dữ liệu hiện có
    const [name, setName] = useState('Toyota Vios 2020');
    const [plate, setPlate] = useState('51A-123.45');
    const [color, setColor] = useState('Trắng');

    const handleSave = () => {
        console.log('Cập nhật xe:', {id, name, plate, color});
        // TODO: Gọi API cập nhật xe
    };

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <ThemedText type="title" style={{color: colors.text, marginBottom: 20}}>
                Chỉnh sửa xe
            </ThemedText>

            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Tên xe"
                placeholderTextColor={colors.mutedText}
                style={[styles.input, {borderColor: colors.border, color: colors.text}]}
            />
            <TextInput
                value={plate}
                onChangeText={setPlate}
                placeholder="Biển số"
                placeholderTextColor={colors.mutedText}
                style={[styles.input, {borderColor: colors.border, color: colors.text}]}
            />
            <TextInput
                value={color}
                onChangeText={setColor}
                placeholder="Màu xe"
                placeholderTextColor={colors.mutedText}
                style={[styles.input, {borderColor: colors.border, color: colors.text}]}
            />

            <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.primary}]}
                activeOpacity={0.8}
                onPress={handleSave}
            >
                <ThemedText style={{color: '#fff', fontWeight: '600'}}>Lưu thay đổi</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 14,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 10,
    },
});
