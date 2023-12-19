import { Field, ObjectType } from '@nestjs/graphql';

export function Paginated<T>(classRef: new () => T): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedClass {
    @Field(() => [classRef], { nullable: true })
    items: T[];

    @Field(() => Number)
    total: number;

    @Field(() => Number)
    page: number;

    @Field(() => Number)
    perPage: number;
  }

  return PaginatedClass;
}
