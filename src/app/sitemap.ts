import type { MetadataRoute } from 'next';

import { getCaseStudies } from '@/content/projects';
import { routing } from '@/i18n/routing';
import { getAlternates } from '@/lib/metadata';

type Href = Parameters<typeof getAlternates>[0];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { href: Href; priority: number }[] = [
    { href: '/', priority: 1 },
    { href: '/consulting', priority: 0.9 },
    { href: '/labs', priority: 0.8 },
    ...getCaseStudies().map((project) => ({
      href: {
        pathname: '/projects/[slug]' as const,
        params: { slug: project.slug },
      },
      priority: 0.7,
    })),
    { href: '/contact', priority: 0.6 },
    { href: '/imprint', priority: 0.1 },
    { href: '/privacy', priority: 0.1 },
  ];

  return pages.flatMap(({ href, priority }) =>
    routing.locales.map((locale) => {
      const { canonical, languages } = getAlternates(href, locale);
      return {
        url: canonical,
        priority,
        alternates: { languages: { de: languages.de, en: languages.en } },
      };
    })
  );
}
