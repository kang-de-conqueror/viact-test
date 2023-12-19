import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsPositive, Min } from 'class-validator';

@InputType()
export class PaginationArg {
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Field(() => Int, { defaultValue: 20 })
  perPage: number;
}
