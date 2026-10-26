'use client';

import {
  animate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import { useCallback, useEffect, useId, useRef } from 'react';

import { Logo } from '@/components/site/Logo';

type Point = { x: number; y: number };

interface Geometry {
  total: number;
  samples: { length: number; y: number }[];
  /** Sample index where the hero part of the path ends. */
  heroEndIndex: number;
}

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
/** The tip of the path follows this line, as a fraction of the viewport. */
const READING_LINE = 0.6;
const SAMPLE_STEP = 6;
/** The Maikäfer in the icon flies towards its top right. */
const ICON_HEADING = -45;
/** Over this distance before the end the beetle turns upright to land. */
const LANDING_DISTANCE = 160;
const BEETLE_SIZE = 36;
/** Keeps the curve (and the beetle) this far from the page edges. */
const EDGE_PADDING = BEETLE_SIZE;
/** The path needs side margins next to the content, so wide screens only. */
const MEDIA_QUERY = '(min-width: 1280px)';

/**
 * A dotted flight path that draws itself through the page as you scroll, with
 * the Maikäfer flying at its tip until it lands at the end.
 *
 * Children mark waypoints with `data-flight="x,y;x,y"`: points as fractions of
 * the element's box, connected in document order. The first element is the
 * hero, whose part of the path draws in on load.
 */
export function FlightPath({ children }: { children: React.ReactNode }) {
  const maskId = useId();
  const container = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const reveal = useRef<SVGPathElement>(null);
  const beetle = useRef<HTMLDivElement>(null);
  const geometry = useRef<Geometry | null>(null);
  const intro = useRef(0);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();

  const render = useCallback(() => {
    const g = geometry.current;
    const root = container.current;
    if (!g || !root || !trail.current || !reveal.current || !beetle.current) {
      return;
    }

    let drawn = g.total;
    if (!reduceMotion) {
      // Path length up to the reading line; the hero part is always included
      const line =
        window.innerHeight * READING_LINE - root.getBoundingClientRect().top;
      let target = g.samples[g.heroEndIndex].length;
      for (let i = g.heroEndIndex; i < g.samples.length; i++) {
        if (g.samples[i].y > line) break;
        target = g.samples[i].length;
      }
      drawn = target * intro.current;
    }

    reveal.current.style.strokeDashoffset = String(g.total - drawn);

    const tip = trail.current.getPointAtLength(drawn);
    const behind = trail.current.getPointAtLength(Math.max(0, drawn - 8));
    let rotation =
      (Math.atan2(tip.y - behind.y, tip.x - behind.x) * 180) / Math.PI -
      ICON_HEADING;
    rotation = ((rotation + 540) % 360) - 180;
    const toLanding = g.total - drawn;
    if (toLanding < LANDING_DISTANCE) {
      rotation *= toLanding / LANDING_DISTANCE;
    }

    beetle.current.style.opacity = drawn > 1 ? '1' : '0';
    beetle.current.style.transform = `translate(${tip.x - BEETLE_SIZE / 2}px, ${
      tip.y - BEETLE_SIZE / 2
    }px) rotate(${rotation}deg)`;
  }, [reduceMotion]);

  const build = useCallback(() => {
    const root = container.current;
    if (!root || !svg.current || !trail.current || !reveal.current) return;
    if (!window.matchMedia(MEDIA_QUERY).matches) {
      geometry.current = null;
      return;
    }

    const box = root.getBoundingClientRect();
    const points: Point[] = [];
    let heroEnd: Point | undefined;
    root.querySelectorAll<HTMLElement>('[data-flight]').forEach((element) => {
      const rect = element.getBoundingClientRect();
      const own = (element.dataset.flight ?? '').split(';').map((pair) => {
        const [x, y] = pair.split(',').map(Number);
        return {
          x: rect.left - box.left + x * rect.width,
          y: rect.top - box.top + y * rect.height,
        };
      });
      heroEnd ??= own.at(-1);
      points.push(...own);
    });
    if (points.length < 2 || !heroEnd) return;

    const path = toSmoothPath(points, EDGE_PADDING, box.width - EDGE_PADDING);
    svg.current.setAttribute('width', String(box.width));
    svg.current.setAttribute('height', String(box.height));
    svg.current.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    trail.current.setAttribute('d', path);
    reveal.current.setAttribute('d', path);

    const total = trail.current.getTotalLength();
    const samples: Geometry['samples'] = [];
    let heroEndIndex = 0;
    let closest = Infinity;
    for (let length = 0; length <= total; length += SAMPLE_STEP) {
      const point = trail.current.getPointAtLength(length);
      const distance = Math.hypot(point.x - heroEnd.x, point.y - heroEnd.y);
      if (distance < closest) {
        closest = distance;
        heroEndIndex = samples.length;
      }
      samples.push({ length, y: point.y });
    }

    reveal.current.style.strokeDasharray = `${total} ${total}`;
    geometry.current = { total, samples, heroEndIndex };
    render();
  }, [render]);

  // Rebuild whenever the page layout changes, e.g. after fonts and images load
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(build);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    const media = window.matchMedia(MEDIA_QUERY);
    media.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener('change', schedule);
    };
  }, [build]);

  // The hero part draws in once on load
  useEffect(() => {
    if (reduceMotion) {
      intro.current = 1;
      render();
      return;
    }
    const controls = animate(0, 1, {
      duration: 2.2,
      delay: 0.4,
      ease: EASE_OUT_EXPO,
      onUpdate: (value) => {
        intro.current = value;
        render();
      },
    });
    return () => controls.stop();
  }, [reduceMotion, render]);

  useMotionValueEvent(scrollY, 'change', render);

  return (
    <div ref={container} className="relative isolate overflow-x-clip">
      <svg
        ref={svg}
        aria-hidden="true"
        fill="none"
        className="pointer-events-none absolute top-0 left-0 -z-10 hidden xl:block"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <path ref={reveal} stroke="white" strokeWidth={10} />
          </mask>
        </defs>
        <path
          ref={trail}
          mask={`url(#${maskId})`}
          stroke="var(--primary)"
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="5 11"
        />
      </svg>
      <div
        ref={beetle}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-20 hidden opacity-0 will-change-transform xl:block"
        style={{ width: BEETLE_SIZE, height: BEETLE_SIZE }}
      >
        <Logo variant="icon" className="size-full" />
      </div>
      {children}
    </div>
  );
}

/**
 * Catmull-Rom spline through all points, as cubic Bézier segments. Control
 * points stay within `minX`–`maxX`, so the curve never overshoots the page
 * edges between two waypoints on the same side.
 */
function toSmoothPath(points: Point[], minX: number, maxX: number) {
  const clampX = (x: number) => Math.min(maxX, Math.max(minX, x));
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = {
      x: clampX(p1.x + (p2.x - p0.x) / 6),
      y: p1.y + (p2.y - p0.y) / 6,
    };
    const c2 = {
      x: clampX(p2.x - (p3.x - p1.x) / 6),
      y: p2.y - (p3.y - p1.y) / 6,
    };
    path += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  }
  return path;
}
