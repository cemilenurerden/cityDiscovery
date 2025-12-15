// data/api/authApi.ts
// Auth API endpoints

import { httpClient } from './httpClient';
import { LoginParams, RegisterParams } from '../../domain/repositories/AuthRepository';
import { UserDto } from '../mappers/userMapper';

// API DTOs (Data Transfer Objects)
export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponseDto {
  user: UserDto;
  token: string;
}

export const authApi = {
  async login(params: LoginParams): Promise<AuthResponseDto> {
    const requestDto: LoginRequestDto = {
      email: params.email,
      password: params.password,
    };
    const response = await httpClient.post<AuthResponseDto>('/auth/login', requestDto);
    
    // Save token
    if (response.token) {
      await httpClient.setToken(response.token);
    }
    
    return response;
  },

  async register(params: RegisterParams): Promise<AuthResponseDto> {
    const requestDto: RegisterRequestDto = {
      email: params.email,
      password: params.password,
      name: params.name,
    };
    const response = await httpClient.post<AuthResponseDto>('/auth/register', requestDto);
    
    // Save token
    if (response.token) {
      await httpClient.setToken(response.token);
    }
    
    return response;
  },

  async getMe(): Promise<UserDto> {
    return httpClient.get<UserDto>('/auth/me');
  },

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout');
    await httpClient.clearToken();
  },
};
