import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { QrService } from './qr.service';

const qrService = new QrService();

export async function qrRoutes(fastify: FastifyInstance) {
  fastify.post('/api/v1/qr', {
    schema: {
      body: Type.Object({
        targetUrl: Type.String({ format: 'uri' }),
        slug: Type.Optional(Type.String({ maxLength: 16 })),
      }),
      response: {
        200: Type.Object({
          qrCodeDataUrl: Type.String(),
          redirectUrl: Type.String(),
          slug: Type.String(),
        }),
      },
    },
  }, async (request) => {
    const { targetUrl, slug } = request.body;
    return qrService.createQr(targetUrl, slug);
  });
}
