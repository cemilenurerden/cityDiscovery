// data/api/authApi.ts
// Auth API endpoints - Identity Service (5001)

import { httpClient } from './httpClient';
import { LoginParams, RegisterParams } from '../../domain/repositories/AuthRepository';
import { UserDto } from '../mappers/userMapper';

// =============================================
// REQUEST DTOs - Backend'e gönderilen veriler
// =============================================

// POST /api/Auth/register - Kayıt için gerekli bilgiler
export interface RegisterRequestDto {
  userName: string;      // Kullanıcı adı (benzersiz)
  email: string;         // Email (benzersiz)
  password: string;      // Şifre
  role: number;          // 0=User, 1=Admin, 2=Owner
}

// POST /api/Auth/login - Giriş için gerekli bilgiler
export interface LoginRequestDto {
  email: string;         // Email
  password: string;      // Şifre
  deviceId: string;      // Cihaz ID (benzersiz tanımlayıcı)
  deviceName: string;    // Cihaz adı (örn: "iPhone 15")
}

// POST /api/Auth/refresh-token - Token yenileme
export interface RefreshTokenRequestDto {
  refreshToken: string;  // Mevcut refresh token
  deviceId: string;      // Cihaz ID
}

// =============================================
// RESPONSE DTOs - Backend'den dönen veriler
// =============================================

// Login ve Register başarılı response
export interface AuthResponseDto {
  accessToken: string;   // JWT access token
  refreshToken: string;  // Refresh token
  userId: string;        // Kullanıcı ID (örn: "3fa85f64-5717-4562-b3fc-2c963f66afa6")
}

// Refresh token başarılı response
export interface RefreshTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

// Profil güncelleme için
export interface UpdateProfileRequestDto {
  name?: string;
  avatarUrl?: string;
  bio?: string;
  username?: string;
}

// =============================================
// ROLE ENUM
// =============================================
export enum UserRole {
  User = 0,
  Admin = 1,
  Owner = 2,
}

// =============================================
// TOKEN & DEVICE STORAGE
// =============================================
let refreshTokenStorage: string | null = null;
let deviceIdStorage: string | null = null;

// Device ID oluştur veya mevcut olanı getir
function getDeviceId(): string {
  if (!deviceIdStorage) {
    // Basit bir unique ID oluştur (production'da daha iyi bir yöntem kullanılmalı)
    deviceIdStorage = `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  return deviceIdStorage;
}

// Device name al (React Native'de platform bilgisi kullanılabilir)
function getDeviceName(): string {
  // TODO: React Native'de Platform.OS ve Device bilgisi kullanılabilir
  return 'Mobile App';
}

// =============================================
// API FUNCTIONS
// =============================================
export const authApi = {
  // POST /api/Auth/register - Yeni kullanıcı kaydı oluşturur
  async register(params: RegisterParams): Promise<AuthResponseDto> {
    const requestDto: RegisterRequestDto = {
      userName: params.name,        // Kullanıcı adı olarak name kullanıyoruz
      email: params.email,
      password: params.password,
      role: UserRole.User,          // Default olarak normal kullanıcı
    };
    
    const response = await httpClient.post<AuthResponseDto>('/Auth/register', requestDto);
    
    // Token'ları kaydet
    if (response.accessToken) {
      await httpClient.setToken(response.accessToken);
      refreshTokenStorage = response.refreshToken;
    }
    
    return response;
  },

  // POST /api/Auth/login - Kullanıcı girişi yapar ve token'ları döner
  async login(params: LoginParams): Promise<AuthResponseDto> {
    const requestDto: LoginRequestDto = {
      email: params.email,
      password: params.password,
      deviceId: getDeviceId(),
      deviceName: getDeviceName(),
    };
    
    const response = await httpClient.post<AuthResponseDto>('/Auth/login', requestDto);
    
    // Token'ları kaydet
    if (response.accessToken) {
      await httpClient.setToken(response.accessToken);
      refreshTokenStorage = response.refreshToken;
    }
    
    return response;
  },

  // POST /api/Auth/refresh-token - Refresh token ile yeni access token alır
  async refreshToken(): Promise<RefreshTokenResponseDto> {
    if (!refreshTokenStorage) {
      throw new Error('No refresh token available');
    }
    
    const requestDto: RefreshTokenRequestDto = {
      refreshToken: refreshTokenStorage,
      deviceId: getDeviceId(),
    };
    
    const response = await httpClient.post<RefreshTokenResponseDto>('/Auth/refresh-token', requestDto);
    
    // Yeni token'ları kaydet
    if (response.accessToken) {
      await httpClient.setToken(response.accessToken);
      refreshTokenStorage = response.refreshToken;
    }
    
    return response;
  },

  // GET /api/Users/{id} - Belirli bir kullanıcının detaylarını getirir
  async getUserById(userId: string): Promise<UserDto> {
    return httpClient.get<UserDto>(`/Users/${userId}`);
  },

  // GET /api/Users/{id}/exists - Kullanıcının var olup olmadığını kontrol eder
  async checkUserExists(userId: string): Promise<boolean> {
    return httpClient.get<boolean>(`/Users/${userId}/exists`);
  },

  // PUT /api/Users/{id}/profile - Kullanıcı profil bilgilerini günceller
  async updateProfile(userId: string, params: UpdateProfileRequestDto): Promise<UserDto> {
    return httpClient.put<UserDto>(`/Users/${userId}/profile`, params);
  },

  // GET /api/Users/{id}/role - Kullanıcının rolünü getirir
  async getUserRole(userId: string): Promise<string> {
    return httpClient.get<string>(`/Users/${userId}/role`);
  },

  // GET /api/Users/active - Aktif kullanıcıları listeler
  async getActiveUsers(): Promise<UserDto[]> {
    return httpClient.get<UserDto[]>('/Users/active');
  },

  // GET /api/Users/by-city/{city} - Belirli bir şehirdeki kullanıcıları listeler
  async getUsersByCity(city: string): Promise<UserDto[]> {
    return httpClient.get<UserDto[]>(`/Users/by-city/${encodeURIComponent(city)}`);
  },

  // Logout - Token'ları temizle
  async logout(): Promise<void> {
    await httpClient.clearToken();
    refreshTokenStorage = null;
  },

  // Helper: Mevcut kullanıcı ID'sini almak için (login sonrası saklanmalı)
  // Bu fonksiyonu AuthRepositoryImpl'de kullanabilirsin
  getStoredRefreshToken(): string | null {
    return refreshTokenStorage;
  },
};
