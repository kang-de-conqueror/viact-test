import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dtos/register.input';
import { RegisterOutput } from './dtos/register-output';
import { LoginInput } from './dtos/login-input';
import { AuthTokenOutputDto } from './dtos/auth-token-output.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from './guards/jwt.guard';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => RegisterOutput)
  async register(@Args('input') input: RegisterInput): Promise<RegisterOutput> {
    return this.authService.register(input);
  }

  @Mutation(() => AuthTokenOutputDto)
  async login(@Args('input') input: LoginInput): Promise<AuthTokenOutputDto> {
    return this.authService.login(input);
  }

  @Query(() => User)
  @UseGuards(JwtGuard)
  async whoAmI(@CurrentUser() user: User) {
    return this.userService.findByUsername(user.username);
  }
}
