import { Command, Console } from 'nestjs-console';
import { MovieRepository } from '../modules/movie/movie.repository';
import { GenreRepository } from '../modules/genre/genre.repository';
import { parseFile } from '@fast-csv/parse';
import { fromSnakeToCamel, softEval } from '../shared/helper';
import { plainToInstance } from 'class-transformer';
import { Movie } from '../modules/movie/movie.entity';
import { UserRatingRepository } from '../modules/user-rating/user-rating.repository';
import { UserRating } from '../modules/user-rating/user-rating.entity';
import { RedisService } from '../shared/redis/redis.service';
import { RedisKeys } from '../shared/redis/redis.constant';
import { hash } from 'bcrypt';
import { AuthHelper } from '../modules/auth/helper/auth.helper';
import { User } from '../modules/user/user.entity';
import { UserRepository } from '../modules/user/user.repository';
import { getConnection } from 'typeorm';
import fs from 'fs';

@Console()
export class SeedConsole {
  constructor(
    private readonly redisService: RedisService,
    private readonly userRepository: UserRepository,
    private readonly genreRepository: GenreRepository,
    private readonly movieRepository: MovieRepository,
    private readonly userRatingRepository: UserRatingRepository,
  ) {}

  @Command({
    command: 'init-data',
  })
  async seed(): Promise<void> {
    await this.seedMovieAndGenreData();
    await this.seedUserAndUserRating();
    await this.seedKeywords();
    await this.createSequences();
    console.log('Done');
  }

  private async seedKeywords() {
    const keywords = {};
    return new Promise((resolve) =>
      parseFile('./src/console/data/keywords.csv', { headers: true })
        .on('error', (error) => console.error(error))
        .on('data', (row) => {
          keywords[row.id] = {
            keywords: softEval(row.keywords, []),
          };
        })
        .on('end', (rowCount: number) => {
          console.log(`[seedKeywords] Parsed ${rowCount} rows`);
          resolve(keywords);
        }),
    ).then(async (keywords) => {
      await this.redisService.setAsJson(RedisKeys.MOVIES_KEYWORDS, keywords);
    });
  }

  private async seedUserAndUserRating(): Promise<void> {
    const userRatings = [];
    const userIds = [];
    return new Promise((resolve) =>
      parseFile('./src/console/data/ratings_small.csv', { headers: true })
        .on('error', (error) => console.error(error))
        .on('data', (row) => {
          userRatings.push(row);
          userIds.push(row.userId);
        })
        .on('end', (rowCount: number) => {
          console.log(`[seedUserRatingData] Parsed ${rowCount} rows`);
          resolve(userRatings);
        }),
    ).then(async (userRatings) => {
      await Promise.all([
        this.insertUserRatingsInBatch(userRatings),
        this.insertUsersInBatch([...new Set(userIds)]),
      ]);
    });
  }

  private async seedMovieAndGenreData(): Promise<void> {
    const movies = {};
    const genres = {};
    return new Promise((resolve) =>
      parseFile('./src/console/data/movies_metadata.csv', { headers: true })
        .on('error', (error) => console.error(error))
        .on('data', (row) => {
          this.enrichMovies(movies, row);
          this.enrichGenres(row, genres);
        })
        .on('end', (rowCount: number) => {
          console.log(`[seedMovieData] Parsed ${rowCount} rows`);
          resolve([movies, genres]);
        }),
    ).then(async ([movies, genres]) => {
      await this.insertMoviesInBatch(movies);
      await this.genreRepository.insert(Object.values(genres));
    });
  }

  private async insertMoviesInBatch(movies) {
    const batch = 1000;
    const movieIds: string[] = Object.keys(movies);
    for (let i = 0; i < movieIds.length; i += batch) {
      const movieIdBatch = movieIds.slice(i, i + batch);
      const movieBatch = movieIdBatch
        .map((movieId) => plainToInstance(Movie, movies[movieId]))
        .filter((movie) => !isNaN(Number(movie.id)));
      await this.movieRepository.insert(movieBatch);
      console.log(`Inserted ${i + batch} movies`);
    }
  }

  private enrichMovies(movies, row) {
    const jsonFields = [
      'genres',
      'production_companies',
      'production_countries',
    ];

    const ignoreFields = ['poster_path'];
    movies[row.id] = Object.keys(row).reduce((acc, key) => {
      if (ignoreFields.includes(key)) return acc;
      const formattedKey = fromSnakeToCamel(key);
      let value = row[key];
      if (jsonFields.includes(key)) {
        value = softEval(value, []);
      }
      if (key == 'posterPath') {
        acc[formattedKey] = null;
      } else {
        acc[formattedKey] = value;
      }
      return acc;
    }, {});
  }

  private enrichGenres(row, genres) {
    const genreList = softEval(row.genres, []);
    if (Array.isArray(genreList)) {
      genreList.forEach((genre) => {
        genres[genre.id] = genre;
      });
    }
  }

  private async insertUserRatingsInBatch(userRatings) {
    const batch = 1000;
    for (let i = 0; i < userRatings.length; i += batch) {
      const userRatingBatch = userRatings
        .slice(i, i + batch)
        .map((userRating) => plainToInstance(UserRating, userRating));
      await this.userRatingRepository.insert(userRatingBatch);
      console.log(`Inserted ${i + batch} ratings`);
    }
  }

  private async insertUsersInBatch(userIds: number[]): Promise<void> {
    const BATCH = 100;
    const userWithRawPasswordData = [];
    for (let i = 0; i < userIds.length; i += BATCH) {
      const newUsersInfo = await Promise.all(
        userIds.slice(i, i + BATCH).map(async (userId) => {
          let password = AuthHelper.randomToken(10);
          const username = AuthHelper.randomToken(10);
          userWithRawPasswordData.push({
            id: userId,
            username,
            password,
          });
          password = await hash(password, 10);
          return plainToInstance(User, {
            id: userId,
            username,
            password,
            name: AuthHelper.randomToken(15),
          });
        }),
      );
      await this.userRepository.insert(newUsersInfo);
      console.log(`Inserted ${i + BATCH} users`);
    }
    // write user with raw password to file
    fs.writeFileSync(
      './data/user-with-raw-password.json',
      JSON.stringify(userWithRawPasswordData),
    );
  }

  private async createSequences(): Promise<void> {
    try {
      const connection = getConnection();
      const queryRunner = connection.createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.query(
          'CREATE SEQUENCE IF NOT EXISTS user_id_seq START 1000',
        );
        console.log('Sequence created successfully');
      } catch (error) {
        console.error('Error creating sequence:', error);
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      console.error('Error establishing connection:', error);
    }
  }
}
