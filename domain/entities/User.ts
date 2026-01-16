// domain/entities/User.ts

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  username?: string;
  bio?: string;
  hashtags?: string[];
}

export interface UserStats {
  favoritesCount: number;
  reviewsCount: number;
  followersCount: number;
}
