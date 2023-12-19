import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRatingRepository } from './user-rating.repository';
import { MovieService } from '../movie/movie.service';
import { RateInput } from './dto/rate.input';
import { plainToInstance } from 'class-transformer';
import { UserRating } from './user-rating.entity';

@Injectable()
export class UserRatingService {
  constructor(
    private readonly userRatingRepository: UserRatingRepository,
    private readonly movieService: MovieService,
  ) {}

  public async postUserRating(userId: number, input: RateInput): Promise<void> {
    const { rating, movieId } = input;
    const movie = await this.movieService.findMovieById(movieId);
    const existingRating = await this.userRatingRepository.findOne({
      where: { userId, movieId },
      select: ['id'],
    });
    if (existingRating) {
      throw new BadRequestException('You have already rated this movie');
    }

    await this.userRatingRepository.insert(
      plainToInstance(UserRating, {
        userId,
        movieId,
        rating,
        timestamp: Date.now(),
      }),
    );
  }

  public async findUserRatingWithMovie(
    userId: number,
    movieId: number,
  ): Promise<UserRating> {
    const userRating = await this.userRatingRepository.findOne({
      where: { userId, movieId },
    });

    if (!userRating) {
      return {
        id: -1,
        userId,
        movieId,
        rating: 0,
        timestamp: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return userRating;
  }
}
