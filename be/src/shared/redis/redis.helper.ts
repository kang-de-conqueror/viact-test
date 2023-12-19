import { RedisKeys } from './redis.constant';

export function createCacheKey(
  cacheType: RedisKeys,
  uniqueKey: string | number,
): string {
  return `${cacheType}:${uniqueKey}`;
}
