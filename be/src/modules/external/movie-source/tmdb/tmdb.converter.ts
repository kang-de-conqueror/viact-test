import { TmdbListItem, TmdbMovieDetail } from './tmdb.types';
import { Movie } from '../../../movie/movie.entity';
import { plainToInstance } from 'class-transformer';
import { fromSnakeToCamel } from '../../../../shared/helper';

export class TmdbConverter {
  public static convertListItemToMovieEntity(listItem: TmdbListItem): Movie {
    return plainToInstance(Movie, {
      adult: listItem.adult,
      genreIds: listItem.genre_ids,
      id: listItem.id,
      originalTitle: listItem.original_title,
      popularity: listItem.popularity,
      posterPath: listItem.poster_path,
      releaseDate: listItem.release_date,
      title: listItem.title,
      video: listItem.video,
      voteAverage: listItem.vote_average,
      voteCount: listItem.vote_count,
    });
  }

  public static convertDetailToMovieEntity(detail: TmdbMovieDetail): Movie {
    return plainToInstance(
      Movie,
      Object.keys(detail).reduce((acc, key) => {
        acc[fromSnakeToCamel(key)] = detail[key];
        return acc;
      }, {}),
    );
  }
}
