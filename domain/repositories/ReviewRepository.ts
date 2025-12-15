// domain/repositories/ReviewRepository.ts

import { Result } from '../common/Result';
import { Review } from '../entities/Review';

export type ReviewSort = 'date' | 'rating';

export interface AddReviewParams {
  venueId: string;
  rating: number; // 1-5
  text: string;
}

export interface ReviewRepository {
  getReviews(venueId: string, sort: ReviewSort): Promise<Result<Review[]>>;
  addReview(params: AddReviewParams): Promise<Result<Review>>;
}
