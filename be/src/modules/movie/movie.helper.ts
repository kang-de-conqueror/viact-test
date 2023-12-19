import { Movie } from './movie.entity';

export function isPosterMissing(movie: Movie): boolean {
  return !movie.posterPath || movie.posterPath == 'NaN';
}
