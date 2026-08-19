import type { Metadata } from 'next';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: `How ${brand.name} handles your data.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <h1>Privacy policy</h1>
      <p>
        This page explains what data {brand.name} collects, how we use it, and
        the choices you have.
      </p>

      <h2>What the calculator does</h2>
      <p>
        The pay calculator runs entirely in your browser. The salary figure,
        residency, and any other inputs you type are processed locally in
        JavaScript and never sent to our servers. We do not log, store, or
        transmit your inputs.
      </p>

      <h2>Analytics</h2>
      <p>
        We use privacy-respecting analytics (Plausible, if configured) and
        Google Analytics 4 (if configured) to count page visits. These tools
        set cookies or use local storage to distinguish unique visitors. We
        have configured GA4 to anonymise IP addresses and disabled advertising
        features.
      </p>

      <h2>Advertising</h2>
      <p>
        We may display third-party advertising (e.g. Google AdSense, Ezoic, or
        a header-bidding wrapper like Publift or AdThrive). These vendors may
        set cookies or use local storage to deliver and measure ads. The
        specific vendors and their privacy practices are listed in our cookie
        banner.
      </p>

      <h2>Cookies</h2>
      <p>
        We use a small number of strictly-necessary cookies for things like
        remembering your theme preference. Analytics and advertising cookies
        are not set without your consent (where required by law, including
        under the Australian Privacy Principles and applicable state
        legislation).
      </p>

      <h2>Your rights</h2>
      <p>
        If you have questions about your personal information or wish to make a
        complaint, contact us at{' '}
        <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>.
        You may also contact the Office of the Australian Information
        Commissioner (oaic.gov.au).
      </p>

      <h2>Changes</h2>
      <p>
        We will update this policy when our practices change. Material changes
        will be highlighted on the homepage for at least 30 days.
      </p>

      <p className="text-sm text-ink-500">Last updated: {brand.lastReviewed}</p>
    </article>
  );
}
