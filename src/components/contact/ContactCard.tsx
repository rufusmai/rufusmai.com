import { ClockIcon, MailIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { GitHubIcon, LinkedInIcon } from '@/components/site/brandIcons';
import { profile } from '@/content/profile';
import { cn } from '@/lib/utils';

/** Business-card style summary: photo, role and every way to reach me. */
export function ContactCard({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations('contact.card');
  const tAbout = useTranslations('home.about');

  const rows = [
    {
      icon: MailIcon,
      label: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: LinkedInIcon,
      label: 'linkedin.com/in/rufus-maiwald',
      href: profile.links.linkedin,
      external: true,
    },
    {
      icon: GitHubIcon,
      label: 'github.com/rufusmai',
      href: profile.links.github,
      external: true,
    },
    { icon: MapPinIcon, label: profile.location[locale] },
    { icon: ClockIcon, label: t('reply') },
  ];

  return (
    <div
      className={cn(
        'flex flex-col gap-6 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={profile.portrait}
          alt={tAbout('photoAlt')}
          placeholder="blur"
          sizes="80px"
          className="size-20 rounded-2xl object-cover"
        />
        <div>
          <p className="font-heading text-xl font-bold">{profile.name}</p>
          <p className="text-sm text-muted-foreground">
            {tAbout('facts.role')}
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {rows.map(({ icon: Icon, label, href, external }) => (
          <li key={label} className="flex items-center gap-3 text-sm">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-4" />
            </span>
            {href ? (
              <a
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="break-all transition-colors hover:text-primary"
              >
                {label}
              </a>
            ) : (
              <span className="text-muted-foreground">{label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
