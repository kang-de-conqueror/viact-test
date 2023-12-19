import { MovieService } from './movie.service';
import { MovieRepository } from './movie.repository';
import { TmdbService } from '../external/movie-source/tmdb/tmdb.service';
import { RedisService } from '../../shared/redis/redis.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MovieService', () => {
  let service: MovieService;

  const mockedMovieRepository = {
    findByIds: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockedTmdbService = {
    findPopularMovies: jest.fn(),
    findMovieById: jest.fn(),
    findTrendingMovies: jest.fn(),
    findMovie: jest.fn(),
  };

  const mockedRedisService = {
    getAsJson: jest.fn(),
    setAsJson: jest.fn(),
    bulkSetAsJson: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        { provide: MovieRepository, useValue: mockedMovieRepository },
        { provide: TmdbService, useValue: mockedTmdbService },
        { provide: RedisService, useValue: mockedRedisService },
        {
          provide: 'MovieSourceServiceInterface',
          useValue: mockedTmdbService,
        },
      ],
    }).compile();

    service = moduleRef.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMoviesByIds', () => {
    it('should return data from cache if all data are cached ', () => {
      const ids = [1, 2, 3];
      const cachedMovies = [
        { id: 1, title: 'test1' },
        { id: 2, title: 'test2' },
        { id: 3, title: 'test3' },
      ];
      jest.spyOn(mockedRedisService, 'getAsJson').mockImplementation((key) => {
        const index = ids.indexOf(Number(key.split(':')[1]));
        return cachedMovies[index];
      });
      jest.spyOn(mockedMovieRepository, 'findByIds').mockResolvedValue([]);
      jest.spyOn(mockedTmdbService, 'findMovieById').mockResolvedValue(null);

      expect(service.findMoviesByIds(ids)).resolves.toEqual(cachedMovies);
      expect(mockedRedisService.getAsJson).toHaveBeenCalledTimes(3);
      expect(mockedMovieRepository.findByIds).toHaveBeenCalledTimes(0);
      expect(mockedTmdbService.findMovieById).toHaveBeenCalledTimes(0);
    });

    it('should return data from db if all data are not cached ', async () => {
      const ids = [1, 2, 3];
      const dbMovies = [
        { id: 1, title: 'test1', posterPath: 'posterUrl' },
        { id: 2, title: 'test2', posterPath: 'posterUrl' },
        { id: 3, title: 'test3', posterPath: 'posterUrl' },
      ];
      jest.spyOn(mockedRedisService, 'getAsJson').mockResolvedValue(null);
      jest
        .spyOn(mockedMovieRepository, 'findByIds')
        .mockResolvedValue(dbMovies);
      jest.spyOn(mockedTmdbService, 'findMovieById').mockResolvedValue(null);

      const res = await service.findMoviesByIds(ids);
      expect(res).toEqual(dbMovies);
      expect(mockedRedisService.getAsJson).toHaveBeenCalledTimes(3);
      expect(mockedMovieRepository.findByIds).toHaveBeenCalledTimes(1);
      expect(mockedTmdbService.findMovieById).toHaveBeenCalledTimes(0);
    });

    it('should return data from db and external db source when poster path is missing in db', async () => {
      const ids = [1, 2, 3];
      const dbMovies = [
        { id: 1, title: 'test1', posterPath: 'posterUrl' },
        { id: 2, title: 'test2', posterPath: 'posterUrl' },
        { id: 3, title: 'test3', posterPath: 'posterUrl' },
      ];
      jest.spyOn(mockedRedisService, 'getAsJson').mockImplementation((key) => {
        switch (key) {
          case 'MOVIE_DETAIL:1':
            return dbMovies[0];
          default:
            return null;
        }
      });
      jest
        .spyOn(mockedMovieRepository, 'findByIds')
        .mockResolvedValue([dbMovies[1]]);
      jest
        .spyOn(mockedTmdbService, 'findMovieById')
        .mockImplementation((id) => {
          switch (id) {
            case 3:
              return dbMovies[2];
            default:
              return null;
          }
        });
      jest.spyOn(mockedTmdbService, 'findMovie').mockImplementation((id) => {
        return dbMovies.find((movie) => movie.id === id);
      });

      const res = await service.findMoviesByIds(ids);
      expect(res).toEqual(dbMovies);
      expect(mockedRedisService.getAsJson).toHaveBeenCalledTimes(3);
      expect(mockedMovieRepository.findByIds).toHaveBeenCalledTimes(1);
      expect(mockedTmdbService.findMovieById).toHaveBeenCalledTimes(0);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
  });
});
