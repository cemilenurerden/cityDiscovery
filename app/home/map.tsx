// app/home/map.tsx
// Map page with pins and list view

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function MapPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Harita</Text>
      <Text style={styles.subtitle}>Map view with pins - TODO: Implement map component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
