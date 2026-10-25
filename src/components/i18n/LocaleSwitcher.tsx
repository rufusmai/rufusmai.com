'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('language');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const nextLocale = locale === 'de' ? 'en' : 'de';

  return (
    <Link
      // Params always match the current pathname, which is what next-intl needs
      // to build the translated URL of the same page.
      // @ts-expect-error -- `params` is validated against `pathname` at runtime
      href={{ pathname, params }}
      locale={nextLocale}
      hrefLang={nextLocale}
      aria-label={t('switchToLabel')}
      title={t('switchToLabel')}
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'icon' }),
        'font-mono text-xs font-semibold tracking-wider uppercase',
        className
      )}
    >
      {nextLocale}
    </Link>
  );
}
