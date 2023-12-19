import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { MovieSourceServiceInterface } from '../external/movie-source/movie-source-service.interface';
import { Movie } from './movie.entity';
import { plainToInstance } from 'class-transformer';
import { RedisService } from '../../shared/redis/redis.service';
import { createCacheKey } from '../../shared/redis/redis.helper';
import { RedisKeys } from '../../shared/redis/redis.constant';
import { fromArrayToObject } from '../../shared/helper';
import { isPosterMissing } from './movie.helper';
import {
  IPagination,
  IPaginationResponse,
} from '../../shared/pagination/pagination.types';
import {
  ONE_DAY_IN_SECONDS,
  PLACEHOLDER_POSTER_PATH,
} from '../../shared/app.constant';
import { ILike } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly redisService: RedisService,
    @Inject('MovieSourceServiceInterface')
    private readonly movieSourceService: MovieSourceServiceInterface<Movie>,
  ) {}

  public async findMovieById(id: number): Promise<Movie> {
    const foundMovie = await this.findMoviesByIds([id]);
    if (!foundMovie.length) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return foundMovie[0];
  }

  public async findMoviesByIds(ids: number[]): Promise<Movie[]> {
    const cachedMovies = await this.findCachedMoviesByIds(ids);

    const cacheMissIds: number[] = ids.filter((id: number) => {
      return !cachedMovies.find((movie) => movie?.id === id);
    });

    if (!cacheMissIds.length) {
      return plainToInstance(Movie, cachedMovies);
    }

    const dbMovies: Movie[] = await this.movieRepository.findByIds(
      cacheMissIds,
    );

    const missingPosterUrlMovieIds = dbMovies
      .filter(isPosterMissing)
      .map((movie: Movie) => movie.id);
    const missingMoviesInDbAndCache = cacheMissIds.filter(
      (id) => !dbMovies.find((movie) => movie.id === id),
    );

    if (!missingPosterUrlMovieIds.length && !missingMoviesInDbAndCache.length) {
      return [...cachedMovies, ...dbMovies];
    }

    const dbMoviesWithPosterUrl = await this.findMoviesWithPosterUrl(dbMovies);
    const missingDbMovies = await Promise.all(
      missingMoviesInDbAndCache.map((id) =>
        this.movieSourceService.findMovie(id),
      ),
    );
    const movies = [
      ...cachedMovies,
      ...dbMoviesWithPosterUrl,
      ...missingDbMovies,
    ];
    if (missingDbMovies?.length > 0) {
      await this.updateMoviesDataInPersistentStores(missingDbMovies);
    }

    return movies as Movie[];
  }

  private async findCachedMoviesByIds(ids: number[]) {
    const cachedMovies = await Promise.all(
      ids.map((id: number) =>
        this.redisService.getAsJson(createCacheKey(RedisKeys.MOVIE_DETAIL, id)),
      ),
    );
    return cachedMovies
      .filter(Boolean)
      .map((cachedMovie) => plainToInstance(Movie, cachedMovie));
  }

  public async findPopularMovies(): Promise<Movie[]> {
    return this.findCachedMovieList(
      createCacheKey(RedisKeys.MOVIE_LIST, 'popular'),
      this.movieSourceService.findPopularMovies.bind(this.movieSourceService),
      ONE_DAY_IN_SECONDS,
    );
  }

  public async findRecommendedMovies(userId: number): Promise<Movie[]> {
    const data = await this.findCachedMovieList(
      createCacheKey(RedisKeys.RECOMMENDATION_LIST, userId),
    );
    const movieIds = data?.map((m) => (m as any).movieId);
    return this.findMoviesByIds(movieIds);
  }

  public async findTrendingMovies(): Promise<Movie[]> {
    return this.findCachedMovieList(
      createCacheKey(RedisKeys.MOVIE_LIST, 'trending'),
      this.movieSourceService.findTrendingMovies.bind(this.movieSourceService),
      ONE_DAY_IN_SECONDS,
    );
  }

  public async findMoviesByGenre(
    genreId: number,
    pagination: IPagination,
  ): Promise<IPaginationResponse<Movie>> {
    const start = (pagination.page - 1) * pagination.perPage;
    const [movies, total] = await this.movieRepository
      .createQueryBuilder()
      .where('genres @> :genres', { genres: `[{ "id": ${genreId} }]` })
      .offset(start)
      .limit(pagination.perPage)
      .orderBy('popularity', 'DESC')
      .addOrderBy('vote_average', 'DESC')
      .addOrderBy('release_date', 'DESC')
      .getManyAndCount();

    const data = await this.findMoviesWithPosterUrl(movies);
    return {
      items: data,
      total,
      page: pagination.page,
      perPage: pagination.perPage,
    };
  }

  public async findMoviesByKeyword(
    keyword: string,
    pagination: IPagination,
  ): Promise<IPaginationResponse<Movie>> {
    const start = (pagination.page - 1) * pagination.perPage;
    const [movies, total] = await this.movieRepository.findAndCount({
      where: {
        title: ILike(`%${keyword}%`),
      },
      order: {
        popularity: 'DESC',
        voteAverage: 'DESC',
        releaseDate: 'DESC',
      },
      skip: start,
      take: pagination.perPage,
    });

    console.log('movies', movies);
    console.log('total', total);

    const data = await this.findMoviesWithPosterUrl(movies);
    return {
      items: data,
      total,
      page: pagination.page,
      perPage: pagination.perPage,
    };
  }

  private async findCachedMovieList(
    key: string,
    fallback?: () => Promise<Movie[]>,
    ttl?: number,
  ): Promise<Movie[]> {
    const cachedValue = await this.redisService.getAsJson(key);
    if (cachedValue) {
      if (Array.isArray(cachedValue)) {
        return cachedValue.map((movie) => plainToInstance(Movie, movie));
      }
    }

    if (fallback) {
      const data = await fallback();
      if (data?.length > 0) {
        await this.redisService.set(key, JSON.stringify(data), ttl);
        return data.map((movie) => plainToInstance(Movie, movie));
      }
    }

    return [];
  }

  private async updateMoviesDataInPersistentStores(updatedMovies: Movie[]) {
    await Promise.all([
      this.movieRepository.save(updatedMovies),
      this.redisService.bulkSetAsJson(
        updatedMovies.map((movie) =>
          createCacheKey(RedisKeys.MOVIE_DETAIL, movie.id),
        ),
        updatedMovies,
      ),
    ]);
  }

  private async findMoviesWithPosterUrl(movies: Movie[]) {
    const missingPosterUrlMovieIds: number[] = movies
      .filter(isPosterMissing)
      .map((movie: Movie) => movie.id);

    const moviesDataFromExternalSource: Movie[] = await Promise.all(
      missingPosterUrlMovieIds.map((id: number) => {
        return this.movieSourceService.findMovie(id);
      }),
    );
    const moviesDataFromExternalSourceById: Record<number, Movie> =
      fromArrayToObject(moviesDataFromExternalSource.filter(Boolean), 'id');

    return this.attachPosterUrlToMovie(
      movies,
      moviesDataFromExternalSourceById,
    );
  }

  private async attachPosterUrlToMovie(
    movies: Movie[],
    moviesDataFromExternalSourceById: Record<number, Movie>,
  ) {
    const missingPosterUrlMovies = [];
    const res = movies.map((movie) => {
      if (isPosterMissing(movie)) {
        const externalMovie: Movie = moviesDataFromExternalSourceById[movie.id];
        if (externalMovie?.posterPath) {
          movie.posterPath = externalMovie.posterPath;
          missingPosterUrlMovies.push(movie);
        } else {
          movie.posterPath = PLACEHOLDER_POSTER_PATH;
        }
      }
      return movie;
    });
    if (missingPosterUrlMovies.length > 0) {
      await this.updateMoviesDataInPersistentStores(missingPosterUrlMovies);
    }
    return res;
  }
}
