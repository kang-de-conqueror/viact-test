import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import { tmdbProvider } from '../external/movie-source/tmdb/tmdb.provider';

@Module({
  imports: [SharedModule],
  providers: [tmdbProvider, MovieService, MovieResolver],
})
export class MovieModule {}
