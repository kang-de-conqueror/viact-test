import { TmdbService } from './tmdb.service';
import { Provider } from '@nestjs/common';

export const tmdbProvider: Provider = {
  provide: 'MovieSourceServiceInterface',
  useClass: TmdbService,
};
