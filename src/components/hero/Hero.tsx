'use client';

import { ArrowDownIcon, ArrowRightIcon } from 'lucide-react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

import { Logo } from '@/components/site/Logo';
import { Eyebrow } from '@/components/site/Section';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useMounted } from '@/hooks/useMounted';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import type { SceneColors } from './BeetleModel';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const COLORS: Record<'light' | 'dark', SceneColors> = {
  light: { ink: '#18181b', wing: '#c75a34' },
  dark: { ink: '#fafafa', wing: '#d1633d' },
};

export interface HeroCopy {
  eyebrow: string;
  name: string;
  title: string;
  lead: string;
  ctaConsulting: string;
  ctaLabs: string;
  ctaContact: string;
  scroll: string;
  sceneLabel: string;
}

export function Hero({ copy }: { copy: HeroCopy }) {
  const section = useRef<HTMLElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const reduceMotion = useReducedMotion();
  const sceneEnabled = useSceneSupport(reduceMotion ?? false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const compact = useMediaQuery('(max-width: 767px)');

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end start'],
  });

  // Pointer position across the whole hero, normalised to -1…1
  useEffect(() => {
    const element = section.current;
    if (!element || !sceneEnabled) return;
    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      pointer.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
      };
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [sceneEnabled]);

  // Stop rendering while the hero is off screen
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting)
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const colors =
    mounted && resolvedTheme === 'dark' ? COLORS.dark : COLORS.light;
  const words = copy.title.split(' ');

  return (
    <section
      ref={section}
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

      <div className="container grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="relative order-first mx-auto aspect-square w-full max-w-[15rem] sm:max-w-sm lg:order-last lg:col-span-5 lg:max-w-none">
          <div
            role="img"
            aria-label={copy.sceneLabel}
            className="absolute inset-0"
          >
            <Logo
              variant="icon"
              aria-hidden="true"
              className={cn(
                'absolute inset-[18%] size-auto transition-opacity duration-700',
                !reduceMotion && 'animate-float',
                ready ? 'opacity-0' : 'opacity-100'
              )}
            />
            {sceneEnabled && (
              <div
                className={cn(
                  'absolute inset-[-15%] transition-opacity duration-1000',
                  ready ? 'opacity-100' : 'opacity-0'
                )}
              >
                <HeroScene
                  colors={colors}
                  pointer={pointer}
                  progress={scrollYProgress}
                  active={visible}
                  compact={compact}
                  onReady={() => setReady(true)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7">
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
            <span className="block text-primary">
              {words.map((word, index) => (
                <Word key={`title-${index}`} index={index + 2}>
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
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-primary sm:flex"
      >
        {copy.scroll}
        <ArrowDownIcon className="size-4 motion-safe:animate-bounce" />
      </a>
    </section>
  );
}

function Word({ children, index }: { children: string; index: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
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

/** WebGL scene only for visitors without reduced motion and with WebGL. */
function useSceneSupport(reduceMotion: boolean) {
  const mounted = useMounted();
  const [supported] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
    } catch {
      return false;
    }
  });
  return mounted && supported && !reduceMotion;
}
