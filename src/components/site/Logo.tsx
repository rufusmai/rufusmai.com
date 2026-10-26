import type { SVGProps } from 'react';

import { cn } from '@/lib/utils';

import { iconPaths, iconViewBox, type LogoPath, logoPaths } from './logoPaths';

// logo.svg holds the mark (group #icon, 4 paths) followed by the wordmark
// (group #wordmark, 1 path) on a 1024×512 canvas.
const MARK_PATHS = logoPaths.slice(0, 4);
const WORDMARK_PATHS = logoPaths.slice(4);

// Bounding boxes in logo.svg: the mark spans x 141.2–396.9 and y 122.2–389.9,
// the wordmark starts at x 440.9 (a 44 unit gap) and is centred at y 250.75.
const MARK_RIGHT = 396.9;
const WORDMARK = { x: 440.9, centerY: 250.75, width: 442 };

// On the website the wordmark is larger relative to the mark and sits further
// away from it. It is scaled around its left edge and vertical centre.
const WORDMARK_SCALE = 1.6;
const GAP = 68;
const WORDMARK_LEFT = MARK_RIGHT + GAP;
const WORDMARK_TRANSFORM = `translate(${WORDMARK_LEFT} ${WORDMARK.centerY}) scale(${WORDMARK_SCALE}) translate(${-WORDMARK.x} ${-WORDMARK.centerY})`;

// The mark and the scaled wordmark, with 5 units of padding
const VIEW_BOX_LEFT = 136;
const VIEW_BOX_RIGHT = WORDMARK_LEFT + WORDMARK.width * WORDMARK_SCALE + 5;
const LOGO_VIEW_BOX = `${VIEW_BOX_LEFT} 117 ${Math.ceil(VIEW_BOX_RIGHT - VIEW_BOX_LEFT)} 278`;

interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'viewBox'> {
  /** `full` is the Maikäfer with the wordmark, `icon` the Maikäfer alone. */
  variant?: 'full' | 'icon';
  title?: string;
}

/**
 * The rufusmai logo as inline SVG: ink parts follow `currentColor`, the wing
 * covers use `--brand-wing`.
 */
export function Logo({
  variant = 'full',
  title = 'rufusmai',
  className,
  ...props
}: LogoProps) {
  const isIcon = variant === 'icon';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={isIcon ? iconViewBox : LOGO_VIEW_BOX}
      role="img"
      aria-label={title}
      className={cn('text-brand-ink', className)}
      {...props}
    >
      {isIcon ? (
        <LogoPaths paths={iconPaths} />
      ) : (
        <>
          <LogoPaths paths={MARK_PATHS} />
          <g transform={WORDMARK_TRANSFORM}>
            <LogoPaths paths={WORDMARK_PATHS} />
          </g>
        </>
      )}
    </svg>
  );
}

function LogoPaths({ paths }: { paths: LogoPath[] }) {
  return paths.map((path, index) => (
    <path
      key={index}
      d={path.d}
      fill={path.role === 'wing' ? 'var(--brand-wing)' : 'currentColor'}
      fillRule={path.evenOdd ? 'evenodd' : undefined}
      data-part={path.role}
    />
  ));
}
