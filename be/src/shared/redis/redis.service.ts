import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { tryParseJson } from '../helper';

@Injectable()
export class RedisService {
  redis: Redis.Redis;

  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis(
      this.configService.get<number>('redis.port'),
      this.configService.get<string>('redis.host'),
      {
        password: this.configService.get<string>('redis.password'),
      },
    );
  }

  async get(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.redis.get(key, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  async set(key: string, value: string, ttl?: number): Promise<string> {
    return new Promise((resolve, reject) => {
      if (ttl) {
        this.redis.set(key, value, 'EX', ttl, function (err, result) {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      } else {
        this.redis.set(key, value, function (err, result) {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      }
    });
  }

  async getAsJson(
    key: string,
  ): Promise<Record<string, unknown> | Record<any, any>[]> {
    const data = (await this.get(key)) as any;
    return tryParseJson(data);
  }

  async setAsJson(key: string, value: any, ttl?: number): Promise<string> {
    return new Promise((resolve, reject) => {
      if (ttl) {
        this.redis.set(
          key,
          JSON.stringify(value),
          'EX',
          ttl,
          function (err, result) {
            if (err) {
              reject(err);
            }
            resolve(result);
          },
        );
      } else {
        this.redis.set(key, JSON.stringify(value), function (err, result) {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      }
    });
  }

  async setNx(key: string, value: string, ttl: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.redis.set(key, value, 'NX', 'EX', ttl, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  async del(key: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.redis.del(key, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  async bulkSetAsJson(
    keys: string[],
    values: any[],
    ttl?: number[],
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const pipeline = this.redis.pipeline();
      keys.forEach((key, index) => {
        if (ttl && ttl[index]) {
          pipeline.set(key, JSON.stringify(values[index]), 'EX', ttl[index]);
        } else {
          pipeline.set(key, JSON.stringify(values[index]));
        }
      });
      pipeline.exec(function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
}
