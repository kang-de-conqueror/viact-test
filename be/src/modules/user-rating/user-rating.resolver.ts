import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRatingService } from './user-rating.service';
import { UserRating } from './user-rating.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { UseGuards } from '@nestjs/common';
import { RateInput } from './dto/rate.input';

@Resolver()
export class UserRatingResolver {
  constructor(private readonly userRatingService: UserRatingService) {}

  @Query(() => UserRating)
  @UseGuards(JwtGuard)
  public async userRatingOfMovie(
    @CurrentUser() user: User,
    @Args('movieId') movieId: number,
  ): Promise<UserRating> {
    return this.userRatingService.findUserRatingWithMovie(user.id, movieId);
  }

  @Mutation(() => UserRating)
  @UseGuards(JwtGuard)
  public async rateMovie(
    @CurrentUser() user: User,
    @Args('input') input: RateInput,
  ): Promise<UserRating> {
    await this.userRatingService.postUserRating(user.id, input);

    return this.userRatingService.findUserRatingWithMovie(
      user.id,
      input.movieId,
    );
  }
}
