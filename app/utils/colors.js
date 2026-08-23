/*
** The accent palettes this site uses, at the values it was built against
** (Tailwind v2). They are read at runtime to build the gradients, so they are
** pinned here rather than imported from Tailwind's internals - v4 defines its
** palette in oklch, which would shift every gradient on the site.
**
** Keep in sync with the @theme block in assets/css/tailwind.css.
*/
export const colors = {
  teal: { 200: '#99f6e4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488' },
  blue: { 200: '#bfdbfe', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb' },
  indigo: { 200: '#c7d2fe', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5' },
  purple: { 200: '#e9d5ff', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea' },
  fuchsia: { 200: '#f5d0fe', 400: '#e879f9', 500: '#d946ef', 600: '#c026d3' },
  pink: { 200: '#fbcfe8', 400: '#f472b6', 500: '#ec4899', 600: '#db2777' },
  rose: { 200: '#fecdd3', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48' },
  orange: { 200: '#fed7aa', 400: '#fb923c', 500: '#f97316', 600: '#ea580c' },
  yellow: { 200: '#fef08a', 400: '#facc15', 500: '#eab308', 600: '#ca8a04' },
  green: { 200: '#bbf7d0', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a' },
  red: { 200: '#fecaca', 400: '#f87171', 500: '#ef4444', 600: '#dc2626' },
  amber: { 200: '#fde68a', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706' },
  gray: { 200: '#e4e4e7', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b' }
}

export default colors
