import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View, ViewToken } from 'react-native';

type CarouselItem = {
  id: string;
  title: string;
  description: string;
  image: any; // require('...') or { uri }
  accessibilityLabel?: string;
  onPress?: () => void;
};

type Props = {
  data: CarouselItem[];
};

const { width: screenWidth } = Dimensions.get('window');
const HORIZONTAL_SPACING = 16;
const CARD_WIDTH = Math.round(screenWidth * 0.78);
const SNAP_INTERVAL = CARD_WIDTH + HORIZONTAL_SPACING;

export default function CardCarousel({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<CarouselItem>>(null);

  const viewabilityConfig = useMemo(
    () => ({ viewAreaCoveragePercentThreshold: 60 }),
    []
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems && viewableItems.length > 0 && viewableItems[0].index != null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }: { item: CarouselItem }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={item.onPress}
      accessibilityRole="button"
      accessibilityLabel={item.accessibilityLabel || `${item.title}. ${item.description}`}
      style={styles.cardContainer}
    >
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDesc}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        ref={listRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        snapToAlignment="start"
        disableIntervalMomentum
        bounces={false}
        pagingEnabled={false}
        getItemLayout={(_, index) => ({ length: SNAP_INTERVAL, offset: SNAP_INTERVAL * index, index })}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex ? styles.dotActive : undefined]}
            accessibilityLabel={`Sayfa ${index + 1} ${index === activeIndex ? 'aktif' : ''}`}
            accessibilityRole="text"
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: HORIZONTAL_SPACING,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: Math.round(CARD_WIDTH * 0.6),
  },
  cardBody: {
    padding: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: '#6B7280',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#E76015',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});


