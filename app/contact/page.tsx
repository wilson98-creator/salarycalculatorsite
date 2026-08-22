import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Contact SalaryCalc, report an error or suggest a feature',
  description:
    'How to get in touch with the SalaryCalc team. We respond to all emails within 1-2 business days. Found a wrong number? We will investigate within 24 hours.',
  alternates: { canonical: '/contact' },
  keywords: ['contact salarycalc', 'report error', 'australian pay calculator feedback'],
  openGraph: {
    title: 'Contact SalaryCalc',
    description: 'How to get in touch with the SalaryCalc team.',
    url: `${brand.url}/contact`,
    type: 'article',
  },
};

const faqs = [
  {
    question: 'How fast will you respond?',
    answer:
      'We read every email. Error reports: within 24 hours. Bug reports: within 1-2 business days. Feature requests and general feedback: within 1 week. Press and partnership enquiries: within 5 business days.',
  },
  {
    question: 'I found a wrong number, what should I include in my email?',
    answer:
      'Please include: (1) the figure on the site, (2) the figure you expect (e.g. from the ATO publication), (3) a link to the ATO source you checked against, (4) the date you checked. The more specific you are, the faster we can fix it.',
  },
  {
    question: 'Can I report a security vulnerability?',
    answer:
      'Yes. Please use the security disclosure process documented in our security.txt file at /.well-known/security.txt. We aim to acknowledge security reports within 48 hours and to release a fix within 7 days for confirmed issues.',
  },
  {
    question: 'Can I get personal tax advice?',
    answer:
      'No, we are a calculator, not a tax agent. Please consult a registered tax agent. We can help with calculator errors and feature requests, but not with your specific tax situation.',
  },
  {
    question: 'Do you accept guest posts or sponsored content?',
    answer:
      'We do not currently publish guest posts. We may, in future, recommend products that pay us a small referral fee (e.g. a novated lease provider or a salary packaging service), when we do, we will label those recommendations clearly as sponsored or affiliate. If you have a partnership proposal, please email us with a clear subject line.',
  },
  {
    question: 'Where are you based?',
    answer:
      'SalaryCalc is operated from Australia. We respond to support emails in Australian Eastern Time (AEST/AEDT). The site is hosted on Cloudflare Pages with global edge caching.',
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'Contact SalaryCalc, report an error or suggest a feature',
            description: metadata.description as string,
            url: `${brand.url}/contact`,
            datePublished: '2026-01-15',
            dateModified: brand.lastReviewed,
          }),
          faqSchema(faqs),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-10">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Contact' }]} />
          <h1 className="h-display mt-6 text-ink-900">
            Contact SalaryCalc
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 sm:text-lg">
            The fastest way to reach us is email. We read every message and aim
            to respond within 1-2 business days.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">All emails read</span>
            <span className="kicker">24-hour error response</span>
            <span className="kicker">Security disclosure process</span>
          </div>
        </header>

        {/* Email card, the hero CTA */}
        <section className="card not-prose mb-10 border-brand-200 bg-brand-50">
          <p className="text-sm font-semibold text-brand-700">Email us</p>
          <a
            href={`mailto:${brand.contactEmail}`}
            className="mt-2 inline-block font-mono text-2xl font-bold text-ink-900 underline-offset-4 hover:underline sm:text-3xl"
          >
            {brand.contactEmail}
          </a>
          <p className="mt-3 text-sm text-ink-600">
            We respond in Australian Eastern Time (AEST/AEDT).
          </p>
        </section>

        {/* What to contact us about */}
        <section className="prose prose-slate prose-invert max-w-3xl">
          <h2>What to contact us about</h2>
          <p>
            The fastest way to get a useful response is to be specific. Here is
            what helps us help you:
          </p>
          <ul>
            <li>
              <strong>Found a wrong number?</strong> Please include the figure
              on the site, the figure you expect, the ATO source you checked
              against (with a link), and the date. We will investigate within
              24 hours and fix it if confirmed.
            </li>
            <li>
              <strong>Bug report</strong>, describe what you typed, what you
              expected, and what happened. A screenshot or screen recording
              helps. Include your browser and device if the bug seems
              browser-specific.
            </li>
            <li>
              <strong>Feature request</strong>, what calculator, what it
              should compute, who would use it, and (if you have one) a link
              to the ATO publication or government source that supports it.
              We prioritise features with a clear user need and a public
              source.
            </li>
            <li>
              <strong>Press / partnership / sponsorship</strong>, please
              use the same email with a clear subject line. We aim to respond
              within 5 business days.
            </li>
            <li>
              <strong>Security disclosure</strong>, please follow the
              responsible disclosure process documented in our{' '}
              <a href="/.well-known/security.txt">security.txt</a> file. We
              aim to acknowledge security reports within 48 hours.
            </li>
          </ul>

          <h2>What we don&apos;t reply to</h2>
          <p>
            We are a small team. To make sure we read every message we get,
            we do not reply to:
          </p>
          <ul>
            <li>
              <strong>Personal tax advice.</strong> We are a calculator, not
              a tax agent. For your specific tax situation, please consult a
              registered tax agent.
            </li>
            <li>
              <strong>&quot;What&apos;s my refund?&quot;</strong> We do not
              have access to your ATO data and we do not store your inputs.
              Use the ATO&apos;s myTax or a registered tax agent for the
              binding figure.
            </li>
            <li>
              <strong>Generic SEO / link-buying pitches.</strong> We do not
              buy links and we do not accept payment in exchange for
              favourable coverage. If you have a genuinely useful resource
              that fits our editorial standards, please email and we will
              take a look.
            </li>
          </ul>
        </section>

        <section aria-labelledby="contact-faq" className="mt-16 max-w-3xl">
          <h2 id="contact-faq" className="text-2xl font-bold text-ink-900">
            Common contact questions
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

        {/* Trust cluster */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink-900">
            More about SalaryCalc
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrustLink href="/about" title="About SalaryCalc" detail="Story, editorial standards, corrections policy." />
            <TrustLink href="/methodology" title="Methodology" detail="How every number is calculated, with citations." />
            <TrustLink href="/disclaimer" title="Disclaimer" detail="The full legal disclaimer." />
            <TrustLink href="/privacy" title="Privacy policy" detail="What we collect (almost nothing) and why." />
            <TrustLink href="/terms" title="Terms of service" detail="Using the site, and what we will not do." />
            <TrustLink href="/.well-known/security.txt" title="Security disclosure" detail="Report a vulnerability responsibly." />
          </ul>
        </section>
      </article>
    </>
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
