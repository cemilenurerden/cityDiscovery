// app/onboarding/register.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

// Ortak Bileşenler
import PrimaryButton from '../../components/PrimaryButton';
import StyledTextInput from '../../components/StyledTextInput';
import AuthFooter from '../../components/AuthFooter';
import { Colors } from '../../constants/Colors'; // Renkler

export default function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onRegister = () => {
    console.log('Kayıt ol:', { name, surname, email, password });
    // TODO: Kayıt başarılı olunca ana sayfaya yönlendir
    // router.replace('/(tabs)/home'); 
  };

  const onLogin = () => {
    // Geri git (login sayfası zaten stack'te)
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/onboarding/login'); // Güvenlik önlemi
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          {/* 1. BEYAZ ALAN: Başlık ve Form Inputları */}
          <View style={styles.mainContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Hesap Oluştur</Text>
              <Text style={styles.subtitle}>Yeni bir lezzet macerasına başla.</Text>
            </View>

            <View style={styles.form}>
              <StyledTextInput
                iconName="user"
                placeholder="Ad"
                value={name}
                onChangeText={setName}
              />
              <StyledTextInput
                iconName="user-check" // Soyad için farklı bir ikon
                placeholder="Soyad"
                value={surname}
                onChangeText={setSurname}
              />
              <StyledTextInput
                iconName="mail"
                placeholder="E-posta Adresi"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <StyledTextInput
                iconName="lock"
                placeholder="Şifre"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <StyledTextInput
                iconName="refresh-cw" // Şifre tekrar için
                placeholder="Şifre Tekrar"
                secureTextEntry
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
              />
              {/* Buton, şeftali rengi alana taşındı */}
            </View>
          </View>
          
          {/* 2. ŞEFTALİ ALANI: Buton ve "Giriş Yap" Linki */}
          <View style={styles.footerContainer}>
            {/* Buton buranın en üstünde */}
            <PrimaryButton title="Kayıt Ol" onPress={onRegister} style={styles.registerButton} />

            <AuthFooter
              text="Zaten hesabın var mı?"
              linkText="Giriş Yap"
              onPress={onLogin}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white, // Ana arkaplan beyaz
    paddingTop: 40, // Üstten boşluk
  },
  scrollContainer: {
    flexGrow: 1, // İçeriğin büyümesini sağlar
  },
  mainContent: { // Beyaz alan
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40, // Üstten boşluk
    paddingBottom: 30, // Beyaz alanın altındaki boşluk
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  footerContainer: { // Şeftali alanı
    flex: 1, // Kalan tüm alanı kaplar
    backgroundColor: Colors.background, // Şeftali rengi
    paddingHorizontal: 24,
    paddingTop: 30, // Buton ile beyaz alan arasına boşluk
    borderTopLeftRadius: 30, // Yuvarlak köşeler
    borderTopRightRadius: 30,
  },
  registerButton: {
    marginBottom: 15, // AuthFooter'dan önce boşluk
  },
});