// components/MapPreviewCard.tsx
// Map preview card with venue count and map button

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface MapPreviewCardProps {
  venueCount: number;
  onPress: () => void;
}

export default function MapPreviewCard({ venueCount, onPress }: MapPreviewCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800' }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <View style={styles.leftSection}>
            <Text style={styles.title}>Yakında</Text>
            <Text style={styles.count}>{venueCount} Mekan Bulundu</Text>
          </View>
          <TouchableOpacity
            style={styles.mapButton}
            onPress={onPress}
            activeOpacity={0.8}
          >
            <Feather name="map" size={20} color={Colors.white} />
            <Text style={styles.mapButtonText}>Harita</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  imageBackground: {
    height: 140,
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.white,
    marginBottom: 4,
    opacity: 0.9,
  },
  count: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  mapButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});
