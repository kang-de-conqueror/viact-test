import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../shared/entity/base.entity';

@ObjectType()
@Entity({
  name: 'genre',
})
export class Genre extends BaseEntity {
  @Field(() => Number)
  @PrimaryColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;
}
