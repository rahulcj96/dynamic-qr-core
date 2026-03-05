import { buildApp } from './app';
import { getEnv } from './config/env';

const start = async () => {
  const app = buildApp();
  const env = getEnv();

  try {
    await app.listen({ port: env.PORT, host: env.HOST });
    console.log(`Server listening at ${env.BASE_URL}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
