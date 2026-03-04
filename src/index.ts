import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { PrismaClient } from '@prisma/client';
import QRCode from 'qrcode';
import { Type } from '@sinclair/typebox';

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Health Check
fastify.get('/health', async () => {
  return { status: 'ok' };
});

// POST /api/v1/qr - Generate QR
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
}, async (request, reply) => {
  const { targetUrl, slug } = request.body;

  // Simple slug generation if not provided
  const finalSlug = slug || Math.random().toString(36).substring(2, 8);

  // Create Redirect record
  const redirect = await prisma.redirect.create({
    data: {
      slug: finalSlug,
      targetUrl,
    },
  });

  const redirectUrl = `${BASE_URL}/${finalSlug}`;
  
  // Generate QR Code
  const qrCodeDataUrl = await QRCode.toDataURL(redirectUrl);

  return {
    qrCodeDataUrl,
    redirectUrl,
    slug: finalSlug,
  };
});

// GET /:slug - Redirect
fastify.get('/:slug', {
  schema: {
    params: Type.Object({
      slug: Type.String(),
    }),
  },
}, async (request, reply) => {
  const { slug } = request.params;

  const redirect = await prisma.redirect.findUnique({
    where: { slug },
  });

  if (!redirect) {
    reply.code(404).send({ error: 'Redirect not found' });
    return;
  }

  // Async update click count (don't await to speed up redirect)
  prisma.redirect.update({
    where: { id: redirect.id },
    data: { clicks: { increment: 1 } },
  }).catch((err) => request.log.error(err));

  reply.redirect(redirect.targetUrl);
});

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
