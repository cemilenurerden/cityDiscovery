// data/api/reviewApi.ts
// Review API endpoints

import { httpClient } from './httpClient';
import { AddReviewParams } from '../../domain/repositories/ReviewRepository';
import { ReviewDto } from '../mappers/reviewMapper';

export interface GetReviewsRequestDto {
  sort?: 'date' | 'rating';
}

export interface AddReviewRequestDto {
  venue_id: string;
  rating: number;
  text: string;
}

export interface ReviewsResponseDto {
  reviews: ReviewDto[];
}

export const reviewApi = {
  async getReviews(venueId: string, sort: 'date' | 'rating' = 'date'): Promise<ReviewsResponseDto> {
    const queryParams = new URLSearchParams();
    if (sort) {
      queryParams.append('sort', sort);
    }
    return httpClient.get<ReviewsResponseDto>(`/venues/${venueId}/reviews?${queryParams.toString()}`);
  },

  async addReview(params: AddReviewParams): Promise<ReviewDto> {
    const requestDto: AddReviewRequestDto = {
      venue_id: params.venueId,
      rating: params.rating,
      text: params.text,
    };
    return httpClient.post<ReviewDto>('/reviews', requestDto);
  },
};
