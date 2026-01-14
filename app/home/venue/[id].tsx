// app/home/venue/[id].tsx
// Venue detail page

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';
import { container } from '../../../di/Container';
import { Venue } from '../../../domain/entities/Venue';

const { width } = Dimensions.get('window');

type TabType = 'menu' | 'reviews' | 'info';

export default function VenueDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('menu');
  const venueRepository = container.getVenueRepository();
  const toggleFavoriteUseCase = container.getToggleFavoriteUseCase();

  useEffect(() => {
    loadVenue();
  }, [id]);

  const loadVenue = async () => {
    if (!id) return;
    setLoading(true);
    const result = await venueRepository.getVenueDetail(id);
    if (result.isSuccess) {
      setVenue(result.value);
    }
    setLoading(false);
  };

  const handleFavoritePress = async () => {
    if (!venue) return;
    const result = await toggleFavoriteUseCase.execute(venue.id);
    if (result.isSuccess) {
      setVenue({ ...venue, isFavorite: result.value });
    }
  };

  const handleShare = async () => {
    if (!venue) return;
    try {
      await Share.share({
        message: `${venue.name} - ${venue.district}, ${venue.city}`,
      });
    } catch (error) {
      // Share failed
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!venue) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Mekan bulunamadı</Text>
      </View>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'menu':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoonText}>Menü çok yakında...</Text>
          </View>
        );
      case 'reviews':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoonText}>Yorumlar çok yakında...</Text>
          </View>
        );
      case 'info':
        return (
          <View style={styles.tabContent}>
            {venue.description && (
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Hakkında</Text>
                <Text style={styles.infoText}>{venue.description}</Text>
              </View>
            )}
            {venue.address && (
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Adres</Text>
                <Text style={styles.infoText}>{venue.address}</Text>
              </View>
            )}
            {venue.phoneNumber && (
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Telefon</Text>
                <Text style={styles.infoText}>{venue.phoneNumber}</Text>
              </View>
            )}
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Feather name="arrow-left" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mekan Detayı</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Feather name="more-vertical" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Venue Info Card */}
        <View style={styles.venueInfoCard}>
          <View style={styles.venueAvatar}>
            <Text style={styles.venueAvatarText}>
              {venue.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.venueInfo}>
            <Text style={styles.venueInfoName}>Mekan Adı</Text>
            <Text style={styles.venueInfoLocation}>
              {venue.district}, {venue.city}
            </Text>
          </View>
        </View>

        {/* Cover Image */}
        <View style={styles.coverImageContainer}>
          <Image
            source={{ uri: venue.coverPhotoUrl }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          {/* Action Icons */}
          <View style={styles.actionIcons}>
            <TouchableOpacity
              style={styles.actionIcon}
              onPress={handleFavoritePress}
              activeOpacity={0.7}
            >
              <Feather
                name="heart"
                size={20}
                color={venue.isFavorite ? '#FF3B30' : Colors.white}
                fill={venue.isFavorite ? '#FF3B30' : 'none'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon} activeOpacity={0.7}>
              <Feather name="message-circle" size={20} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionIcon}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <Feather name="share-2" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: venue.coverPhotoUrl }}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>4</Text>
            </View>
          </View>
        </View>

        {/* Venue Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.venueName}>{venue.name}</Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {venue.categories.slice(0, 2).map((cat) => (
              <View key={cat} style={styles.tag}>
                <Text style={styles.tagText}>{cat}</Text>
              </View>
            ))}
            <View style={styles.tag}>
              <Text style={styles.tagText}>{venue.priceLevel}</Text>
            </View>
          </View>

          {/* Rating and Status */}
          <View style={styles.ratingContainer}>
            <Feather name="star" size={16} color="#FFB800" />
            <Text style={styles.ratingText}>{venue.ratingAverage.toFixed(1)}</Text>
            <Text style={styles.statusText}>
              {venue.isOpen ? 'Açık' : 'Kapalı'}
              {venue.openingHours && ` • ${venue.openingHours.split(' - ')[1]}'e kadar`}
            </Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'menu' && styles.tabActive]}
              onPress={() => setActiveTab('menu')}
            >
              <Text
                style={[styles.tabText, activeTab === 'menu' && styles.tabTextActive]}
              >
                Menü
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'reviews' && styles.tabActive]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'reviews' && styles.tabTextActive,
                ]}
              >
                Yorumlar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'info' && styles.tabActive]}
              onPress={() => setActiveTab('info')}
            >
              <Text
                style={[styles.tabText, activeTab === 'info' && styles.tabTextActive]}
              >
                Bilgi
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {renderTabContent()}

          {/* Photo Gallery */}
          {venue.photos && venue.photos.length > 0 && (
            <View style={styles.galleryContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {venue.photos.map((photo, index) => (
                  <View key={index} style={styles.galleryItem}>
                    <Image
                      source={{ uri: photo }}
                      style={styles.galleryImage}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  headerButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  venueInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
  },
  venueAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8DCC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  venueAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B7355',
  },
  venueInfo: {
    flex: 1,
  },
  venueInfoName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  venueInfoLocation: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  coverImageContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  actionIcons: {
    position: 'absolute',
    bottom: 28,
    left: 28,
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
  profileImageContainer: {
    position: 'absolute',
    bottom: 28,
    right: 28,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  detailsContainer: {
    padding: 16,
  },
  venueName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: Colors.inputBackground,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: Colors.primary,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 8,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  tabContent: {
    minHeight: 100,
    marginBottom: 20,
  },
  comingSoonText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  galleryContainer: {
    marginTop: 8,
  },
  galleryItem: {
    marginRight: 12,
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
