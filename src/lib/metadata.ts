import type { Metadata } from 'next';

import { getPathname, type Locale, routing } from '@/i18n/routing';

export const HOST = 'https://rufusmai.com';

const X_DEFAULT_LOCALE: Locale = 'en';

type Href = Parameters<typeof getPathname>[0]['href'];

export function getLocalizedUrl(href: Href, locale: Locale) {
  return `${HOST}${getPathname({ locale, href })}`;
}

/** Manual canonical and hreflang alternates for a page. */
export function getAlternates(href: Href, locale: Locale) {
  const languages = Object.fromEntries(
    routing.locales.map((lang) => [lang, getLocalizedUrl(href, lang)])
  ) as Record<Locale, string>;

  return {
    canonical: getLocalizedUrl(href, locale),
    languages: {
      ...languages,
      'x-default': getLocalizedUrl(href, X_DEFAULT_LOCALE),
    },
  } satisfies Metadata['alternates'];
}

interface PageMetadataOptions {
  href: Href;
  locale: Locale;
  title: string;
  description: string;
  /** Use the title as is instead of applying the layout's title template. */
  absoluteTitle?: boolean;
}

export function getPageMetadata({
  href,
  locale,
  title,
  description,
  absoluteTitle,
}: PageMetadataOptions): Metadata {
  const alternates = getAlternates(href, locale);

  return {
    metadataBase: new URL(HOST),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: 'rufusmai',
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: routing.locales
        .filter((lang) => lang !== locale)
        .map((lang) => (lang === 'de' ? 'de_DE' : 'en_US')),
      // A page's `openGraph` replaces the layout's, so the generated image
      // from `[locale]/opengraph-image.tsx` is referenced explicitly.
      images: [
        {
          url: `${HOST}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'Rufus Maiwald – rufusmai',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@rufusmai',
    },
  };
}
