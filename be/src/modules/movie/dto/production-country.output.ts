import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductionCountry {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String)
  name: string;
}
