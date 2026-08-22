import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { PayCalculator } from '@/components/PayCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';
import { NewsletterForm } from '@/components/NewsletterForm';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Western Australia Pay Calculator (FY 2026–27), Salary & Take-Home Pay | SalaryCalc',
  description:
    'Western Australia pay calculator. Federal tax applies the same as everywhere in Australia. Live calculator, FY 2026–27 rates, Perth cost-of-living context.',
  alternates: { canonical: '/western-australia/pay-calculator' },
};

const faqs = [
  {
    question: 'Is tax different in Western Australia compared to other states?',
    answer:
      'No. Personal income tax and the Medicare levy are federal and apply the same way in every Australian state and territory. The tax on $80,000 in Perth is identical to the tax on $80,000 in Brisbane or Adelaide. State differences show up in cost of living, average wages, and (for employers) the rate of payroll tax, not in your take-home pay.',
  },
  {
    question: 'What is the average salary in Western Australia?',
    answer:
      'Western Australia has the highest average full-time salary in Australia, around $2,150 per week or roughly $111,800 per year, driven by the resources sector. The median is closer to $95,000. Perth wages outside mining are typically close to the national average, while FIFO mining roles in the Pilbara, Goldfields, and Kimberley pay well above the state average.',
  },
  {
    question: 'How does Perth cost of living compare to other capitals?',
    answer:
      'Perth housing costs have risen sharply since 2020 but remain below Sydney and Melbourne. Median rent for a one-bedroom inner-city apartment is around $520/week (around $27,000/year, about 27% of a $100k salary). Transport and groceries are close to the national average. The take-home pay is the same as elsewhere, but the resources sector in WA often pays above the national median.',
  },
];

export default function WaPayCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          faqSchema(faqs),
          articleSchema({
            headline: 'Western Australia pay calculator (FY 2026–27)',
            description: 'Calculate your take-home pay in Western Australia. Federal tax applies the same as the rest of Australia.',
            url: `${brand.url}/western-australia/pay-calculator`,
          }),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-8">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'By state' },
              { name: 'Western Australia' },
            ]}
          />
          <h1 className="h-display mt-6 text-ink-900">
            Western Australia pay calculator
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 sm:text-lg">
            Calculate your take-home pay in Western Australia. The federal tax brackets,
            Medicare levy, and HELP repayment thresholds are the same across Australia , 
            so the math is identical whether you work in Perth, Bunbury, or a FIFO site
            in the Pilbara. What varies is the cost of living, the median wage in your
            industry, and the site allowances that apply to many resources roles.
          </p>
        </header>

        <section className="mb-10">
          <PayCalculator />
        </section>

        <section className="prose prose-slate prose-invert mt-12 max-w-3xl">
          <h2>Western Australia pay in context</h2>
          <p>
            Western Australia has the highest average full-time wages in the country,
            driven by the resources sector. Iron ore, lithium, gold, and nickel mining
            operations in the Pilbara, Goldfields, and Kimberley employ tens of thousands
            of FIFO and DIDO workers on packages well above the national median. Health,
            education, and government are the largest non-resources employers and pay
            close to the national average.
          </p>
          <p>
            Take-home pay is the same as everywhere else in Australia (federal tax
            applies uniformly). What varies is the gross: a typical WA mining engineer
            might earn $180,000-$220,000, which after federal tax and Medicare levy
            leaves a take-home of around $128,000-$155,000, materially higher than the
            same role in Sydney or Melbourne.
          </p>

          <h2>WA awards, FIFO allowances, and site loadings</h2>
          <p>
            Most WA mining and resources employees are covered by enterprise agreements
            rather than the standard Modern Awards. These agreements typically include
            site allowances, travel allowances, and FIFO arrangements that can add
            10-30% to base pay. The allowances are taxable (added to gross) and the
            calculator treats them as ordinary income. The take-home figure shown is the
            net after all federal tax has been applied.
          </p>
          <p>
            For a casual or shift-worker, use our{' '}
            <Link href="/casual-pay-calculator">casual pay calculator</Link>. For
            people with HECS-HELP debts, the{' '}
            <Link href="/hecs-calculator">HECS-HELP calculator</Link> applies the new
            marginal repayment system that took effect on 1 July 2025.
          </p>

          <h2>Frequently asked questions about Western Australia pay</h2>
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
      
        <section className="mt-16">
          <NewsletterForm
            accessKey={process.env.NEXT_PUBLIC_NEWSLETTER_KEY}
            source="state-western-australia"
            heading="Money news for Western Australia workers."
            description="When state-specific pay, tax, or award rates change, we send a short note so you know what to expect at your next pay."
          />
        </section>
    </article>
    </>
  );
}
