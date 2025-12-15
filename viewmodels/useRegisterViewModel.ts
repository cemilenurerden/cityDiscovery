// viewmodels/useRegisterViewModel.ts
// Register screen state management

import { useState, useCallback } from 'react';
import { router } from 'expo-router';
import { AuthRepository } from '../domain/repositories/AuthRepository';

export interface RegisterState {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  loading: boolean;
  error: string | null;
}

export function useRegisterViewModel(authRepository: AuthRepository) {
  const [state, setState] = useState<RegisterState>({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    loading: false,
    error: null,
  });

  const setName = useCallback((name: string) => {
    setState(prev => ({ ...prev, name, error: null }));
  }, []);

  const setSurname = useCallback((surname: string) => {
    setState(prev => ({ ...prev, surname, error: null }));
  }, []);

  const setEmail = useCallback((email: string) => {
    setState(prev => ({ ...prev, email, error: null }));
  }, []);

  const setPassword = useCallback((password: string) => {
    setState(prev => ({ ...prev, password, error: null }));
  }, []);

  const setPasswordConfirm = useCallback((passwordConfirm: string) => {
    setState(prev => ({ ...prev, passwordConfirm, error: null }));
  }, []);

  const register = useCallback(async () => {
    // Validation
    if (!state.name.trim() || !state.surname.trim()) {
      setState(prev => ({ ...prev, error: 'Lütfen ad ve soyad bilgilerinizi girin' }));
      return;
    }

    if (!state.email.trim()) {
      setState(prev => ({ ...prev, error: 'Lütfen e-posta adresinizi girin' }));
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      setState(prev => ({ ...prev, error: 'Geçerli bir e-posta adresi girin' }));
      return;
    }

    if (!state.password.trim()) {
      setState(prev => ({ ...prev, error: 'Lütfen şifrenizi girin' }));
      return;
    }

    if (state.password.length < 6) {
      setState(prev => ({ ...prev, error: 'Şifre en az 6 karakter olmalıdır' }));
      return;
    }

    if (state.password !== state.passwordConfirm) {
      setState(prev => ({ ...prev, error: 'Şifreler eşleşmiyor' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authRepository.register({
        email: state.email,
        password: state.password,
        name: `${state.name} ${state.surname}`.trim(),
      });

      if (result.isSuccess) {
        // Registration successful - navigate to home
        router.replace('/home');
      } else {
        // Registration failed - show error
        setState(prev => ({
          ...prev,
          loading: false,
          error: result.error.message,
        }));
      }
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Kayıt olurken bir hata oluştu',
      }));
    }
  }, [state.name, state.surname, state.email, state.password, state.passwordConfirm, authRepository]);

  const navigateToLogin = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/onboarding/login');
    }
  }, []);

  return {
    state,
    setName,
    setSurname,
    setEmail,
    setPassword,
    setPasswordConfirm,
    register,
    navigateToLogin,
  };
}
