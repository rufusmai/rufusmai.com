import type { Pathnames } from 'next-intl/routing';

export const pathnames = {
  '/': '/',
  '/consulting': '/consulting',
  '/labs': '/labs',
  '/projects/[slug]': {
    de: '/projekte/[slug]',
    en: '/projects/[slug]',
  },
  '/contact': {
    de: '/kontakt',
    en: '/contact',
  },
  '/imprint': {
    de: '/impressum',
    en: '/imprint',
  },
  '/privacy': {
    de: '/datenschutz',
    en: '/privacy',
  },
} satisfies Pathnames<['de', 'en']>;
