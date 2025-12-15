// viewmodels/useLoginViewModel.ts
// Login screen state management

import { useState, useCallback } from 'react';
import { router } from 'expo-router';
import { AuthRepository } from '../domain/repositories/AuthRepository';

export interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

export function useLoginViewModel(authRepository: AuthRepository) {
  const [state, setState] = useState<LoginState>({
    email: '',
    password: '',
    loading: false,
    error: null,
  });

  const setEmail = useCallback((email: string) => {
    setState(prev => ({ ...prev, email, error: null }));
  }, []);

  const setPassword = useCallback((password: string) => {
    setState(prev => ({ ...prev, password, error: null }));
  }, []);

  const login = useCallback(async () => {
    // Validation
    if (!state.email.trim()) {
      setState(prev => ({ ...prev, error: 'Lütfen e-posta adresinizi girin' }));
      return;
    }

    if (!state.password.trim()) {
      setState(prev => ({ ...prev, error: 'Lütfen şifrenizi girin' }));
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      setState(prev => ({ ...prev, error: 'Geçerli bir e-posta adresi girin' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authRepository.login({
        email: state.email,
        password: state.password,
      });

      if (result.isSuccess) {
        // Login successful - navigate to home
        router.replace('/home');
      } else {
        // Login failed - show error
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
        error: err.message || 'Giriş yapılırken bir hata oluştu',
      }));
    }
  }, [state.email, state.password, authRepository]);

  const navigateToRegister = useCallback(() => {
    router.push('/onboarding/register');
  }, []);

  return {
    state,
    setEmail,
    setPassword,
    login,
    navigateToRegister,
  };
}
