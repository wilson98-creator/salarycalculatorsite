# Layouts — SalaryCalc

The site has a **sticky header + collapsible left sidebar + footer** layout. On mobile (<lg) the sidebar becomes a slide-in drawer. Layout state (collapsed/open) is stored in React context provided by `AppShell`, which wraps every page.

## `app/layout.tsx` (root layout)

- HTML lang="en-AU", dark mode bootstrap inline script in `<head>` (pre-hydration)
- Loads global CSS, sets up theme bootstrap script, analytics, cookie banner, and JSON-LD schema
- Renders `<AppShell>` which contains header + sidebar + main + footer
- Sets comprehensive metadata: title templates, OG tags, Twitter cards, robots, manifest

```tsx
// app/layout.tsx (key parts)
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { brand } from '@/lib/brand';
import { AppShell } from '@/components/AppShell';
import { Analytics } from '@/components/Analytics';
import { CookieBanner } from '@/components/CookieBanner';
import { JsonLd, organizationSchema, websiteSchema } from '@/components/Schema';

const themeBootstrap = `(() => {
  try {
    const t = localStorage.getItem('salarycalc_theme');
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = (t === 'light' || t === 'dark') ? t : sys;
    if (theme === 'dark') document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: { default: `${brand.name} — Australian Pay Calculator (FY 2026–27)`, template: `%s · ${brand.name}` },
  description: brand.shortDescription,
  applicationName: brand.name,
  authors: [{ name: brand.name }],
  keywords: ['pay calculator australia','salary calculator australia','tax calculator australia','take home pay calculator','payg calculator','payg withholding','income tax calculator','hecs help calculator','medicare levy calculator','fortnightly pay calculator','weekly pay calculator','casual pay calculator','award pay calculator','penalty rate calculator','salary sacrifice calculator','stage 3 tax calculator'],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'en_AU', url: brand.url, siteName: brand.name, title: `${brand.name} — Australian Pay Calculator (FY 2026–27)`, description: brand.shortDescription },
  twitter: { card: 'summary_large_image', title: `${brand.name} — Australian Pay Calculator`, description: brand.shortDescription },
  icons: { icon: [{ url: '/icons/icon.svg', type: 'image/svg+xml' }] },
  manifest: '/manifest.webmanifest',
  other: { 'google-site-verification': '_6KD07ejnLc9X4RGJB80gujOo0bllGWDKDvVSMxitmY' },
};

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, themeColor: '#1e6fff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <Script id="theme-bootstrap" strategy="beforeInteractive">{themeBootstrap}</Script>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3088783706802319" crossOrigin="anonymous" strategy="afterInteractive" />
      </head>
      <body className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-100">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-ink-900 focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
        <AppShell>
          <main id="main" className="container py-10 sm:py-14">{children}</main>
        </AppShell>
        <Analytics ga4Id={ga4Id} plausibleDomain={plausibleDomain} />
        <CookieBanner />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
```

## `components/AppShell.tsx` (client component)

Provides `useSidebar()` context with state: `isOpen` (mobile drawer), `isCollapsed` (desktop). Persists `isCollapsed` to localStorage as `salarycalc_sidebar_collapsed`. Closes mobile drawer on route change and on Escape key.

```tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface SidebarContextValue {
  isOpen: boolean;
  isCollapsed: boolean;
  toggle: () => void;
  close: () => void;
  setCollapsed: (v: boolean) => void;
}
const SidebarContext = createContext<SidebarContextValue | null>(null);
export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within AppShell');
  return ctx;
}
const COLLAPSED_KEY = 'salarycalc_sidebar_collapsed';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = window.localStorage.getItem(COLLAPSED_KEY);
    if (stored === 'true') setIsCollapsed(true);
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(COLLAPSED_KEY, String(isCollapsed));
  }, [isCollapsed, hydrated]);
  useEffect(() => { setIsOpen(false); }, [pathname]);
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  const value = { isOpen, isCollapsed, toggle: () => setIsOpen((v) => !v), close: () => setIsOpen(false), setCollapsed };
  return (
    <SidebarContext.Provider value={value}>
      <Header />
      <Sidebar />
      <div className={`min-h-[calc(100vh-4rem)] transition-[margin] duration-200 ease-in-out ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {children}
        <Footer />
      </div>
    </SidebarContext.Provider>
  );
}
```

## `components/Header.tsx` (server component, uses `useSidebar`)

Sticky top bar. Three zones:
- **Left:** hamburger button (opens mobile drawer; on desktop the in-sidebar toggle handles collapse)
- **Center:** logo — image in light mode (`/icons/salarycalc-logo.png`), styled text "Salary" + "Calc" + ".au" in dark mode
- **Right:** top nav (FAQ + About) + ThemeToggle

```tsx
// structure
<header className="sticky top-0 z-50 border-b border-ink-200 bg-white/90 backdrop-blur dark:border-ink-800 dark:bg-ink-950/90">
  <div className="flex h-16 items-center justify-between gap-2 px-3 sm:gap-4 sm:px-4 lg:px-6">
    <button onClick={toggle} aria-label="Open navigation">☰</button>
    <Link href="/">Logo</Link>
    <nav className="ml-auto flex items-center gap-2 sm:gap-4">
      <Link href="/faq">FAQ</Link>
      <Link href="/about">About</Link>
      <ThemeToggle />
    </nav>
  </div>
</header>
```

## `components/Sidebar.tsx` (client component)

Three sections: **Calculators** (6 items), **Reference** (2 items: tax-rates, methodology), **Learn** (7 items: all guides). Each item shows a 2-letter icon derived from label (e.g. "Pay calculator" → "PC"). Active state: `bg-brand-50 text-brand-700` (light) / `bg-brand-900/30 text-brand-200` (dark). Auto-closes mobile drawer on navigation. Desktop supports collapsed icon-only mode (64px wide) vs expanded (256px wide).

```tsx
// structure
<aside className="fixed top-16 bottom-0 left-0 z-40 flex flex-col overflow-hidden
  border-r border-ink-200 bg-white ... dark:border-ink-800 dark:bg-ink-950
  ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}
  ${isCollapsed ? 'lg:w-16' : 'lg:w-64'} w-64 lg:translate-x-0">
  <button onClick={() => setCollapsed(!isCollapsed)} /* absolute toggle pill */ />
  <nav className="flex-1 overflow-y-auto p-3">
    {sections.map((section, i) => (
      <div className={i > 0 ? 'mt-6' : ''}>
        {!isCollapsed && <h3 className="text-[11px] font-semibold uppercase tracking-wider">{section.title}</h3>}
        <ul>{section.items.map((item) => <li><Link active={...}>{label}</Link></li>)}</ul>
      </div>
    ))}
  </nav>
</aside>
```

## `components/Footer.tsx` (server component)

5-column grid on `lg`, 2-col on `sm`, 1-col on mobile:
- Col 1-2: brand name, tagline, "last reviewed" date, copyright
- Col 3: **Calculators** (7 links)
- Col 4: **Learn** (5 links)
- Col 5: **Trust & legal** (6 links: methodology, about, disclaimer, privacy, terms, contact)

Below the grid: a single-line disclaimer + "Made in Australia. Sources: ATO."

```tsx
<footer className="mt-16 border-t border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-950">
  <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
    <div className="lg:col-span-2">{/* brand info */}</div>
    <div>{/* Calculators */}</div>
    <div>{/* Learn */}</div>
    <div>{/* Trust & legal */}</div>
  </div>
  <div className="border-t border-ink-200 dark:border-ink-800">
    <div className="container flex flex-col items-start justify-between gap-2 py-4 text-xs">
      <p>Estimates only — not financial or tax advice. For your actual tax position, consult a registered tax agent.</p>
      <p>Made in Australia. Sources: ATO.</p>
    </div>
  </div>
</footer>
```

## `components/ThemeToggle.tsx` (client component)

Sun/moon icon button. Reads from `localStorage`, falls back to system preference, writes back. Triggered by a single button, no label (icon-only with `aria-label`).
