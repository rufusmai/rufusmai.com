'use client';

import { useMotionValueEvent, useScroll } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { LocaleSwitcher } from '@/components/i18n/LocaleSwitcher';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { isNavItemActive, NAV_ITEMS } from './navItems';

export function SiteHeader() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 16));

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-border/80 bg-background/75 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      )}
    >
      <a
        href="#content"
        className="sr-only rounded-full bg-button px-4 py-2 text-button-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        {t('skipToContent')}
      </a>
      <div
        className={cn(
          'container flex items-center justify-between gap-4 transition-[height] duration-300',
          scrolled ? 'h-16' : 'h-20'
        )}
      >
        <Link
          href="/"
          className="-ml-1 rounded-md p-1 transition-opacity hover:opacity-80"
          aria-label={`rufusmai – ${t('home')}`}
        >
          <Logo className="text-xl sm:text-[1.375rem]" />
        </Link>

        <nav aria-label={t('primary')} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary',
                      active ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {t(item.key)}
                    {active && (
                      <span className="absolute inset-x-4 -bottom-0.5 h-px bg-primary" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" className="ml-2 hidden md:inline-flex">
            <Link href="/contact">{tCommon('getInTouch')}</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
