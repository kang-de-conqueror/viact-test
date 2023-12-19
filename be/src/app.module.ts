import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MovieSourceModule } from './modules/external/movie-source/movie-source.module';
import { GenreModule } from './modules/genre/genre.module';
import { MovieRecommendationModule } from './modules/movie-recommendation/movie-recommendation.module';
import { MovieModule } from './modules/movie/movie.module';
import { UserRatingModule } from './modules/user-rating/user-rating.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          playground: configService.get<boolean>('graphql.playground'),
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        };
      },
    }),
    AuthModule,
    MovieSourceModule,
    MovieModule,
    MovieRecommendationModule,
    GenreModule,
    UserRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
