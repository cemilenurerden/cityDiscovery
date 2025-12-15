// data/api/favoriteApi.ts
// Favorite API endpoints

import { httpClient } from './httpClient';
import { FavoriteListType } from '../../domain/repositories/FavoriteRepository';
import { VenueDto } from '../mappers/venueMapper';

export interface ToggleFavoriteResponseDto {
  is_favorite: boolean;
}

export interface FavoritesResponseDto {
  venues: VenueDto[];
}

export const favoriteApi = {
  async toggleFavorite(venueId: string): Promise<ToggleFavoriteResponseDto> {
    return httpClient.post<ToggleFavoriteResponseDto>(`/venues/${venueId}/favorite`);
  },

  async getFavorites(listType: FavoriteListType): Promise<FavoritesResponseDto> {
    const queryParams = new URLSearchParams();
    queryParams.append('list_type', listType.toLowerCase());
    return httpClient.get<FavoritesResponseDto>(`/favorites?${queryParams.toString()}`);
  },
};
