// app/onboarding/register.tsx
// Register screen - UI only

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '../../components/PrimaryButton';
import StyledTextInput from '../../components/StyledTextInput';
import AuthFooter from '../../components/AuthFooter';
import { Colors } from '../../constants/Colors';
import { container } from '../../di/Container';
import { useRegisterViewModel } from '../../viewmodels/useRegisterViewModel';

export default function Register() {
  const authRepository = container.getAuthRepository();
  const {
    state,
    setName,
    setSurname,
    setEmail,
    setPassword,
    setPasswordConfirm,
    register,
    navigateToLogin,
  } = useRegisterViewModel(authRepository);

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
                value={state.name}
                onChangeText={setName}
                editable={!state.loading}
              />
              <StyledTextInput
                iconName="user-check"
                placeholder="Soyad"
                value={state.surname}
                onChangeText={setSurname}
                editable={!state.loading}
              />
              <StyledTextInput
                iconName="mail"
                placeholder="E-posta Adresi"
                keyboardType="email-address"
                value={state.email}
                onChangeText={setEmail}
                autoCapitalize="none"
                editable={!state.loading}
              />
              <StyledTextInput
                iconName="lock"
                placeholder="Şifre"
                secureTextEntry
                value={state.password}
                onChangeText={setPassword}
                editable={!state.loading}
              />
              <StyledTextInput
                iconName="refresh-cw"
                placeholder="Şifre Tekrar"
                secureTextEntry
                value={state.passwordConfirm}
                onChangeText={setPasswordConfirm}
                editable={!state.loading}
              />
              {state.error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{state.error}</Text>
                </View>
              )}
            </View>
          </View>

          {/* 2. ŞEFTALİ ALANI: Buton ve "Giriş Yap" Linki */}
          <View style={styles.footerContainer}>
            <PrimaryButton
              title={state.loading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
              onPress={register}
              style={styles.registerButton}
              disabled={state.loading}
            />

            <AuthFooter
              text="Zaten hesabın var mı?"
              linkText="Giriş Yap"
              onPress={navigateToLogin}
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
    backgroundColor: Colors.white,
    paddingTop: 40,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  mainContent: {
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
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
  footerContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  registerButton: {
    marginBottom: 15,
  },
  errorContainer: {
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 4,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
  },
});
