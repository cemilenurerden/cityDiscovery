// components/LoadingSkeleton.tsx
// Loading skeleton for venue cards

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export default function LoadingSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.skeleton, styles.titleSkeleton]} />
          <View style={[styles.skeleton, styles.subtitleSkeleton]} />
        </View>
        <View style={[styles.skeleton, styles.moreSkeleton]} />
      </View>
      <View style={[styles.skeleton, styles.imageSkeleton]} />
      <View style={styles.tagsContainer}>
        <View style={[styles.skeleton, styles.tagSkeleton]} />
        <View style={[styles.skeleton, styles.tagSkeleton]} />
        <View style={[styles.skeleton, styles.tagSkeleton]} />
      </View>
      <View style={[styles.skeleton, styles.descriptionSkeleton]} />
      <View style={[styles.skeleton, styles.distanceSkeleton]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  titleSkeleton: {
    width: '70%',
    height: 20,
    marginBottom: 8,
  },
  subtitleSkeleton: {
    width: '50%',
    height: 14,
  },
  moreSkeleton: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  imageSkeleton: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tagSkeleton: {
    width: 60,
    height: 24,
    borderRadius: 12,
  },
  descriptionSkeleton: {
    width: '100%',
    height: 16,
    marginBottom: 4,
  },
  distanceSkeleton: {
    width: 100,
    height: 14,
  },
  skeleton: {
    backgroundColor: Colors.borderColor,
    borderRadius: 4,
  },
});
