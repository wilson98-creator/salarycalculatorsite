import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { PayCalculator } from '@/components/PayCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Northern Territory Pay Calculator (FY 2026–27) — Salary & Take-Home Pay | SalaryCalc',
  description:
    'Northern Territory pay calculator. Federal tax applies the same as everywhere in Australia. Live calculator, FY 2026–27 rates, Darwin cost-of-living context.',
  alternates: { canonical: '/northern-territory/pay-calculator' },
};

const faqs = [
  {
    question: 'Is tax different in the Northern Territory compared to other states?',
    answer:
      'No. Personal income tax and the Medicare levy are federal and apply the same way in every Australian state and territory. The tax on $80,000 in Darwin is identical to the tax on $80,000 in Sydney or Melbourne. Territory differences show up in cost of living, average wages, and (for employers) the rate of payroll tax — not in your take-home pay.',
  },
  {
    question: 'What is the average salary in the Northern Territory?',
    answer:
      'The NT has an average full-time salary of around $2,070 per week or roughly $107,600 per year, second only to the ACT. The median is around $95,000. Darwin is the largest employing centre, with significant public-sector, defence, and resources roles. Remote community work and Aboriginal community-controlled organisations employ many people in regional NT.',
  },
  {
    question: 'How does Darwin cost of living compare?',
    answer:
      'Darwin has a high cost of living driven by its remoteness — groceries and some goods are noticeably more expensive than the east coast. Median rent for a one-bedroom inner-city apartment is around $520/week (around $27,000/year — about 27% of a $100k salary). The trade-off is wages that are typically 10-15% above the national average to compensate.',
  },
  {
    question: 'What is the NT Allowance?',
    answer:
      'Some NT employers (particularly NT Government and some private employers) pay a "Northern Territory Allowance" or "Remote Area Allowance" on top of base salary. This is taxable income and is added to your gross pay before the calculator applies tax. The allowance is designed to offset the higher cost of living in the Top End.',
  },
];

export default function NtPayCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          faqSchema(faqs),
          articleSchema({
            headline: 'Northern Territory pay calculator (FY 2026–27)',
            description: 'Calculate your take-home pay in the Northern Territory. Federal tax applies the same as the rest of Australia.',
            url: `${brand.url}/northern-territory/pay-calculator`,
          }),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-8">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'By state' },
            { name: 'Northern Territory' },
          ]} />
          <h1 className="h-display mt-6 text-ink-900 dark:text-ink-50">
            Northern Territory pay calculator
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            Calculate your take-home pay in the Northern Territory. The federal tax
            brackets, Medicare levy, and HELP repayment thresholds are the same across
            Australia — so the math is identical whether you work in Darwin, Alice
            Springs, or Katherine. What varies is the cost of living, the median wage in
            your industry, and the territory-specific allowances that apply to many NT
            roles.
          </p>
        </header>

        <section className="mb-10">
          <PayCalculator />
        </section>

        <section className="prose prose-slate dark:prose-invert mt-12 max-w-3xl">
          <h2>Northern Territory pay in context</h2>
          <p>
            The NT has a workforce concentrated in the NT Government, federal public
            service, defence, tourism, mining, and Aboriginal community-controlled
            organisations. Wages are typically 10-15% above the national average to
            offset the high cost of living. The Top End (Darwin, Katherine, Nhulunbuy)
            has tropical conditions; Central Australia (Alice Springs, Tennant Creek)
            is desert and very different in climate and demographics.
          </p>
          <p>
            Take-home pay is the same as everywhere else in Australia (federal tax
            applies uniformly). What the NT offers is above-median wages, strong public
            service, and unique roles in remote-community work and Aboriginal health
            services.
          </p>

          <h2>NT awards, remote allowances, and FIFO work</h2>
          <p>
            NT public-sector employees are covered by the <em>NT Public Sector
            Employment and Management Act</em> and various NT-specific determinations.
            Mining and resources employees are typically covered by enterprise
            agreements that include site allowances, travel allowances, and remote-area
            loadings. These allowances are taxable (added to gross) and the calculator
            treats them as ordinary income. For a casual or shift-worker, use our{' '}
            <Link href="/casual-pay-calculator">casual pay calculator</Link>. For
            people with HECS-HELP debts, the{' '}
            <Link href="/hecs-calculator">HECS-HELP calculator</Link> applies the new
            marginal repayment system that took effect on 1 July 2025.
          </p>

          <h2>Frequently asked questions about Northern Territory pay</h2>
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
