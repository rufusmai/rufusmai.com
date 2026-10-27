'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import Image, { type StaticImageData } from 'next/image';
import { useRef } from 'react';

/** Width to height of the preview frame. */
const FRAME_ASPECT = 16 / 10;

interface LiveScreenshotProps {
  image: StaticImageData;
  alt: string;
  sizes: string;
}

/**
 * A tall screenshot in a 16:10 frame. While the frame moves through the
 * viewport the screenshot scrolls from the top of the site down, as if
 * someone was scrolling it.
 */
export function LiveScreenshot({ image, alt, sizes }: LiveScreenshotProps) {
  const frame = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ['start end', 'end start'],
  });
  // The part of the screenshot below the frame, as a share of its height
  const travel = 100 * (1 - image.width / FRAME_ASPECT / image.height);
  const y = useTransform(scrollYProgress, [0.15, 0.85], ['0%', `-${travel}%`]);

  return (
    <div ref={frame} className="aspect-[16/10] overflow-hidden">
      <motion.div style={reduceMotion ? undefined : { y }}>
        <Image
          src={image}
          alt={alt}
          placeholder="blur"
          sizes={sizes}
          className="w-full"
        />
      </motion.div>
    </div>
  );
}
