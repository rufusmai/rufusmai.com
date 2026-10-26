'use client';

import { ArrowDownIcon, ArrowRightIcon } from 'lucide-react';
import { motion } from 'motion/react';

import { Eyebrow } from '@/components/site/Section';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export interface HeroCopy {
  eyebrow: string;
  name: string;
  title: string;
  lead: string;
  ctaConsulting: string;
  ctaLabs: string;
  ctaContact: string;
  scroll: string;
}

export function Hero({ copy }: { copy: HeroCopy }) {
  const words = copy.title.split(' ');

  return (
    <section
      // Flight path: takes off right of the text, climbs to the top right
      data-flight="T,0.94;R,0.2"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-24 pb-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_75%_35%,color-mix(in_oklab,var(--brand-wing)_18%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] [background-size:28px_28px]"
      />

      <div className="container">
        <div data-flight-avoid className="flex max-w-4xl flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </motion.div>

          <h1 className="text-[clamp(2.5rem,1.2rem+4.2vw,5.25rem)] leading-[1.02] font-extrabold tracking-[-0.035em]">
            <span className="block sm:whitespace-nowrap">
              {copy.name.split(' ').map((word, index) => (
                <Word key={`name-${index}`} index={index}>
                  {word}
                </Word>
              ))}
            </span>
            {/* The lower line is set in Instrument Serif italic */}
            <span className="block font-serif font-normal tracking-[-0.01em] text-primary italic">
              {words.map((word, index) => (
                <Word
                  key={`title-${index}`}
                  index={index + 2}
                  // Room for the italic overhang inside the clipping mask
                  className="pr-[0.08em]"
                >
                  {word}
                </Word>
              ))}
            </span>
          </h1>

          <motion.p
            className="max-w-xl text-lead text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.55 }}
          >
            {copy.lead}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.7 }}
          >
            <Button asChild size="lg" className="group">
              <Link href="/consulting">
                {copy.ctaConsulting}
                <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group">
              <Link href="/labs">
                {copy.ctaLabs}
                <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/contact">{copy.ctaContact}</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-caption text-xs tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-primary sm:flex"
      >
        {copy.scroll}
        <ArrowDownIcon className="size-4 motion-safe:animate-bounce" />
      </a>
    </section>
  );
}

function Word({
  children,
  index,
  className,
}: {
  children: string;
  index: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-block overflow-hidden pb-[0.08em] align-bottom',
        className
      )}
    >
      <motion.span
        className="inline-block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.7,
          ease: EASE_OUT_EXPO,
          delay: 0.1 + index * 0.08,
        }}
      >
        {children}
      </motion.span>
      {' '}
    </span>
  );
}
