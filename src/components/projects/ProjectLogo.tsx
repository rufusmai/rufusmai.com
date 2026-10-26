import Image from 'next/image';

import type { ProjectLogo as ProjectLogoData } from '@/content/types';
import { cn } from '@/lib/utils';

/** Logos sit on a white tile, so every client logo sits on the same ground. */
export function ProjectLogo({
  logo,
  className,
}: {
  logo: ProjectLogoData;
  className?: string;
}) {
  const wide = logo.src.width / logo.src.height > 1.5;

  return (
    <span
      className={cn(
        'inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-black/5',
        wide ? 'px-3' : 'w-11 p-1.5',
        className
      )}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        unoptimized
        className={cn('w-auto', wide ? 'h-6' : 'h-full')}
      />
    </span>
  );
}
