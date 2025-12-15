// components/ErrorState.tsx
// Error state with retry button

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import PrimaryButton from './PrimaryButton';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Feather name="alert-circle" size={48} color={Colors.primary} />
      <Text style={styles.message}>{message}</Text>
      <PrimaryButton title="Tekrar Dene" onPress={onRetry} style={styles.retryButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  message: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    width: '100%',
  },
});
