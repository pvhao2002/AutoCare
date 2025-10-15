import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {StyleSheet, Switch, View} from 'react-native';
import {useState} from 'react';

export default function SecurityScreen() {
    const {colors} = useTheme();
    const [twoFA, setTwoFA] = useState(false);

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <ThemedText type="title" style={{color: colors.text, marginBottom: 16}}>
                Bảo mật & Quyền riêng tư
            </ThemedText>

            <View style={styles.row}>
                <ThemedText style={{color: colors.text}}>Xác thực hai bước</ThemedText>
                <Switch value={twoFA} onValueChange={setTwoFA}/>
            </View>

            <ThemedText style={{color: colors.mutedText, marginTop: 12}}>
                Bật tính năng này để tăng cường bảo mật tài khoản của bạn.
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
});
