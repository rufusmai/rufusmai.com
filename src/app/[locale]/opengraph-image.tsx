import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

import { type Locale, routing } from '@/i18n/routing';
import { iconDataUrl } from '@/lib/logoMarkup';
import { loadOgFonts } from '@/lib/ogFonts';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Rufus Maiwald – rufusmai';

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: 'home.hero' });
  const name = 'Rufus Maiwald';
  const brands = 'rufusmai consulting · rufusmai labs';
  const fonts = await loadOgFonts({
    // The eyebrow is uppercased with CSS, so its capitals must be in the subset
    body: `${t('eyebrow').toUpperCase()}${brands}`,
    heading: name,
    serif: t('title'),
  });

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '72px 88px',
        background:
          'radial-gradient(circle at 80% 30%, rgba(209, 99, 61, 0.28), transparent 55%), #18181b',
        color: '#fafafa',
        fontFamily: 'Space Grotesk',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 680 }}>
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#d1633d',
          }}
        >
          {t('eyebrow')}
        </div>
        <div
          style={{
            fontFamily: 'Bricolage Grotesque',
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: -3,
            marginTop: 24,
            lineHeight: 1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: 'Instrument Serif',
            fontStyle: 'italic',
            fontSize: 64,
            fontWeight: 400,
            color: '#d1633d',
            marginTop: 8,
          }}
        >
          {t('title')}
        </div>
        <div style={{ fontSize: 26, color: '#a1a1aa', marginTop: 40 }}>
          {brands}
        </div>
      </div>
      <img
        src={iconDataUrl('#fafafa', '#d1633d')}
        width={340}
        height={340}
        alt=""
      />
    </div>,
    { ...size, fonts }
  );
}
