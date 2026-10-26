# Page override: Home

Overrides `MASTER.md` for the landing page (`/de`, `/en`).

- **Hero:** full viewport height (`min-h-[100svh]`), text on the left. A dotted terracotta flight path
  (`src/components/motion/FlightPath.tsx`) sweeps from the lower left through the empty right side of
  the hero and continues down the whole page in the side margins, crossing over in the whitespace
  between sections. The Maikäfer flies at its tip and lands on the closing CTA band. Waypoints are
  `data-flight="x,y;x,y"` attributes (fractions of the element box; `x` can be `L`/`R` for the middle of
  the side margin). Runs along one margin are straight, crossings join them with rounded corners.
  Wide screens (≥1280px) only.
- **Hero motion:** word-by-word headline reveal, CTAs fade in after the headline, scroll hint pulses.
  The hero part of the flight path draws in on load; after that the path tip follows a line at 60% of
  the viewport as you scroll. Under reduced motion the full path and the landed beetle are shown.
- **Sections:** contact card strip → brand cards (consulting / labs) → labs projects → consulting
  projects → experience timeline → contact CTA. Each chapter ends with a mini CTA.
- **Project cards:** large framed preview (16:10) in a faux browser chrome, title, client, years,
  stack chips, "Live demo" + "Case study".
- Background: subtle terracotta radial glow at the top of the hero only; the rest stays on `--background`.
