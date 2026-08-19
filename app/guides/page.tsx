import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Guides — Australian pay, tax and super explained',
  description:
    'Long-form guides on Australian income tax, Medicare, HECS-HELP, salary sacrifice, superannuation and the Stage 3 tax cuts. Plain English, ATO-sourced, no jargon.',
  alternates: { canonical: '/guides' },
};

const guides = [
  {
    slug: 'australian-income-tax',
    title: 'Australian income tax: a complete guide',
    blurb: 'How the tax system works end-to-end — brackets, offsets, Medicare, residency, and the differences between PAYG withholding and what you actually owe.',
    readTime: '9 min read',
  },
  {
    slug: 'medicare-levy-surcharge',
    title: 'Medicare Levy Surcharge: who pays it and how to avoid it',
    blurb: 'The 1%–1.5% surcharge on top of the Medicare levy for high earners without private hospital cover. Thresholds, exemptions, and what to do at tax time.',
    readTime: '5 min read',
  },
  {
    slug: 'hecs-repayment',
    title: 'HECS-HELP repayment: a practical guide for graduates',
    blurb: 'How the new marginal HECS repayment system works, when indexation hurts, voluntary repayment strategies, and how to project when you\'ll be debt-free.',
    readTime: '7 min read',
  },
  {
    slug: 'salary-sacrifice',
    title: 'Salary sacrifice: how to lower your tax bill the legal way',
    blurb: 'How pre-tax super contributions actually save you money, the concessional cap, Division 293 for high earners, and the novated lease alternative.',
    readTime: '7 min read',
  },
  {
    slug: 'superannuation',
    title: 'Superannuation basics for employees',
    blurb: 'The Superannuation Guarantee, how your balance grows, when you can access it, and the four levers that move your retirement outcome the most.',
    readTime: '6 min read',
  },
  {
    slug: 'stage-3-tax-cuts',
    title: 'Stage 3 tax cuts and what\'s coming next',
    blurb: 'The Stage 3 cuts that took effect on 1 July 2024, the further 16% → 15% reduction on 1 July 2026, and the legislated 14% cut on 1 July 2027.',
    readTime: '5 min read',
  },
];

export default function GuidesIndexPage() {
  return (
    <article className="max-w-3xl">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl">Guides</h1>
        <p className="mt-4 text-base text-ink-600 dark:text-ink-400 sm:text-lg">
          Long-form explainers on the parts of Australian pay and tax that catch people out. Every guide cites the ATO source. Updated for FY 2026–27.
        </p>
      </header>

      <ul className="space-y-3">
        {guides.map((g) => (
          <li key={g.slug} className="rounded-2xl border border-ink-200 bg-white p-5 transition hover:border-brand-300 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700">
            <Link href={`/guides/${g.slug}`} className="block">
              <h2 className="text-lg font-semibold text-ink-900 hover:text-brand-700 dark:text-ink-50 dark:hover:text-brand-300">
                {g.title}
              </h2>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-400">{g.blurb}</p>
              <p className="mt-2 text-xs text-ink-500 dark:text-ink-500">{g.readTime} · methodology last reviewed {brand.lastReviewed}</p>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
