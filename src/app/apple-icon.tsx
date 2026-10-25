import { ImageResponse } from 'next/og';

import { iconDataUrl } from '@/lib/logoMarkup';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fafafa',
      }}
    >
      {}
      <img
        src={iconDataUrl('#18181b', '#c75a34')}
        width={136}
        height={136}
        alt=""
      />
    </div>,
    size
  );
}
