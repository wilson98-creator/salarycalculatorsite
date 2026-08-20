import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { brand } from '@/lib/brand';
import { AppShell } from '@/components/AppShell';
import { Analytics } from '@/components/Analytics';
import { CookieBanner } from '@/components/CookieBanner';
import { JsonLd, organizationSchema, websiteSchema } from '@/components/Schema';

const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

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
  title: {
    default: `${brand.name} — Australian Pay Calculator (FY 2026–27)`,
    template: `%s · ${brand.name}`,
  },
  description: brand.shortDescription,
  applicationName: brand.name,
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  keywords: [
    'pay calculator australia',
    'salary calculator australia',
    'tax calculator australia',
    'take home pay calculator',
    'payg calculator',
    'payg withholding',
    'income tax calculator',
    'hecs help calculator',
    'medicare levy calculator',
    'fortnightly pay calculator',
    'weekly pay calculator',
    'casual pay calculator',
    'award pay calculator',
    'penalty rate calculator',
    'salary sacrifice calculator',
    'stage 3 tax calculator',
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: brand.url,
    siteName: brand.name,
    title: `${brand.name} — Australian Pay Calculator (FY 2026–27)`,
    description: brand.shortDescription,
  },
  twitter: { card: 'summary_large_image', title: `${brand.name} — Australian Pay Calculator`, description: brand.shortDescription },
  icons: {
    icon: [{ url: '/icons/icon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.webmanifest',
  other: { 'google-site-verification': '_6KD07ejnLc9X4RGJB80gujOo0bllGWDKDvVSMxitmY' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e6fff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <Script id="theme-bootstrap" strategy="beforeInteractive">{themeBootstrap}</Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3088783706802319"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-100">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-ink-900 focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
        <AppShell>
          <main id="main" className="container py-10 sm:py-14">
            {children}
          </main>
        </AppShell>
        <Analytics ga4Id={ga4Id} plausibleDomain={plausibleDomain} />
        <CookieBanner />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
