// data/repositories/FavoriteRepositoryImpl.ts
// Repository implementation - uses API or Mock

import { FavoriteRepository, FavoriteListType } from '../../domain/repositories/FavoriteRepository';
import { Result, success, failure, AppError, ErrorType } from '../../domain/common/Result';
import { Venue } from '../../domain/entities/Venue';
import { favoriteApi } from '../api/favoriteApi';
import { mapVenueDtosToVenues } from '../mappers/venueMapper';
import { VenueRepositoryMock } from '../mock/VenueRepositoryMock';

export class FavoriteRepositoryImpl implements FavoriteRepository {
  constructor(
    private mockRepository: VenueRepositoryMock,
    private useMock: boolean
  ) {}

  async toggleFavorite(venueId: string): Promise<Result<boolean>> {
    try {
      const isFavorite = this.useMock
        ? await this.mockRepository.toggleFavorite(venueId)
        : (await favoriteApi.toggleFavorite(venueId)).is_favorite;
      return success(isFavorite);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to toggle favorite',
        error.type || ErrorType.NetworkFailure
      ));
    }
  }

  async getFavorites(listType: FavoriteListType): Promise<Result<Venue[]>> {
    try {
      const venues = this.useMock
        ? await this.mockRepository.getFavorites(listType)
        : mapVenueDtosToVenues((await favoriteApi.getFavorites(listType)).venues);
      return success(venues);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to get favorites',
        error.type || ErrorType.NetworkFailure
      ));
    }
  }
}
