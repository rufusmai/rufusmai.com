import type { Route } from '@/i18n/routing';

export const NAV_ITEMS = [
  { href: '/consulting', key: 'consulting' },
  { href: '/labs', key: 'labs' },
  { href: '/contact', key: 'contact' },
] as const satisfies readonly { href: Route; key: string }[];

/** Case study pages belong to the consulting section. */
export function isNavItemActive(pathname: string, href: Route) {
  if (href === '/consulting') {
    return pathname === href || pathname.startsWith('/projects/');
  }
  return pathname === href;
}
