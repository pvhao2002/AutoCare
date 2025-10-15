import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from "expo-router";

export default function ProfileDetailsScreen() {
    const {colors} = useTheme();
    const router = useRouter();
    const info = [
        {icon: 'call-outline', label: 'Số điện thoại', value: '0909 123 456'},
        {icon: 'home-outline', label: 'Địa chỉ', value: 'TP. Hồ Chí Minh'},
        {icon: 'calendar-outline', label: 'Tham gia từ', value: '2024'},
    ];

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 40}}
            >
                {/* Header */}
                <View style={[styles.header, {backgroundColor: colors.primary + '15'}]}>
                    <Image
                        source={require('@/assets/images/auto-care-logo.png')}
                        style={[styles.avatar, {borderColor: colors.primary}]}
                        resizeMode="cover"
                    />
                    <ThemedText type="title" style={{color: colors.text, marginTop: 10}}>
                        Nguyễn Van A
                    </ThemedText>
                    <ThemedText style={{color: colors.mutedText}}>user@email.com</ThemedText>

                    <TouchableOpacity
                        style={[styles.editBtn, {borderColor: colors.primary}]}
                        activeOpacity={0.8}
                        onPress={() => router.push('/profile/edit')}
                    >
                        <Ionicons name="create-outline" size={16} color={colors.primary}/>
                        <ThemedText
                            style={{
                                color: colors.primary,
                                marginLeft: 6,
                                fontWeight: '600',
                                fontSize: 13,
                            }}
                        >
                            Chỉnh sửa
                        </ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Body info */}
                <View style={{paddingHorizontal: 20, marginTop: 16}}>
                    {info.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.infoRow,
                                {
                                    borderBottomColor:
                                        index === info.length - 1 ? 'transparent' : colors.border,
                                },
                            ]}
                        >
                            <View style={styles.iconBox}>
                                <Ionicons name={item.icon as any} size={20} color={colors.primary}/>
                            </View>
                            <View style={{flex: 1}}>
                                <ThemedText
                                    type="defaultSemiBold"
                                    style={{color: colors.text, fontSize: 14}}
                                >
                                    {item.label}
                                </ThemedText>
                                <ThemedText style={{color: colors.mutedText, marginTop: 2}}>
                                    {item.value}
                                </ThemedText>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1},
    header: {
        alignItems: 'center',
        paddingVertical: 36,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
    },
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
    },
    iconBox: {
        width: 34,
        height: 34,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
});
