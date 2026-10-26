# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/rufusmai/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** rufusmai
**Generated:** 2026-10-25 with ui-ux-pro-max (`--variance 6 --motion 8 --density 3`), then adapted to the
rufusmai branding (`rufusmai-branding/logos/export/README.md`).
**Category:** Freelance developer portfolio, consulting and product lab
**Design Dials:** Variance 6/10 (Balanced / Modern) | Motion 8/10 (Complex) | Density 3/10 (Spacious)

---

## Brand

- **Logo:** the Maikäfer (May beetle) flying through an oval. Ink parts plus terracotta wing covers.
  Use `src/components/site/Logo.tsx` (inline SVG, ink = `currentColor`, wing covers = `var(--brand-wing)`).
- **Sub-brands:** _rufusmai consulting_ (client work) and _rufusmai labs_ (own products). Same palette;
  the sub-brand name is set in the heading font with "rufusmai" in the ink colour and the suffix in primary.

## Global Rules

### Color Palette

Defined as CSS variables in `src/app/globals.css` and mapped onto the shadcn tokens. Never use raw hex in
components; use the Tailwind token classes (`bg-background`, `text-primary`, …).

| Role                             | Light     | Dark      | CSS variable          |
| -------------------------------- | --------- | --------- | --------------------- |
| Background                       | `#fafafa` | `#18181b` | `--background`        |
| Foreground (ink)                 | `#18181b` | `#fafafa` | `--foreground`        |
| Card                             | `#ffffff` | `#1f1f23` | `--card`              |
| Muted surface                    | `#f4f4f5` | `#27272a` | `--muted`             |
| Muted foreground                 | `#52525b` | `#a1a1aa` | `--muted-foreground`  |
| Border                           | `#e4e4e7` | `#2e2e33` | `--border`            |
| Primary (text, links, icons)     | `#b04a26` | `#d1633d` | `--primary`           |
| Button fill                      | `#b04a26` | `#b04a26` | `--button`            |
| Accent (hover fills, highlights) | `#b04a26` | `#b04a26` | `--accent`            |
| Text on accent                   | `#ffffff` | `#ffffff` | `--accent-foreground` |
| Text on button                   | `#ffffff` | `#ffffff` | `--button-foreground` |
| Wing cover (logo, 3D only)       | `#c75a34` | `#d1633d` | `--brand-wing`        |
| Ink (logo, 3D)                   | `#18181b` | `#fafafa` | `--brand-ink`         |
| Ring                             | `#b04a26` | `#d1633d` | `--ring`              |
| Destructive                      | `#dc2626` | `#f87171` | `--destructive`       |

**Only the branding colours are used as accents** (`#c75a34` logo, `#b04a26` text and fills, `#d1633d`
text and logo in dark mode, see `rufusmai-branding/logos/vergleich-terrakotta.png`). No extra hover shades
or other hues; status indicators use primary as well.

**Contrast notes (from the branding README):** `#b04a26` on light reaches 5.5:1, `#d1633d` on dark 4.7:1.
`#c75a34` reaches only 4.25:1 on white, so it is **logo-only**, never text. Buttons keep the `#b04a26`
fill in both schemes (3.3:1 against the dark background, above the 3:1 needed for controls).

### Typography

- **Heading font:** Bricolage Grotesque (700–800, optical size axis on, tight tracking `-0.035em` on display sizes)
- **Secondary headline line:** Instrument Serif italic (400). In two-part headlines the big part is set in
  Bricolage Grotesque and the lower part in Instrument Serif, e.g. the home hero "Rufus Maiwald / baut
  Software, die abhebt." Utility: `font-serif`.
- **Body font:** Geist (400/500)
- **Captions / labels:** Bricolage Grotesque condensed (`wdth` 80) at 13px — stack chips, years, eyebrow
  labels, footer titles. Utility `font-caption` + `text-caption`; no monospace font is loaded.
- Loaded with `next/font/google` (no CSS `@import`), exposed as `--font-heading`, `--font-serif`,
  `--font-sans`, `--font-caption`. Generated OG images load the same fonts in `src/lib/ogFonts.ts`.
- Fluid display sizes with `clamp()`; body at least 16px, line-height 1.5–1.7; line length 60–75ch.

| Token        | Size                                              |
| ------------ | ------------------------------------------------- |
| Display (h1) | `clamp(2.75rem, 1.6rem + 5.2vw, 6rem)`            |
| H2           | `clamp(2rem, 1.4rem + 2.6vw, 3.5rem)`             |
| H3           | `clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)`        |
| Lead         | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)`         |
| Caption      | `0.8125rem` (`text-caption`), condensed Bricolage |
| Eyebrow      | caption font, uppercase, `0.2em` tracking         |

### Spacing Variables

_Density: 3/10 — Spacious_

| Token         | Value             | Usage                     |
| ------------- | ----------------- | ------------------------- |
| `--space-xs`  | `4px` / `0.25rem` | Tight gaps                |
| `--space-sm`  | `8px` / `0.5rem`  | Icon gaps, inline spacing |
| `--space-md`  | `24px` / `1.5rem` | Standard padding          |
| `--space-lg`  | `32px` / `2rem`   | Card padding              |
| `--space-xl`  | `48px` / `3rem`   | Large gaps                |
| `--space-2xl` | `64px` / `4rem`   | Section margins (mobile)  |
| `--space-3xl` | `96px` / `6rem`   | Section margins (desktop) |

Container: `max-w-6xl`, 16px gutter on mobile, 24px from `sm`, 32px from `lg`.

### Radius & Shadow

- Radius base `--radius: 0.875rem` (cards `rounded-2xl`, buttons `rounded-full`, chips `rounded-full`).
- Shadows are warm-tinted ink, not pure black:

| Level         | Value                                     | Usage                  |
| ------------- | ----------------------------------------- | ---------------------- |
| `--shadow-sm` | `0 1px 2px rgb(24 24 27 / 0.06)`          | Subtle lift            |
| `--shadow-md` | `0 8px 24px -12px rgb(24 24 27 / 0.18)`   | Cards                  |
| `--shadow-lg` | `0 24px 48px -24px rgb(176 74 38 / 0.28)` | Hovered/featured cards |

In dark mode, elevation comes from lighter surfaces and a 1px border, not from shadows.

---

## Component Specs

- **Primary button:** `bg-button text-button-foreground rounded-full px-6 h-11 font-medium`; hover lifts
  `-translate-y-px` with `shadow-lift`, the fill stays `#b04a26`; press `scale-[0.98]`; 200ms.
- **Ghost button / menu items:** hover fills with `--accent` (`#b04a26`) and white text.
- **Secondary button:** `border border-border bg-card/60 backdrop-blur rounded-full`; hover `border-primary/50`.
- **Link with arrow:** `text-primary` + lucide `ArrowRight` that slides `translate-x-0.5` on hover.
- **Card:** `bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-md`; interactive cards lift
  `-translate-y-1` and gain `shadow-lg` on hover (300ms). No scale on hover (avoids layout shift).
- **Chip (stack, tags):** `font-caption text-caption rounded-full border px-2.5 py-1 text-muted-foreground`.
- **Inputs:** visible `<label>`, `h-11 rounded-xl border bg-card px-4`, focus ring `ring-2 ring-ring/40`,
  error text directly below the field in `text-destructive`.
- **Section:** eyebrow (caption font, primary) → H2 → lead paragraph → content → mini CTA.

---

## Style Guidelines

**Style:** Motion-Driven — warm, editorial minimalism with one bold 3D moment.

**Keywords:** smooth transitions, scroll reveals, staggered entrances, tactile micro-interactions, 3D hero.

### Page Pattern

**Pattern Name:** Scroll-Triggered Storytelling

- Keep the narrative readable without any scroll-driven effect; DOM order is the reading order.
- **CTA Placement:** a mini CTA at the end of each chapter + a final contact CTA.
- **Home order:** 3D hero → contact card → labs → consulting → experience → contact CTA.

---

## Motion

Library: [`motion`](https://motion.dev) (`motion/react`) for UI, React Three Fiber for the hero scene.

| Kind             | Duration  | Easing / physics                         |
| ---------------- | --------- | ---------------------------------------- |
| Hover / press    | 150–250ms | spring `stiffness 400, damping 30`       |
| Reveal on scroll | 500–700ms | `[0.22, 1, 0.36, 1]` (ease-out-expo-ish) |
| Stagger children | 60–90ms   | —                                        |
| Hero word reveal | 700ms     | `[0.22, 1, 0.36, 1]`, 80ms per word      |

- Animate only `transform` and `opacity`.
- `MotionConfig reducedMotion="user"` at the root; reveals render in their final state under reduced motion.
- The 3D hero pauses when off-screen, lowers DPR when frames drop and falls back to the static SVG logo
  under reduced motion or without WebGL.
- No scroll hijacking; scroll-linked effects read native scroll position.

---

## Anti-Patterns (Do NOT Use)

- ❌ Heavy text walls — keep paragraphs short, use lists and cards
- ❌ Poor image showcase — project previews are large, framed and lazy-loaded with reserved size
- ❌ **Emojis as icons** — use lucide or the brand SVG icons
- ❌ **Missing cursor:pointer** on clickable elements
- ❌ **Layout-shifting hovers** — no scale on cards
- ❌ **Low contrast text** — 4.5:1 minimum; never `#c75a34` as text
- ❌ **Instant state changes** — always 150–300ms transitions
- ❌ **Invisible focus states** — focus rings must be visible

---

## Pre-Delivery Checklist

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from lucide or `brandIcons.tsx`
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light and dark mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected (incl. 3D fallback)
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind the fixed header
- [ ] No horizontal scroll on mobile
