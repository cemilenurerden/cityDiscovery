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
  lat?: number;
  lng?: number;
}
