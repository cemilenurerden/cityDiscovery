// data/mappers/userMapper.ts
// Maps API DTOs to Domain entities

import { User } from '../../domain/entities/User';

// API Response DTO
export interface UserDto {
  id: string;
  email: string;
  name: string;
  avatar_url?: string; // API uses snake_case
}

// Map API DTO to Domain entity
export function mapUserDtoToUser(dto: UserDto): User {
  return {
    id: dto.id,
    email: dto.email,
    name: dto.name,
    avatarUrl: dto.avatar_url, // API: avatar_url -> Domain: avatarUrl
  };
}
