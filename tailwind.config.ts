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
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Ink — warm gray scale (Editorial Ledger, paper-like)
        // Named `ink` to match existing component classes
        brand: {
          50: '#f5f1e8',   // paper / cream
          100: '#ede6d6',  // warmer cream
          200: '#c8c0b0',  // rule lines (warm gray)
          300: '#b8ac97',  // subtle warm gray
          400: '#8a8174',  // medium warm gray
          500: '#6b6357',  // secondary text (warm gray)
          600: '#3d3a32',  // mid-text
          700: '#2a2820',  // darker text
          800: '#1a1a1a',  // primary text (warm near-black)
          900: '#0f0f0f',  // darkest
        },
        // ledger = oxblood (the ONLY chromatic color on the surface)
        // Used for the result figure, section accents, and active state.
        ledger: {
          50: '#f5ebeb',   // light oxblood tint (hover bg, focus ring)
          100: '#e8d0d0',  // softer tint
          200: '#d4a8a8',  // muted accent
          400: '#a73838',  // hover state
          500: '#8b1a1a',  // PRIMARY OXBLOOD — the result figure color
          600: '#6b1414',  // pressed
          700: '#4a0e0e',  // darkest
        },
        // success / danger / warning — kept for tax/medicare deduction rows
        // and minor state indicators. Restrained use only.
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        // Cream paper background + footer bookend
        paper: {
          0: '#f5f1e8',   // page background light
          950: '#0a0a0a',  // footer background (still monochrome bookend)
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
