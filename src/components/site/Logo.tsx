import type { SVGProps } from 'react';

import { cn } from '@/lib/utils';

import { iconPaths, iconViewBox } from './logoPaths';

interface LogoProps {
  /**
   * `full` is the Maikäfer mark with "rufusmai" set in Bricolage Grotesque,
   * `icon` the mark alone. Size the full logo with a font size class.
   */
  variant?: 'full' | 'icon';
  title?: string;
  className?: string;
}

/**
 * The rufusmai logo: the image mark plus the name as live text. The mark's
 * ink parts follow `currentColor`, its wing covers use `--brand-wing`, so it
 * works in both colour schemes.
 */
export function Logo({
  variant = 'full',
  title = 'rufusmai',
  className,
  ...props
}: LogoProps & Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'className'>) {
  if (variant === 'icon') {
    return (
      <LogoMark
        role="img"
        aria-label={title}
        className={cn('text-brand-ink', className)}
        {...props}
      />
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-[0.3em] font-heading leading-none font-bold tracking-[-0.03em] text-brand-ink',
        className
      )}
    >
      <LogoMark aria-hidden="true" className="h-[1.5em] w-auto shrink-0" />
      <span>{title}</span>
    </span>
  );
}

function LogoMark(props: Omit<SVGProps<SVGSVGElement>, 'viewBox'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={iconViewBox} {...props}>
      {iconPaths.map((path, index) => (
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
