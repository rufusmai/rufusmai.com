'use client';

import { MotionConfig } from 'motion/react';

/** Skips transform animations for visitors who prefer reduced motion. */
export function MotionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
