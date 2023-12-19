import * as dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string, isRequired = false): string => {
  const value = process.env[key];
  if (isRequired && !value) {
    throw new Error(`env.${key} is required`);
  }
  return value;
};

// server
export const NODE_ENV = getEnv('NODE_ENV');
export const PORT = parseInt(getEnv('SERVER_PORT'), 10);

// project
export const PROJECT_NAME = getEnv('PROJECT_NAME');
export const PROJECT_VERSION = getEnv('PROJECT_VERSION');

export const DB_PORT: number = parseInt(getEnv('DB_PORT'), 10);
export const DB_HOST: string = getEnv('DB_HOST');
export const DB_NAME: string = getEnv('DB_NAME');
export const DB_USER: string = getEnv('DB_USER');
export const DB_PASSWORD: string = getEnv('DB_PASS');

export const JWT_SECRET: string = getEnv('JWT_SECRET');
export const JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS: number = parseInt(
  getEnv('JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS'),
  10,
);
export const DEFAULT_API_KEY = getEnv('DEFAULT_API_KEY');
export const REDIS_HOST: string = getEnv('REDIS_HOST');
export const REDIS_PORT: number = parseInt(getEnv('REDIS_PORT'), 10);
export const REDIS_PASSWORD: string = getEnv('REDIS_PASSWORD');
export const REDIS_ENABLED = Boolean(getEnv('REDIS_ENABLED'));
export const CACHE_TTL: number = parseInt(getEnv('CACHE_TTL'), 10);
export const CACHE_ENABLED = Boolean(getEnv('CACHE_ENABLED'));
export const TMDB_API_KEY = getEnv('TMDB_API_KEY');
export const TMDB_API_URL = getEnv('TMDB_API_URL');
export const TMDB_IMG_URL = getEnv('TMDB_IMG_URL');
