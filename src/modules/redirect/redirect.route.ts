import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { RedirectService } from './redirect.service';

const redirectService = new RedirectService();

export async function redirectRoutes(fastify: FastifyInstance) {
  fastify.get('/:slug', {
    schema: {
      params: Type.Object({
        slug: Type.String(),
      }),
    },
  }, async (request, reply) => {
    const { slug } = request.params;
    const redirect = await redirectService.getRedirect(slug);

    if (!redirect) {
      return reply.code(404).send({ error: 'Redirect not found' });
    }

    return reply.redirect(redirect.targetUrl);
  });
}
