# Page override: Home

Overrides `MASTER.md` for the landing page (`/de`, `/en`).

- **Hero:** full viewport height (`min-h-[100svh]`), 3D Maikäfer scene on the right (desktop) or behind
  the text (mobile, reduced opacity). Headline is plain HTML and the LCP element.
- **Hero motion:** word-by-word headline reveal, CTAs fade in after the headline, scroll hint pulses.
  The beetle tilts towards the pointer and flies off upwards while the hero scrolls out.
- **Sections:** contact card strip → brand cards (consulting / labs) → labs projects → consulting
  projects → experience timeline → contact CTA. Each chapter ends with a mini CTA.
- **Project cards:** large framed preview (16:10) in a faux browser chrome, title, client, years,
  stack chips, "Live demo" + "Case study".
- Background: subtle terracotta radial glow at the top of the hero only; the rest stays on `--background`.
