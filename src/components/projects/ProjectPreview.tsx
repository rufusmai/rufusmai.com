import Image, { type StaticImageData } from 'next/image';

import { cn } from '@/lib/utils';

import { LiveScreenshot } from './LiveScreenshot';

const SIZES = '(min-width: 1024px) 50vw, 100vw';

interface ProjectPreviewProps {
  image: StaticImageData;
  /** A tall screenshot that scrolls inside the frame instead of `image`. */
  scrollImage?: StaticImageData;
  url?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/** A screenshot framed in a minimal browser window. */
export function ProjectPreview({
  image,
  scrollImage,
  url,
  alt,
  className,
  priority,
}: ProjectPreviewProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border bg-card shadow-card',
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        {url && (
          <span className="ml-3 truncate rounded-full bg-muted px-3 py-0.5 font-caption text-xs text-muted-foreground">
            {url.replace(/^https?:\/\//, '')}
          </span>
        )}
      </div>
      {scrollImage ? (
        <LiveScreenshot image={scrollImage} alt={alt} sizes={SIZES} />
      ) : (
        <Image
          src={image}
          alt={alt}
          placeholder="blur"
          priority={priority}
          sizes={SIZES}
          className="aspect-[16/10] w-full object-cover object-top"
        />
      )}
    </div>
  );
}
