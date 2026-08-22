import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

/**
 * Theme architecture
 * ------------------
 * All colour tokens are CSS custom properties (var(--ink-50) etc.) defined in
 * app/globals.css. We override them in :root (light mode) and .dark (dark
 * mode), so the SAME component classes — text-ink-800, bg-paper-0, etc. —
 * automatically render correctly in both modes. No dark: variants needed
 * in source files.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // INK — the base neutral scale.
        // Light mode: 50 = warm cream (page bg), 800 = deep navy (primary text).
        // Dark mode:  50 = deep ink (page bg),    800 = near-white (primary text).
        ink: {
          50: 'var(--ink-50)',
          100: 'var(--ink-100)',
          200: 'var(--ink-200)',
          300: 'var(--ink-300)',
          400: 'var(--ink-400)',
          500: 'var(--ink-500)',
          600: 'var(--ink-600)',
          700: 'var(--ink-700)',
          800: 'var(--ink-800)',
          900: 'var(--ink-900)',
          950: 'var(--ink-950)',
        },
        // BRAND — same scale, used for footer / result figure / brand surfaces.
        brand: {
          50: 'var(--brand-50)',
          100: 'var(--brand-100)',
          200: 'var(--brand-200)',
          300: 'var(--brand-300)',
          400: 'var(--brand-400)',
          500: 'var(--brand-500)',
          600: 'var(--brand-600)',
          700: 'var(--brand-700)',
          800: 'var(--brand-800)',
          900: 'var(--brand-900)',
        },
        // LEDGER — the yellow-green accent (result figure, CTAs, active).
        // Dark mode uses a vivid lime; light mode uses a darker olive for AA contrast on cream.
        ledger: {
          50: 'var(--ledger-50)',
          100: 'var(--ledger-100)',
          200: 'var(--ledger-200)',
          400: 'var(--ledger-400)',
          500: 'var(--ledger-500)',
          600: 'var(--ledger-600)',
          700: 'var(--ledger-700)',
        },
        // ACCENT2 — vibrant teal for borders / dividers (used SPARINGLY).
        accent2: {
          400: 'var(--accent2-400)',
          500: 'var(--accent2-500)',
          600: 'var(--accent2-600)',
        },
        // Semantic palettes — darker variants for light mode, lighter for dark.
        success: {
          50: 'var(--success-50)',
          100: 'var(--success-100)',
          400: 'var(--success-400)',
          500: 'var(--success-500)',
          600: 'var(--success-600)',
          700: 'var(--success-700)',
        },
        danger: {
          50: 'var(--danger-50)',
          100: 'var(--danger-100)',
          400: 'var(--danger-400)',
          500: 'var(--danger-500)',
          600: 'var(--danger-600)',
          700: 'var(--danger-700)',
        },
        warning: {
          50: 'var(--warning-50)',
          100: 'var(--warning-100)',
          400: 'var(--warning-400)',
          500: 'var(--warning-500)',
          600: 'var(--warning-600)',
          700: 'var(--warning-700)',
        },
        // Page / footer bookend.
        paper: {
          0: 'var(--paper-0)',
          950: 'var(--paper-950)',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
          '2xl': '1280px',
        },
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.700'),
            '--tw-prose-headings': theme('colors.ink.800'),
            '--tw-prose-links': theme('colors.ledger.500'),
            '--tw-prose-bold': theme('colors.ink.800'),
            '--tw-prose-quotes': theme('colors.ink.600'),
            '--tw-prose-quote-borders': theme('colors.ledger.500'),
            '--tw-prose-code': theme('colors.ink.800'),
            '--tw-prose-bullets': theme('colors.ink.400'),
            '--tw-prose-hr': theme('colors.ink.200'),
            '--tw-prose-thead-borders': theme('colors.ink.300'),
            '--tw-prose-table-borders': theme('colors.ink.200'),
            maxWidth: 'none',
            'h1, h2, h3, h4': {
              fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
              fontWeight: '700',
              letterSpacing: '-0.02em',
            },
            h1: { fontSize: '2.5rem', marginTop: '0', marginBottom: '1.25rem', lineHeight: '1.1' },
            h2: { fontSize: '1.875rem', marginTop: '2.25rem', marginBottom: '0.75rem', lineHeight: '1.15' },
            h3: { fontSize: '1.375rem', marginTop: '1.75rem', marginBottom: '0.5rem' },
            p: { marginTop: '0.75rem', marginBottom: '0.75rem', lineHeight: '1.75' },
            'p + p': { marginTop: '1rem' },
            ul: { marginTop: '0.75rem', marginBottom: '0.75rem', paddingLeft: '1.5rem' },
            ol: { marginTop: '0.75rem', marginBottom: '0.75rem', paddingLeft: '1.5rem' },
            li: { marginTop: '0.4rem', marginBottom: '0.4rem' },
            a: { textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: '500' },
            'a:hover': { color: theme('colors.ledger.600') },
            blockquote: {
              fontStyle: 'italic',
              borderLeftWidth: '3px',
              paddingLeft: '1rem',
              borderColor: theme('colors.ledger.500'),
            },
            table: { fontSize: '0.9rem' },
            'th, td': { padding: '0.5rem 0.75rem' },
            hr: { marginTop: '2rem', marginBottom: '2rem' },
            'lead': { fontSize: '1.125rem', lineHeight: '1.7', color: theme('colors.ink.600') },
            strong: { fontWeight: '700', color: theme('colors.ink.800') },
            'ol ol, ul ul, ol ul, ul ol': { marginTop: '0.5rem', marginBottom: '0.5rem' },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.ink.700'),
            '--tw-prose-headings': theme('colors.ink.800'),
            '--tw-prose-links': theme('colors.ledger.500'),
            '--tw-prose-bold': theme('colors.ink.800'),
            '--tw-prose-quotes': theme('colors.ink.600'),
            '--tw-prose-quote-borders': theme('colors.ledger.500'),
            '--tw-prose-code': theme('colors.ink.800'),
            '--tw-prose-bullets': theme('colors.ink.600'),
            '--tw-prose-hr': theme('colors.ink.300'),
            '--tw-prose-thead-borders': theme('colors.ink.500'),
            '--tw-prose-table-borders': theme('colors.ink.300'),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
