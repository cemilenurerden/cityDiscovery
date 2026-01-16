// components/ProfileTabs.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

export type ProfileTab = 'saved' | 'grid';

interface ProfileTabsProps {
    selectedTab: ProfileTab;
    onTabChange: (tab: ProfileTab) => void;
}

export default function ProfileTabs({ selectedTab, onTabChange }: ProfileTabsProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.tab, selectedTab === 'saved' && styles.tabActive]}
                onPress={() => onTabChange('saved')}
            >
                <Feather
                    name="bookmark"
                    size={20}
                    color={selectedTab === 'saved' ? '#3B82F6' : Colors.textSecondary}
                />
                <Text style={[styles.tabText, selectedTab === 'saved' && styles.tabTextActive]}>

                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, selectedTab === 'grid' && styles.tabActive]}
                onPress={() => onTabChange('grid')}
            >
                <Feather
                    name="grid"
                    size={20}
                    color={selectedTab === 'grid' ? '#3B82F6' : Colors.textSecondary}
                />
                <Text style={[styles.tabText, selectedTab === 'grid' && styles.tabTextActive]}>

                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 8,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabActive: {
        borderBottomColor: '#3B82F6',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textSecondary,
    },
    tabTextActive: {
        fontWeight: '600',
        color: '#3B82F6',
    },
});
