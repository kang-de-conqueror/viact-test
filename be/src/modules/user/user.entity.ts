import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../shared/entity/base.entity';

@ObjectType()
@Entity({
  name: 'user',
})
export class User extends BaseEntity {
  @Field(() => Number)
  @PrimaryColumn({
    type: 'bigint',
  })
  id: number;

  @Field(() => String)
  @Column({
    name: 'username',
    unique: true,
  })
  username: string;

  @Field(() => String)
  @Column({
    name: 'password',
  })
  password: string;

  @Field(() => String)
  @Column()
  name: string;
}
