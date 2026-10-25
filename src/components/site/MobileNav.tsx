'use client';

import { ArrowRightIcon, MenuIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import { Logo } from './Logo';
import { isNavItemActive, NAV_ITEMS } from './navItems';

export function MobileNav() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={t('openMenu')}
        >
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <div className="flex items-center justify-between">
          <SheetTitle className="sr-only">{t('menu')}</SheetTitle>
          <Logo variant="icon" className="size-10" />
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label={t('closeMenu')}>
              <XIcon className="size-5" />
            </Button>
          </SheetClose>
        </div>
        <nav aria-label={t('primary')}>
          <ul className="flex flex-col gap-1">
            {[{ href: '/', key: 'home' } as const, ...NAV_ITEMS].map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : isNavItemActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-xl p-3 font-heading text-2xl font-semibold transition-colors hover:bg-accent',
                        active && 'text-primary'
                      )}
                    >
                      {t(item.key)}
                      <ArrowRightIcon className="size-5 opacity-50" />
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>
        <SheetClose asChild>
          <Button asChild size="lg" className="mt-auto">
            <Link href="/contact">{tCommon('getInTouch')}</Link>
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
