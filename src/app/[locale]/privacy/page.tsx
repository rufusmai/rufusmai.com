import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { LegalPage } from '@/components/site/LegalPage';
import { PrivacyDe, PrivacyEn } from '@/content/legal/Privacy';
import type { LocaleParams } from '@/i18n/request';
import type { Locale } from '@/i18n/routing';
import { getPageMetadata } from '@/lib/metadata';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });

  return getPageMetadata({
    href: '/privacy',
    locale,
    title: t('title'),
    description: t('description'),
  });
}

export default function PrivacyPage({ params }: LocaleParams) {
  const locale = use(params).locale as Locale;
  setRequestLocale(locale);
  const t = useTranslations('legal.privacy');

  return (
    <LegalPage title={t('title')}>
      {locale === 'de' ? <PrivacyDe /> : <PrivacyEn />}
    </LegalPage>
  );
}
