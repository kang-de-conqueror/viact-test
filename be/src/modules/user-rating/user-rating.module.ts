import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { UserRatingService } from './user-rating.service';
import { UserRatingResolver } from './user-rating.resolver';
import { MovieService } from '../movie/movie.service';
import { tmdbProvider } from '../external/movie-source/tmdb/tmdb.provider';

@Module({
  imports: [SharedModule],
  providers: [
    tmdbProvider,
    MovieService,
    UserRatingService,
    UserRatingResolver,
  ],
})
export class UserRatingModule {}
