import '../globals.css';

import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Geist, Instrument_Serif } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { IntlClientProvider } from '@/components/i18n/IntlClientProvider';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import type { LocaleParams } from '@/i18n/request';
import { routing } from '@/i18n/routing';
import { HOST } from '@/lib/metadata';
import { cn } from '@/lib/utils';

// Headlines and captions: Bricolage Grotesque with its optical size axis for
// display sizes and its width axis for the condensed captions
const bricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
});

// The lower, secondary line of two-part headlines
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

// Body text
const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: hasLocale(routing.locales, locale) ? locale : routing.defaultLocale,
    namespace: 'meta',
  });

  return {
    metadataBase: new URL(HOST),
    title: {
      default: t('title'),
      template: '%s · rufusmai',
    },
    description: t('description'),
    applicationName: t('siteName'),
    authors: [{ name: 'Rufus Maiwald', url: HOST }],
    creator: 'Rufus Maiwald',
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        bricolageGrotesque.variable,
        instrumentSerif.variable,
        geist.variable
      )}
    >
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <Script
        defer
        src="/stats/script.js"
        data-website-id="1d1ae607-8a41-427e-b78f-028b000d5461"
        data-domains="rufusmai.com"
      />
      <body className="flex min-h-svh flex-col">
        <ThemeProvider>
          <IntlClientProvider partial={['nav', 'language', 'theme', 'common']}>
            <MotionProvider>
              <SiteHeader />
              <main id="content" className="flex grow flex-col">
                {children}
              </main>
              <SiteFooter />
            </MotionProvider>
          </IntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
