// viewmodels/useMapViewModel.ts
import { useState, useCallback, useRef } from 'react';
import { Venue } from '../domain/entities/Venue';
import { GetNearbyVenuesUseCase } from '../domain/services/GetNearbyVenuesUseCase';
import { SearchVenuesUseCase } from '../domain/services/SearchVenuesUseCase';
import { AppError } from '../domain/common/Result';
import { Region } from 'react-native-maps';

export interface MapState {
  venues: Venue[];
  loading: boolean;
  error: AppError | null;
  searchQuery: string;
  region: Region;
}

const INITIAL_REGION: Region = {
  latitude: 40.9848,
  longitude: 29.0244,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export function useMapViewModel(
  getNearbyVenuesUseCase: GetNearbyVenuesUseCase,
  searchVenuesUseCase: SearchVenuesUseCase
) {
  const [state, setState] = useState<MapState>({
    venues: [],
    loading: false,
    error: null,
    searchQuery: '',
    region: INITIAL_REGION,
  });

  const loadVenues = useCallback(async (region: Region) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    // We can use getNearbyVenues with the current map center
    const result = await getNearbyVenuesUseCase.execute({
      lat: region.latitude,
      lng: region.longitude,
      page: 1,
      pageSize: 50, // Get more for map
    });

    if (result.isSuccess) {
      setState(prev => ({
        ...prev,
        venues: result.value,
        loading: false,
      }));
    } else {
      setState(prev => ({
        ...prev,
        loading: false,
        error: result.error,
      }));
    }
  }, [getNearbyVenuesUseCase]);

  const searchVenues = useCallback(async (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query, loading: true, error: null }));
    
    const result = await searchVenuesUseCase.execute({
      query,
      page: 1,
      pageSize: 50,
    });

    if (result.isSuccess) {
      const venues = result.value;
      setState(prev => ({
        ...prev,
        venues,
        loading: false,
      }));

      // Optionally center map on first result
      if (venues.length > 0 && venues[0].lat && venues[0].lng) {
        setState(prev => ({
          ...prev,
          region: {
            ...prev.region,
            latitude: venues[0].lat!,
            longitude: venues[0].lng!,
          }
        }));
      }
    } else {
      setState(prev => ({
        ...prev,
        loading: false,
        error: result.error,
      }));
    }
  }, [searchVenuesUseCase]);

  const onRegionChange = useCallback((region: Region) => {
    setState(prev => ({ ...prev, region }));
  }, []);

  return {
    state,
    loadVenues,
    searchVenues,
    onRegionChange,
  };
}
