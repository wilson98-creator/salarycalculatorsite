import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { PayCalculator } from '@/components/PayCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'South Australia Pay Calculator (FY 2026–27) — Salary & Take-Home Pay | SalaryCalc',
  description:
    'South Australia pay calculator. Federal tax applies the same as everywhere in Australia. Live calculator, FY 2026–27 rates, Adelaide cost-of-living context.',
  alternates: { canonical: '/south-australia/pay-calculator' },
};

const faqs = [
  {
    question: 'Is tax different in South Australia compared to other states?',
    answer:
      'No. Personal income tax and the Medicare levy are federal and apply the same way in every Australian state and territory. The tax on $80,000 in Adelaide is identical to the tax on $80,000 in Brisbane or Perth. State differences show up in cost of living, average wages, and (for employers) the rate of payroll tax — not in your take-home pay.',
  },
  {
    question: 'What is the average salary in South Australia?',
    answer:
      'According to the ABS, the average full-time adult total weekly earnings in South Australia in 2024 was around $1,860, which works out to roughly $96,700 per year. The median is closer to $85,000. Adelaide wages are typically 5-10% below the national average, but the lower cost of living — especially housing — means the same take-home goes further than in Sydney or Melbourne.',
  },
  {
    question: 'How does Adelaide cost of living compare to other capitals?',
    answer:
      'Adelaide is one of the most affordable Australian capitals. Median rent for a one-bedroom inner-city apartment is around $430/week (around $22,000/year — about 22% of a $100k salary). Transport, groceries, and utilities are below the national average. The take-home pay is the same as elsewhere, but it goes materially further in Adelaide.',
  },
];

export default function SaPayCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          faqSchema(faqs),
          articleSchema({
            headline: 'South Australia pay calculator (FY 2026–27)',
            description: 'Calculate your take-home pay in South Australia. Federal tax applies the same as the rest of Australia.',
            url: `${brand.url}/south-australia/pay-calculator`,
          }),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-8">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'By state' },
            { name: 'South Australia' },
          ]} />
          <h1 className="h-display mt-6 text-ink-900 dark:text-ink-50">
            South Australia pay calculator
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            Calculate your take-home pay in South Australia. The federal tax brackets,
            Medicare levy, and HELP repayment thresholds are the same across Australia —
            so the math is identical whether you work in Adelaide, Mount Gambier, or
            Whyalla. What varies is the cost of living, the median wage in your industry,
            and the state-specific allowances that may apply to your role.
          </p>
        </header>

        <section className="mb-10">
          <PayCalculator />
        </section>

        <section className="prose prose-slate dark:prose-invert mt-12 max-w-3xl">
          <h2>South Australia pay in context</h2>
          <p>
            South Australia has a workforce concentrated in health, education, defence,
            manufacturing, and agriculture. Adelaide hosts significant defence
            industries (ASC, BAE Systems, the new nuclear submarine program), and the
            state government has actively recruited migration to support growth. Wages
            are typically 5-10% below the national average, but the cost of living —
            especially housing — is also lower, so the same take-home goes further.
          </p>
          <p>
            Take-home pay is the same as everywhere else in Australia (federal tax
            applies uniformly). Defence and shipbuilding roles in Adelaide pay at or
            above the national average for similar skilled trades and engineering
            positions.
          </p>

          <h2>SA awards, defence, and manufacturing</h2>
          <p>
            South Australian public-sector employees are covered by the <em>South
            Australian Public Sector Award</em> and various industry-specific awards.
            Defence-industry employees are typically covered by enterprise agreements
            specific to their employer (ASC, BAE Systems, etc.), which often include
            site allowances and shift loadings. For a casual or shift-worker, use our{' '}
            <Link href="/casual-pay-calculator">casual pay calculator</Link>. For
            people with HECS-HELP debts, the{' '}
            <Link href="/hecs-calculator">HECS-HELP calculator</Link> applies the new
            marginal repayment system that took effect on 1 July 2025.
          </p>

          <h2>Frequently asked questions about South Australia pay</h2>
        </section>

        <section className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.question} className="card group">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink-900 dark:text-ink-50">
                <span aria-hidden="true" className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition dark:text-brand-300">›</span>
                {f.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{f.answer}</p>
            </details>
          ))}
        </section>

        <section className="prose prose-slate dark:prose-invert mt-12 max-w-3xl">
          <h2>Related calculators</h2>
          <ul>
            <li><Link href="/">Pay calculator (Australia-wide)</Link></li>
            <li><Link href="/salary-sacrifice-calculator">Salary sacrifice calculator</Link></li>
            <li><Link href="/hecs-calculator">HECS-HELP calculator</Link></li>
            <li><Link href="/casual-pay-calculator">Casual pay calculator</Link></li>
            <li><Link href="/tax-rates">FY 2026–27 tax rates</Link></li>
            <li><Link href="/methodology">Methodology</Link></li>
          </ul>
        </section>
      </article>
    </>
  );
}
