// components/ProfileVenueCard.tsx

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Venue } from '../domain/entities/Venue';

interface ProfileVenueCardProps {
    venue: Venue;
    onPress: () => void;
}

export default function ProfileVenueCard({ venue, onPress }: ProfileVenueCardProps) {
    const formatDistance = (meters: number) => {
        if (meters < 1000) return `${meters}m`;
        return `${(meters / 1000).toFixed(1)}km`;
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
            <Image source={{ uri: venue.coverPhotoUrl }} style={styles.image} />
            <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{venue.ratingAverage.toFixed(1)}</Text>
                <Feather name="star" size={12} color="#FFB800" />
            </View>
            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>{venue.name}</Text>
                <Text style={styles.description} numberOfLines={2}>{venue.shortDescription}</Text>
                <View style={styles.footer}>
                    <Text style={styles.category}>☕ {venue.categories[0]}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.distance}>{formatDistance(venue.distanceMeters)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 140,
    },
    ratingBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.text,
    },
    content: {
        padding: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    description: {
        fontSize: 13,
        color: Colors.textSecondary,
        lineHeight: 18,
        marginBottom: 8,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    category: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    dot: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginHorizontal: 6,
    },
    distance: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
});
