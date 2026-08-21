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
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcd9ff',
          300: '#8ec0ff',
          400: '#599cff',
          500: '#1e6fff',
          600: '#1758cc',
          700: '#134299',
          800: '#112f6b',
          900: '#0c1f47',
        },
        // Semantic colors — rationed to result figures only.
        // success = net take-home (the figure the user came for)
        // danger = tax / Medicare (deductions)
        // warning = optional flags
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
        // Footer deep-navy bookend (only used in Footer + Calculator result card on dark)
        footer: {
          900: '#0c1f47',
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
            '--tw-prose-headings': theme('colors.ink.900'),
            '--tw-prose-links': theme('colors.brand.600'),
            '--tw-prose-bold': theme('colors.ink.900'),
            '--tw-prose-quotes': theme('colors.ink.800'),
            '--tw-prose-quote-borders': theme('colors.brand.500'),
            '--tw-prose-code': theme('colors.ink.900'),
            '--tw-prose-bullets': theme('colors.ink.400'),
            '--tw-prose-hr': theme('colors.ink.200'),
            '--tw-prose-thead-borders': theme('colors.ink.300'),
            '--tw-prose-table-borders': theme('colors.ink.200'),
            maxWidth: 'none',
            'h1, h2, h3, h4': {
              fontWeight: '700',
              letterSpacing: '-0.02em',
            },
            h1: { fontSize: '2.25rem', marginTop: '0', marginBottom: '1.25rem' },
            h2: { fontSize: '1.5rem', marginTop: '2.25rem', marginBottom: '0.75rem' },
            h3: { fontSize: '1.25rem', marginTop: '1.75rem', marginBottom: '0.5rem' },
            p: { marginTop: '0.75rem', marginBottom: '0.75rem', lineHeight: '1.7' },
            'p + p': { marginTop: '1rem' },
            ul: { marginTop: '0.75rem', marginBottom: '0.75rem', paddingLeft: '1.5rem' },
            ol: { marginTop: '0.75rem', marginBottom: '0.75rem', paddingLeft: '1.5rem' },
            li: { marginTop: '0.4rem', marginBottom: '0.4rem' },
            a: { textDecoration: 'underline', textUnderlineOffset: '3px' },
            'a:hover': { textDecoration: 'underline' },
            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '3px',
              paddingLeft: '1rem',
            },
            table: { fontSize: '0.9rem' },
            'th, td': { padding: '0.5rem 0.75rem' },
            hr: { marginTop: '2rem', marginBottom: '2rem' },
            'lead': { fontSize: '1.125rem', lineHeight: '1.7', color: theme('colors.ink.600') },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.ink.300'),
            '--tw-prose-headings': theme('colors.ink.50'),
            '--tw-prose-links': theme('colors.brand.300'),
            '--tw-prose-bold': theme('colors.ink.50'),
            '--tw-prose-quotes': theme('colors.ink.200'),
            '--tw-prose-quote-borders': theme('colors.brand.400'),
            '--tw-prose-code': theme('colors.ink.50'),
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
