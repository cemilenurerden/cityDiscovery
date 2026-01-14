// di/Container.ts
// Dependency Injection Container - tek flag ile mock/api swap

import { AuthRepository } from '../domain/repositories/AuthRepository';
import { VenueRepository } from '../domain/repositories/VenueRepository';
import { ReviewRepository } from '../domain/repositories/ReviewRepository';
import { FavoriteRepository } from '../domain/repositories/FavoriteRepository';
import { VenueRepositoryMock } from '../data/mock/VenueRepositoryMock';
import { AuthRepositoryImpl } from '../data/repositories/AuthRepositoryImpl';
import { VenueRepositoryImpl } from '../data/repositories/VenueRepositoryImpl';
import { ReviewRepositoryImpl } from '../data/repositories/ReviewRepositoryImpl';
import { FavoriteRepositoryImpl } from '../data/repositories/FavoriteRepositoryImpl';
import { GetNearbyVenuesUseCase } from '../domain/services/GetNearbyVenuesUseCase';
import { SearchVenuesUseCase } from '../domain/services/SearchVenuesUseCase';
import { ToggleFavoriteUseCase } from '../domain/services/ToggleFavoriteUseCase';
import { GetFavoritesUseCase } from '../domain/services/GetFavoritesUseCase';

// Configuration: Change this to false when backend is ready
const USE_MOCK_REPOSITORY = true;

class Container {
  // Mock Repository (for development/testing)
  private mockRepository: VenueRepositoryMock;

  // Repositories
  private authRepository: AuthRepository;
  private venueRepository: VenueRepository;
  private reviewRepository: ReviewRepository;
  private favoriteRepository: FavoriteRepository;

  // Use Cases
  private getNearbyVenuesUseCase: GetNearbyVenuesUseCase;
  private searchVenuesUseCase: SearchVenuesUseCase;
  private toggleFavoriteUseCase: ToggleFavoriteUseCase;
  private getFavoritesUseCase: GetFavoritesUseCase;

  constructor() {
    // Initialize mock repository
    this.mockRepository = new VenueRepositoryMock();

    // Initialize repositories
    this.authRepository = new AuthRepositoryImpl(
      this.mockRepository,
      USE_MOCK_REPOSITORY
    );
    this.venueRepository = new VenueRepositoryImpl(
      this.mockRepository,
      USE_MOCK_REPOSITORY
    );
    this.reviewRepository = new ReviewRepositoryImpl(
      this.mockRepository,
      USE_MOCK_REPOSITORY
    );
    this.favoriteRepository = new FavoriteRepositoryImpl(
      this.mockRepository,
      USE_MOCK_REPOSITORY
    );

    // Initialize use cases
    this.getNearbyVenuesUseCase = new GetNearbyVenuesUseCase(this.venueRepository);
    this.searchVenuesUseCase = new SearchVenuesUseCase(this.venueRepository);
    this.toggleFavoriteUseCase = new ToggleFavoriteUseCase(this.favoriteRepository);
    this.getFavoritesUseCase = new GetFavoritesUseCase(this.favoriteRepository);
  }

  // Getters
  getAuthRepository(): AuthRepository {
    return this.authRepository;
  }

  getVenueRepository(): VenueRepository {
    return this.venueRepository;
  }

  getReviewRepository(): ReviewRepository {
    return this.reviewRepository;
  }

  getFavoriteRepository(): FavoriteRepository {
    return this.favoriteRepository;
  }

  getGetNearbyVenuesUseCase(): GetNearbyVenuesUseCase {
    return this.getNearbyVenuesUseCase;
  }

  getSearchVenuesUseCase(): SearchVenuesUseCase {
    return this.searchVenuesUseCase;
  }

  getToggleFavoriteUseCase(): ToggleFavoriteUseCase {
    return this.toggleFavoriteUseCase;
  }

  getGetFavoritesUseCase(): GetFavoritesUseCase {
    return this.getFavoritesUseCase;
  }
}

// Singleton instance
export const container = new Container();
