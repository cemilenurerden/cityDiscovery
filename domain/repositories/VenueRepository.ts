// domain/repositories/VenueRepository.ts

import { Result } from '../common/Result';
import { Venue } from '../entities/Venue';

export interface VenueFilters {
  categories?: string[];
  priceLevels?: string[];
  isOpen?: boolean;
}

export interface GetNearbyParams {
  lat: number;
  lng: number;
  filters?: VenueFilters;
  page: number;
  pageSize: number;
}

export interface SearchVenuesParams {
  query: string;
  filters?: VenueFilters;
  page: number;
  pageSize: number;
}

export interface AddVenueSuggestionParams {
  name: string;
  address: string;
  city: string;
  district: string;
  description?: string;
  lat?: number;
  lng?: number;
}

export interface UpdateVenueProfileParams {
  name?: string;
  description?: string;
  categories?: string[];
  priceLevel?: string;
}

export interface VenueRepository {
  getNearby(params: GetNearbyParams): Promise<Result<Venue[]>>;
  searchVenues(params: SearchVenuesParams): Promise<Result<Venue[]>>;
  getVenueDetail(id: string): Promise<Result<Venue>>;
  addVenueSuggestion(params: AddVenueSuggestionParams): Promise<Result<Venue>>;
  claimVenue(venueId: string): Promise<Result<void>>;
  updateVenueProfile(venueId: string, params: UpdateVenueProfileParams): Promise<Result<Venue>>;
  uploadVenuePhoto(venueId: string, fileUri: string): Promise<Result<string>>;
}
