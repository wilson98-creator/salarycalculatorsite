// Single source of truth for the site brand. Rename here to rebrand everything.

export const brand = {
  name: 'SalaryCalc',
  /** One-line pitch used in the header, footer, and OG meta. */
  tagline: 'Your take-home pay, properly explained',
  /**
   * The text that shows under the site title in Google results, on
   * social shares, and as the default meta description. Front-load the
   * words people actually search for.
   */
  shortDescription:
    'Calculate your Australian take-home pay after income tax, Medicare, HECS, and super. Updated for FY 2026-27 with the latest ATO rates. Free, no signup.',
  /** Slightly longer version for the footer blurb. */
  longDescription:
    'Free, accurate Australian pay calculators: take-home pay, salary sacrifice, HECS-HELP, mortgage, and casual pay. Updated for the current ATO financial year.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://thesalarycalc.com.au',
  locale: 'en-AU',
  language: 'en-AU',
  country: 'AU',
  contactEmail: 'hello@thesalarycalc.com.au',
  foundingDate: '2026-01-15',
  // Adjust each time the calculation logic is meaningfully changed.
  lastReviewed: '2026-08-26',
} as const;

export type Brand = typeof brand;
