// components/VenueCard.tsx
// Venue card component

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Share } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Venue } from '../domain/entities/Venue';
import { Colors } from '../constants/Colors';

interface VenueCardProps {
  venue: Venue;
  onPress: () => void;
  onFavoritePress: () => void;
  onCommentPress: () => void;
  onSavePress: () => void;
  onMorePress: () => void;
}

export default function VenueCard({
  venue,
  onPress,
  onFavoritePress,
  onCommentPress,
  onSavePress,
  onMorePress,
}: VenueCardProps) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${venue.name} - ${venue.district}, ${venue.city}`,
      });
    } catch (error) {
      // Share failed
    }
  };

  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${meters}M UZAKTA`;
    }
    return `${(meters / 1000).toFixed(1)}KM UZAKTA`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {venue.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.venueName} numberOfLines={1}>
              {venue.name}
            </Text>
            <Text style={styles.venueLocation} numberOfLines={1}>
              {venue.city}, {venue.country}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onMorePress} style={styles.moreButton}>
          <Feather name="more-vertical" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Cover Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: venue.coverPhotoUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Feather name="star" size={14} color="#FFB800" />
          <Text style={styles.ratingText}>{venue.ratingAverage.toFixed(1)}</Text>
        </View>
        {/* Action Icons */}
        <View style={styles.actionIcons}>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={onFavoritePress}
            activeOpacity={0.7}
          >
            <Feather
              name={venue.isFavorite ? 'heart' : 'heart'}
              size={20}
              color={venue.isFavorite ? '#FF3B30' : Colors.white}
              fill={venue.isFavorite ? '#FF3B30' : 'none'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={onCommentPress}
            activeOpacity={0.7}
          >
            <Feather name="message-circle" size={20} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Feather name="share-2" size={20} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon} onPress={onSavePress} activeOpacity={0.7}>
            <Feather name="bookmark" size={20} color={venue.isSaved ? '#3B82F6' : Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        <View style={[styles.tag, venue.isOpen ? styles.tagOpen : styles.tagClosed]}>
          <Text style={[styles.tagText, venue.isOpen && styles.tagTextOpen]}>
            {venue.isOpen ? 'Açık' : 'Kapalı'}
          </Text>
        </View>
        {venue.categories.slice(0, 2).map((cat) => (
          <View key={cat} style={styles.tag}>
            <Text style={styles.tagText}>{cat}</Text>
          </View>
        ))}
        <View style={styles.tag}>
          <Text style={styles.tagText}>{venue.priceLevel}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {venue.shortDescription}
      </Text>

      {/* Distance */}
      <Text style={styles.distance}>{formatDistance(venue.distanceMeters)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  headerTextContainer: {
    flex: 1,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  venueLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  moreButton: {
    padding: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
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
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 4,
  },
  actionIcons: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.inputBackground,
  },
  tagOpen: {
    backgroundColor: Colors.primary,
  },
  tagClosed: {
    backgroundColor: '#EF4444',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
  },
  tagTextOpen: {
    color: Colors.white,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    marginBottom: 8,
    lineHeight: 20,
  },
  distance: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});
