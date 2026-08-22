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
        // Premium Dark Fintech — INK palette mapped to dark-mode values.
        // Low numbers (50) = dark surfaces, high numbers (950) = bright text.
        // This is the COLOUR the body text, borders, and surfaces render in.
        ink: {
          50: '#0a0e1a',   // page background (darkest)
          100: '#14192a',  // elevated surface
          200: '#1f2440',  // surface (cards)
          300: '#2a2f4d',  // border light
          400: '#3a3a4a',  // border (stronger)
          500: '#5a5a6e',  // muted text
          600: '#a0a0ae',  // secondary text (>=4.5:1 on #0a0e1a)
          700: '#c7cad4',  // light text (>=7:1 on #0a0e1a, AAA)
          800: '#e8e9ee',  // primary text (>=14:1 on #0a0e1a, AAA+)
          900: '#f1f2f5',  // near-white
          950: '#fafaf7',  // warmest white (brightest)
        },
        // Brand palette (premium dark, used for footer / result figure).
        brand: {
          50: '#050811',   // deepest ink (footer background)
          100: '#0a0e1a',  // page background (alias of ink-50)
          200: '#14192a',  // elevated surface (alias of ink-100)
          300: '#1a1f3a',  // deep purple-blue (subtle accent surface)
          400: '#1f2440',  // soft borders (alias of ink-200)
          500: '#5a5a6e',  // medium gray (alias of ink-500)
          600: '#a0a0ae',  // light gray (alias of ink-600)
          700: '#c7cad4',  // light text (alias of ink-700)
          800: '#e8e9ee',  // primary text (alias of ink-800)
          900: '#fafaf7',  // warm white (alias of ink-950)
        },
        // ledger = bright yellow-green (the ONLY chromatic color on the surface)
        // Used for the result figure, CTAs, and active state.
        ledger: {
          50: '#1a2400',   // very dark yellow-green tint
          100: '#2d3d00',  // darker tint
          200: '#5a7800',  // muted accent
          400: '#a6c400',  // hover state
          500: '#c7f000',  // PRIMARY YELLOW-GREEN — result figure, CTAs
          600: '#d4f933',  // bright hover
          700: '#e0ff66',  // lightest
        },
        // accent2 = vibrant teal (used SPARINGLY for borders, dividers)
        accent2: {
          400: '#00a89a',
          500: '#00d4b5',  // PRIMARY TEAL
          600: '#2ee0c4',
        },
        // success / danger / warning — restrained use for state indicators
        success: {
          50: '#022c1d',
          100: '#064e3b',
          400: '#10b981',
          500: '#34d399',
          600: '#6ee7b7',
          700: '#a7f3d0',
        },
        danger: {
          50: '#3a0d0d',
          100: '#7f1d1d',
          400: '#f87171',
          500: '#fca5a5',
          600: '#fecaca',
          700: '#fee2e2',
        },
        warning: {
          50: '#3a2807',
          100: '#78350f',
          400: '#fbbf24',
          500: '#fcd34d',
          600: '#fde68a',
          700: '#fef3c7',
        },
        // Page / footer bookend
        paper: {
          0: '#0a0e1a',   // page background dark
          950: '#050811',  // footer background (deeper still)
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        // One restrained editorial accent for the H1 only — matches the
        // Bankrate / Which? "publication not a startup" feel.
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
            '--tw-prose-links': theme('colors.ledger.600'),
            '--tw-prose-bold': theme('colors.ink.800'),
            '--tw-prose-quotes': theme('colors.ink.700'),
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
            'a:hover': { color: theme('colors.ledger.700') },
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
            '--tw-prose-body': theme('colors.ink.300'),
            '--tw-prose-headings': theme('colors.brand.50'),
            '--tw-prose-links': theme('colors.ledger.200'),
            '--tw-prose-bold': theme('colors.brand.50'),
            '--tw-prose-quotes': theme('colors.ink.200'),
            '--tw-prose-quote-borders': theme('colors.ledger.400'),
            '--tw-prose-code': theme('colors.brand.50'),
            '--tw-prose-bullets': theme('colors.ink.600'),
            '--tw-prose-hr': theme('colors.ink.700'),
            '--tw-prose-thead-borders': theme('colors.ink.600'),
            '--tw-prose-table-borders': theme('colors.ink.700'),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
