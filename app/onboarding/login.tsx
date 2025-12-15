// app/onboarding/login.tsx
// Login screen - UI only

import React from 'react';
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
import { AntDesign } from '@expo/vector-icons';

import PrimaryButton from '../../components/PrimaryButton';
import StyledTextInput from '../../components/StyledTextInput';
import AuthFooter from '../../components/AuthFooter';
import { Colors } from '../../constants/Colors';
import { container } from '../../di/Container';
import { useLoginViewModel } from '../../viewmodels/useLoginViewModel';

export default function Login() {
  const authRepository = container.getAuthRepository();
  const { state, setEmail, setPassword, login, navigateToRegister } = useLoginViewModel(authRepository);

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
              {state.error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{state.error}</Text>
                </View>
              )}
            </View>
          </View>

          {/* 2. ŞEFTALİ ALANI: Buton, "Veya", Sosyal Medya ve Kayıt Linki */}
          <View style={styles.footerContainer}>
            <PrimaryButton
              title={state.loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              onPress={login}
              style={styles.loginButton}
              disabled={state.loading}
            />

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
                <AntDesign name="apple1" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <AuthFooter
              text="Hesabın yok mu?"
              linkText="Kayıt Ol"
              onPress={navigateToRegister}
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
    paddingTop: 70,
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
  loginButton: {
    marginBottom: 15,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
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
