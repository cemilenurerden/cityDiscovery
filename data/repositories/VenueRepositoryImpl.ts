// data/repositories/VenueRepositoryImpl.ts
// Repository implementation - uses API or Mock

import { VenueRepository, GetNearbyParams, SearchVenuesParams, AddVenueSuggestionParams, UpdateVenueProfileParams } from '../../domain/repositories/VenueRepository';
import { Result, success, failure, AppError, ErrorType } from '../../domain/common/Result';
import { Venue } from '../../domain/entities/Venue';
import { venueApi } from '../api/venueApi';
import { mapVenueDtoToVenue, mapVenueDtosToVenues } from '../mappers/venueMapper';
import { VenueRepositoryMock } from '../mock/VenueRepositoryMock';

export class VenueRepositoryImpl implements VenueRepository {
  constructor(
    private mockRepository: VenueRepositoryMock,
    private useMock: boolean
  ) {}

  private async getNearbyFromApi(params: GetNearbyParams): Promise<Venue[]> {
    const response = await venueApi.getNearby(params);
    return mapVenueDtosToVenues(response.venues);
  }

  private async searchVenuesFromApi(params: SearchVenuesParams): Promise<Venue[]> {
    const response = await venueApi.searchVenues(params);
    return mapVenueDtosToVenues(response.venues);
  }

  async getNearby(params: GetNearbyParams): Promise<Result<Venue[]>> {
    try {
      const venues = this.useMock
        ? await this.mockRepository.getNearby(params)
        : await this.getNearbyFromApi(params);
      return success(venues);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to fetch nearby venues',
        error.type || ErrorType.NetworkFailure
      ));
    }
  }

  async searchVenues(params: SearchVenuesParams): Promise<Result<Venue[]>> {
    try {
      const venues = this.useMock
        ? await this.mockRepository.searchVenues(params)
        : await this.searchVenuesFromApi(params);
      return success(venues);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to search venues',
        error.type || ErrorType.NetworkFailure
      ));
    }
  }

  async getVenueDetail(id: string): Promise<Result<Venue>> {
    try {
      const venue = this.useMock
        ? await this.mockRepository.getVenueDetail(id)
        : mapVenueDtoToVenue(await venueApi.getVenueDetail(id));
      
      if (!venue) {
        return failure(new AppError('Venue not found', ErrorType.NotFoundFailure));
      }
      return success(venue);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to get venue detail',
        error.type || ErrorType.NetworkFailure
      ));
    }
  }

  async addVenueSuggestion(params: AddVenueSuggestionParams): Promise<Result<Venue>> {
    try {
      const venue = this.useMock
        ? await this.mockRepository.addVenueSuggestion(params)
        : mapVenueDtoToVenue(await venueApi.addVenueSuggestion(params));
      return success(venue);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to add venue suggestion',
        error.type || ErrorType.ValidationFailure
      ));
    }
  }

  async claimVenue(venueId: string): Promise<Result<void>> {
    try {
      if (this.useMock) {
        await this.mockRepository.claimVenue(venueId);
      } else {
        await venueApi.claimVenue(venueId);
      }
      return success(undefined);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to claim venue',
        error.type || ErrorType.NetworkFailure
      ));
    }
  }

  async updateVenueProfile(venueId: string, params: UpdateVenueProfileParams): Promise<Result<Venue>> {
    try {
      const venue = this.useMock
        ? await this.mockRepository.updateVenueProfile(venueId, params)
        : mapVenueDtoToVenue(await venueApi.updateVenueProfile(venueId, params));
      return success(venue);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to update venue profile',
        error.type || ErrorType.NetworkFailure
      ));
    }
  }

  async uploadVenuePhoto(venueId: string, fileUri: string): Promise<Result<string>> {
    try {
      const photoUrl = this.useMock
        ? await this.mockRepository.uploadVenuePhoto(venueId, fileUri)
        : (await venueApi.uploadVenuePhoto(venueId, fileUri)).photo_url;
      return success(photoUrl);
    } catch (error: any) {
      return failure(new AppError(
        error.message || 'Failed to upload photo',
        error.type || ErrorType.NetworkFailure
      ));
    }
  }
}
