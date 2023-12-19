export interface MovieSourceServiceInterface<T> {
  findMovie(id: string | number): Promise<T>;

  findMovieByTitle(title: string): Promise<T>;

  findMoviesByGenre(genre: string): Promise<T[]>;

  findTrendingMovies(): Promise<T[]>;

  findPopularMovies(): Promise<T[]>;

  findMovieImages(id: string): Promise<any>;

  buildMoviePosterUrl(posterPath: string): string;
}
