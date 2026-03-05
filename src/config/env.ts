import { Type } from '@sinclair/typebox';

export const EnvSchema = Type.Object({
  PORT: Type.Number({ default: 3000 }),
  HOST: Type.String({ default: '0.0.0.0' }),
  BASE_URL: Type.String({ default: 'http://localhost:3000' }),
  DATABASE_URL: Type.String(),
});

export const getEnv = () => {
  return {
    PORT: Number(process.env.PORT) || 3000,
    HOST: process.env.HOST || '0.0.0.0',
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    DATABASE_URL: process.env.DATABASE_URL,
  };
};
