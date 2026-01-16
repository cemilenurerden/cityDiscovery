// app/home/index.tsx
// Home / Discovery screen

import React, { useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { container } from '../../di/Container';
import { useHomeViewModel } from '../../viewmodels/useHomeViewModel';
import HomeHeader from '../../components/HomeHeader';
import MapPreviewCard from '../../components/MapPreviewCard';
import SearchInput from '../../components/SearchInput';
import CategoryChips from '../../components/CategoryChips';
import VenueCard from '../../components/VenueCard';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import { Venue } from '../../domain/entities/Venue';

// Extract unique categories from venues
const extractCategories = (venues: Venue[]): string[] => {
  const categoriesSet = new Set<string>();
  venues.forEach((venue) => {
    venue.categories.forEach((cat) => categoriesSet.add(cat));
  });
  return Array.from(categoriesSet);
};

export default function HomeScreen() {
  const router = useRouter();
  const getNearbyVenuesUseCase = container.getGetNearbyVenuesUseCase();
  const searchVenuesUseCase = container.getSearchVenuesUseCase();
  const toggleFavoriteUseCase = container.getToggleFavoriteUseCase();

  const {
    state,
    loadNearbyVenues,
    refresh,
    loadMore,
    selectCategory,
    toggleFavorite,
    toggleSave,
    setLocation,
    setUserLocation,
    setSearchQuery,
  } = useHomeViewModel(
    getNearbyVenuesUseCase,
    searchVenuesUseCase,
    toggleFavoriteUseCase
  );

  // Initialize location (mock - in real app, get from location service)
  useEffect(() => {
    // Mock location - replace with actual location service
    setLocation({ city: 'İstanbul', district: 'Kadıköy' });
    setUserLocation({ lat: 40.9848, lng: 29.0244 });
  }, []);

  // Load venues when user location is set
  useEffect(() => {
    if (state.userLocation && !state.searchQuery && state.venues.length === 0) {
      loadNearbyVenues(1, false);
    }
  }, [state.userLocation, state.searchQuery, state.venues.length, loadNearbyVenues]);

  const categories = useMemo(() => extractCategories(state.venues), [state.venues]);

  const handleLocationPress = () => {
    // TODO: Navigate to LocationPicker
    Alert.alert('Konum Seç', 'LocationPicker sayfası açılacak');
  };

  const handleNotificationPress = () => {
    // TODO: Navigate to Notifications
    Alert.alert('Bildirimler', 'Notifications sayfası açılacak');
  };

  const handleMapPress = () => {
    router.push('/home/map');
  };

  const handleVenuePress = (venueId: string) => {
    router.push(`/home/venue/${venueId}`);
  };

  const handleFavoritePress = async (venueId: string) => {
    await toggleFavorite(venueId);
  };

  const handleCommentPress = (venueId: string) => {
    // TODO: Navigate to comments or venue detail
    router.push(`/home/venue/${venueId}`);
  };

  const handleSavePress = async (venueId: string) => {
    await toggleSave(venueId);
  };

  const handleMorePress = (venue: Venue) => {
    Alert.alert(
      venue.name,
      'Daha fazla seçenek',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Paylaş', onPress: () => { } },
        { text: 'Şikayet Et', onPress: () => { }, style: 'destructive' },
      ]
    );
  };

  const renderVenueCard = ({ item }: { item: Venue }) => (
    <VenueCard
      venue={item}
      onPress={() => handleVenuePress(item.id)}
      onFavoritePress={() => handleFavoritePress(item.id)}
      onCommentPress={() => handleCommentPress(item.id)}
      onSavePress={() => handleSavePress(item.id)}
      onMorePress={() => handleMorePress(item)}
    />
  );

  const renderFooter = () => {
    if (state.paginationLoading) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color={Colors.primary} />
        </View>
      );
    }
    return null;
  };

  const renderContent = () => {
    if (state.loading && state.venues.length === 0) {
      return (
        <View>
          {[1, 2, 3].map((i) => (
            <LoadingSkeleton key={i} />
          ))}
        </View>
      );
    }

    if (state.error && state.venues.length === 0) {
      return (
        <ErrorState
          message={state.error.message}
          onRetry={() => {
            if (state.searchQuery) {
              // Retry search
            } else {
              loadNearbyVenues(1, false);
            }
          }}
        />
      );
    }

    if (state.empty) {
      return <EmptyState />;
    }

    return (
      <FlatList
        data={state.venues}
        renderItem={renderVenueCard}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={refresh}
            colors={[Colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HomeHeader
        location={state.location}
        onLocationPress={handleLocationPress}
        onNotificationPress={handleNotificationPress}
        hasUnreadNotifications={true}
      />
      <FlatList
        ListHeaderComponent={
          <>
            <MapPreviewCard
              venueCount={state.venues.length}
              onPress={handleMapPress}
            />
            <SearchInput
              value={state.searchQuery}
              onChangeText={setSearchQuery}
            />
            <CategoryChips
              categories={categories}
              selectedCategory={state.selectedCategory}
              onSelectCategory={selectCategory}
            />
          </>
        }
        data={state.venues}
        renderItem={renderVenueCard}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={refresh}
            colors={[Colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={state.loading ? null : <EmptyState />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
