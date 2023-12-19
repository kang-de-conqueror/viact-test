import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { configModuleOptions } from '../configuration/config-module';
import { UserRepository } from '../modules/user/user.repository';
import { MovieRepository } from '../modules/movie/movie.repository';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from './redis/redis.module';
import { UserRatingRepository } from '../modules/user-rating/user-rating.repository';
import { GenreRepository } from '../modules/genre/genre.repository';
import { ScheduleModule } from '@nestjs/schedule';

initializeTransactionalContext(); // Initialize cls-hooked
patchTypeORMRepositoryWithBaseRepository(); // patch Repository with BaseRepository.

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('database.host'),
          port: configService.get<number | undefined>('database.port'),
          database: configService.get<string>('database.name'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.password'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          timezone: 'Z',
          synchronize: false,
          // logging: true,
          extra: {
            connectionLimit: 20,
          },
        };
      },
    }),
    HttpModule,
    TypeOrmModule.forFeature([
      UserRepository,
      GenreRepository,
      MovieRepository,
      UserRatingRepository,
    ]),
    RedisModule,
    ScheduleModule.forRoot(),
  ],
  exports: [ConfigModule, TypeOrmModule, HttpModule, RedisModule],
})
export class SharedModule {}
