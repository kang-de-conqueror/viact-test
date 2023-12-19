import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { TmdbService } from './tmdb.service';
import { GenreRepository } from '../../../genre/genre.repository';

jest.mock('cockatiel', () => {
  return {
    circuitBreaker: jest.fn(),
    handleAll: jest.fn(),
    SamplingBreaker: jest.fn(),
  };
});
describe('TmdbService', () => {
  let service: TmdbService;

  const mockedHttpService = {
    get: jest.fn(),
  };

  const mockedConfigService = {
    get: jest.fn(),
  };

  const mockedGenreRepository = {
    findByIds: jest.fn(),
  };

  beforeEach(async () => {
    jest.spyOn(mockedConfigService, 'get').mockImplementation((key) => {
      let value = null;
      switch (key) {
        case 'tmdb.api_url':
          value = 'tmdb_api_url';
          break;
        case 'tmdb.image_url':
          value = 'tmdb_image_url';
          break;
        case 'tmdb.api_key':
          value = 'tmdb_api_key';
          break;
        case 'tmdb.common.language':
          value = 'tmdb_common_language';
          break;
      }
      return value;
    });
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TmdbService,
        { provide: HttpService, useValue: mockedHttpService },
        { provide: GenreRepository, useValue: mockedGenreRepository },
        { provide: ConfigService, useValue: mockedConfigService },
      ],
    }).compile();

    service = moduleRef.get<TmdbService>(TmdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buildMoviePosterUrl', () => {
    it('should return correct poster url', () => {
      const posterPath = 'poster_path';
      expect(service.buildMoviePosterUrl(posterPath)).toEqual(
        'tmdb_image_url' + posterPath,
      );
    });
  });
});
