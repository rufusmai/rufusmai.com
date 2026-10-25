import type { MetadataRoute } from 'next';

import { HOST } from '@/lib/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${HOST}/sitemap.xml`,
    host: HOST,
  };
}
