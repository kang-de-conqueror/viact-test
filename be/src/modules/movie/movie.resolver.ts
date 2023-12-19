import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { User } from '../user/user.entity';
import { IPaginationResponse } from '../../shared/pagination/pagination.types';
import { PaginationArg } from '../../shared/pagination/pagination.arg';
import { PaginatedMovieListOutput } from './dto/paginated-movie-list.output';

@Resolver()
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query(() => Movie)
  async movie(@Args('id', { type: () => Int }) id: number): Promise<Movie> {
    const res = await this.movieService.findMovieById(id);
    return res;
  }

  @Query(() => [Movie])
  async popularMovies(): Promise<Movie[]> {
    return this.movieService.findPopularMovies();
  }

  @Query(() => [Movie])
  async trendingMovies(): Promise<Movie[]> {
    return this.movieService.findTrendingMovies();
  }

  @Query(() => PaginatedMovieListOutput)
  async findMoviesByGenre(
    @Args('genreId', { type: () => Number }) genreId: number,
    @Args('pagination') pagination: PaginationArg,
  ): Promise<IPaginationResponse<Movie>> {
    return this.movieService.findMoviesByGenre(genreId, pagination);
  }

  @Query(() => [Movie])
  @UseGuards(JwtGuard)
  async recommendedMovies(@CurrentUser() user: User): Promise<Movie[]> {
    return this.movieService.findRecommendedMovies(user.id);
  }

  @Query(() => PaginatedMovieListOutput)
  async searchMovies(
    @Args('query', { type: () => String }) query: string,
    @Args('pagination') pagination: PaginationArg,
  ): Promise<IPaginationResponse<Movie>> {
    return this.movieService.findMoviesByKeyword(query, pagination);
  }
}
