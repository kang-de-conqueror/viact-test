import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  DEFAULT_API_KEY,
  JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  JWT_SECRET,
  PORT,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  TMDB_API_KEY,
  TMDB_API_URL,
  TMDB_IMG_URL,
} from './env';

export default (): any => ({
  port: PORT,
  database: {
    host: DB_HOST,
    port: DB_PORT,
    name: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  },
  jwt: {
    secret: JWT_SECRET,
    accessTokenExpiresInSeconds: JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  },
  defaultApiKey: DEFAULT_API_KEY,
  graphql: {
    playground: true,
  },
  tmdb: {
    api_key: TMDB_API_KEY,
    api_url: TMDB_API_URL,
    image_url: TMDB_IMG_URL,
    common: {
      language: 'en-US',
    },
  },
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
});
