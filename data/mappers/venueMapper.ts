// data/mappers/venueMapper.ts
// Maps API DTOs to Domain entities

import { Venue, PriceLevel } from '../../domain/entities/Venue';

// API Response DTO (Data Transfer Object)
export interface VenueDto {
  id: string;
  venue_name: string; // API uses snake_case
  city: string;
  district: string;
  country: string;
  cover_photo_url: string;
  rating_average: number;
  rating_count: number;
  is_open: boolean;
  categories: string[];
  price_level: string; // '$', '$$', '$$$', '$$$$'
  distance_meters: number;
  short_description: string;
  is_favorite: boolean;
  lat?: number;
  lng?: number;
}

// Map API DTO to Domain entity
export function mapVenueDtoToVenue(dto: VenueDto): Venue {
  return {
    id: dto.id,
    name: dto.venue_name, // API: venue_name -> Domain: name
    city: dto.city,
    district: dto.district,
    country: dto.country,
    coverPhotoUrl: dto.cover_photo_url, // API: cover_photo_url -> Domain: coverPhotoUrl
    ratingAverage: dto.rating_average, // API: rating_average -> Domain: ratingAverage
    ratingCount: dto.rating_count, // API: rating_count -> Domain: ratingCount
    isOpen: dto.is_open, // API: is_open -> Domain: isOpen
    categories: dto.categories,
    priceLevel: dto.price_level as PriceLevel, // API: price_level -> Domain: priceLevel
    distanceMeters: dto.distance_meters, // API: distance_meters -> Domain: distanceMeters
    shortDescription: dto.short_description, // API: short_description -> Domain: shortDescription
    isFavorite: dto.is_favorite, // API: is_favorite -> Domain: isFavorite
    lat: dto.lat,
    lng: dto.lng,
  };
}

// Map array of DTOs to array of entities
export function mapVenueDtosToVenues(dtos: VenueDto[]): Venue[] {
  return dtos.map(mapVenueDtoToVenue);
}
