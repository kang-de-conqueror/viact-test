import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  username: string;
}
