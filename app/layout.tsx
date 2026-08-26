import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { brand } from '@/lib/brand';
import { AppShell } from '@/components/AppShell';
import { Analytics } from '@/components/Analytics';
import { CookieBanner } from '@/components/CookieBanner';
import { JsonLd, organizationSchema, websiteSchema, websiteWithSearchActionSchema } from '@/components/Schema';

const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name}, Australian Pay Calculator (FY 2026–27)`,
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
    title: `${brand.name}, Australian Pay Calculator (FY 2026–27)`,
    description: brand.shortDescription,
  },
  twitter: { card: 'summary_large_image', title: `${brand.name}, Australian Pay Calculator`, description: brand.shortDescription },
  icons: {
    // The v=2 query forces browsers to drop their cached old favicon
    // (the cream one) and pick up the new white-box + green-outline mark.
    icon: [
      { url: '/icons/icon.svg?v=2', type: 'image/svg+xml' },
      { url: '/icons/favicon-32.png?v=2', type: 'image/png', sizes: '32x32' },
      { url: '/icons/favicon-16.png?v=2', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.ico?v=2', type: 'image/x-icon' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=2', type: 'image/png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
  other: { 'google-site-verification': '_6KD07ejnLc9X4RGJB80gujOo0bllGWDKDvVSMxitmY' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0e1a',
};

// Read the user's stored theme preference (or fall back to dark) and
// apply the .dark class before React hydrates. This avoids a flash of
// the wrong theme on first paint.
const themeBootstrap = `(() => {
  try {
    var stored = window.localStorage.getItem('salarycalc_theme');
    var theme = stored === 'light' ? 'light' : 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className="dark" suppressHydrationWarning>
      <head>
        <Script id="theme-bootstrap" strategy="beforeInteractive">{themeBootstrap}</Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3088783706802319"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-ink-50 text-ink-800 antialiased">
        <a href="#main" className="skip-link">Skip to content</a>
        <AppShell>
          {children}
        </AppShell>
        <Analytics ga4Id={ga4Id} plausibleDomain={plausibleDomain} />
        <CookieBanner />
        <JsonLd data={[organizationSchema(), websiteSchema(), websiteWithSearchActionSchema()]} />
      </body>
    </html>
  );
}
