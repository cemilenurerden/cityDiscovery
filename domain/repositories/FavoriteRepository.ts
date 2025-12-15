// domain/repositories/FavoriteRepository.ts

import { Result } from '../common/Result';
import { Venue } from '../entities/Venue';

export type FavoriteListType = 'Favorite' | 'WantToGo' | 'Visited';

export interface FavoriteRepository {
  toggleFavorite(venueId: string): Promise<Result<boolean>>; // returns new favorite state
  getFavorites(listType: FavoriteListType): Promise<Result<Venue[]>>;
}
