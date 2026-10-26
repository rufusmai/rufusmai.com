import { ArrowLeftIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Logo } from '@/components/site/Logo';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="container flex grow flex-col items-center justify-center gap-6 py-40 text-center">
      <Logo
        variant="icon"
        aria-hidden="true"
        className="size-28 animate-float"
      />
      <p className="font-caption text-sm tracking-[0.2em] text-primary uppercase">
        404
      </p>
      <h1 className="text-h2 font-bold">{t('title')}</h1>
      <p className="max-w-md text-lead text-muted-foreground">{t('body')}</p>
      <Button asChild size="lg">
        <Link href="/">
          <ArrowLeftIcon />
          {t('home')}
        </Link>
      </Button>
    </section>
  );
}
