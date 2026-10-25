'use client';

import { motion, useScroll } from 'motion/react';
import { useRef } from 'react';

interface Step {
  title: string;
  body: string;
}

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/** Vertical stepper whose connecting line draws while scrolling. */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: list,
    offset: ['start 75%', 'end 55%'],
  });

  return (
    <ol ref={list} className="relative flex flex-col gap-10 pl-16 sm:pl-20">
      <span
        aria-hidden="true"
        className="absolute inset-y-2 left-[1.375rem] w-px bg-border sm:left-[1.625rem]"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: scrollYProgress }}
        className="absolute inset-y-2 left-[1.375rem] w-px origin-top bg-primary sm:left-[1.625rem]"
      />
      {steps.map((step, index) => (
        <motion.li
          key={step.title}
          data-reveal
          className="relative flex flex-col gap-2"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <span className="absolute top-0 -left-16 flex size-11 items-center justify-center rounded-full border border-border bg-background font-mono text-sm font-semibold text-primary sm:-left-20 sm:size-13">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-h3 font-bold">{step.title}</h3>
          <p className="max-w-xl text-muted-foreground">{step.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}
