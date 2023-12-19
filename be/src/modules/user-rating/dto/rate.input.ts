import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';

@InputType()
export class RateInput {
  @Field(() => Int)
  @IsNumber()
  movieId: number;

  @Field(() => Number)
  @IsNumber()
  @Max(5)
  @Min(0)
  rating: number;
}
