// data/api/venueApi.ts
// Venue API endpoints

import { httpClient } from './httpClient';
import { GetNearbyParams, SearchVenuesParams, AddVenueSuggestionParams, UpdateVenueProfileParams } from '../../domain/repositories/VenueRepository';
import { VenueDto } from '../mappers/venueMapper';

export interface GetNearbyRequestDto {
  lat: number;
  lng: number;
  categories?: string[];
  price_levels?: string[];
  is_open?: boolean;
  page: number;
  page_size: number;
}

export interface SearchVenuesRequestDto {
  query: string;
  categories?: string[];
  price_levels?: string[];
  is_open?: boolean;
  page: number;
  page_size: number;
}

export interface AddVenueSuggestionRequestDto {
  name: string;
  address: string;
  city: string;
  district: string;
  description?: string;
  lat?: number;
  lng?: number;
}

export interface UpdateVenueProfileRequestDto {
  name?: string;
  description?: string;
  categories?: string[];
  price_level?: string;
}

export interface VenuesResponseDto {
  venues: VenueDto[];
  total: number;
  page: number;
  page_size: number;
}

export const venueApi = {
  async getNearby(params: GetNearbyParams): Promise<VenuesResponseDto> {
    const requestDto: GetNearbyRequestDto = {
      lat: params.lat,
      lng: params.lng,
      categories: params.filters?.categories,
      price_levels: params.filters?.priceLevels,
      is_open: params.filters?.isOpen,
      page: params.page,
      page_size: params.pageSize,
    };

    const queryParams = new URLSearchParams();
    Object.entries(requestDto).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, String(v)));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    return httpClient.get<VenuesResponseDto>(`/venues/nearby?${queryParams.toString()}`);
  },

  async searchVenues(params: SearchVenuesParams): Promise<VenuesResponseDto> {
    const requestDto: SearchVenuesRequestDto = {
      query: params.query,
      categories: params.filters?.categories,
      price_levels: params.filters?.priceLevels,
      is_open: params.filters?.isOpen,
      page: params.page,
      page_size: params.pageSize,
    };

    const queryParams = new URLSearchParams();
    Object.entries(requestDto).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, String(v)));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    return httpClient.get<VenuesResponseDto>(`/venues/search?${queryParams.toString()}`);
  },

  async getVenueDetail(id: string): Promise<VenueDto> {
    return httpClient.get<VenueDto>(`/venues/${id}`);
  },

  async addVenueSuggestion(params: AddVenueSuggestionParams): Promise<VenueDto> {
    const requestDto: AddVenueSuggestionRequestDto = {
      name: params.name,
      address: params.address,
      city: params.city,
      district: params.district,
      description: params.description,
      lat: params.lat,
      lng: params.lng,
    };
    return httpClient.post<VenueDto>('/venues/suggestions', requestDto);
  },

  async claimVenue(venueId: string): Promise<void> {
    return httpClient.post(`/venues/${venueId}/claim`);
  },

  async updateVenueProfile(venueId: string, params: UpdateVenueProfileParams): Promise<VenueDto> {
    const requestDto: UpdateVenueProfileRequestDto = {
      name: params.name,
      description: params.description,
      categories: params.categories,
      price_level: params.priceLevel,
    };
    return httpClient.patch<VenueDto>(`/venues/${venueId}`, requestDto);
  },

  async uploadVenuePhoto(venueId: string, fileUri: string): Promise<{ photo_url: string }> {
    const formData = new FormData();
    formData.append('photo', {
      uri: fileUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any);

    return httpClient.post<{ photo_url: string }>(`/venues/${venueId}/photos`, formData, {
      'Content-Type': 'multipart/form-data',
    });
  },
};
