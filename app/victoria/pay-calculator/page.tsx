import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { PayCalculator } from '@/components/PayCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Victoria Pay Calculator (FY 2026–27) — Salary & Take-Home Pay | SalaryCalc',
  description:
    'Victoria pay calculator. Federal tax applies the same as everywhere in Australia. Live calculator, FY 2026–27 rates, Melbourne cost-of-living context.',
  alternates: { canonical: '/victoria/pay-calculator' },
};

const faqs = [
  {
    question: 'Is tax different in Victoria compared to other states?',
    answer:
      'No. Personal income tax and the Medicare levy are federal and apply the same way in every Australian state and territory. The tax on $80,000 in Melbourne is identical to the tax on $80,000 in Adelaide or Brisbane. State differences show up in cost of living, average wages, and the rate of payroll tax paid by your employer — not in your take-home pay.',
  },
  {
    question: 'What is the average salary in Victoria?',
    answer:
      'According to the ABS, the average full-time adult total weekly earnings in Victoria in 2024 was around $1,990, which works out to roughly $103,500 per year. The median is closer to $90,000. Melbourne CBD wages for finance, tech, and professional services are typically 5-10% above the state average. Regional Victoria wages are typically 5-10% below.',
  },
  {
    question: 'How does Melbourne cost of living affect take-home pay?',
    answer:
      'Melbourne housing costs are the second-highest in Australia after Sydney (median rent for a one-bedroom inner-city apartment is around $580/week, or $30,000/year — about 30% of a $100k salary). Transport, groceries, and utilities are close to the national average. The take-home pay is the same as elsewhere, but housing is the big variable that affects what it can buy you.',
  },
];

export default function VicPayCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          faqSchema(faqs),
          articleSchema({
            headline: 'Victoria pay calculator (FY 2026–27)',
            description: 'Calculate your take-home pay in Victoria. Federal tax applies the same as the rest of Australia.',
            url: `${brand.url}/victoria/pay-calculator`,
          }),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-8">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'By state' },
              { name: 'Victoria' },
            ]}
          />
          <h1 className="h-serif mt-3 text-3xl text-ink-900 dark:text-ink-50 sm:text-4xl">
            Victoria <span className="h-highlight">pay calculator</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            Calculate your take-home pay in Victoria. The federal tax brackets, Medicare
            levy, and HELP repayment thresholds are the same across Australia — so the
            math is identical whether you work in Melbourne, Geelong, or Ballarat. What
            varies is the cost of living, the median wage in your industry, and the
            state-specific allowances that may apply to your role.
          </p>
        </header>

        <section className="mb-10">
          <PayCalculator />
        </section>

        <section className="prose prose-slate dark:prose-invert mt-12 max-w-3xl">
          <h2>Victoria pay in context</h2>
          <p>
            Victoria is Australia&apos;s second-largest state economy, with a workforce
            concentrated in health, education, professional services, retail, and
            manufacturing. Melbourne&apos;s CBD and inner suburbs are home to most of
            the finance, legal, and tech roles that pay above the state median.
            Regional Victoria — Geelong, Ballarat, Bendigo, Wodonga — has a more mixed
            economy with strong health, education, and agricultural sectors.
          </p>
          <p>
            Take-home pay is the same as everywhere else in Australia (federal tax
            applies uniformly), but housing in inner Melbourne can absorb 30-40% of a
            $100,000 salary, similar to Sydney. Regional Victoria offers significantly
            cheaper housing and a lower cost of living for the same take-home.
          </p>

          <h2>Victorian awards, allowances, and penalty rates</h2>
          <p>
            Victorian public-sector employees are covered by the <em>Victorian Public
            Service Award</em> and various industry-specific awards. Private-sector
            employees are covered by the federal Modern Awards that apply across
            Australia. Penalty rates, shift loadings, and remote-area incentives are set
            by the relevant award or enterprise agreement — not by tax law — and are
            added to your gross pay before the calculator applies tax.
          </p>
          <p>
            For a casual or shift-worker, use our{' '}
            <Link href="/casual-pay-calculator">casual pay calculator</Link>. For
            people with HECS-HELP debts, the{' '}
            <Link href="/hecs-calculator">HECS-HELP calculator</Link> applies the new
            marginal repayment system that took effect on 1 July 2025.
          </p>

          <h2>Frequently asked questions about Victoria pay</h2>
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
