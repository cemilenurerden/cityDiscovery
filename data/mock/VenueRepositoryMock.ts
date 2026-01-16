// data/mock/VenueRepositoryMock.ts
// Mock repository for development/testing

import { Venue, PriceLevel } from '../../domain/entities/Venue';
import { User, UserStats } from '../../domain/entities/User';
import { Review } from '../../domain/entities/Review';
import { LoginParams, RegisterParams } from '../../domain/repositories/AuthRepository';
import { GetNearbyParams, SearchVenuesParams, AddVenueSuggestionParams, UpdateVenueProfileParams } from '../../domain/repositories/VenueRepository';
import { AddReviewParams } from '../../domain/repositories/ReviewRepository';
import { FavoriteListType } from '../../domain/repositories/FavoriteRepository';

// Mock data
const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: 'Espresso Lab - Moda',
    city: 'İstanbul',
    district: 'Kadıköy',
    country: 'Türkiye',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    ratingAverage: 4.8,
    ratingCount: 234,
    isOpen: true,
    categories: ['Kahve', 'Cafe'],
    priceLevel: '$$',
    distanceMeters: 300,
    shortDescription: 'Modern ve sıcak bir atmosferde kaliteli kahve deneyimi',
    isFavorite: false,
    isSaved: true,
    lat: 40.9848,
    lng: 29.0244,
    photos: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    ],
    openingHours: '09:00 - 23:00',
    phoneNumber: '+90 216 555 1234',
    address: 'Caferağa Mahallesi, Moda Caddesi No:42, Kadıköy/İstanbul',
    description: 'Espresso Lab, modern ve sıcak bir atmosferde en kaliteli kahve çekirdeklerini kullanarak hazırladığı özel kahveleriyle misafirlerini ağırlıyor. Deneyimli baristalarımız her fincan kahveyi özenle hazırlar. Ayrıca taze pasta ve sandviçlerimizle de kahve keyfinizi tamamlayabilirsiniz.',
  },
  {
    id: '2',
    name: 'Burger House',
    city: 'İstanbul',
    district: 'Kadıköy',
    country: 'Türkiye',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    ratingAverage: 4.5,
    ratingCount: 189,
    isOpen: true,
    categories: ['Burger', 'Fast Food'],
    priceLevel: '$$',
    distanceMeters: 450,
    shortDescription: 'Lezzetli burgerler ve patates kızartması',
    isFavorite: true,
    isSaved: false,
    lat: 40.9850,
    lng: 29.0250,
  },
  {
    id: '3',
    name: 'Pizza Corner',
    city: 'İstanbul',
    district: 'Kadıköy',
    country: 'Türkiye',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    ratingAverage: 4.6,
    ratingCount: 312,
    isOpen: false,
    categories: ['Pizza', 'İtalyan'],
    priceLevel: '$$$',
    distanceMeters: 600,
    shortDescription: 'Geleneksel İtalyan pizzaları ve taze malzemeler',
    isFavorite: false,
    isSaved: true,
    lat: 40.9860,
    lng: 29.0260,
  },
  {
    id: '4',
    name: 'Sushi Bar',
    city: 'İstanbul',
    district: 'Kadıköy',
    country: 'Türkiye',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
    ratingAverage: 4.9,
    ratingCount: 156,
    isOpen: true,
    categories: ['Sushi', 'Japon'],
    priceLevel: '$$$$',
    distanceMeters: 800,
    shortDescription: 'Taze balık ve geleneksel Japon mutfağı',
    isFavorite: true,
    isSaved: true,
    lat: 40.9870,
    lng: 29.0270,
  },
  {
    id: '5',
    name: 'Cafe Central',
    city: 'İstanbul',
    district: 'Kadıköy',
    country: 'Türkiye',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
    ratingAverage: 4.4,
    ratingCount: 278,
    isOpen: true,
    categories: ['Kahve', 'Cafe', 'Brunch'],
    priceLevel: '$',
    distanceMeters: 200,
    shortDescription: 'Rahat bir ortamda kahve ve hafif yemekler',
    isFavorite: false,
    isSaved: false,
    lat: 40.9840,
    lng: 29.0230,
  },
  {
    id: '6',
    name: 'Steak House',
    city: 'İstanbul',
    district: 'Kadıköy',
    country: 'Türkiye',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
    ratingAverage: 4.7,
    ratingCount: 445,
    isOpen: true,
    categories: ['Et', 'Steak'],
    priceLevel: '$$$$',
    distanceMeters: 1200,
    shortDescription: 'Premium et çeşitleri ve özel soslar',
    isFavorite: false,
    isSaved: false,
    lat: 40.9880,
    lng: 29.0280,
  },
  {
    id: '7',
    name: 'Vegan Delight',
    city: 'İstanbul',
    district: 'Kadıköy',
    country: 'Türkiye',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    ratingAverage: 4.3,
    ratingCount: 98,
    isOpen: true,
    categories: ['Vegan', 'Sağlıklı'],
    priceLevel: '$$',
    distanceMeters: 550,
    shortDescription: 'Lezzetli vegan yemekler ve smoothie\'ler',
    isFavorite: false,
    isSaved: false,
    lat: 40.9855,
    lng: 29.0255,
  },
  {
    id: '8',
    name: 'Baklava House',
    city: 'İstanbul',
    district: 'Kadıköy',
    country: 'Türkiye',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800',
    ratingAverage: 4.6,
    ratingCount: 201,
    isOpen: true,
    categories: ['Tatlı', 'Türk Mutfağı'],
    priceLevel: '$',
    distanceMeters: 350,
    shortDescription: 'Geleneksel Türk tatlıları ve baklava',
    isFavorite: true,
    isSaved: true,
    lat: 40.9845,
    lng: 29.0245,
  },
  {
    id: '9',
    name: 'Rooftop Bar',
    city: 'İstanbul',
    district: 'Kadıköy',
    country: 'Türkiye',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
    ratingAverage: 4.5,
    ratingCount: 167,
    isOpen: true,
    categories: ['Bar', 'Kokteyl'],
    priceLevel: '$$$',
    distanceMeters: 900,
    shortDescription: 'Manzaralı çatı barında kokteyller',
    isFavorite: false,
    isSaved: false,
    lat: 40.9875,
    lng: 29.0275,
  },
  {
    id: '10',
    name: 'Breakfast Club',
    city: 'İstanbul',
    district: 'Kadıköy',
    country: 'Türkiye',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800',
    ratingAverage: 4.7,
    ratingCount: 289,
    isOpen: true,
    categories: ['Kahvaltı', 'Brunch'],
    priceLevel: '$$',
    distanceMeters: 400,
    shortDescription: 'Zengin kahvaltı menüsü ve taze meyve suları',
    isFavorite: false,
    isSaved: false,
    lat: 40.9847,
    lng: 29.0247,
  },
];

const MOCK_USER: User = {
  id: 'user1',
  email: 'elif@example.com',
  name: 'Elif Yılmaz',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  username: 'elif_foodie',
  bio: 'İstanbul\'un en iyi kahvecilerini keşfediyorum ☕',
  hashtags: ['#coffeelover', '#İstanbul'],
};

const MOCK_USER_STATS: UserStats = {
  favoritesCount: 45,
  reviewsCount: 12,
  followersCount: 152,
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const SIMULATED_DELAY = 500; // ms

// Simulate random errors (10% chance)
const shouldFail = () => Math.random() < 0.1;

export class VenueRepositoryMock {
  // Auth
  async login(params: LoginParams): Promise<User> {
    await delay(SIMULATED_DELAY);
    if (shouldFail()) {
      throw new Error('Network error');
    }
    return MOCK_USER;
  }

  async register(params: RegisterParams): Promise<User> {
    await delay(SIMULATED_DELAY);
    if (shouldFail()) {
      throw new Error('Email already exists');
    }
    return { ...MOCK_USER, email: params.email, name: params.name };
  }

  async getMe(): Promise<User> {
    await delay(SIMULATED_DELAY);
    return MOCK_USER;
  }

  // Venues
  async getNearby(params: GetNearbyParams): Promise<Venue[]> {
    await delay(SIMULATED_DELAY);
    if (shouldFail()) {
      throw new Error('Network timeout');
    }

    let filtered = [...MOCK_VENUES];

    // Apply filters
    if (params.filters?.categories && params.filters.categories.length > 0) {
      filtered = filtered.filter(v =>
        v.categories.some(cat => params.filters!.categories!.includes(cat))
      );
    }
    if (params.filters?.priceLevels && params.filters.priceLevels.length > 0) {
      filtered = filtered.filter(v => params.filters!.priceLevels!.includes(v.priceLevel));
    }
    if (params.filters?.isOpen !== undefined) {
      filtered = filtered.filter(v => v.isOpen === params.filters!.isOpen);
    }

    // Simulate pagination
    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;
    return filtered.slice(start, end);
  }

  async searchVenues(params: SearchVenuesParams): Promise<Venue[]> {
    await delay(SIMULATED_DELAY);
    if (shouldFail()) {
      throw new Error('Search failed');
    }

    const query = params.query.toLowerCase();
    let filtered = MOCK_VENUES.filter(v =>
      v.name.toLowerCase().includes(query) ||
      v.categories.some(cat => cat.toLowerCase().includes(query)) ||
      v.shortDescription.toLowerCase().includes(query)
    );

    // Apply filters
    if (params.filters?.categories && params.filters.categories.length > 0) {
      filtered = filtered.filter(v =>
        v.categories.some(cat => params.filters!.categories!.includes(cat))
      );
    }
    if (params.filters?.priceLevels && params.filters.priceLevels.length > 0) {
      filtered = filtered.filter(v => params.filters!.priceLevels!.includes(v.priceLevel));
    }
    if (params.filters?.isOpen !== undefined) {
      filtered = filtered.filter(v => v.isOpen === params.filters!.isOpen);
    }

    // Pagination
    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;
    return filtered.slice(start, end);
  }

  async getVenueDetail(id: string): Promise<Venue | null> {
    await delay(SIMULATED_DELAY);
    return MOCK_VENUES.find(v => v.id === id) || null;
  }

  async addVenueSuggestion(params: AddVenueSuggestionParams): Promise<Venue> {
    await delay(SIMULATED_DELAY);
    const newVenue: Venue = {
      id: `new-${Date.now()}`,
      name: params.name,
      city: params.city,
      district: params.district,
      country: 'Türkiye',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      ratingAverage: 0,
      ratingCount: 0,
      isOpen: true,
      categories: [],
      priceLevel: '$$',
      distanceMeters: 0,
      shortDescription: params.description || '',
      isFavorite: false,
      isSaved: false,
      lat: params.lat,
      lng: params.lng,
    };
    return newVenue;
  }

  async claimVenue(venueId: string): Promise<void> {
    await delay(SIMULATED_DELAY);
    // Mock implementation
  }

  async updateVenueProfile(venueId: string, params: UpdateVenueProfileParams): Promise<Venue> {
    await delay(SIMULATED_DELAY);
    const venue = MOCK_VENUES.find(v => v.id === venueId);
    if (!venue) throw new Error('Venue not found');
    return {
      ...venue,
      ...params,
      categories: params.categories || venue.categories,
      priceLevel: (params.priceLevel as PriceLevel) || venue.priceLevel,
    };
  }

  async uploadVenuePhoto(venueId: string, fileUri: string): Promise<string> {
    await delay(1000); // Upload takes longer
    return `https://example.com/photos/${venueId}/${Date.now()}.jpg`;
  }

  // Reviews
  async getReviews(venueId: string): Promise<Review[]> {
    await delay(SIMULATED_DELAY);
    // Mock reviews
    return [
      {
        id: 'r1',
        venueId,
        userId: 'u1',
        userName: 'John Doe',
        rating: 5,
        text: 'Harika bir yer!',
        createdAt: new Date(),
      },
    ];
  }

  async addReview(params: AddReviewParams): Promise<Review> {
    await delay(SIMULATED_DELAY);
    return {
      id: `r-${Date.now()}`,
      venueId: params.venueId,
      userId: 'u1',
      userName: 'Test User',
      rating: params.rating,
      text: params.text,
      createdAt: new Date(),
    };
  }

  // Favorites
  async toggleFavorite(venueId: string): Promise<boolean> {
    await delay(300);
    const venue = MOCK_VENUES.find(v => v.id === venueId);
    if (venue) {
      venue.isFavorite = !venue.isFavorite;
      return venue.isFavorite;
    }
    return false;
  }

  async getFavorites(listType: FavoriteListType): Promise<Venue[]> {
    await delay(SIMULATED_DELAY);
    return MOCK_VENUES.filter(v => v.isFavorite);
  }

  // Profile
  async getUserStats(): Promise<UserStats> {
    await delay(SIMULATED_DELAY);
    return MOCK_USER_STATS;
  }

  async getSavedVenues(): Promise<Venue[]> {
    await delay(SIMULATED_DELAY);
    return MOCK_VENUES.filter(v => v.isSaved);
  }

  async toggleSave(venueId: string): Promise<boolean> {
    await delay(300);
    const venue = MOCK_VENUES.find(v => v.id === venueId);
    if (venue) {
      venue.isSaved = !venue.isSaved;
      return venue.isSaved;
    }
    return false;
  }
}
