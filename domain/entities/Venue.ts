// domain/entities/Venue.ts
// Domain entity - UI sadece bu entity'yi görecek

export type PriceLevel = '$' | '$$' | '$$$' | '$$$$';

export interface Venue {
  id: string;
  name: string;
  city: string;
  district: string;
  country: string;
  coverPhotoUrl: string;
  ratingAverage: number;
  ratingCount: number;
  isOpen: boolean;
  categories: string[];
  priceLevel: PriceLevel;
  distanceMeters: number;
  shortDescription: string;
  isFavorite: boolean;
  isSaved: boolean;
  lat?: number;
  lng?: number;
  // Detail page fields
  photos?: string[]; // Additional photos for gallery
  openingHours?: string; // e.g., "09:00 - 23:00"
  phoneNumber?: string;
  address?: string; // Full address
  description?: string; // Long description
}
