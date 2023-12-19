import { Movie } from '../../../movie/movie.entity';
import { TmdbConverter } from './tmdb.converter';

describe('TmdbConverter', () => {
  describe('convertListItemToMovieEntity', () => {
    it('should convert a TmdbListItem to a Movie entity', () => {
      // Arrange
      const listItem = {
        adult: false,
        genre_ids: [1, 2, 3],
        id: 123,
        original_title: 'Test Movie',
        popularity: 7.8,
        poster_path: '/poster.jpg',
        release_date: '2021-01-01',
        title: 'Test Movie',
        video: false,
        vote_average: 8.5,
        vote_count: 1000,
        backdrop_path: '/backdrop.jpg',
        original_language: 'en',
        overview: 'This is a test movie',
      };

      // Act
      const result = TmdbConverter.convertListItemToMovieEntity(listItem);

      // Assert
      expect(result).toBeInstanceOf(Movie);
      expect(result.adult).toBe(false);
      expect(result.id).toBe(123);
      expect(result.originalTitle).toBe('Test Movie');
      expect(result.popularity).toBe(7.8);
      expect(result.posterPath).toBe('/poster.jpg');
      expect(result.releaseDate).toBe('2021-01-01');
      expect(result.title).toBe('Test Movie');
      expect(result.video).toBe(false);
      expect(result.voteAverage).toBe(8.5);
      expect(result.voteCount).toBe(1000);
    });
  });

  describe('convertDetailToMovieEntity', () => {
    it('should convert a TmdbMovieDetail to a Movie entity', () => {
      // Arrange
      const detail = {
        id: 123,
        original_title: 'Test Movie',
        overview: 'This is a test movie',
        poster_path: '/poster.jpg',
        release_date: '2021-01-01',
        title: 'Test Movie',
        vote_average: 8.5,
        vote_count: 1000,
        adult: false,
        budget: 0,
        genres: [
          {
            id: 1,
            name: 'genre_1',
          },
          {
            id: 2,
            name: 'genre_2',
          },
          {
            id: 3,
            name: 'genre_3',
          },
        ],
        imdb_id: 'tt123',
        original_language: 'en',
        popularity: 7.8,
        production_companies: [
          {
            id: 1,
            name: 'test_company',
          },
        ],
        revenue: 0,
        runtime: 0,
        status: 'Released',
        tagline: 'This is a test movie',
        video: false,
        production_countries: [
          {
            iso_3166_1: 'US',
            name: 'United States of America',
          },
        ],
      };

      // Act
      const result = TmdbConverter.convertDetailToMovieEntity(detail);

      // Assert
      expect(result).toBeInstanceOf(Movie);
      expect(result.id).toBe(123);
      expect(result.originalTitle).toBe('Test Movie');
      expect(result.overview).toBe('This is a test movie');
      expect(result.posterPath).toBe('/poster.jpg');
      expect(result.releaseDate).toBe('2021-01-01');
      expect(result.title).toBe('Test Movie');
      expect(result.voteAverage).toBe(8.5);
      expect(result.voteCount).toBe(1000);
    });
  });
});
