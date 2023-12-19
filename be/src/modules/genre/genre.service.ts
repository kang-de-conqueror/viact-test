import { Injectable } from '@nestjs/common';
import { GenreRepository } from './genre.repository';
import { RedisService } from '../../shared/redis/redis.service';
import { Genre } from './genre.entity';
import { RedisKeys } from '../../shared/redis/redis.constant';
import { ONE_DAY_IN_SECONDS } from '../../shared/app.constant';

@Injectable()
export class GenreService {
  constructor(
    private readonly genreRepository: GenreRepository,
    private readonly redisService: RedisService,
  ) {}

  public async findGenres(): Promise<Genre[]> {
    const cachedGenres = await this.redisService.getAsJson(
      RedisKeys.GENRE_LIST,
    );

    if (cachedGenres) {
      return cachedGenres as Genre[];
    }

    const genres = await this.genreRepository.find();
    await this.redisService.setAsJson(
      RedisKeys.GENRE_LIST,
      genres,
      ONE_DAY_IN_SECONDS,
    );
    return genres;
  }
}
