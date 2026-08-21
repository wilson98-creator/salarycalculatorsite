# Components — SalaryCalc

Source: `/Users/WilsonBawa/.minimax-agent/projects/paywise-au/components/`

Most "components" are full calculator implementations (large `use client` files with their own state). The shared/reusable UI primitives are:

## `Schema.tsx` (server component)
JSON-LD structured data. Exports `JsonLd`, `organizationSchema()`, `websiteSchema()`, `softwareApplicationSchema()`, `faqSchema()`. Injects `<script type="application/ld+json">` tags into the page for Google rich results.

## `Analytics.tsx` (client component)
Loads GA4 and/or Plausible via `next/script`. Reads IDs from `process.env.NEXT_PUBLIC_GA4_ID` and `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.

## `CookieBanner.tsx` (client component)
Bottom-fixed cookie consent banner. Stores choice in `localStorage` (`salarycalc_cookie_consent`). Shows on first visit only.

## `calculator/` subdirectory
Sub-components extracted from the larger calculator files (e.g. result panels, input groups). Worth checking if you want to redesign individual calculator inputs/buttons.

## `ThemeToggle.tsx`
```tsx
'use client';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem('salarycalc_theme') as 'light' | 'dark' | null;
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initial = t || sys;
    setTheme(initial);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = next;
    localStorage.setItem('salarycalc_theme', next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-700 transition hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
    >
      {mounted && (theme === 'dark' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ))}
    </button>
  );
}
```
