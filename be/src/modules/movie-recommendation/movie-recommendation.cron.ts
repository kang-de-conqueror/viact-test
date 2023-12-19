import { Injectable } from '@nestjs/common';
import { RedisService } from '../../shared/redis/redis.service';
import { UserRatingRepository } from '../user-rating/user-rating.repository';
import { MovieRepository } from '../movie/movie.repository';
import prepareMovies from './preparation/movies';
import { prepareRatings } from './preparation/ratings';
import { fromArrayToObject, softEval } from '../../shared/helper';
import { RedisKeys } from '../../shared/redis/redis.constant';
import { Movie } from '../movie/movie.entity';
import pick from 'lodash/pick';
import { UserRepository } from '../user/user.repository';
import { predictWithLinearRegression } from './strategies/linearRegression';
import { createCacheKey } from '../../shared/redis/redis.helper';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MovieRecommendationCron {
  constructor(
    private readonly redisService: RedisService,
    private readonly userRatingRepository: UserRatingRepository,
    private readonly movieRepository: MovieRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * This solution might be terrible for large datasets,
   * but for the scope of this project, it should be fine.
   *
   *
   * Original source: https://github.com/javascript-machine-learning/movielens-recommender-system-javascript
   */
  @Cron('0 * * * *')
  async updateRecommendation() {
    console.log('Start to update recommendation');
    // use redis for distributed lock
    // only one instance of this cron job will run at a time
    // if the lock is not acquired, the cron job will not run
    // if the lock is acquired, the cron job will run
    // after the cron job is finished, the lock will be released
    const isLockAcquired = await this.redisService.setNx(
      RedisKeys.MOVIE_RECOMMENDATION_LOCK,
      '1',
      60 * 60,
    );
    if (!isLockAcquired) {
      console.log('Another job ran');
      return;
    }

    try {
      const [movies, ratings, keywords] = await Promise.all([
        this.movieRepository.find(),
        this.userRatingRepository.find(),
        this.redisService.getAsJson(RedisKeys.MOVIES_KEYWORDS),
      ]);

      if (!movies?.length || !ratings?.length) {
        console.log('No movies or ratings');
        return;
      }

      const normalizedMovies = this.normalizeMovies(movies);
      const { X, MOVIES_IN_LIST } = prepareMovies(
        fromArrayToObject(normalizedMovies, 'id'),
        keywords,
      );
      const { ratingsGroupedByUser } = prepareRatings(ratings);
      await this.updateUserRecommendationList(
        ratingsGroupedByUser,
        X,
        MOVIES_IN_LIST,
      );
      console.log('Done updateRecommendation');
    } catch (err) {
      console.error('Error', err);
    } finally {
      await this.redisService.del(RedisKeys.MOVIE_RECOMMENDATION_LOCK);
    }
  }

  private async updateUserRecommendationList(
    ratingsGroupedByUser,
    X,
    MOVIES_IN_LIST,
  ) {
    // Uncomment this if you want to run recommendation for all users
    // const userCounter = await this.userRepository.count();
    const userCounter = 50;;
    const BATCH = 10;

    for (let i = 0; i < userCounter; i += BATCH) {
      const userBatch = await this.userRepository.find({
        skip: i,
        take: BATCH,
        select: ['id'],
      });
      const userIds = userBatch.map((user) => user.id);
      const rcmLists = userIds
        .map((userId) => {
          const meUserRating = ratingsGroupedByUser[userId];
          const prediction = predictWithLinearRegression(
            X,
            MOVIES_IN_LIST,
            meUserRating,
          );
          if (meUserRating) {
            return {
              key: createCacheKey(RedisKeys.RECOMMENDATION_LIST, userId),
              value: prediction.sort((a, b) => b.score - a.score).slice(0, 20),
            };
          }
          return null;
        })
        .filter(Boolean);
      await this.redisService.bulkSetAsJson(
        rcmLists.map((rcmList) => rcmList.key),
        rcmLists.map((rcmList) => rcmList.value),
      );
    }
  }

  private normalizeMovies(movies: Movie[]) {
    const numberColumns = [
      'budget',
      'popularity',
      'revenue',
      'runtime',
      'voteAverage',
    ];
    return movies.map((m) => {
      const movie = {
        ...m,
        genres: softEval(m.genres, []),
        studio: softEval(m.productionCompanies, []),
      };
      numberColumns.forEach((column) => {
        movie[column] = Number(movie[column]) || 0;
      });

      return pick(movie, [
        'id',
        'adult',
        'budget',
        'genres',
        'title',
        'overview',
        'popularity',
        'studio',
        'releaseDate',
        'revenue',
        'runtime',
        'voteAverage',
        'voteCount',
      ]);
    });
  }
}
