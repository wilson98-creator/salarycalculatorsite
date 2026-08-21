import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { PayCalculator } from '@/components/PayCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'ACT Pay Calculator (FY 2026–27) — Salary & Take-Home Pay | SalaryCalc',
  description:
    'ACT (Australian Capital Territory) pay calculator. Federal tax applies the same as everywhere in Australia. Live calculator, FY 2026–27 rates, Canberra cost-of-living context.',
  alternates: { canonical: '/australian-capital-territory/pay-calculator' },
};

const faqs = [
  {
    question: 'Is tax different in the ACT compared to other states?',
    answer:
      'No. Personal income tax and the Medicare levy are federal and apply the same way in every Australian state and territory. The tax on $80,000 in Canberra is identical to the tax on $80,000 in Sydney or Melbourne. Territory differences show up in cost of living, average wages, and (for employers) the rate of payroll tax — not in your take-home pay.',
  },
  {
    question: 'What is the average salary in the ACT?',
    answer:
      'The ACT has the highest average full-time salary of any Australian state or territory, around $2,200 per week or roughly $114,400 per year, driven by the federal public service. The median is closer to $100,000. APS (Australian Public Service) roles at the APS 3-6 level sit in the $75,000-$110,000 range; EL 1-2 sit in the $115,000-$160,000 range.',
  },
  {
    question: 'How does Canberra cost of living compare?',
    answer:
      'Canberra is more affordable than Sydney but more expensive than Adelaide or Hobart. Median rent for a one-bedroom inner-city apartment is around $510/week (around $26,500/year — about 27% of a $100k salary). Transport is reasonable (a strong cycling culture means many public servants commute by bike), and groceries are close to the national average.',
  },
];

export default function ActPayCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          faqSchema(faqs),
          articleSchema({
            headline: 'ACT pay calculator (FY 2026–27)',
            description: 'Calculate your take-home pay in the Australian Capital Territory. Federal tax applies the same as the rest of Australia.',
            url: `${brand.url}/australian-capital-territory/pay-calculator`,
          }),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-8">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'By state' },
            { name: 'ACT' },
          ]} />
          <h1 className="h-display mt-6 text-ink-900 dark:text-ink-50">
            ACT pay calculator
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            Calculate your take-home pay in the Australian Capital Territory. The federal
            tax brackets, Medicare levy, and HELP repayment thresholds are the same
            across Australia — so the math is identical whether you work in Canberra or
            anywhere else. What varies is the cost of living, the median wage in your
            industry, and the APS-specific allowances that apply to public-service roles.
          </p>
        </header>

        <section className="mb-10">
          <PayCalculator />
        </section>

        <section className="prose prose-slate dark:prose-invert mt-12 max-w-3xl">
          <h2>ACT pay in context</h2>
          <p>
            The ACT has the highest average wages in the country, driven by the
            Australian Public Service (APS). The federal government is the largest
            single employer in Canberra, with the Department of Defence, Services
            Australia, the Department of Home Affairs, and the Department of Foreign
            Affairs and Trade all headquartered there. APS-level roles pay at the
            national average or above, with the senior executive service (SES)
            well into six figures.
          </p>
          <p>
            Take-home pay is the same as everywhere else in Australia (federal tax
            applies uniformly). What the ACT offers is reliable public-service
            employment at above-median wages, with a lower cost of living than Sydney.
          </p>

          <h2>APS awards and public-sector employment</h2>
          <p>
            APS employees are covered by the <em>APS Employment Conditions</em> and
            individual enterprise agreements, not by the state-based awards. Conditions
            typically include generous leave entitlements, superannuation above the SG,
            and study assistance. For a casual or shift-worker outside the APS, the
            standard federal Modern Awards apply. For people with HECS-HELP debts, the{' '}
            <Link href="/hecs-calculator">HECS-HELP calculator</Link> applies the new
            marginal repayment system that took effect on 1 July 2025.
          </p>

          <h2>Frequently asked questions about ACT pay</h2>
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
