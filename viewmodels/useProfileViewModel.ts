// viewmodels/useProfileViewModel.ts

import { useState, useCallback, useEffect } from 'react';
import { Venue } from '../domain/entities/Venue';
import { User, UserStats } from '../domain/entities/User';
import { VenueRepositoryMock } from '../data/mock/VenueRepositoryMock';

export type ProfileTab = 'saved' | 'grid';

interface ProfileState {
  user: User | null;
  stats: UserStats | null;
  venues: Venue[];
  selectedTab: ProfileTab;
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
}

const repository = new VenueRepositoryMock();

export function useProfileViewModel() {
  const [state, setState] = useState<ProfileState>({
    user: null,
    stats: null,
    venues: [],
    selectedTab: 'saved',
    selectedCategory: null,
    isLoading: true,
    error: null,
  });

  const loadProfile = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const [user, stats, saved] = await Promise.all([
        repository.getMe(),
        repository.getUserStats(),
        repository.getSavedVenues(),
      ]);

      setState(prev => ({
        ...prev,
        user,
        stats,
        venues: saved,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Profil yüklenemedi',
        isLoading: false,
      }));
    }
  }, []);

  const setSelectedTab = useCallback((tab: ProfileTab) => {
    setState(prev => ({ ...prev, selectedTab: tab }));
    // Grid tab is empty for now, only saved tab has data
    if (tab === 'grid') {
      setState(prev => ({ ...prev, venues: [] }));
    } else {
      // Reload saved venues
      repository.getSavedVenues().then(venues => {
        setState(prev => ({ ...prev, venues }));
      });
    }
  }, []);

  const setSelectedCategory = useCallback((category: string | null) => {
    setState(prev => ({ ...prev, selectedCategory: category }));
  }, []);

  // Filter venues by category
  const filteredVenues = state.selectedCategory
    ? state.venues.filter(v => v.categories.includes(state.selectedCategory!))
    : state.venues;

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    ...state,
    filteredVenues,
    loadProfile,
    setSelectedTab,
    setSelectedCategory,
  };
}
