// components/EmptyState.tsx
// Empty state when no venues found

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = 'Mekan bulunamadı' }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={48} color={Colors.textSecondary} />
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.subtitle}>Farklı bir arama terimi deneyin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
