import { Module } from '@nestjs/common';
import { tmdbProvider } from './tmdb/tmdb.provider';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from '../../../shared/shared.module';

@Module({
  imports: [SharedModule, HttpModule],
  providers: [tmdbProvider],
})
export class MovieSourceModule {}
