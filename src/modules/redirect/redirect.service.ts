import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RedirectService {
  async getRedirect(slug: string) {
    const redirect = await prisma.redirect.findUnique({
      where: { slug },
    });

    if (redirect) {
      // Fire and forget click increment
      this.incrementClicks(redirect.id);
    }

    return redirect;
  }

  private async incrementClicks(id: string) {
    try {
      await prisma.redirect.update({
        where: { id },
        data: { clicks: { increment: 1 } },
      });
    } catch (error) {
      console.error('Failed to increment clicks', error);
    }
  }
}
