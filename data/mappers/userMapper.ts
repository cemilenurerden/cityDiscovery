// data/mappers/userMapper.ts
// Maps API DTOs to Domain entities

import { User, UserStats } from '../../domain/entities/User';

// API Response DTO - Backend'den gelen kullanıcı verisi
// GET /api/Users/{id} response yapısı
export interface UserDto {
  id: string;
  userName: string;        // Backend'de userName (name değil!)
  email: string;
  role: string;            // "User", "Admin", "Owner"
  bio?: string;
  city?: string;
  avatarUrl?: string;
  dateOfBirth?: string;    // ISO date string
}

// Map API DTO to Domain entity
export function mapUserDtoToUser(dto: UserDto): User {
  return {
    id: dto.id,
    email: dto.email,
    name: dto.userName,     // Backend: userName → Domain: name
    avatarUrl: dto.avatarUrl,
    username: dto.userName, // Aynı değeri kullan
    bio: dto.bio,
    // hashtags backend'de yok, boş dizi olarak ayarla
    hashtags: [],
  };
}

// Eğer backend'den ayrı stats endpoint'i gelirse kullanılacak
export interface UserStatsDto {
  favoritesCount: number;
  reviewsCount: number;
  followersCount: number;
}

// Map API DTO to UserStats
export function mapUserStatsDtoToUserStats(dto: UserStatsDto): UserStats {
  return {
    favoritesCount: dto.favoritesCount ?? 0,
    reviewsCount: dto.reviewsCount ?? 0,
    followersCount: dto.followersCount ?? 0,
  };
}
