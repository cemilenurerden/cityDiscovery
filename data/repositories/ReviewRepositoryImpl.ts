// data/repositories/ReviewRepositoryImpl.ts
// Repository implementation - uses API or Mock

import { ReviewRepository, ReviewSort, AddReviewParams } from '../../domain/repositories/ReviewRepository';
import { Result, success, failure, AppError, ErrorType } from '../../domain/common/Result';
import { Review } from '../../domain/entities/Review';
import { reviewApi } from '../api/reviewApi';
import { mapReviewDtoToReview, mapReviewDtosToReviews } from '../mappers/reviewMapper';
import { VenueRepositoryMock } from '../mock/VenueRepositoryMock';

export class ReviewRepositoryImpl implements ReviewRepository {
  constructor(
    private mockRepository: VenueRepositoryMock,
    private useMock: boolean
  ) {}

  async getReviews(venueId: string, sort: ReviewSort): Promise<Result<Review[]>> {
    try {
      let reviews: Review[];
      if (this.useMock) {
        reviews = await this.mockRepository.getReviews(venueId);
      } else {
        const response = await reviewApi.getReviews(venueId, sort);
        reviews = mapReviewDtosToReviews(response.reviews);
      }

      // Sort reviews (in real API, this would be done server-side)
      const sorted = [...reviews];
      if (sort === 'rating') {
        sorted.sort((a, b) => b.rating - a.rating);
      } else {
        sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }

      return success(sorted);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to get reviews',
        error.type || ErrorType.NetworkFailure
      ));
    }
  }

  async addReview(params: AddReviewParams): Promise<Result<Review>> {
    try {
      const review = this.useMock
        ? await this.mockRepository.addReview(params)
        : mapReviewDtoToReview(await reviewApi.addReview(params));
      return success(review);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to add review',
        error.type || ErrorType.ValidationFailure
      ));
    }
  }
}
