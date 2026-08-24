import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Privacy policy, SalaryCalc',
  description:
    'How SalaryCalc handles your data. Calculator inputs are processed in your browser and never sent to our servers. We do not track your salary.',
  alternates: { canonical: '/privacy' },
  keywords: [
    'privacy policy',
    'data collection',
    'australian privacy principles',
    'salarycalc privacy',
  ],
  openGraph: {
    title: 'Privacy policy, SalaryCalc',
    description: 'Calculator inputs are processed in your browser and never sent to our servers.',
    url: `${brand.url}/privacy`,
    type: 'article',
  },
};

const faqs = [
  {
    question: 'Does SalaryCalc see the salary figure I type into the calculator?',
    answer:
      'No. The pay calculator runs entirely in your browser. The salary figure, residency, and any other inputs you type are processed locally in JavaScript and never sent to our servers. We do not log, store, or transmit your inputs. You can verify this by opening the browser DevTools network tab and using the calculator, there are no outgoing requests with your salary data.',
  },
  {
    question: 'What analytics do you use?',
    answer:
      'We use privacy-respecting analytics (Plausible, if configured) and Google Analytics 4 (if configured) to count page visits. These tools set cookies or use local storage to distinguish unique visitors. We have configured GA4 to anonymise IP addresses and disabled advertising features. You can opt out via the cookie banner.',
  },
  {
    question: 'What advertising do you run?',
    answer:
      'We display third-party advertising through Google AdSense. AdSense may set cookies or use local storage to deliver and measure ads. We do not allow personalised advertising based on sensitive categories. The specific vendors and their privacy practices are listed in our cookie banner.',
  },
  {
    question: 'Do you sell my data?',
    answer:
      'No. We do not sell, rent, or trade your personal information. The site is supported by display advertising, which is contextual (page-level) and not based on a personal profile of you.',
  },
  {
    question: 'How do I exercise my rights under the Australian Privacy Principles?',
    answer:
      'Contact us at hello@thesalarycalc.com.au. We will respond within 30 days. You can also make a complaint to the Office of the Australian Information Commissioner (oaic.gov.au) at any time.',
  },
  {
    question: 'How long do you retain data?',
    answer:
      'We retain analytics data for 14 months (Google Analytics 4 default). Advertising cookies are managed by the ad vendor and expire per their own policies (typically 30-90 days). We do not retain any salary data because we never receive it.',
  },
  {
    question: 'Will you notify me if the policy changes?',
    answer:
      'Yes. Material changes will be highlighted on the homepage for at least 30 days. The "last updated" date at the bottom of this page reflects the most recent version.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'Privacy policy, SalaryCalc',
            description: metadata.description as string,
            url: `${brand.url}/privacy`,
            datePublished: '2026-01-15',
            dateModified: brand.lastReviewed,
          }),
          faqSchema(faqs),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-10">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Privacy' }]} />
          <h1 className="h-display mt-6 text-ink-900">
            Privacy policy
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 sm:text-lg">
            SalaryCalc is built around a simple principle: we never see the
            numbers you type into the calculator. This page documents exactly
            what data we do and do not collect, how we use it, and the choices
            you have.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">
              Last updated <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
            </span>
            <span className="kicker">Compliant with the Australian Privacy Principles</span>
            <span className="kicker">Calculator runs in your browser</span>
          </div>
        </header>

        {/* TL;DR summary box */}
        <section aria-labelledby="privacy-summary" className="card not-prose mb-12">
          <h2 id="privacy-summary" className="text-base font-semibold text-ink-900">
            TL;DR, what we collect
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <PrivacyRow label="Your salary" value="Never. Calculator runs in your browser." />
            <PrivacyRow label="Your inputs (residency, HECS, etc.)" value="Never. Same as above." />
            <PrivacyRow label="Your name or email" value="Only if you email us." />
            <PrivacyRow label="Page views (aggregate)" value="Yes, via Plausible and Google Analytics 4." />
            <PrivacyRow label="Cookies for ad delivery" value="Set by Google AdSense, with consent (where required)." />
            <PrivacyRow label="IP address" value="Anonymised in GA4; not stored by us." />
            <PrivacyRow label="Data sold to third parties" value="Never." />
          </ul>
        </section>

        <section className="prose prose-slate prose-invert max-w-3xl">
          <h2>1. What the calculator does</h2>
          <p>
            The pay calculator runs entirely in your browser. The salary figure,
            residency, and any other inputs you type are processed locally in
            JavaScript and never sent to our servers. We do not log, store, or
            transmit your inputs.
          </p>
          <p>
            You can verify this yourself: open the browser DevTools network tab
            (right-click → Inspect → Network), use the calculator, and observe
            that no requests leave your browser with your salary data. The
            calculator code is published on GitHub and any developer can audit
            it.
          </p>

          <h2>2. Analytics</h2>
          <p>
            We use privacy-respecting analytics (Plausible, if configured) and
            Google Analytics 4 (if configured) to count page visits. These tools
            set cookies or use local storage to distinguish unique visitors. We
            have configured GA4 to anonymise IP addresses and disabled
            advertising features. Both tools record page URLs and referrers in
            aggregate, no personally identifying information is collected.
          </p>

          <h2>3. Advertising</h2>
          <p>
            We display third-party advertising through Google AdSense. AdSense
            may set cookies or use local storage to deliver and measure ads.
            The specific vendors and their privacy practices are listed in our
            cookie banner. We do not allow personalised advertising based on
            sensitive categories (health, religion, political affiliation, etc.)
            and we do not use any first-party data to target ads at you.
          </p>

          <h2>4. Cookies</h2>
          <p>
            We use a small number of strictly-necessary cookies for things like
            remembering your theme preference and the calculator&apos;s advanced
            options state. Analytics and advertising cookies are not set without
            your consent, where required by law (including under the Australian
            Privacy Principles and applicable EU/UK GDPR rules for our
            international visitors). The cookie banner is shown on first visit
            and remembers your choice in local storage.
          </p>

          <h2>5. Data retention</h2>
          <p>
            Analytics data is retained for 14 months (Google Analytics 4
            default). Advertising cookies are managed by the ad vendor and
            expire per their own policies (typically 30-90 days). We do not
            retain any salary data because we never receive it. If you email
            us, we retain your message and our response for as long as needed
            to handle your enquiry, then delete it.
          </p>

          <h2>6. Your rights</h2>
          <p>
            If you have questions about your personal information or wish to
            make a complaint, contact us at{' '}
            <Link href="/contact">{brand.contactEmail}</Link>.
            We will respond within 30 days. You can also contact the Office of
            the Australian Information Commissioner (
            <a
              href="https://www.oaic.gov.au"
              target="_blank"
              rel="noopener noreferrer"
            >
              oaic.gov.au
            </a>
            ) at any time. International visitors have similar rights under
            their local privacy laws (e.g. GDPR for EU/UK visitors).
          </p>

          <h2>7. Children&apos;s privacy</h2>
          <p>
            SalaryCalc is not directed at children under 16, and we do not
            knowingly collect personal information from children. The
            calculator is a tool for working-age adults managing their pay and
            tax.
          </p>

          <h2>8. International transfers</h2>
          <p>
            Some of our service providers (Google AdSense, Google Analytics,
            Cloudflare Pages) may process data outside Australia. These
            providers have their own privacy policies and are bound by their
            respective data-handling standards. The site is hosted on
            Cloudflare&apos;s global edge network for performance reasons; the
            analytics and ad vendors operate globally.
          </p>

          <h2>9. Changes</h2>
          <p>
            We will update this policy when our practices change. Material
            changes will be highlighted on the homepage for at least 30 days.
            The &quot;last updated&quot; date below reflects the most recent
            version.
          </p>
          <p className="text-sm text-ink-600">
            Last updated: <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
          </p>
        </section>

        {/* FAQ */}
        <section aria-labelledby="privacy-faq" className="mt-16 max-w-3xl">
          <h2 id="privacy-faq" className="text-2xl font-bold text-ink-900">
            Common privacy questions
          </h2>
          <div className="mt-5 space-y-3">
            {faqs.map((q) => (
              <details key={q.question} className="card group">
                <summary className="cursor-pointer list-none text-base font-semibold text-ink-900">
                  <span
                    aria-hidden="true"
                    className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition"
                  >
                    ›
                  </span>
                  {q.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink-900">Related legal pages</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrustLink href="/terms" title="Terms of service" detail="Using the site, and what we will not do." />
            <TrustLink href="/disclaimer" title="Disclaimer" detail="The full legal disclaimer." />
            <TrustLink href="/about" title="About SalaryCalc" detail="Story, editorial standards, corrections policy." />
            <TrustLink href="/contact" title="Contact" detail="Email us about a privacy question." />
            <TrustLink href="/methodology" title="Methodology" detail="How every number is calculated, with citations." />
            <TrustLink href="/.well-known/security.txt" title="Security disclosure" detail="Report a vulnerability responsibly." />
          </ul>
        </section>
      </article>
    </>
  );
}

function PrivacyRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-baseline justify-between gap-3">
      <span className="text-ink-700">{label}</span>
      <span className="text-right text-ink-900">{value}</span>
    </li>
  );
}

function TrustLink({ href, title, detail }: { href: string; title: string; detail: string }) {
  return (
    <li>
      <Link
        href={href}
        className="block transition hover:border-brand-300"
      >
        <p className="text-sm font-semibold text-ink-900 hover:text-brand-700">
          {title} →
        </p>
        <p className="mt-1 text-xs text-ink-600">{detail}</p>
      </Link>
    </li>
  );
}
