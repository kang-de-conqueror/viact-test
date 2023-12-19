import { EntityRepository, Repository } from 'typeorm';
import { UserRating } from './user-rating.entity';

@EntityRepository(UserRating)
export class UserRatingRepository extends Repository<UserRating> {}
