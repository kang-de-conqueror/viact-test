import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { MovieRecommendationCron } from './movie-recommendation.cron';

@Module({
  imports: [SharedModule],
  providers: [MovieRecommendationCron],
  exports: [MovieRecommendationCron],
})
export class MovieRecommendationModule {}
