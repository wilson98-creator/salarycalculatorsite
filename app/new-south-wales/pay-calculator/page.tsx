import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { PayCalculator } from '@/components/PayCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'NSW Pay Calculator (FY 2026–27) — Salary & Take-Home Pay | SalaryCalc',
  description:
    'New South Wales pay calculator. Same ATO federal tax brackets as the rest of Australia, with state-specific cost-of-living context. Live calculator, FY 2026–27 rates.',
  alternates: { canonical: '/new-south-wales/pay-calculator' },
};

const faqs = [
  {
    question: 'Is tax different in NSW compared to other states?',
    answer:
      'No. Personal income tax and the Medicare levy are federal and apply the same way in every state. A person earning $80,000 in Sydney pays exactly the same income tax as a person earning $80,000 in Perth, Hobart, or Darwin. The differences between states show up in cost of living, average wages, and (for employees) the rate of payroll tax paid by your employer — not in your take-home pay.',
  },
  {
    question: 'What is the average salary in NSW?',
    answer:
      'According to the ABS, the average full-time adult total weekly earnings in NSW in 2024 was around $2,050, which works out to roughly $106,600 per year. The median (a better measure of "typical") is lower, around $95,000. Sydney wages are typically 5-10% above the state average, driven by finance, tech, and professional services. Regional NSW wages are typically 10-15% below the state average.',
  },
  {
    question: 'How does Sydney cost of living affect take-home pay?',
    answer:
      'Sydney has the highest housing costs in Australia (median rent for a one-bedroom apartment is around $700/week, or $36,400/year — about 35% of a $100k salary). Transport, groceries, and utilities are also higher than the national average. The take-home pay is the same as elsewhere, but it goes less far. Use the calculator above to see your take-home, then check your state-specific expenses separately.',
  },
  {
    question: 'What about NSW public-sector penalty rates and allowances?',
    answer:
      'NSW public-sector awards include shift allowances, on-call allowances, and remote-area incentives that vary by department and role. The calculator above models the standard tax treatment of these payments — they are added to gross income and taxed at your marginal rate. The actual rate of each allowance is set by the relevant NSW award or enterprise agreement, not by tax law.',
  },
];

export default function NswPayCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          faqSchema(faqs),
          articleSchema({
            headline: 'NSW pay calculator (FY 2026–27)',
            description: 'Calculate your take-home pay in New South Wales. Federal tax applies the same as the rest of Australia.',
            url: `${brand.url}/new-south-wales/pay-calculator`,
          }),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-8">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'By state' },
              { name: 'New South Wales' },
            ]}
          />
          <h1 className="h-display mt-6 text-ink-900">
            New South Wales pay calculator
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 sm:text-lg">
            Calculate your take-home pay in NSW. The federal tax brackets, Medicare
            levy, and HELP repayment thresholds are the same across Australia — so the
            math is identical whether you work in Sydney, Wollongong, or Tamworth. What
            varies is the cost of living, the median wage in your industry, and the
            state-specific allowances that may apply to your role.
          </p>
        </header>

        <section className="mb-10">
          <PayCalculator />
        </section>

        <section className="prose prose-slate prose-invert mt-12 max-w-3xl">
          <h2>NSW pay in context</h2>
          <p>
            NSW is Australia&apos;s largest state economy. The financial-services,
            technology, and professional-services industries are concentrated in the
            Sydney CBD and surrounding suburbs, and pay above the national average.
            Health, education, retail, and hospitality are the largest employing sectors
            and pay closer to the state average. Trades, construction, and mining in
            regional NSW (Newcastle, Wollongong, the Hunter) pay well above the state
            median for the same role in Sydney, mainly because of penalty rates and
            project allowances.
          </p>
          <p>
            The take-home figures the calculator shows for an NSW employee are the same
            as for any other Australian. The differences are in spending power: Sydney
            housing costs alone can absorb 30–40% of a $100,000 salary, which is well
            above the 25% rule of thumb. Regional NSW gives you the same take-home with
            significantly lower rent.
          </p>

          <h2>NSW awards, allowances, and penalty rates</h2>
          <p>
            NSW public-sector employees are covered by the <em>NSW Public Service
            Award</em> and various industry-specific awards. Private-sector employees
            are covered by the federal Modern Awards that apply across Australia.
            Penalty rates, shift loadings, and remote-area incentives are set by the
            relevant award or enterprise agreement — not by tax law — and are added to
            your gross pay before the calculator applies tax.
          </p>
          <p>
            For a casual or shift-worker in NSW, use our{' '}
            <Link href="/casual-pay-calculator">casual pay calculator</Link> to model
            the loaded rate and the tax outcome together. For people with HECS-HELP
            debts, the{' '}
            <Link href="/hecs-calculator">HECS-HELP calculator</Link> applies the new
            marginal repayment system that took effect on 1 July 2025.
          </p>

          <h2>Frequently asked questions about NSW pay</h2>
        </section>

        <section className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.question} className="card group">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink-900">
                <span aria-hidden="true" className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition">›</span>
                {f.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{f.answer}</p>
            </details>
          ))}
        </section>

        <section className="prose prose-slate prose-invert mt-12 max-w-3xl">
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
