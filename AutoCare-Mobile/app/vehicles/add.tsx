import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useState} from 'react';

export default function AddVehicleScreen() {
    const {colors} = useTheme();
    const [name, setName] = useState('');
    const [plate, setPlate] = useState('');

    const handleSave = () => {
        console.log('Xe mới:', {name, plate});
        // TODO: Lưu vào DB hoặc gọi API
    };

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <ThemedText type="title" style={{color: colors.text, marginBottom: 20}}>
                Thêm xe mới
            </ThemedText>

            <TextInput
                placeholder="Tên xe (VD: Toyota Vios 2020)"
                placeholderTextColor={colors.mutedText}
                value={name}
                onChangeText={setName}
                style={[styles.input, {borderColor: colors.border, color: colors.text}]}
            />
            <TextInput
                placeholder="Biển số xe (VD: 51A-123.45)"
                placeholderTextColor={colors.mutedText}
                value={plate}
                onChangeText={setPlate}
                style={[styles.input, {borderColor: colors.border, color: colors.text}]}
            />

            <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.primary}]}
                onPress={handleSave}
                activeOpacity={0.8}
            >
                <ThemedText style={{color: '#fff', fontWeight: '600'}}>Lưu</ThemedText>
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
