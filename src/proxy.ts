import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { getPathname, type Locale, routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const isLocalHost =
    host.startsWith('localhost') || host.startsWith('127.0.0.1');
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const canonicalHost = host.startsWith('www.') ? host.slice(4) : host;

  if (!isLocalHost && (forwardedProto === 'http' || canonicalHost !== host)) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = 'https:';
    canonicalUrl.host = canonicalHost;
    return NextResponse.redirect(canonicalUrl, 308);
  }

  const legacyRedirect = getLegacyRedirect(request);
  if (legacyRedirect) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = legacyRedirect;
    return NextResponse.redirect(redirectUrl, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip paths that should not be internationalized: API routes, the Umami
  // proxy, Next.js internals, the generated Apple icon and all paths with a
  // dot (e.g. favicon.ico)
  matcher: '/((?!api|stats|_next|_vercel|apple-icon|.*\\..*).*)',
};

/**
 * Links without a locale prefix (the old site, demo.rufusmai.com and the other
 * rufusmai sites) are sent to the translated page in the visitor's language.
 */
function getLegacyRedirect(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/';
  const project = /^\/(?:projects|projekte)\/([a-z0-9-]+)$/.exec(pathname);

  if (project) {
    return getPathname({
      locale: resolveLocale(request),
      href: { pathname: '/projects/[slug]', params: { slug: project[1] } },
    });
  }

  const target = LEGACY_PATHS[pathname];
  return target
    ? getPathname({ locale: resolveLocale(request), href: target })
    : null;
}

const LEGACY_PATHS: Record<
  string,
  '/consulting' | '/contact' | '/imprint' | '/privacy'
> = {
  '/services': '/consulting',
  '/projects': '/consulting',
  '/contact': '/contact',
  '/kontakt': '/contact',
  '/impressum': '/imprint',
  '/imprint': '/imprint',
  '/datenschutz': '/privacy',
  '/privacy': '/privacy',
};

function resolveLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const preferred = (request.headers.get('accept-language') ?? '')
    .split(',')
    .map((part) => {
      const [tag, quality] = part.trim().split(';q=');
      return { tag: tag.slice(0, 2).toLowerCase(), q: Number(quality ?? 1) };
    })
    .sort((a, b) => b.q - a.q)
    .find(({ tag }) => isLocale(tag));

  return preferred && isLocale(preferred.tag)
    ? preferred.tag
    : routing.defaultLocale;
}

function isLocale(value: unknown): value is Locale {
  return routing.locales.includes(value as Locale);
}
