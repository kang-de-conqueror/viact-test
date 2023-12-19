import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@ObjectType()
export class BaseEntity {
  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
  })
  @Exclude()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    name: 'updated_at',
  })
  @Exclude()
  updatedAt: Date;
}
