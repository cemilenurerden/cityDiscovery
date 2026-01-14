// app/home/favorites.tsx
// Favorites page

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { container } from '../../di/Container';
import { useFavoritesViewModel } from '../../viewmodels/useFavoritesViewModel';
import VenueCard from '../../components/VenueCard';
import EmptyState from '../../components/EmptyState';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { Venue } from '../../domain/entities/Venue';

export default function FavoritesPage() {
  const router = useRouter();
  const getFavoritesUseCase = container.getGetFavoritesUseCase();
  const toggleFavoriteUseCase = container.getToggleFavoriteUseCase();

  const { state, loadFavorites, refresh, toggleFavorite } = useFavoritesViewModel(
    getFavoritesUseCase,
    toggleFavoriteUseCase
  );

  useEffect(() => {
    loadFavorites('Favorite');
  }, [loadFavorites]);

  const handleVenuePress = (venueId: string) => {
    router.push(`/home/venue/${venueId}`);
  };

  const handleFavoritePress = async (venueId: string) => {
    await toggleFavorite(venueId);
  };

  const handleCommentPress = (venueId: string) => {
    router.push(`/home/venue/${venueId}`);
  };

  const handleMorePress = (venue: Venue) => {
    // TODO: Show more options
  };

  const renderVenueCard = ({ item }: { item: Venue }) => (
    <VenueCard
      venue={item}
      onPress={() => handleVenuePress(item.id)}
      onFavoritePress={() => handleFavoritePress(item.id)}
      onCommentPress={() => handleCommentPress(item.id)}
      onMorePress={() => handleMorePress(item)}
    />
  );

  if (state.loading && state.venues.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Favoriler</Text>
        </View>
        {[1, 2, 3].map((i) => (
          <LoadingSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoriler</Text>
        {state.venues.length > 0 && (
          <Text style={styles.count}>{state.venues.length} mekan</Text>
        )}
      </View>
      <FlatList
        data={state.venues}
        renderItem={renderVenueCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={state.venues.length === 0 ? styles.emptyContainer : undefined}
        ListEmptyComponent={
          <EmptyState message="Henüz favori mekan eklemediniz" />
        }
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={refresh}
            colors={[Colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
