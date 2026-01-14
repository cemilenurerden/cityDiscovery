// viewmodels/useFavoritesViewModel.ts

import { useState, useCallback } from 'react';
import { GetFavoritesUseCase } from '../domain/services/GetFavoritesUseCase';
import { ToggleFavoriteUseCase } from '../domain/services/ToggleFavoriteUseCase';
import { FavoriteListType } from '../domain/repositories/FavoriteRepository';
import { Venue } from '../domain/entities/Venue';
import { AppError } from '../domain/common/Result';

interface FavoritesState {
  venues: Venue[];
  loading: boolean;
  refreshing: boolean;
  error: AppError | null;
  selectedListType: FavoriteListType;
}

export function useFavoritesViewModel(
  getFavoritesUseCase: GetFavoritesUseCase,
  toggleFavoriteUseCase: ToggleFavoriteUseCase
) {
  const [state, setState] = useState<FavoritesState>({
    venues: [],
    loading: false,
    refreshing: false,
    error: null,
    selectedListType: 'Favorite',
  });

  const loadFavorites = useCallback(
    async (listType: FavoriteListType = 'Favorite') => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const result = await getFavoritesUseCase.execute(listType);

      if (result.isSuccess) {
        setState((prev) => ({
          ...prev,
          venues: result.value,
          loading: false,
          selectedListType: listType,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          error: result.error,
          loading: false,
        }));
      }
    },
    [getFavoritesUseCase]
  );

  const refresh = useCallback(async () => {
    setState((prev) => ({ ...prev, refreshing: true, error: null }));

    const result = await getFavoritesUseCase.execute(state.selectedListType);

    if (result.isSuccess) {
      setState((prev) => ({
        ...prev,
        venues: result.value,
        refreshing: false,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        error: result.error,
        refreshing: false,
      }));
    }
  }, [getFavoritesUseCase, state.selectedListType]);

  const toggleFavorite = useCallback(
    async (venueId: string) => {
      const result = await toggleFavoriteUseCase.execute(venueId);

      if (result.isSuccess) {
        // Remove from favorites list
        setState((prev) => ({
          ...prev,
          venues: prev.venues.filter((v) => v.id !== venueId),
        }));
      }
    },
    [toggleFavoriteUseCase]
  );

  return {
    state,
    loadFavorites,
    refresh,
    toggleFavorite,
  };
}
