# Theme — SalaryCalc design system

## Part 1 — Compact token summary

### Brand & feel
- **Persona:** Honest, accurate, ATO-grounded Australian pay calculator. Brand-only (no real person), $0 budget.
- **Tone:** Professional, plain-spoken, no financial-advisor jargon.
- **Aesthetic:** Clean, fast, document-like. Not flashy. Closer to a serious spreadsheet than a SaaS landing page.

### Color palette

#### `ink` (neutral scale, used for surfaces and text)
- `ink-50` `#f8fafc` (page background light)
- `ink-100` `#f1f5f9`
- `ink-200` `#e2e8f0` (borders, dividers)
- `ink-300` `#cbd5e1`
- `ink-400` `#94a3b8` (muted text)
- `ink-500` `#64748b` (helper text)
- `ink-600` `#475569` (body text dark mode muted)
- `ink-700` `#334155` (labels)
- `ink-800` `#1e293b`
- `ink-900` `#0f172a` (body text, headings)
- `ink-950` `#020617` (page background dark)

#### `brand` (primary blue, used for CTAs and active states)
- `brand-50` `#eef6ff` (active nav bg light)
- `brand-100` `#d9eaff` (focus ring)
- `brand-300` `#8ec0ff` (links in dark mode)
- `brand-400` `#599cff`
- `brand-500` `#1e6fff` (PRIMARY, CTA, logo)
- `brand-600` `#1758cc` (hover, prose links)
- `brand-700` `#134299`

#### Semantic colors (in results panel)
- `bg-brand-500` (net take-home)
- `bg-rose-500` (tax — deductions)
- `bg-amber-500` (Medicare — deductions)
- `bg-ink-300/600` (super)

### Typography
- **Sans (UI & body):** `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
- **Mono (numbers, results):** `ui-monospace, SFMono-Regular, Menlo, monospace` — used for all currency values
- **Headings:** `font-bold tracking-tight` (`-0.02em` letter-spacing in prose)
- **No display fonts** — system fonts only, $0-budget
- **Type scale (Tailwind defaults):** `text-xs` (0.75rem), `text-sm` (0.875rem), `text-base` (1rem), `text-lg` (1.125rem), `text-xl` (1.25rem), `text-2xl` (1.5rem), `text-3xl` (1.875rem)
- **Hero:** `text-3xl` → `text-4xl` responsive
- **Body:** `text-base` (1rem)
- **Helper text:** `text-xs text-ink-500`

### Spacing
- **Page padding:** `py-10 sm:py-14` (40px → 56px)
- **Card padding:** `p-6` (24px)
- **Section gap:** `mt-20` (80px) between major sections
- **Container max-width:** 1280px (`2xl`), padding `1.25rem` mobile → `2rem` desktop

### Radii
- `rounded-lg` (8px) — inputs, buttons
- `rounded-2xl` (16px) — cards
- `rounded-full` — badges, toggle buttons

### Shadows
- Light mode: `shadow-sm` on cards, `shadow-2xl` on mobile sidebar
- Dark mode: no shadows (borders only)

### Breakpoints
- `sm` 640px, `md` 768px, `lg` 1024px (sidebar appears), `xl` 1200px, `2xl` 1280px (container max)

### Dark mode
- Class-based (`darkMode: 'class'`)
- Bootstrapped pre-hydration to avoid flash (inline script in `<head>`)
- System preference default, user choice persisted in `localStorage`
- Toggle component in header (sun/moon icon)

## Part 2 — Raw source

### `tailwind.config.ts`
```ts
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
        brand: { 50: '#eef6ff', 100: '#d9eaff', 200: '#bcd9ff', 300: '#8ec0ff', 400: '#599cff', 500: '#1e6fff', 600: '#1758cc', 700: '#134299', 800: '#112f6b', 900: '#0c1f47' },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1.25rem', sm: '1.5rem', md: '2rem', lg: '2rem' },
        screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1200px', '2xl': '1280px' },
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: { css: {
          '--tw-prose-body': theme('colors.ink.700'),
          '--tw-prose-headings': theme('colors.ink.900'),
          '--tw-prose-links': theme('colors.brand.600'),
          '--tw-prose-bold': theme('colors.ink.900'),
          '--tw-prose-quotes': theme('colors.ink.800'),
          '--tw-prose-quote-borders': theme('colors.brand.500'),
          h1: { fontSize: '2.25rem' },
          'h1, h2, h3, h4': { fontWeight: '700', letterSpacing: '-0.02em' },
          p: { lineHeight: '1.7' },
        } },
        invert: { css: {
          '--tw-prose-body': theme('colors.ink.300'),
          '--tw-prose-headings': theme('colors.ink.50'),
          '--tw-prose-links': theme('colors.brand.300'),
        } },
      }),
    },
  },
  plugins: [typography],
};
export default config;
```

### `app/globals.css` (key components)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: light; }
.dark { color-scheme: dark; }

body { background: #f8fafc; color: #0f172a; -webkit-font-smoothing: antialiased; }
.dark body { background: #020617; color: #f1f5f9; }

.input {
  @apply w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-base text-ink-900
    shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100
    disabled:bg-ink-100 disabled:text-ink-500;
}
.dark .input {
  @apply border-ink-700 bg-ink-800 text-ink-100 shadow-none
    focus:border-brand-400 focus:ring-brand-900
    disabled:bg-ink-900 disabled:text-ink-500;
}

.label { @apply mb-1 block text-sm font-medium text-ink-700; }
.dark .label { @apply text-ink-300; }

.help { @apply mt-1 text-xs text-ink-500; }
.dark .help { @apply text-ink-400; }

.btn { @apply inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold
    transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2; }
.btn-primary { @apply btn bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500
    dark:bg-brand-500 dark:hover:bg-brand-400 dark:focus-visible:ring-brand-400; }
.btn-ghost { @apply btn bg-transparent text-ink-700 hover:bg-ink-100 focus-visible:ring-ink-400; }
.dark .btn-ghost { @apply text-ink-200 hover:bg-ink-800 focus-visible:ring-ink-500; }

.card { @apply rounded-2xl border border-ink-200 bg-white p-6 shadow-sm; }
.dark .card { @apply border-ink-800 bg-ink-900 shadow-none; }

.result-row { @apply flex items-baseline justify-between gap-3 py-2; }
.result-label { @apply text-sm text-ink-600; }
.dark .result-label { @apply text-ink-400; }
.result-value { @apply font-mono text-base font-semibold tabular-nums text-ink-900; }
.dark .result-value { @apply text-ink-100; }

.chip { @apply inline-flex items-center rounded-full border border-ink-200 bg-white px-2 py-0.5 text-xs text-ink-600; }
.dark .chip { @apply border-ink-700 bg-ink-900 text-ink-300; }
```
