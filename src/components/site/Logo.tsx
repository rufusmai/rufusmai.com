import type { SVGProps } from 'react';

import { cn } from '@/lib/utils';

import { iconPaths, iconViewBox, logoPaths } from './logoPaths';

// logo.svg is drawn on a 1024×512 canvas; this is the artwork's bounding box.
const LOGO_VIEW_BOX = '136 117 752 278';

interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'viewBox'> {
  /** `full` is the Maikäfer with the wordmark, `icon` the Maikäfer alone. */
  variant?: 'full' | 'icon';
  title?: string;
}

/**
 * The rufusmai logo as inline SVG: ink parts follow `currentColor`, the wing
 * covers use `--brand-wing`, so one component works in both colour schemes.
 */
export function Logo({
  variant = 'full',
  title = 'rufusmai',
  className,
  ...props
}: LogoProps) {
  const isIcon = variant === 'icon';
  const paths = isIcon ? iconPaths : logoPaths;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={isIcon ? iconViewBox : LOGO_VIEW_BOX}
      role="img"
      aria-label={title}
      className={cn('text-brand-ink', className)}
      {...props}
    >
      {paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          fill={path.role === 'wing' ? 'var(--brand-wing)' : 'currentColor'}
          fillRule={path.evenOdd ? 'evenodd' : undefined}
          data-part={path.role}
        />
      ))}
    </svg>
  );
}
