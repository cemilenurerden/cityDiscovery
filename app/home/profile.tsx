// app/home/profile.tsx

import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useProfileViewModel } from '../../viewmodels/useProfileViewModel';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileCard from '../../components/ProfileCard';
import ProfileTabs from '../../components/ProfileTabs';
import ProfileVenueCard from '../../components/ProfileVenueCard';
import CategoryChips from '../../components/CategoryChips';
import { Venue } from '../../domain/entities/Venue';

// Profile page categories
const PROFILE_CATEGORIES = ['Kahve', 'Restoran', 'Bakery', 'Cafe', 'Burger'];

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    stats,
    filteredVenues,
    selectedTab,
    selectedCategory,
    isLoading,
    setSelectedTab,
    setSelectedCategory,
  } = useProfileViewModel();

  const handleVenuePress = (venue: Venue) => {
    router.push(`/home/venue/${venue.id}`);
  };

  const renderVenueCard = ({ item }: { item: Venue }) => (
    <ProfileVenueCard venue={item} onPress={() => handleVenuePress(item)} />
  );

  const renderEmptyGrid = () => (
    <View style={styles.emptyContainer}>
      <Feather name="grid" size={48} color={Colors.textSecondary} />
      <Text style={styles.emptyText}>Yakında...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ProfileHeader username={user?.username} />

      <FlatList
        data={selectedTab === 'saved' ? filteredVenues : []}
        keyExtractor={(item) => item.id}
        renderItem={renderVenueCard}
        ListHeaderComponent={
          <>
            <ProfileCard user={user} stats={stats} />
            <ProfileTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
            {selectedTab === 'saved' && (
              <CategoryChips
                categories={PROFILE_CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            )}
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3B82F6" />
            </View>
          ) : selectedTab === 'grid' ? (
            renderEmptyGrid()
          ) : null
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
