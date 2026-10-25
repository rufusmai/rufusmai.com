import { ArrowRightIcon } from 'lucide-react';

import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

import { Logo } from './Logo';

interface CtaBandProps {
  title: string;
  body: string;
  button: string;
}

/** Closing call to action of a page. */
export function CtaBand({ title, body, button }: CtaBandProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
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
              <div className="pt-2">
                <Button
                  asChild
                  size="lg"
                  className="group bg-white text-[#18181b] hover:bg-white/90"
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
