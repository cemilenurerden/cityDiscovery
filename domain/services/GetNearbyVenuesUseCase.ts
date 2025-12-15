// domain/usecases/GetNearbyVenuesUseCase.ts

import { Result } from '../common/Result';
import { Venue } from '../entities/Venue';
import { VenueRepository, GetNearbyParams } from '../repositories/VenueRepository';

export class GetNearbyVenuesUseCase {
  constructor(private venueRepository: VenueRepository) {}

  async execute(params: GetNearbyParams): Promise<Result<Venue[]>> {
    return this.venueRepository.getNearby(params);
  }
}
