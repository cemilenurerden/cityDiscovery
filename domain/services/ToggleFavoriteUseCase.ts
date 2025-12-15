// domain/usecases/ToggleFavoriteUseCase.ts

import { Result } from '../common/Result';
import { FavoriteRepository } from '../repositories/FavoriteRepository';

export class ToggleFavoriteUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(venueId: string): Promise<Result<boolean>> {
    return this.favoriteRepository.toggleFavorite(venueId);
  }
}
