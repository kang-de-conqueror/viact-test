import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthTokenOutputDto } from './dtos/auth-token-output.dto';
import { User } from '../user/user.entity';
import { plainToInstance } from 'class-transformer';
import { RegisterInput } from './dtos/register.input';
import { RegisterOutput } from './dtos/register-output';
import { LoginInput } from './dtos/login-input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async login(input: LoginInput): Promise<AuthTokenOutputDto> {
    const user = await this.userService.validateUsernamePassword(
      input.username,
      input.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return this.getAuthToken(user);
  }

  async register(input: RegisterInput): Promise<RegisterOutput> {
    const user = await this.userService.createUser(input);
    return this.getAuthToken(user);
  }

  getAuthToken(user: Partial<User>): AuthTokenOutputDto {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return plainToInstance(AuthTokenOutputDto, {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<number>(
          'jwt.accessTokenExpiresInSeconds',
        ),
      }),
    });
  }
}
