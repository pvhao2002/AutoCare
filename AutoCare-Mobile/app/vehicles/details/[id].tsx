import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useLocalSearchParams, useRouter} from 'expo-router';

export default function VehicleDetailsScreen() {
    const {id} = useLocalSearchParams();
    const {colors} = useTheme();
    const router = useRouter();

    // ⚙️ Dữ liệu giả lập (bạn có thể fetch API theo id sau này)
    const car = {
        id,
        name: 'Toyota Vios 2020',
        plate: '51A-123.45',
        type: 'Sedan',
        color: 'Trắng',
        mileage: '45,000 km',
        lastService: '06/2025',
    };

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <View style={[styles.card, {backgroundColor: colors.surface, borderColor: colors.border}]}>
                <ThemedText type="title" style={{color: colors.primary, marginBottom: 10}}>
                    {car.name}
                </ThemedText>
                <ThemedText style={{color: colors.text}}>Biển số: {car.plate}</ThemedText>
                <ThemedText style={{color: colors.text}}>Loại xe: {car.type}</ThemedText>
                <ThemedText style={{color: colors.text}}>Màu sắc: {car.color}</ThemedText>
                <ThemedText style={{color: colors.text}}>Số km: {car.mileage}</ThemedText>
                <ThemedText style={{color: colors.text}}>Bảo dưỡng gần nhất: {car.lastService}</ThemedText>
            </View>

            <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.primary}]}
                onPress={() => router.push({ pathname: '/vehicles/edit/[id]', params: { id: car.id as string } })}
                activeOpacity={0.8}
            >
                <Ionicons name="create-outline" size={20} color="#fff" style={{marginRight: 6}}/>
                <ThemedText style={{color: '#fff', fontWeight: '600'}}>Chỉnh sửa</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    card: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 10,
    },
});
