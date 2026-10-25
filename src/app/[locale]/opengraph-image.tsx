import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

import { type Locale, routing } from '@/i18n/routing';
import { iconDataUrl } from '@/lib/logoMarkup';

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
            fontSize: 84,
            fontWeight: 800,
            marginTop: 24,
            lineHeight: 1,
          }}
        >
          Rufus Maiwald
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#d1633d',
            marginTop: 12,
          }}
        >
          {t('title')}
        </div>
        <div style={{ fontSize: 26, color: '#a1a1aa', marginTop: 40 }}>
          rufusmai consulting · rufusmai labs
        </div>
      </div>
      {}
      <img
        src={iconDataUrl('#fafafa', '#d1633d')}
        width={340}
        height={340}
        alt=""
      />
    </div>,
    size
  );
}
