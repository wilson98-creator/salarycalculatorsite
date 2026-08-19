// Single source of truth for the site brand. Rename here to rebrand everything.

export const brand = {
  name: 'SalaryCalc',
  tagline: 'Honest Australian salary and pay calculators, updated for the current ATO financial year',
  shortDescription:
    'Free, accurate Australian salary calculator. See your take-home pay after income tax, Medicare levy, LITO, HECS-HELP and super for FY 2026–27. Updated with the latest ATO rates.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://salarycalc.example.com.au',
  locale: 'en-AU',
  language: 'en-AU',
  country: 'AU',
  contactEmail: 'hello@salarycalc.example.com.au',
  foundingDate: '2026-01-01',
  // Adjust each time the calculation logic is meaningfully changed.
  lastReviewed: '2026-08-19',
} as const;

export type Brand = typeof brand;
