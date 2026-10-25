'use client';

import { motion, type Variants } from 'motion/react';

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset in px the element travels while fading in. */
  y?: number;
}

/** Fades and slides its children in once they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

const ELEMENTS = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof ELEMENTS;
}

/** Reveals its `StaggerItem` children one after another. */
export function Stagger({ children, className, as = 'div' }: StaggerProps) {
  const Element = ELEMENTS[as];
  return (
    <Element
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </Element>
  );
}

export function StaggerItem({ children, className, as = 'div' }: StaggerProps) {
  const Element = ELEMENTS[as];
  return (
    <Element data-reveal className={className} variants={item}>
      {children}
    </Element>
  );
}
