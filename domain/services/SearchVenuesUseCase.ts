// domain/usecases/SearchVenuesUseCase.ts

import { Result } from '../common/Result';
import { Venue } from '../entities/Venue';
import { VenueRepository, SearchVenuesParams } from '../repositories/VenueRepository';

export class SearchVenuesUseCase {
  constructor(private venueRepository: VenueRepository) {}

  async execute(params: SearchVenuesParams): Promise<Result<Venue[]>> {
    return this.venueRepository.searchVenues(params);
  }
}
