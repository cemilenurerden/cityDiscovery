// domain/services/GetFavoritesUseCase.ts

import { FavoriteRepository, FavoriteListType } from '../repositories/FavoriteRepository';
import { Result } from '../common/Result';
import { Venue } from '../entities/Venue';

export class GetFavoritesUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(listType: FavoriteListType = 'Favorite'): Promise<Result<Venue[]>> {
    return this.favoriteRepository.getFavorites(listType);
  }
}
