import { PrismaClient } from '@prisma/client';
import QRCode from 'qrcode';
import { getEnv } from '../../config/env';

const prisma = new PrismaClient();
const env = getEnv();

export class QrService {
  private generateSlug(length = 6): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  async createQr(targetUrl: string, customSlug?: string) {
    let slug = customSlug;
    
    // TODO: Better collision handling
    if (!slug) {
      slug = this.generateSlug();
    }

    const redirect = await prisma.redirect.create({
      data: {
        slug,
        targetUrl,
      },
    });

    const redirectUrl = `${env.BASE_URL}/${slug}`;
    const qrCodeDataUrl = await QRCode.toDataURL(redirectUrl);

    return {
      slug: redirect.slug,
      redirectUrl,
      qrCodeDataUrl,
    };
  }
}
