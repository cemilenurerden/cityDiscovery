// viewmodels/useHomeViewModel.ts
// Hook for Home screen state management

import { useState, useCallback, useRef } from 'react';
import { Venue } from '../domain/entities/Venue';
import { VenueFilters } from '../domain/repositories/VenueRepository';
import { GetNearbyVenuesUseCase } from '../domain/services/GetNearbyVenuesUseCase';
import { SearchVenuesUseCase } from '../domain/services/SearchVenuesUseCase';
import { ToggleFavoriteUseCase } from '../domain/services/ToggleFavoriteUseCase';
import { AppError } from '../domain/common/Result';

export interface HomeState {
  venues: Venue[];
  loading: boolean;
  paginationLoading: boolean;
  refreshing: boolean;
  error: AppError | null;
  empty: boolean;
  hasMore: boolean;
  currentPage: number;
  selectedCategory: string | null;
  searchQuery: string;
  location: {
    city: string;
    district: string;
  } | null;
  userLocation: {
    lat: number;
    lng: number;
  } | null;
}

const PAGE_SIZE = 10;
const INITIAL_STATE: HomeState = {
  venues: [],
  loading: false,
  paginationLoading: false,
  refreshing: false,
  error: null,
  empty: false,
  hasMore: true,
  currentPage: 1,
  selectedCategory: null,
  searchQuery: '',
  location: null,
  userLocation: null,
};

export function useHomeViewModel(
  getNearbyVenuesUseCase: GetNearbyVenuesUseCase,
  searchVenuesUseCase: SearchVenuesUseCase,
  toggleFavoriteUseCase: ToggleFavoriteUseCase
) {
  const [state, setState] = useState<HomeState>(INITIAL_STATE);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(async (query: string, userLocation: { lat: number; lng: number } | null, selectedCategory: string | null) => {
    setState(prev => ({ ...prev, searchQuery: query, currentPage: 1, venues: [] }));
    
    if (!userLocation) {
      // If no location, show error or use default
      setState(prev => ({ ...prev, error: new AppError('Location not available', 'ValidationFailure' as any) }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    const filters: VenueFilters = selectedCategory
      ? { categories: [selectedCategory] }
      : {};

    const result = await searchVenuesUseCase.execute({
      query,
      filters,
      page: 1,
      pageSize: PAGE_SIZE,
    });

    if (result.isSuccess) {
      setState(prev => ({
        ...prev,
        venues: result.value,
        loading: false,
        empty: result.value.length === 0,
        hasMore: result.value.length === PAGE_SIZE,
      }));
    } else {
      setState(prev => ({
        ...prev,
        loading: false,
        error: result.error,
        empty: true,
      }));
    }
  }, [searchVenuesUseCase]);

  const loadNearbyVenues = useCallback(async (page: number = 1, append: boolean = false) => {
    if (!state.userLocation) {
      setState(prev => ({ ...prev, error: new AppError('Location not available', 'ValidationFailure' as any) }));
      return;
    }

    if (page === 1) {
      setState(prev => ({ ...prev, loading: true, error: null }));
    } else {
      setState(prev => ({ ...prev, paginationLoading: true }));
    }

    const filters: VenueFilters = state.selectedCategory
      ? { categories: [state.selectedCategory] }
      : {};

    const result = await getNearbyVenuesUseCase.execute({
      lat: state.userLocation.lat,
      lng: state.userLocation.lng,
      filters,
      page,
      pageSize: PAGE_SIZE,
    });

    if (result.isSuccess) {
      setState(prev => ({
        ...prev,
        venues: append ? [...prev.venues, ...result.value] : result.value,
        loading: false,
        paginationLoading: false,
        empty: !append && result.value.length === 0,
        hasMore: result.value.length === PAGE_SIZE,
        currentPage: page,
      }));
    } else {
      setState(prev => ({
        ...prev,
        loading: false,
        paginationLoading: false,
        error: result.error,
        empty: !append,
      }));
    }
  }, [state.userLocation, state.selectedCategory, getNearbyVenuesUseCase]);

  const refresh = useCallback(async () => {
    setState(prev => ({ ...prev, refreshing: true, currentPage: 1 }));
    await loadNearbyVenues(1, false);
    setState(prev => ({ ...prev, refreshing: false }));
  }, [loadNearbyVenues]);

  const loadMore = useCallback(async () => {
    if (state.paginationLoading || !state.hasMore) return;
    await loadNearbyVenues(state.currentPage + 1, true);
  }, [state.paginationLoading, state.hasMore, state.currentPage, loadNearbyVenues]);

  const selectCategory = useCallback(async (category: string | null) => {
    setState(prev => ({ ...prev, selectedCategory: category, currentPage: 1, venues: [] }));
    const currentQuery = state.searchQuery;
    if (currentQuery) {
      await handleSearch(currentQuery, state.userLocation, category);
    } else {
      await loadNearbyVenues(1, false);
    }
  }, [state.searchQuery, state.userLocation, handleSearch, loadNearbyVenues]);

  const toggleFavorite = useCallback(async (venueId: string) => {
    const result = await toggleFavoriteUseCase.execute(venueId);
    if (result.isSuccess) {
      setState(prev => ({
        ...prev,
        venues: prev.venues.map(v =>
          v.id === venueId ? { ...v, isFavorite: result.value } : v
        ),
      }));
    }
  }, [toggleFavoriteUseCase]);

  const setLocation = useCallback((location: { city: string; district: string }) => {
    setState(prev => ({ ...prev, location }));
  }, []);

  const setUserLocation = useCallback((location: { lat: number; lng: number }) => {
    setState(prev => ({ ...prev, userLocation: location }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        handleSearch(query, state.userLocation, state.selectedCategory);
      }, 300);
    } else {
      // Clear search, load nearby
      setState(prev => ({ ...prev, venues: [], currentPage: 1 }));
      loadNearbyVenues(1, false);
    }
  }, [state.userLocation, state.selectedCategory, handleSearch, loadNearbyVenues]);

  const toggleSave = useCallback(async (venueId: string) => {
    // Import repository directly for save toggle
    const { VenueRepositoryMock } = await import('../data/mock/VenueRepositoryMock');
    const repo = new VenueRepositoryMock();
    const newSavedState = await repo.toggleSave(venueId);
    setState(prev => ({
      ...prev,
      venues: prev.venues.map(v =>
        v.id === venueId ? { ...v, isSaved: newSavedState } : v
      ),
    }));
  }, []);

  return {
    state,
    loadNearbyVenues,
    refresh,
    loadMore,
    selectCategory,
    toggleFavorite,
    toggleSave,
    setLocation,
    setUserLocation,
    setSearchQuery,
  };
}
