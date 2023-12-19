import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../shared/entity/base.entity';
import { Transform } from 'class-transformer';

@ObjectType()
@Entity({
  name: 'user_rating',
})
@Index(['userId', 'movieId'], { unique: true })
export class UserRating extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id: number;

  @Transform(({ value }) => Number(value))
  @Field(() => Number)
  @Column({
    name: 'user_id',
  })
  userId: number;

  @Transform(({ value }) => Number(value))
  @Field(() => Number)
  @Column({
    name: 'move_id',
  })
  movieId: number;

  @Transform(({ value }) => Number(value))
  @Field(() => Number)
  @Column({
    name: 'rating',
    type: 'decimal',
  })
  rating: number;

  @Field(() => Number)
  @Transform(({ value }) => Number(value))
  @Column({
    type: 'bigint',
    nullable: true,
  })
  timestamp: number;
}
