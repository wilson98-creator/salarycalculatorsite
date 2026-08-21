import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { PayCalculator } from '@/components/PayCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Queensland Pay Calculator (FY 2026–27) — Salary & Take-Home Pay | SalaryCalc',
  description:
    'Queensland pay calculator. Federal tax applies the same as everywhere in Australia. Live calculator, FY 2026–27 rates, Brisbane cost-of-living context.',
  alternates: { canonical: '/queensland/pay-calculator' },
};

const faqs = [
  {
    question: 'Is tax different in Queensland compared to other states?',
    answer:
      'No. Personal income tax and the Medicare levy are federal and apply the same way in every Australian state and territory. The tax on $80,000 in Brisbane is identical to the tax on $80,000 in Sydney or Melbourne. State differences show up in cost of living, average wages, and (for employers) the rate of payroll tax — not in your take-home pay.',
  },
  {
    question: 'What is the average salary in Queensland?',
    answer:
      'According to the ABS, the average full-time adult total weekly earnings in Queensland in 2024 was around $1,910, which works out to roughly $99,300 per year. The median is closer to $87,000. Brisbane wages are typically 5-10% above the state average, driven by health, education, government, and professional services. Mining, resources, and construction in regional Queensland (Gladstone, Mackay, the Bowen Basin) pay well above the state median.',
  },
  {
    question: 'How does Brisbane cost of living compare to Sydney and Melbourne?',
    answer:
      'Brisbane is noticeably cheaper than Sydney and Melbourne. Median rent for a one-bedroom inner-city apartment is around $540/week (around $28,000/year — about 28% of a $100k salary). Transport, groceries, and utilities are at or below the national average. The same take-home pay goes materially further in Brisbane than in Sydney.',
  },
];

export default function QldPayCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          faqSchema(faqs),
          articleSchema({
            headline: 'Queensland pay calculator (FY 2026–27)',
            description: 'Calculate your take-home pay in Queensland. Federal tax applies the same as the rest of Australia.',
            url: `${brand.url}/queensland/pay-calculator`,
          }),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-8">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'By state' },
              { name: 'Queensland' },
            ]}
          />
          <h1 className="h-serif mt-3 text-3xl text-ink-900 dark:text-ink-50 sm:text-4xl">
            Queensland <span className="h-highlight">pay calculator</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            Calculate your take-home pay in Queensland. The federal tax brackets,
            Medicare levy, and HELP repayment thresholds are the same across Australia —
            so the math is identical whether you work in Brisbane, the Gold Coast, or
            Cairns. What varies is the cost of living, the median wage in your industry,
            and the state-specific allowances that may apply to your role.
          </p>
        </header>

        <section className="mb-10">
          <PayCalculator />
        </section>

        <section className="prose prose-slate dark:prose-invert mt-12 max-w-3xl">
          <h2>Queensland pay in context</h2>
          <p>
            Queensland has a diverse economy spanning tourism (Gold Coast, Cairns),
            resources and mining (Bowen Basin, Surat Basin), agriculture, health,
            education, and a growing professional-services sector in Brisbane. Wages in
            mining and resources are well above the state average and are often packaged
            with significant allowances (site allowance, travel allowance, FIFO
            arrangements). Health and education are the largest public-sector employers
            and pay close to the state average.
          </p>
          <p>
            Take-home pay is the same as everywhere else in Australia (federal tax
            applies uniformly), but the cost of living outside Brisbane is materially
            lower than Sydney or Melbourne. FIFO and site-based workers should check how
            their allowances are taxed — most are added to gross and taxed at marginal
            rates.
          </p>

          <h2>Queensland awards and allowances</h2>
          <p>
            Queensland public-sector employees are covered by the <em>Queensland Public
            Service Award</em> and various industry-specific awards. Private-sector
            employees are covered by the federal Modern Awards that apply across
            Australia. Site allowances in mining and resources are typically set by
            enterprise agreements and can add 10-30% to base pay.
          </p>
          <p>
            For a casual or shift-worker, use our{' '}
            <Link href="/casual-pay-calculator">casual pay calculator</Link>. For
            people with HECS-HELP debts, the{' '}
            <Link href="/hecs-calculator">HECS-HELP calculator</Link> applies the new
            marginal repayment system that took effect on 1 July 2025.
          </p>

          <h2>Frequently asked questions about Queensland pay</h2>
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
