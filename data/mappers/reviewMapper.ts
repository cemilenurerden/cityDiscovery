// data/mappers/reviewMapper.ts
// Maps API DTOs to Domain entities

import { Review } from '../../domain/entities/Review';

// API Response DTO
export interface ReviewDto {
  id: string;
  venue_id: string; // API uses snake_case
  user_id: string;
  user_name: string;
  user_avatar_url?: string;
  rating: number;
  text: string;
  created_at: string; // ISO date string
}

// Map API DTO to Domain entity
export function mapReviewDtoToReview(dto: ReviewDto): Review {
  return {
    id: dto.id,
    venueId: dto.venue_id, // API: venue_id -> Domain: venueId
    userId: dto.user_id, // API: user_id -> Domain: userId
    userName: dto.user_name, // API: user_name -> Domain: userName
    userAvatarUrl: dto.user_avatar_url, // API: user_avatar_url -> Domain: userAvatarUrl
    rating: dto.rating,
    text: dto.text,
    createdAt: new Date(dto.created_at), // API: created_at (string) -> Domain: createdAt (Date)
  };
}

// Map array of DTOs to array of entities
export function mapReviewDtosToReviews(dtos: ReviewDto[]): Review[] {
  return dtos.map(mapReviewDtoToReview);
}
