import { cn } from '@/lib/utils';

export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section className={cn('py-16 sm:py-24', className)} {...props}>
      <div className="container">{children}</div>
    </section>
  );
}

export function Eyebrow({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'font-caption text-caption font-medium tracking-[0.2em] text-primary uppercase',
        className
      )}
      {...props}
    />
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  /** Lower part of a two-part headline, set in Instrument Serif italic. */
  titleLower?: string;
  lead?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  className?: string;
  children?: React.ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  titleLower,
  lead,
  align = 'left',
  as: Heading = 'h2',
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        align === 'center' && 'mx-auto items-center text-center',
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          'font-bold',
          Heading === 'h1' ? 'text-display' : 'text-h2'
        )}
      >
        {titleLower ? (
          <>
            <span className="block">{title}</span>{' '}
            <span className="block font-serif font-normal tracking-[-0.01em] text-primary italic">
              {titleLower}
            </span>
          </>
        ) : (
          title
        )}
      </Heading>
      {lead && (
        <p className="max-w-2xl text-lead text-muted-foreground">{lead}</p>
      )}
      {children}
    </div>
  );
}

export function Chip({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border px-2.5 py-1 font-caption text-caption text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}
