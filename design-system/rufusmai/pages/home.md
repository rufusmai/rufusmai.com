# Page override: Home

Overrides `MASTER.md` for the landing page (`/de`, `/en`).

- **Hero:** full viewport height (`min-h-[100svh]`), text on the left. A dotted terracotta flight path
  (`src/components/motion/FlightPath.tsx`) enters from the left edge on a runway below the hero text,
  lifts off gently in one curved sweep (a cubic Bézier, no straight climb) that gets steeper past the
  right side of the text (40px clearance from each line) and turns over the top right in a tight
  circular arc (100px radius) down into the right margin. The sweep leaves the runway and meets the arc
  at a tangent, so there are no kinks. It meets the arc at 60°, or steeper beside long text. From
  there it runs straight down the right margin; above the closing CTA band it turns in with a rounded
  corner and the Maikäfer lands on the band. Waypoints are `data-flight="x,y;x,y"` attributes (`x` as a
  fraction, `L`/`R` for the margin middle); the text lines the take-off avoids are the children of
  `[data-flight-avoid]`. Wide screens (≥1280px) only.
- **Hero motion:** word-by-word headline reveal, CTAs fade in after the headline, scroll hint pulses.
  The hero part of the flight path draws in on load with an ease-in-out curve; after that the path tip
  follows a line at 60% of the viewport as you scroll, eased by a critically damped follower (no jumps,
  no overshoot). Corners have a 140px radius. Under reduced motion the full path and the landed beetle are shown.
- **Sections:** contact card strip → brand cards (consulting / labs) → labs projects → consulting
  projects → experience timeline → contact CTA. Each chapter ends with a mini CTA.
- **Project cards:** large framed preview (16:10) in a faux browser chrome, title, client, years,
  stack chips, "Live demo" + "Case study".
- Background: subtle terracotta radial glow at the top of the hero only; the rest stays on `--background`.
