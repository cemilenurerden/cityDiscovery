// data/repositories/AuthRepositoryImpl.ts
// Repository implementation - Sadece Backend API kullanır (Mock kaldırıldı)

import { AuthRepository, LoginParams, RegisterParams } from '../../domain/repositories/AuthRepository';
import { Result, success, failure, AppError, ErrorType } from '../../domain/common/Result';
import { User } from '../../domain/entities/User';
import { authApi, AuthResponseDto } from '../api/authApi';
import { mapUserDtoToUser } from '../mappers/userMapper';

// Mevcut kullanıcı ID'sini sakla (login/register sonrası)
let currentUserId: string | null = null;

export class AuthRepositoryImpl implements AuthRepository {
  async register(params: RegisterParams): Promise<Result<User>> {
    try {
      // Backend'e register isteği at
      const response: AuthResponseDto = await authApi.register(params);
      
      // userId'yi sakla
      currentUserId = response.userId;
      
      // Kullanıcı detaylarını getir (userId ile)
      const userDto = await authApi.getUserById(response.userId);
      const user = mapUserDtoToUser(userDto);
      
      return success(user);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Kayıt başarısız',
        error.type || (error.message?.includes('zaten kullanılıyor') ? ErrorType.ValidationFailure : ErrorType.NetworkFailure)
      ));
    }
  }

  async login(params: LoginParams): Promise<Result<User>> {
    try {
      // Backend'e login isteği at
      const response: AuthResponseDto = await authApi.login(params);
      
      // userId'yi sakla
      currentUserId = response.userId;
      
      // Kullanıcı detaylarını getir (userId ile)
      const userDto = await authApi.getUserById(response.userId);
      const user = mapUserDtoToUser(userDto);
      
      return success(user);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Giriş başarısız',
        error.type || (error.message?.includes('Geçersiz') ? ErrorType.AuthFailure : ErrorType.NetworkFailure)
      ));
    }
  }

  async logout(): Promise<Result<void>> {
    try {
      await authApi.logout();
      currentUserId = null;
      return success(undefined);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Çıkış başarısız',
        error.type || ErrorType.UnknownFailure
      ));
    }
  }

  async getMe(): Promise<Result<User>> {
    try {
      // Eğer userId varsa kullanıcı bilgilerini getir
      if (!currentUserId) {
        return failure(new AppError(
          'Kullanıcı oturumu bulunamadı',
          ErrorType.AuthFailure
        ));
      }
      
      const userDto = await authApi.getUserById(currentUserId);
      const user = mapUserDtoToUser(userDto);
      
      return success(user);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Kullanıcı bilgileri alınamadı',
        error.type || ErrorType.NetworkFailure
      ));
    }
  }

  // Helper: Mevcut kullanıcı ID'sini al
  getCurrentUserId(): string | null {
    return currentUserId;
  }
}
