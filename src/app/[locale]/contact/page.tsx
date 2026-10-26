import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { ContactCard } from '@/components/contact/ContactCard';
import { ContactForm } from '@/components/contact/ContactForm';
import { IntlClientProvider } from '@/components/i18n/IntlClientProvider';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/site/Section';
import type { LocaleParams } from '@/i18n/request';
import type { Locale } from '@/i18n/routing';
import { getPageMetadata } from '@/lib/metadata';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: 'contact.meta' });

  return getPageMetadata({
    href: '/contact',
    locale,
    title: t('title'),
    description: t('description'),
  });
}

export default function ContactPage({ params }: LocaleParams) {
  const locale = use(params).locale as Locale;
  setRequestLocale(locale);
  const t = useTranslations('contact.hero');

  return (
    <section className="relative isolate pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_20%_15%,color-mix(in_oklab,var(--brand-wing)_14%,transparent),transparent_70%)]"
      />
      <div className="container flex flex-col gap-12">
        <Reveal>
          <SectionHeader
            as="h1"
            eyebrow={t('eyebrow')}
            title={t('title')}
            titleLower={t('titleLower')}
            lead={t('lead')}
          />
        </Reveal>
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <Reveal delay={0.05} className="lg:col-span-7">
            <IntlClientProvider
              partial={['contact.form', 'contact.validation']}
            >
              <ContactForm />
            </IntlClientProvider>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <ContactCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
