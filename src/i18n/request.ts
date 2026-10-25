import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import type messages from '../../locales/en.json';
import { routing } from './routing';

export type LocaleParams = {
  params: Promise<{ locale: string }>;
};

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (
      (await import(`../../locales/${locale}.json`)) as {
        default: typeof messages;
      }
    ).default,
  };
});
