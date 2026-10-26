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

const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
const INTRO_DURATION = 2.4;
/** Time the drawn length takes to catch up with the scroll position. */
const SMOOTH_TIME = 0.45;
/** The tip of the path follows this line, as a fraction of the viewport. */
const READING_LINE = 0.6;
const SAMPLE_STEP = 6;
/** Radius of the rounded corners between margin runs and crossings. */
const CORNER_RADIUS = 140;
/** Radius of the arcs lifting off the runway and turning over the apex. */
const TAKE_OFF_RADIUS = 180;
/** Beside long text the arcs get tighter, down to this radius. */
const MIN_TAKE_OFF_RADIUS = 100;
/** The steepest climb before the arcs get tighter, in degrees. */
const MAX_CLIMB = 70;
/** The Maikäfer in the icon flies towards its top right. */
const ICON_HEADING = -45;
/** Over this distance before the end the beetle turns upright to land. */
const LANDING_DISTANCE = 160;
const BEETLE_SIZE = 36;
/** Space the take-off keeps from the hero text. */
const TEXT_CLEARANCE = 40;
/** The path needs side margins next to the content, so wide screens only. */
const MEDIA_QUERY = '(min-width: 1280px)';

/**
 * A dotted flight path that draws itself through the page as you scroll, with
 * the Maikäfer flying at its tip until it lands at the end.
 *
 * Children mark waypoints with `data-flight="x,y;x,y"`: points as fractions of
 * the element's box, connected in document order. Instead of a fraction, `x`
 * can be `L` or `R` for the middle of the left or right margin beside the page
 * content (the first `.container`). The first element is the hero with two
 * points, the take-off and the apex: from the take-off a runway leads below
 * the hero text, then the path climbs past the text's right side and turns
 * over in one arc, as high as the apex, into the run down at the apex `x`;
 * that part draws in on load. The text lines are the children of
 * `[data-flight-avoid]`. The rest of the path runs straight from waypoint to
 * waypoint with rounded corners.
 */
export function FlightPath({ children }: { children: React.ReactNode }) {
  const maskId = useId();
  const container = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const reveal = useRef<SVGPathElement>(null);
  const beetle = useRef<HTMLDivElement>(null);
  const geometry = useRef<Geometry | null>(null);
  const introState = useRef<'waiting' | 'running' | 'done'>('waiting');
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();

  // The scroll position sets the goal; the drawn length eases towards it, so
  // the line and the beetle never jump.
  const follower = useRef<Follower | null>(null);

  /** Draws the path up to `length` and puts the beetle at its tip. */
  const paint = useCallback((length: number) => {
    const g = geometry.current;
    if (!g || !trail.current || !reveal.current || !beetle.current) return;
    const at = Math.min(g.total, Math.max(0, length));

    reveal.current.style.strokeDashoffset = String(g.total - at);

    const tip = trail.current.getPointAtLength(at);
    const behind = trail.current.getPointAtLength(Math.max(0, at - 8));
    let rotation =
      (Math.atan2(tip.y - behind.y, tip.x - behind.x) * 180) / Math.PI -
      ICON_HEADING;
    rotation = ((rotation + 540) % 360) - 180;
    const toLanding = g.total - at;
    if (toLanding < LANDING_DISTANCE) {
      rotation *= toLanding / LANDING_DISTANCE;
    }

    beetle.current.style.opacity = at > 1 ? '1' : '0';
    beetle.current.style.transform = `translate(${tip.x - BEETLE_SIZE / 2}px, ${
      tip.y - BEETLE_SIZE / 2
    }px) rotate(${rotation}deg)`;
  }, []);

  /** Path length up to the reading line; the hero part is always included. */
  const lengthAtReadingLine = useCallback(() => {
    const g = geometry.current;
    const root = container.current;
    if (!g || !root) return 0;
    if (reduceMotion) return g.total;
    const line =
      window.innerHeight * READING_LINE - root.getBoundingClientRect().top;
    let length = g.samples[g.heroEndIndex].length;
    for (let i = g.heroEndIndex; i < g.samples.length; i++) {
      if (g.samples[i].y > line) return length;
      length = g.samples[i].length;
    }
    // The reading line is past the end: the beetle has landed
    return g.total;
  }, [reduceMotion]);

  const startIntro = useCallback(() => {
    introState.current = 'running';
    const end = lengthAtReadingLine();
    if (reduceMotion) {
      follower.current?.jump(end);
      introState.current = 'done';
      return;
    }
    // The first flight eases in and out; afterwards the spring takes over
    animate(0, end, {
      duration: INTRO_DURATION,
      delay: 0.3,
      ease: EASE_IN_OUT,
      onUpdate: paint,
      onComplete: () => {
        follower.current?.jump(end);
        introState.current = 'done';
        follower.current?.follow(lengthAtReadingLine());
      },
    });
  }, [lengthAtReadingLine, paint, reduceMotion]);

  const build = useCallback(() => {
    const root = container.current;
    if (!root || !svg.current || !trail.current || !reveal.current) return;
    if (!window.matchMedia(MEDIA_QUERY).matches) {
      geometry.current = null;
      return;
    }

    const box = root.getBoundingClientRect();
    const content = root.querySelector('.container')?.getBoundingClientRect();
    const margin = {
      L: content ? (content.left - box.left) / 2 : 0,
      R: content ? (content.right + box.right) / 2 - box.left : box.width,
    };
    const groups: Point[][] = [];
    root.querySelectorAll<HTMLElement>('[data-flight]').forEach((element) => {
      const rect = element.getBoundingClientRect();
      groups.push(
        (element.dataset.flight ?? '').split(';').map((pair) => {
          const [x, y] = pair.split(',');
          return {
            x:
              x === 'L' || x === 'R'
                ? margin[x]
                : rect.left - box.left + Number(x) * rect.width,
            y: rect.top - box.top + Number(y) * rect.height,
          };
        })
      );
    });
    const [[start, apex] = [], ...rest] = groups;
    const runs = rest.flat();
    if (!start || !apex || runs.length === 0) return;

    const takeOff = toTakeOff(start, apex, textBoxes(root, box));
    // The hero part ends once the path has turned down at the apex
    const heroEnd = takeOff.end;
    const path =
      takeOff.path + toRoundedRuns([heroEnd, ...runs], CORNER_RADIUS);
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

    if (introState.current === 'waiting') {
      startIntro();
    } else if (introState.current === 'done') {
      paint(follower.current?.value() ?? 0);
      follower.current?.follow(lengthAtReadingLine());
    }
  }, [lengthAtReadingLine, paint, startIntro]);

  useEffect(() => {
    const instance = createFollower(paint);
    follower.current = instance;
    return () => instance.stop();
  }, [paint]);

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

  useMotionValueEvent(scrollY, 'change', () => {
    if (introState.current === 'done') {
      follower.current?.follow(lengthAtReadingLine());
    }
  });

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

interface Follower {
  follow: (goal: number) => void;
  jump: (value: number) => void;
  value: () => number;
  stop: () => void;
}

/**
 * Moves a value towards a goal like a critically damped spring (the approach
 * of Unity's SmoothDamp): it starts from rest, eases in and out and never
 * overshoots, so the beetle can't fly past the landing point.
 */
function createFollower(onUpdate: (value: number) => void): Follower {
  let value = 0;
  let velocity = 0;
  let goal = 0;
  let frame = 0;
  let last = 0;

  const tick = (time: number) => {
    const dt = Math.min(0.064, Math.max(0.001, (time - last) / 1000));
    last = time;
    const omega = 2 / SMOOTH_TIME;
    const x = omega * dt;
    const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
    const change = value - goal;
    const step = (velocity + omega * change) * dt;
    velocity = (velocity - omega * step) * decay;
    value = goal + (change + step) * decay;

    if (Math.abs(goal - value) < 0.25 && Math.abs(velocity) < 0.5) {
      value = goal;
      velocity = 0;
      frame = 0;
    } else {
      frame = requestAnimationFrame(tick);
    }
    onUpdate(value);
  };

  return {
    follow: (next) => {
      goal = next;
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    },
    jump: (next) => {
      cancelAnimationFrame(frame);
      frame = 0;
      value = goal = next;
      velocity = 0;
      onUpdate(value);
    },
    value: () => value,
    stop: () => {
      cancelAnimationFrame(frame);
      frame = 0;
    },
  };
}

type Box = { left: number; top: number; right: number; bottom: number };

/** A circular arc. Angles are in radians and grow clockwise on screen. */
interface Arc {
  center: Point;
  radius: number;
  from: number;
  to: number;
}

/**
 * The hero text lines (the children of the first `[data-flight-avoid]`),
 * relative to the box.
 */
function textBoxes(root: HTMLElement, box: DOMRect): Box[] {
  const text = root.querySelector('[data-flight-avoid]');
  return Array.from(text?.children ?? [], (line) => {
    const rect = line.getBoundingClientRect();
    return {
      left: rect.left - box.left,
      top: rect.top - box.top,
      right: rect.right - box.left,
      bottom: rect.bottom - box.top,
    };
  });
}

/**
 * The hero part: a runway from the take-off point below the text, an arc
 * lifting off into a straight climb past the right side of the text, and one
 * arc turning over the top into the run down at the apex `x`. Arcs and lines
 * meet at a tangent, so there are no kinks. The arcs are as wide as the room
 * beside the text allows while the climb stays flatter than `MAX_CLIMB`.
 */
function toTakeOff(start: Point, apex: Point, text: Box[]) {
  const runwayY = Math.max(
    start.y,
    ...text.map((line) => line.bottom + TEXT_CLEARANCE)
  );
  // Tighter arcs leave room for the climb to start earlier and so flatter
  let climb: Climb | undefined;
  for (
    let radius = TAKE_OFF_RADIUS;
    radius >= MIN_TAKE_OFF_RADIUS;
    radius -= 10
  ) {
    climb = toFlattestClimb(start.x, runwayY, apex, radius, text) ?? climb;
    if (climb && climb.angle <= MAX_CLIMB) break;
  }
  // Without room beside the text, the path climbs straight up
  climb ??= toClimb(
    apex.x - 2 * TAKE_OFF_RADIUS,
    runwayY,
    apex,
    TAKE_OFF_RADIUS
  );
  return {
    path:
      `M ${start.x} ${runwayY}` + toSvgArc(climb.lift) + toSvgArc(climb.turn),
    end: arcPoint(climb.turn, climb.turn.to),
  };
}

type Climb = ReturnType<typeof toClimb>;

/** The climb that leaves the runway earliest and still clears the text. */
function toFlattestClimb(
  startX: number,
  runwayY: number,
  apex: Point,
  radius: number,
  text: Box[]
) {
  for (let x = startX + radius; x <= apex.x - 2 * radius; x += 4) {
    const climb = toClimb(x, runwayY, apex, radius);
    if (clearsText(climb, text)) return climb;
  }
}

/**
 * Lift-off and turn-over arcs for a climb that leaves the runway at `x`. The
 * path turns over a circle whose top is at the apex height and whose right
 * side is on the run down at the apex `x`.
 */
function toClimb(x: number, runwayY: number, apex: Point, radius: number) {
  const center = { x: apex.x - radius, y: apex.y + radius };
  const dx = center.x - x;
  const dy = center.y - runwayY;
  // The climb heads up and to the right and touches the circle on its left
  const heading =
    Math.atan2(dy, dx) - Math.asin(Math.min(1, radius / Math.hypot(dx, dy)));
  const liftLength = radius * Math.tan(-heading / 2);
  const lift: Arc = {
    center: { x: x - liftLength, y: runwayY - radius },
    radius,
    from: Math.PI / 2,
    to: Math.PI / 2 + heading,
  };
  const turn: Arc = { center, radius, from: heading - Math.PI / 2, to: 0 };
  return { lift, turn, angle: (-heading * 180) / Math.PI };
}

/** Whether the climb keeps its clearance from every text line. */
function clearsText(climb: Climb, text: Box[]) {
  const climbFrom = arcPoint(climb.lift, climb.lift.to);
  const climbTo = arcPoint(climb.turn, climb.turn.from);
  const length = Math.hypot(climbTo.x - climbFrom.x, climbTo.y - climbFrom.y);
  const steps = Math.ceil(length / SAMPLE_STEP);
  const points = [
    ...arcPoints(climb.lift),
    ...Array.from({ length: steps + 1 }, (_, i) => ({
      x: climbFrom.x + ((climbTo.x - climbFrom.x) * i) / steps,
      y: climbFrom.y + ((climbTo.y - climbFrom.y) * i) / steps,
    })),
    ...arcPoints(climb.turn),
  ];
  return points.every((point) =>
    text.every(
      (line) =>
        Math.hypot(
          Math.max(line.left - point.x, 0, point.x - line.right),
          Math.max(line.top - point.y, 0, point.y - line.bottom)
        ) >= TEXT_CLEARANCE
    )
  );
}

function arcPoint(arc: Arc, angle: number): Point {
  return {
    x: arc.center.x + arc.radius * Math.cos(angle),
    y: arc.center.y + arc.radius * Math.sin(angle),
  };
}

function arcPoints(arc: Arc) {
  const sweep = arc.to - arc.from;
  const steps = Math.ceil((Math.abs(sweep) * arc.radius) / SAMPLE_STEP);
  return Array.from({ length: steps + 1 }, (_, i) =>
    arcPoint(arc, arc.from + (sweep * i) / steps)
  );
}

/** A line to the start of the arc, then the arc itself. */
function toSvgArc(arc: Arc) {
  const from = arcPoint(arc, arc.from);
  const to = arcPoint(arc, arc.to);
  const large = Math.abs(arc.to - arc.from) > Math.PI ? 1 : 0;
  const clockwise = arc.to > arc.from ? 1 : 0;
  return (
    ` L ${from.x} ${from.y}` +
    ` A ${arc.radius} ${arc.radius} 0 ${large} ${clockwise} ${to.x} ${to.y}`
  );
}

/**
 * Straight segments through the points (starting where the path currently
 * is), with every corner rounded by a circular arc of up to `radius`.
 */
function toRoundedRuns(points: Point[], radius: number) {
  let path = '';
  for (let i = 1; i < points.length; i++) {
    const corner = points[i];
    const next = points[i + 1];
    if (!next) {
      path += ` L ${corner.x} ${corner.y}`;
      break;
    }
    const before = points[i - 1];
    const inLength = Math.hypot(corner.x - before.x, corner.y - before.y);
    const outLength = Math.hypot(next.x - corner.x, next.y - corner.y);
    const into = {
      x: (corner.x - before.x) / inLength,
      y: (corner.y - before.y) / inLength,
    };
    const out = {
      x: (next.x - corner.x) / outLength,
      y: (next.y - corner.y) / outLength,
    };
    const turn = Math.acos(
      Math.min(1, Math.max(-1, into.x * out.x + into.y * out.y))
    );
    if (turn < 0.001) {
      path += ` L ${corner.x} ${corner.y}`;
      continue;
    }
    // The arc starts and ends this far from the corner
    const cut = Math.min(
      radius * Math.tan(turn / 2),
      inLength / 2,
      outLength / 2
    );
    const arcRadius = cut / Math.tan(turn / 2);
    const clockwise = into.x * out.y - into.y * out.x > 0 ? 1 : 0;
    path +=
      ` L ${corner.x - into.x * cut} ${corner.y - into.y * cut}` +
      ` A ${arcRadius} ${arcRadius} 0 0 ${clockwise} ${corner.x + out.x * cut} ${corner.y + out.y * cut}`;
  }
  return path;
}
