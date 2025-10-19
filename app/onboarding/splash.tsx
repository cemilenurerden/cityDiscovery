import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CardCarousel from '../../components/CardCarousel';
import { router } from 'expo-router';

export default function Splash() {
  const handleContinue = () => {
    router.replace('/onboarding/login');
    console.log('Devam Et');
  };

  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../../assets/splash.jpg')}
          resizeMode="cover"
          style={styles.headerImage}
          imageStyle={styles.headerImageRadius}
        >
          <View style={styles.overlay} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Şehrin Keşif</Text>
            <Text style={styles.title}>Durakları</Text>
          </View>
        </ImageBackground>
      

      <View style={styles.carouselSection}>
        <CardCarousel
          data={[
            {
              id: 'discover',
              title: 'Yeni Mekanlar Keşfet',
              description: 'Harita üzerinde sana özel listelerde keşfet.',
              image: require('../../assets/konum1.jpg'),
              accessibilityLabel: 'Yeni mekanlar keşfet kartı',
            },
            {
              id: 'place-profiles',
              title: 'Mekan Profillerini Gör',
              description: 'Her mekanın kendine özel profilinde fotoğraflar, yorumlar ve konum bilgileri seni bekliyor.',
              image: require('../../assets/menu.jpg'),
              accessibilityLabel: 'Mekan profillerini gör kartı',
            },
            {
              id: 'menus',
              title: 'Menüler',
              description: 'Gitmeden fiyat ve seçenekleri incele.',
              image: require('../../assets/menu2.jpg'),
              accessibilityLabel: 'Menüler kartı',
            },
            {
              id: 'favorites',
              title: 'Favoriler',
              description: 'Beğendiklerini kaydet ve paylaş.',
              image: require('../../assets/favori.jpg'),
              accessibilityLabel: 'Favoriler kartı',
            },
            {
              id: 'trends',
              title: 'Trendleri Takip Et',
              description: 'Şehrinde en çok beğenilen mekanları ve kullanıcıların trend önerilerini keşfet',
              image: require('../../assets/trend.jpg'),
              accessibilityLabel: 'Menüler kartı',
            },
            
          ]}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleContinue} activeOpacity={0.85}>
          <Text style={styles.primaryButtonText}>Devam Et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  headerImage: {
    height: 400,
    width: '100%',
    justifyContent: 'flex-end',
  },
  headerImageRadius: {
    borderRadius: 6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 12,
  },
  titleContainer: {
    padding: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  carouselSection: {
    marginTop: 16,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  primaryButton: {
    backgroundColor: '#E76015',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});


