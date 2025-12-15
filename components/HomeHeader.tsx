// components/HomeHeader.tsx
// Top bar with location and notification icon

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface HomeHeaderProps {
  location: { city: string; district: string } | null;
  onLocationPress: () => void;
  onNotificationPress: () => void;
  hasUnreadNotifications?: boolean;
}

export default function HomeHeader({
  location,
  onLocationPress,
  onNotificationPress,
  hasUnreadNotifications = false,
}: HomeHeaderProps) {
  const locationText = location
    ? `${location.district}, ${location.city}`
    : 'Konum seçin';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.locationContainer}
        onPress={onLocationPress}
        activeOpacity={0.7}
      >
        <View>
          <Text style={styles.locationLabel}>Konum</Text>
          <View style={styles.locationRow}>
            <Text style={styles.locationText} numberOfLines={1}>
              {locationText}
            </Text>
            <Feather name="chevron-down" size={16} color={Colors.text} style={styles.chevron} />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.notificationButton}
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <Feather name="bell" size={24} color={Colors.text} />
        {hasUnreadNotifications && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  locationContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 4,
  },
  chevron: {
    marginLeft: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
});
