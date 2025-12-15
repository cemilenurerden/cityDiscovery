// domain/repositories/AuthRepository.ts
// Repository interface - UI bunu bilmez, sadece use case'ler kullanır

import { Result } from '../common/Result';
import { User } from '../entities/User';

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  name: string;
}

export interface AuthRepository {
  register(params: RegisterParams): Promise<Result<User>>;
  login(params: LoginParams): Promise<Result<User>>;
  logout(): Promise<Result<void>>;
  getMe(): Promise<Result<User>>;
}
