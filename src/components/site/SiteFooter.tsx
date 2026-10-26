import { MailIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { profile } from '@/content/profile';
import { Link } from '@/i18n/routing';

import { GitHubIcon, LinkedInIcon } from './brandIcons';
import { Logo } from './Logo';

const linkClassName =
  'text-sm text-muted-foreground transition-colors duration-200 hover:text-primary';

export function SiteFooter() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="container grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="flex max-w-sm flex-col gap-4">
          <Link href="/" aria-label={tNav('home')} className="w-fit">
            <Logo className="h-10 w-auto" />
          </Link>
          <p className="text-sm text-muted-foreground">{t('tagline')}</p>
        </div>

        <FooterColumn title={t('navigation')}>
          <li>
            <Link href="/" className={linkClassName}>
              {tNav('home')}
            </Link>
          </li>
          <li>
            <Link href="/consulting" className={linkClassName}>
              {tNav('consulting')}
            </Link>
          </li>
          <li>
            <Link href="/labs" className={linkClassName}>
              {tNav('labs')}
            </Link>
          </li>
          <li>
            <Link href="/contact" className={linkClassName}>
              {tNav('contact')}
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title={t('connect')}>
          <li>
            <a
              href={`mailto:${profile.email}`}
              className={`${linkClassName} inline-flex items-center gap-2`}
            >
              <MailIcon className="size-4" />
              {profile.email}
            </a>
          </li>
          <li>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClassName} inline-flex items-center gap-2`}
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClassName} inline-flex items-center gap-2`}
            >
              <GitHubIcon className="size-4" />
              GitHub
            </a>
          </li>
        </FooterColumn>

        <FooterColumn title={t('legal')}>
          <li>
            <Link href="/imprint" className={linkClassName}>
              {t('imprint')}
            </Link>
          </li>
          <li>
            <Link href="/privacy" className={linkClassName}>
              {t('privacy')}
            </Link>
          </li>
        </FooterColumn>
      </div>
      <div className="container border-t border-border py-6 font-caption text-caption text-muted-foreground">
        {t('copyright', { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-caption text-caption tracking-[0.2em] text-foreground uppercase">
        {title}
      </p>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}
