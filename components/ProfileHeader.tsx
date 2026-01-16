// components/ProfileHeader.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface ProfileHeaderProps {
    username?: string;
    onSettingsPress?: () => void;
}

export default function ProfileHeader({ username, onSettingsPress }: ProfileHeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.username}>{username || 'Profil'}</Text>
            <TouchableOpacity onPress={onSettingsPress} style={styles.settingsButton}>
                <Feather name="settings" size={24} color={Colors.text} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: Colors.background,
    },
    username: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text,
    },
    settingsButton: {
        padding: 4,
    },
});
