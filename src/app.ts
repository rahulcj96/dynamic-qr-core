import Fastify, { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { qrRoutes } from './modules/qr/qr.route';
import { redirectRoutes } from './modules/redirect/redirect.route';

export function buildApp(): FastifyInstance {
  const fastify = Fastify({
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  // Health Check
  fastify.get('/health', async () => {
    return { status: 'ok' };
  });

  // Register Modules
  fastify.register(qrRoutes);
  fastify.register(redirectRoutes);

  return fastify;
}
