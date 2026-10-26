import { InfoIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Eyebrow } from './Section';

/** Shared frame for the imprint and the privacy policy. */
export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const t = useTranslations('legal');
  const locale = useLocale();

  return (
    <article className="container max-w-3xl pt-36 pb-24 sm:pt-44">
      <Eyebrow>rufusmai</Eyebrow>
      <h1 className="mt-4 text-h2 font-bold">{title}</h1>
      <div className="mt-8 flex flex-col gap-2 rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
        {locale !== 'de' && (
          <p className="flex gap-2">
            <InfoIcon className="mt-0.5 size-4 shrink-0" />
            {t('translationNotice')}
          </p>
        )}
        <p className="flex gap-2">
          <InfoIcon className="mt-0.5 size-4 shrink-0" />
          {t('placeholderNotice')}
        </p>
      </div>
      <div className="prose mt-10 max-w-none prose-zinc prose-headings:scroll-mt-28 prose-headings:font-heading prose-a:text-primary prose-a:underline-offset-4 prose-code:before:content-none prose-code:after:content-none">
        {children}
      </div>
    </article>
  );
}
