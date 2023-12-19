import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../shared/pagination/paginated-data';
import { Movie } from '../movie.entity';

@ObjectType()
export class PaginatedMovieListOutput extends Paginated(Movie) {}
