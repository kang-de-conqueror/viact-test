import { MovieSourceServiceInterface } from '../movie-source-service.interface';
import { Movie } from '../../../movie/movie.entity';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { TmdbConverter } from './tmdb.converter';
import { firstValueFrom } from 'rxjs';
import {
  circuitBreaker,
  CircuitBreakerPolicy,
  handleAll,
  SamplingBreaker,
} from 'cockatiel';
import { circuitBreakerCallFunctionWithFallback } from '../../../../shared/resilience/circuit-breaker/circuit-breaker.helper';
import { GenreRepository } from '../../../genre/genre.repository';
import { Genre } from '../../../genre/genre.entity';

@Injectable()
export class TmdbService implements MovieSourceServiceInterface<Movie> {
  private readonly tmdbCircuitBreaker: CircuitBreakerPolicy;
  private readonly baseUrl: string = '';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly genreRepository: GenreRepository,
  ) {
    this.baseUrl = configService.get<string>('tmdb.api_url');
    this.tmdbCircuitBreaker = circuitBreaker(handleAll, {
      halfOpenAfter: 10000,
      breaker: new SamplingBreaker({
        threshold: 0.7,
        duration: 10000,
        minimumRps: 10,
      }),
    });
  }

  public buildMoviePosterUrl(posterPath: string): string {
    return this.configService.get<string>('tmdb.image_url') + posterPath;
  }

  public async findMovie(id: string | number): Promise<Movie> {
    return circuitBreakerCallFunctionWithFallback(
      this.tmdbCircuitBreaker,
      this.findMovieFromTmdb.bind(this),
      this.fallbackGettingSingle.bind(this),
      id,
    );
  }

  public async findPopularMovies(): Promise<Movie[]> {
    return circuitBreakerCallFunctionWithFallback(
      this.tmdbCircuitBreaker,
      this.findPopularMoviesFromTmdb.bind(this),
      this.fallbackGettingList.bind(this),
    );
  }

  public async findTrendingMovies(): Promise<Movie[]> {
    return circuitBreakerCallFunctionWithFallback(
      this.tmdbCircuitBreaker,
      this.findTrendingMoviesFromTmdb.bind(this),
      this.fallbackGettingList.bind(this),
    );
  }

  public async findMovieImages(id: string): Promise<any> {
    return circuitBreakerCallFunctionWithFallback(
      this.tmdbCircuitBreaker,
      this.findMovieImagesFromTmdb.bind(this),
      this.fallbackGettingList.bind(this),
      id,
    );
  }

  public findMovieByTitle(title: string): Promise<Movie> {
    return Promise.resolve(undefined);
  }

  public findMoviesByGenre(genre: string): Promise<Movie[]> {
    return Promise.resolve([]);
  }

  private async findTrendingMoviesFromTmdb(): Promise<Movie[]> {
    return this.findMovieListFromTmdb(
      this.baseUrl + '/trending/movie/day' + this.generateQuery(),
    );
  }

  private async findMovieFromTmdb(id: string | number): Promise<Movie> {
    const result = await firstValueFrom(
      this.httpService.get(
        this.baseUrl + '/movie/' + id + this.generateQuery(),
      ),
    );
    if (result?.data) {
      result.data.poster_path = this.buildMoviePosterUrl(
        result.data.poster_path,
      );
      return TmdbConverter.convertDetailToMovieEntity(result.data);
    }

    return null;
  }

  private async findPopularMoviesFromTmdb(): Promise<Movie[]> {
    return this.findMovieListFromTmdb(
      this.baseUrl + '/movie/popular' + this.generateQuery(),
    );
  }

  private async findMovieImagesFromTmdb(id: string): Promise<any> {
    const result = await firstValueFrom(
      this.httpService.get(
        this.baseUrl + '/movie/' + id + '/images' + this.generateQuery(),
      ),
    );
    return result?.data?.results || [];
  }

  private generateQuery(options?: Record<any, any>): string {
    let query: string =
      '?api_key=' +
      this.configService.get<string>('tmdb.api_key') +
      '&language=' +
      this.configService.get<string>('tmdb.common.language');

    if (options) {
      for (const key in options) {
        if (key != 'id' && key != 'body') {
          query += +'&' + key + '=' + options[key];
        }
      }
    }
    return query;
  }

  private fallbackGettingList<T>(): Promise<T[]> {
    return Promise.resolve([]);
  }

  private fallbackGettingSingle<T>(): Promise<T> {
    return Promise.resolve(undefined);
  }

  private async findMovieListFromTmdb(url: string): Promise<Movie[]> {
    const result = await firstValueFrom(this.httpService.get(url));
    const data = result?.data?.results || [];
    const genreIds: number[] = data.map((movie) => movie.genreIds).flat();
    const genres: Genre[] = await this.genreRepository.findByIds(genreIds, {
      select: ['id', 'name'],
    });
    return data.map((movie) => {
      movie.poster_path = this.buildMoviePosterUrl(movie.poster_path);
      movie.genres = genres.filter((genre: Genre) =>
        movie.genreIds.includes(genre.id),
      );
      return TmdbConverter.convertListItemToMovieEntity(movie);
    });
  }
}
