// app/home/add-venue.tsx
// Add venue suggestion page

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import StyledTextInput from '../../components/StyledTextInput';
import PrimaryButton from '../../components/PrimaryButton';
import { container } from '../../di/Container';

export default function AddVenuePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const venueRepository = container.getVenueRepository();

  const handleSubmit = async () => {
    if (!name || !address || !city || !district) {
      Alert.alert('Hata', 'Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    setLoading(true);
    const result = await venueRepository.addVenueSuggestion({
      name,
      address,
      city,
      district,
      description,
    });

    setLoading(false);

    if (result.isSuccess) {
      Alert.alert('Başarılı', 'Mekan önerisi gönderildi', [
        { text: 'Tamam', onPress: () => router.back() },
      ]);
    } else {
      Alert.alert('Hata', result.error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mekan Öner</Text>
      <StyledTextInput
        iconName="map-pin"
        placeholder="Mekan Adı *"
        value={name}
        onChangeText={setName}
      />
      <StyledTextInput
        iconName="map"
        placeholder="Adres *"
        value={address}
        onChangeText={setAddress}
      />
      <StyledTextInput
        iconName="map-pin"
        placeholder="Şehir *"
        value={city}
        onChangeText={setCity}
      />
      <StyledTextInput
        iconName="map-pin"
        placeholder="İlçe *"
        value={district}
        onChangeText={setDistrict}
      />
      <StyledTextInput
        iconName="file-text"
        placeholder="Açıklama (Opsiyonel)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <PrimaryButton
        title={loading ? 'Gönderiliyor...' : 'Gönder'}
        onPress={handleSubmit}
        disabled={loading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 24,
  },
});
