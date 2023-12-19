import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JWT_SECRET } from '../../configuration/env';
import { AuthResolver } from './auth.resolver';
import { SharedModule } from '../../shared/shared.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SharedModule,
    PassportModule.register({
      defaultStrategy: 'jwt-auth',
    }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: JWT_SECRET,
      }),
    }),
    UserModule,
  ],
  providers: [ConfigService, JwtStrategy, AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
