import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, articleSchema, faqSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Guides — Australian pay, tax and super explained',
  description:
    'Long-form guides on Australian income tax, Medicare, HECS-HELP, salary sacrifice, superannuation and the Stage 3 tax cuts. Plain English, ATO-sourced, no jargon. Updated for FY 2026-27.',
  alternates: { canonical: '/guides' },
  keywords: [
    'australian tax guides',
    'payg guide',
    'hecs help guide',
    'salary sacrifice guide',
    'superannuation guide',
    'medicare levy surcharge guide',
    'stage 3 tax cuts',
  ],
  openGraph: {
    title: 'Guides — Australian pay, tax and super explained',
    description: 'Long-form guides on Australian pay and tax. Plain English, ATO-sourced, no jargon.',
    url: `${brand.url}/guides`,
    type: 'website',
  },
};

const guides = [
  {
    slug: 'australian-income-tax',
    title: 'Australian income tax: a complete guide',
    blurb: 'How the tax system works end-to-end — brackets, offsets, Medicare, residency, and the differences between PAYG withholding and what you actually owe.',
    readTime: '9 min read',
    keywords: ['australian income tax', 'tax brackets', 'payg', 'medicare levy'],
  },
  {
    slug: 'medicare-levy-surcharge',
    title: 'Medicare Levy Surcharge: who pays it and how to avoid it',
    blurb: 'The 1%–1.5% surcharge on top of the Medicare levy for high earners without private hospital cover. Thresholds, exemptions, and what to do at tax time.',
    readTime: '5 min read',
    keywords: ['medicare levy surcharge', 'mls', 'private health insurance rebate'],
  },
  {
    slug: 'hecs-repayment',
    title: 'HECS-HELP repayment: a practical guide for graduates',
    blurb: 'How the new marginal HECS repayment system works, when indexation hurts, voluntary repayment strategies, and how to project when you will be debt-free.',
    readTime: '7 min read',
    keywords: ['hecs help', 'hecs repayment', 'study debt', 'indexation'],
  },
  {
    slug: 'salary-sacrifice',
    title: 'Salary sacrifice: how to lower your tax bill the legal way',
    blurb: 'How pre-tax super contributions actually save you money, the concessional cap, Division 293 for high earners, and the novated lease alternative.',
    readTime: '7 min read',
    keywords: ['salary sacrifice', 'concessional contributions', 'novated lease'],
  },
  {
    slug: 'superannuation',
    title: 'Superannuation basics for employees',
    blurb: 'The Superannuation Guarantee, how your balance grows, when you can access it, and the four levers that move your retirement outcome the most.',
    readTime: '6 min read',
    keywords: ['superannuation', 'super guarantee', 'retirement savings'],
  },
  {
    slug: 'stage-3-tax-cuts',
    title: 'Stage 3 tax cuts and what is coming next',
    blurb: 'The Stage 3 cuts that took effect on 1 July 2024, the further 16% → 15% reduction on 1 July 2026, and the legislated 14% cut on 1 July 2027.',
    readTime: '5 min read',
    keywords: ['stage 3 tax cuts', 'cost of living tax cuts', 'australian tax brackets'],
  },
];

const faqs = [
  {
    question: 'Are SalaryCalc guides official ATO publications?',
    answer:
      'No. Our guides are written by SalaryCalc editorial staff based on ATO publications. The ATO is the authoritative source. We cite the ATO link in every guide. For binding decisions, use the ATO directly or a registered tax agent.',
  },
  {
    question: 'How often are the guides updated?',
    answer:
      'We re-review every guide at the start of each financial year (1 July) and whenever the federal budget is handed down. Every guide shows a "last reviewed" date at the top. The changelog on the About page lists every substantive update.',
  },
  {
    question: 'Can I republish or quote these guides?',
    answer:
      'You can quote brief excerpts for non-commercial purposes (school essays, personal blog posts) with attribution to SalaryCalc. For commercial republication, contact us at hello@thesalarycalc.com.au.',
  },
  {
    question: 'Where is the methodology behind these guides?',
    answer:
      'The methodology page documents how every number on the site is calculated, with citations to the ATO source for each rate and threshold. The guides interpret the same numbers in plain English; the methodology is the formal reference.',
  },
];

export default function GuidesIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'Guides — Australian pay, tax and super explained',
            description: metadata.description as string,
            url: `${brand.url}/guides`,
            datePublished: '2026-01-15',
            dateModified: brand.lastReviewed,
          }),
          faqSchema(faqs),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-10">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Guides' }]} />
          <h1 className="h-display mt-6 text-ink-900 dark:text-ink-50">
            SalaryCalc guides
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            Long-form explainers on the parts of Australian pay and tax that
            catch people out. Every guide cites the ATO source. Updated for
            FY 2026-27.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600 dark:text-ink-400">
            <span className="kicker">
              Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
            </span>
            <span className="kicker">{guides.length} guides</span>
            <span className="kicker">All ATO-sourced</span>
            <span className="kicker">Plain English</span>
          </div>
        </header>

        {/* TL;DR box */}
        <section aria-labelledby="guides-summary" className="card not-prose mb-10">
          <h2 id="guides-summary" className="text-base font-semibold text-ink-900 dark:text-ink-50">
            What is in each guide
          </h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Each guide is a long-form explainer with the math, the thresholds,
            and a worked example. Read in any order.
          </p>
          <ul className="mt-5 divide-y divide-ink-200 dark:divide-ink-700">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="block py-3 transition hover:opacity-80"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-ink-900 hover:text-brand-700 dark:text-ink-100 dark:hover:text-brand-300">
                      {g.title} →
                    </p>
                    <span className="text-xs text-ink-500 dark:text-ink-400">
                      {g.readTime}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink-600 dark:text-ink-400">{g.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section aria-labelledby="guides-faq" className="mt-12 max-w-3xl">
          <h2 id="guides-faq" className="text-2xl font-bold text-ink-900 dark:text-ink-50">
            Common questions about the guides
          </h2>
          <div className="mt-5 space-y-3">
            {faqs.map((q) => (
              <details key={q.question} className="card group">
                <summary className="cursor-pointer list-none text-base font-semibold text-ink-900 dark:text-ink-50">
                  <span
                    aria-hidden="true"
                    className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition dark:text-brand-300"
                  >
                    ›
                  </span>
                  {q.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Trust cluster */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-50">
            More about SalaryCalc
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrustLink href="/methodology" title="Methodology" detail="How every number is calculated, with citations." />
            <TrustLink href="/about" title="About SalaryCalc" detail="Story, editorial standards, corrections policy." />
            <TrustLink href="/" title="Pay calculator" detail="Live take-home pay calculator with all FY 2026-27 rates." />
            <TrustLink href="/faq" title="FAQ" detail="30+ questions about Australian pay and tax." />
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
        className="block transition hover:border-brand-300 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700"
      >
        <p className="text-sm font-semibold text-ink-900 hover:text-brand-700 dark:text-ink-100 dark:hover:text-brand-300">
          {title} →
        </p>
        <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">{detail}</p>
      </Link>
    </li>
  );
}
