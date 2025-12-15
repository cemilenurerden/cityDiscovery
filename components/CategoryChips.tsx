// components/CategoryChips.tsx
// Category filter chips

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

// Category emoji mapping
const getCategoryEmoji = (category: string): string => {
  const emojiMap: { [key: string]: string } = {
    'Kahve': '☕',
    'Burger': '🍔',
    'Sushi': '🍣',
    'Pizza': '🍕',
    'İtalyan': '🍝',
    'Japon': '🍱',
    'Fast Food': '🍟',
    'Tatlı': '🍰',
    'Türk Mutfağı': '🥙',
    'Bar': '🍸',
    'Kokteyl': '🍹',
    'Kahvaltı': '🥐',
    'Brunch': '🥑',
    'Vegan': '🥗',
    'Sağlıklı': '🥒',
    'Et': '🥩',
    'Steak': '🍖',
  };
  return emojiMap[category] || '📍';
};

export default function CategoryChips({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryChipsProps) {
  const allCategories = ['Tümü', ...categories];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {allCategories.map((category) => {
        const isSelected = category === 'Tümü'
          ? selectedCategory === null
          : category === selectedCategory;

        return (
          <TouchableOpacity
            key={category}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelectCategory(category === 'Tümü' ? null : category)}
            activeOpacity={0.7}
          >
            {category !== 'Tümü' && (
              <Text style={styles.emoji}>{getCategoryEmoji(category)}</Text>
            )}
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.inputBackground,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: Colors.white,
    fontWeight: '600',
  },
});
