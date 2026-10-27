import { ArrowRightIcon } from 'lucide-react';
import type { CSSProperties } from 'react';

import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

import { Logo } from './Logo';

/** Where the pollen drifts in from, relative to the button's centre. */
const POLLEN = [
  [-120, -50],
  [110, -60],
  [-150, 20],
  [140, 30],
  [-50, -70],
  [60, 65],
];

interface CtaBandProps {
  title: string;
  body: string;
  button: string;
  /** Waypoints for a surrounding `FlightPath`, relative to the band. */
  flight?: string;
}

/** Closing call to action of a page. */
export function CtaBand({ title, body, button, flight }: CtaBandProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container" data-flight={flight}>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-button px-6 py-14 text-button-foreground sm:px-12 sm:py-16">
            <Logo
              variant="icon"
              aria-hidden="true"
              className="absolute -right-10 -bottom-12 -z-10 size-64 rotate-12 text-white/10 opacity-60 [--brand-wing:rgb(255_255_255/0.25)] sm:size-80"
            />
            <div className="flex max-w-2xl flex-col gap-4">
              <h2 className="text-h2 font-bold">{title}</h2>
              <p className="text-lead text-white/85">{body}</p>
              <div className="group/cta relative w-fit pt-2">
                {/* Pollen drifts towards the button while it's hovered */}
                {POLLEN.map(([x, y], index) => (
                  <span
                    key={index}
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[calc(50%+0.25rem)] left-1/2 -m-0.75 size-1.5 rounded-full bg-white opacity-0 motion-safe:group-focus-within/cta:animate-pollen motion-safe:group-hover/cta:animate-pollen"
                    style={
                      {
                        '--pollen-x': `${x}px`,
                        '--pollen-y': `${y}px`,
                        animationDelay: `${index * 0.22}s`,
                      } as CSSProperties
                    }
                  />
                ))}
                <Button
                  asChild
                  size="lg"
                  className="group relative bg-white text-button hover:bg-white"
                >
                  <Link href="/contact">
                    {button}
                    <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
