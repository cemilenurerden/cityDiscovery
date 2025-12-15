// app/home/venue/[id].tsx
// Venue detail page

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { container } from '../../../di/Container';
import { Venue } from '../../../domain/entities/Venue';
import { Result } from '../../../domain/common/Result';

export default function VenueDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const venueRepository = container.getVenueRepository();

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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!venue) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Mekan bulunamadı</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{venue.name}</Text>
      <Text style={styles.location}>
        {venue.district}, {venue.city}
      </Text>
      <Text style={styles.description}>{venue.shortDescription}</Text>
      <Text style={styles.rating}>
        ⭐ {venue.ratingAverage} ({venue.ratingCount} değerlendirme)
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
