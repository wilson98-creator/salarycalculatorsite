import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { PayCalculator } from '@/components/PayCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Tasmania Pay Calculator (FY 2026–27) — Salary & Take-Home Pay | SalaryCalc',
  description:
    'Tasmania pay calculator. Federal tax applies the same as everywhere in Australia. Live calculator, FY 2026–27 rates, Hobart cost-of-living context.',
  alternates: { canonical: '/tasmania/pay-calculator' },
};

const faqs = [
  {
    question: 'Is tax different in Tasmania compared to other states?',
    answer:
      'No. Personal income tax and the Medicare levy are federal and apply the same way in every Australian state and territory. The tax on $80,000 in Hobart is identical to the tax on $80,000 in Sydney or Perth. State differences show up in cost of living, average wages, and (for employers) the rate of payroll tax — not in your take-home pay.',
  },
  {
    question: 'What is the average salary in Tasmania?',
    answer:
      'Tasmania has the lowest average wages of the mainland states — around $1,790 per week or roughly $93,000 per year. The median is closer to $80,000. Hobart wages for health, education, and government are the largest employing sectors. Tourism, agriculture, and aquaculture are significant regional employers.',
  },
  {
    question: 'How does Tasmania cost of living compare?',
    answer:
      'Hobart housing costs have risen sharply but remain well below Sydney and Melbourne. Median rent for a one-bedroom inner-city apartment is around $420/week (around $22,000/year — about 22% of a $100k salary). Transport, groceries, and utilities are close to the national average. The same take-home pay goes materially further in Tasmania than in the larger capitals.',
  },
];

export default function TasPayCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          faqSchema(faqs),
          articleSchema({
            headline: 'Tasmania pay calculator (FY 2026–27)',
            description: 'Calculate your take-home pay in Tasmania. Federal tax applies the same as the rest of Australia.',
            url: `${brand.url}/tasmania/pay-calculator`,
          }),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-8">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'By state' },
            { name: 'Tasmania' },
          ]} />
          <h1 className="h-serif mt-3 text-3xl text-ink-900 dark:text-ink-50 sm:text-4xl">
            Tasmania <span className="h-highlight">pay calculator</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            Calculate your take-home pay in Tasmania. The federal tax brackets, Medicare
            levy, and HELP repayment thresholds are the same across Australia — so the
            math is identical whether you work in Hobart, Launceston, or Burnie. What
            varies is the cost of living, the median wage in your industry, and the
            state-specific allowances that may apply to your role.
          </p>
        </header>

        <section className="mb-10">
          <PayCalculator />
        </section>

        <section className="prose prose-slate dark:prose-invert mt-12 max-w-3xl">
          <h2>Tasmania pay in context</h2>
          <p>
            Tasmania has a workforce concentrated in health, education, government,
            tourism, and agriculture. Wages are the lowest of the mainland states, but
            the cost of living — especially housing — is also the lowest. The trade-off
            means the same take-home pay supports a materially higher standard of
            living than in Sydney or Melbourne.
          </p>
          <p>
            Take-home pay is the same as everywhere else in Australia (federal tax
            applies uniformly). Many Tasmanian workers are employed by the state
            government, which is the largest single employer in the state.
          </p>

          <h2>Tasmanian awards and public-sector employment</h2>
          <p>
            Tasmanian public-sector employees are covered by the <em>Tasmanian
            State Service Award</em> and various industry-specific awards. Private-sector
            employees are covered by the federal Modern Awards that apply across
            Australia. For a casual or shift-worker, use our{' '}
            <Link href="/casual-pay-calculator">casual pay calculator</Link>. For
            people with HECS-HELP debts, the{' '}
            <Link href="/hecs-calculator">HECS-HELP calculator</Link> applies the new
            marginal repayment system that took effect on 1 July 2025.
          </p>

          <h2>Frequently asked questions about Tasmania pay</h2>
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
