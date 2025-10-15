import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {StyleSheet, Image, View} from 'react-native';

export default function AboutScreen() {
    const {colors} = useTheme();

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <View style={styles.center}>
                <Image
                    source={require('@/assets/images/auto-care-logo.png')}
                    style={{width: 100, height: 100, marginBottom: 10}}
                    resizeMode="contain"
                />
                <ThemedText type="title" style={{color: colors.primary}}>
                    AutoCare
                </ThemedText>
                <ThemedText style={{color: colors.mutedText, marginTop: 4}}>
                    Phiên bản 1.0.0
                </ThemedText>
            </View>

            <View style={{marginTop: 24}}>
                <ThemedText style={{color: colors.text, lineHeight: 22}}>
                    Ứng dụng AutoCare giúp bạn quản lý xe, đặt dịch vụ bảo dưỡng, và theo dõi lịch sử sử dụng
                    dễ dàng. Chúng tôi cam kết mang lại trải nghiệm tốt nhất cho khách hàng.
                </ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    center: {alignItems: 'center'},
});
