// app/onboarding/login.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons'; // Google/Apple ikonları için

// Ortak Bileşenler
import PrimaryButton from '../../components/PrimaryButton';
import StyledTextInput from '../../components/StyledTextInput';
import AuthFooter from '../../components/AuthFooter';
import { Colors } from '../../constants/Colors'; // Renkler

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    console.log('Giriş yap:', { email, password });
    // TODO: Giriş başarılı olunca ana sayfaya yönlendir
    // router.replace('/(tabs)/home'); 
  };

  const onRegister = () => {
    // Hatayı düzelttik: Tam (absolute) yol kullanıyoruz
    router.push('/onboarding/register');
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
              <Text style={styles.title}>KafeKeşfi</Text>
              <Text style={styles.subtitle}>Lezzet dolu bir dünyaya giriş yapın.</Text>
            </View>

            <View style={styles.form}>
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
              {/* Buton, şeftali rengi alana taşındı */}
            </View>
          </View>

          {/* 2. ŞEFTALİ ALANI: Buton, "Veya", Sosyal Medya ve Kayıt Linki */}
          <View style={styles.footerContainer}>
            {/* Buton buranın en üstünde */}
            <PrimaryButton title="Giriş Yap" onPress={onLogin} style={styles.loginButton} />

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Veya</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name1="apple1" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <AuthFooter
              text="Hesabın yok mu?"
              linkText="Kayıt Ol"
              onPress={onRegister}
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
    paddingTop: 80, // Üstten boşluk
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
  loginButton: {
    marginBottom: 15, // "Veya" yazısından önce boşluk
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25, // Sosyal ikonlarla arasına boşluk
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  dividerText: {
    marginHorizontal: 15,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
});