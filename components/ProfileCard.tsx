// components/ProfileCard.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { User, UserStats } from '../domain/entities/User';

interface ProfileCardProps {
    user: User | null;
    stats: UserStats | null;
    onEditPress?: () => void;
}

export default function ProfileCard({ user, stats, onEditPress }: ProfileCardProps) {
    if (!user) return null;

    return (
        <View style={styles.container}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
                {user.avatarUrl ? (
                    <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, styles.avatarPlaceholder]}>
                        <Text style={styles.avatarText}>{user.name?.charAt(0).toUpperCase()}</Text>
                    </View>
                )}
            </View>

            {/* Name & Bio */}
            <Text style={styles.name}>{user.name}</Text>
            {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

            {/* Hashtags */}
            {user.hashtags && user.hashtags.length > 0 && (
                <Text style={styles.hashtags}>{user.hashtags.join(' ')}</Text>
            )}

            {/* Stats */}
            {stats && (
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{stats.favoritesCount}</Text>
                        <Text style={styles.statLabel}>FAVORİLER</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{stats.reviewsCount}</Text>
                        <Text style={styles.statLabel}>YORUMLAR</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{stats.followersCount}</Text>
                        <Text style={styles.statLabel}>TAKİPÇİ</Text>
                    </View>
                </View>
            )}

            {/* Edit Profile Button */}
            <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
                <Text style={styles.editButtonText}>Profili Düzenle</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    avatarContainer: {
        marginBottom: 12,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: '#3B82F6',
    },
    avatarPlaceholder: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.white,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 4,
    },
    bio: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: 4,
    },
    hashtags: {
        fontSize: 14,
        color: '#3B82F6',
        marginBottom: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.borderColor,
        marginBottom: 16,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
    },
    statLabel: {
        fontSize: 11,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    editButton: {
        borderWidth: 1.5,
        borderColor: '#3B82F6',
        borderRadius: 20,
        paddingHorizontal: 32,
        paddingVertical: 10,
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3B82F6',
    },
});
