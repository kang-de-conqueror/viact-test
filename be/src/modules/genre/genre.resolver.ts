import { Query, Resolver } from '@nestjs/graphql';
import { Genre } from './genre.entity';
import { GenreService } from './genre.service';

@Resolver()
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

  @Query(() => [Genre])
  async genres(): Promise<Genre[]> {
    return this.genreService.findGenres();
  }
}
