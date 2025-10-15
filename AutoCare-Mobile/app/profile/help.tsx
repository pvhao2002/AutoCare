import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {StyleSheet, Linking, TouchableOpacity} from 'react-native';

export default function HelpScreen() {
    const {colors} = useTheme();

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <ThemedText type="title" style={{color: colors.text, marginBottom: 20}}>
                Trung tâm hỗ trợ
            </ThemedText>

            <ThemedText style={{color: colors.text}}>
                Nếu bạn gặp sự cố khi sử dụng ứng dụng, vui lòng liên hệ:
            </ThemedText>

            <TouchableOpacity
                onPress={() => Linking.openURL('mailto:support@autocare.vn')}
                activeOpacity={0.7}
            >
                <ThemedText style={[styles.link, {color: colors.primary}]}>
                    ✉️ support@autocare.vn
                </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => Linking.openURL('tel:+84909123456')}
                activeOpacity={0.7}
            >
                <ThemedText style={[styles.link, {color: colors.primary}]}>
                    📞 0909 123 456
                </ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    link: {marginTop: 8, fontWeight: '600'},
});
