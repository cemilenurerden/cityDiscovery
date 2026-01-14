// app/home/map.tsx
// Map page with pins and list view

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { container } from '../../di/Container';
import { useMapViewModel } from '../../viewmodels/useMapViewModel';

export default function MapPage() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);

  const getNearbyVenuesUseCase = container.getGetNearbyVenuesUseCase();
  const searchVenuesUseCase = container.getSearchVenuesUseCase();

  const { state, loadVenues, searchVenues, onRegionChange } = useMapViewModel(
    getNearbyVenuesUseCase,
    searchVenuesUseCase
  );

  useEffect(() => {
    loadVenues(state.region);
  }, []);

  const handleMarkerPress = (venueId: string) => {
    router.push(`/home/venue/${venueId}`);
  };

  const handleSearch = (text: string) => {
    if (text.trim().length > 2) {
      searchVenues(text);
    } else if (text.trim().length === 0) {
      loadVenues(state.region);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={state.region}
        onRegionChangeComplete={onRegionChange}
        showsUserLocation
        showsMyLocationButton
      >
        {state.venues.map((venue) => (
          venue.lat && venue.lng && (
            <Marker
              key={venue.id}
              coordinate={{ latitude: venue.lat, longitude: venue.lng }}
              title={venue.name}
              description={venue.shortDescription}
              pinColor={Colors.primary}
            >
              <Callout onPress={() => handleMarkerPress(venue.id)}>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{venue.name}</Text>
                  <Text style={styles.calloutDescription}>{venue.shortDescription}</Text>
                  <Text style={styles.calloutButton}>Detay Gör</Text>
                </View>
              </Callout>
            </Marker>
          )
        ))}
      </MapView>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Mekan ara..."
            onChangeText={handleSearch}
            defaultValue={state.searchQuery}
          />
          {state.loading && <ActivityIndicator size="small" color={Colors.primary} />}
        </View>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Feather name="arrow-left" size={24} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: Colors.text,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'transparent', // Make it transparent as it's over the map
    padding: 10,
    zIndex: 2,
  },
  callout: {
    width: 200,
    padding: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  calloutButton: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  }
});
