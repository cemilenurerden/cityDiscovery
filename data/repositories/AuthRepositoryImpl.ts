// data/repositories/AuthRepositoryImpl.ts
// Repository implementation - uses API or Mock

import { AuthRepository, LoginParams, RegisterParams } from '../../domain/repositories/AuthRepository';
import { Result, success, failure, AppError, ErrorType } from '../../domain/common/Result';
import { User } from '../../domain/entities/User';
import { authApi } from '../api/authApi';
import { mapUserDtoToUser } from '../mappers/userMapper';
import { VenueRepositoryMock } from '../mock/VenueRepositoryMock';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private mockRepository: VenueRepositoryMock,
    private useMock: boolean
  ) {}

  async register(params: RegisterParams): Promise<Result<User>> {
    try {
      const user = this.useMock
        ? await this.mockRepository.register(params)
        : mapUserDtoToUser((await authApi.register(params)).user);
      return success(user);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to register',
        error.type || (error.message?.includes('exists') ? ErrorType.ValidationFailure : ErrorType.NetworkFailure)
      ));
    }
  }

  async login(params: LoginParams): Promise<Result<User>> {
    try {
      const user = this.useMock
        ? await this.mockRepository.login(params)
        : mapUserDtoToUser((await authApi.login(params)).user);
      return success(user);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to login',
        error.type || (error.message?.includes('Network') ? ErrorType.NetworkFailure : ErrorType.AuthFailure)
      ));
    }
  }

  async logout(): Promise<Result<void>> {
    try {
      if (!this.useMock) {
        await authApi.logout();
      }
      return success(undefined);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to logout',
        error.type || ErrorType.UnknownFailure
      ));
    }
  }

  async getMe(): Promise<Result<User>> {
    try {
      const user = this.useMock
        ? await this.mockRepository.getMe()
        : mapUserDtoToUser(await authApi.getMe());
      return success(user);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to get user',
        error.type || ErrorType.NetworkFailure
      ));
    }
  }
}
