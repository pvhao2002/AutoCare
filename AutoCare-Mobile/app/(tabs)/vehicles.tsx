import React from 'react';
import {ThemedView} from '@/components/themed-view';
import {ThemedText} from '@/components/themed-text';
import {useTheme} from '@/hooks/use-theme';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Href, useRouter} from 'expo-router';

export default function VehiclesScreen() {
    const {colors} = useTheme();
    const router = useRouter();

    const cars = [
        {id: '1', name: 'Toyota Vios 2020', plate: '51A-123.45', type: 'Sedan', color: 'Trắng'},
        {id: '2', name: 'Mazda CX-5 2021', plate: '59D-678.90', type: 'SUV', color: 'Đen'},
    ];

    const handleAddVehicle = () => {
        router.push('/vehicles/add');
    };

    const handleOpenDetails = (id: string) => {
        router.push({
            pathname: '/vehicles/details/[id]',
            params: {id},
        });
    };

    return (
        <ThemedView style={[styles.container, {backgroundColor: colors.background}]}>
            <ThemedText type="title" style={{color: colors.primary, marginBottom: 10}}>
                Xe của tôi
            </ThemedText>

            <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={[
                            styles.card,
                            {backgroundColor: colors.surface, borderColor: colors.border},
                        ]}
                        activeOpacity={0.8}
                        onPress={() => handleOpenDetails(item.id)}
                    >
                        <View>
                            <ThemedText type="defaultSemiBold" style={{color: colors.text}}>
                                {item.name}
                            </ThemedText>
                            <ThemedText style={{color: colors.mutedText}}>{item.plate}</ThemedText>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={18} color={colors.mutedText}/>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{paddingBottom: 100}}
            />

            <TouchableOpacity
                style={[styles.fab, {backgroundColor: colors.primary, shadowColor: colors.primary}]}
                activeOpacity={0.9}
                onPress={handleAddVehicle}
            >
                <Ionicons name="add" size={28} color="#fff"/>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        marginTop: 10,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});
