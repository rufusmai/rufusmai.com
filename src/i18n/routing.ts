import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { pathnames } from './pathnames';

export const routing = defineRouting({
  locales: ['de', 'en'],

  // Used when the browser language matches neither locale
  defaultLocale: 'en',

  // Keep one public URL format per locale, so a page never exists both with
  // and without its locale prefix.
  localePrefix: 'always',

  // Internal paths (keys) and their translated public paths per locale
  pathnames,

  // Canonical and hreflang tags are set manually per page (src/lib/metadata.ts)
  alternateLinks: false,
});

export type Route = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
