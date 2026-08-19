import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { PayCalculator } from '@/components/PayCalculator';
import { JsonLd, softwareApplicationSchema, faqSchema } from '@/components/Schema';
import { sources } from '@/lib/tax/sources';

export const metadata: Metadata = {
  title: 'Australian Pay Calculator (FY 2026–27) — Take-Home Pay After Tax',
  description:
    'Free, accurate Australian pay calculator — also covers wage, salary, paycheck, annual income, hourly wage, payroll, salary comparison and holiday entitlement. FY 2026–27 ATO rates.',
  alternates: { canonical: '/' },
};

const homeFaqs = [
  {
    question: 'How accurate is this pay calculator?',
    answer:
      'The calculator applies the Australian Taxation Office resident and non-resident income tax brackets, the Medicare levy (with low-income shade-in), the Low Income Tax Offset (LITO), and the current HECS-HELP repayment schedule. Every rate and threshold links to the original ATO source on our methodology page. Results should match a payslip to within a few dollars; small differences are usually due to the PAYG withholding formula using weekly-equivalent coefficients and rounding that gets reconciled at tax time.',
  },
  {
    question: 'How much tax will I pay on $80,000?',
    answer:
      'For FY 2026–27, on a $80,000 annual salary you pay $14,520 in income tax plus $1,600 Medicare levy — a net take-home of about $63,880 per year, or around $2,457 per fortnight. Use the calculator above for the exact figure for your situation. Employer super of $9,600 (12%) is paid on top.',
  },
  {
    question: 'Does this include superannuation?',
    answer:
      'Yes. The Superannuation Guarantee is shown as a separate line — it is an employer cost paid on top of your salary, not a deduction from your take-home pay. If your offer is a Total Employment Cost that includes super, tick "My gross includes super" and the calculator will peel super off the top before computing tax.',
  },
  {
    question: 'How is HECS-HELP repayment calculated?',
    answer:
      'From 1 July 2025 HECS-HELP uses a marginal bracket system — you only pay the higher rate on income above each threshold, not on your whole income. For FY 2026–27 the threshold is around $69,528. Tick the "I have a HECS-HELP debt" option in the calculator to see the impact on your take-home pay.',
  },
  {
    question: 'Is this financial advice?',
    answer:
      'No. SalaryCalc provides estimates only based on published ATO rates. It is not a substitute for advice from a registered tax agent or financial adviser. See our disclaimer for the full statement.',
  },
];

const topGuides = [
  { slug: 'australian-income-tax', title: 'How Australian income tax works — a complete guide' },
  { slug: 'hecs-repayment', title: 'HECS-HELP repayment: the new marginal system explained' },
  { slug: 'salary-sacrifice', title: 'Salary sacrifice: how to lower your tax bill legally' },
  { slug: 'stage-3-tax-cuts', title: 'Stage 3 tax cuts: what changed and what\'s next' },
];

const calculators = [
  { href: '/', title: 'Pay calculator', blurb: 'Annual, monthly, fortnightly, weekly, daily, hourly. Wage, salary, paycheck, payroll.' },
  { href: '/salary-sacrifice-calculator', title: 'Salary sacrifice calculator', blurb: 'See how much tax you save by sacrificing pre-tax into super.' },
  { href: '/hecs-calculator', title: 'HECS-HELP calculator', blurb: 'Repayment under the new 2025–26 marginal system, plus years to pay off.' },
  { href: '/casual-pay-calculator', title: 'Casual pay calculator', blurb: 'Loaded rate + tax + HECS for casuals on common Modern Awards.' },
  { href: '/mortgage-calculator', title: 'Mortgage calculator', blurb: 'Repayments, total interest, and savings from extra payments.' },
  { href: '/loan-payoff-calculator', title: 'Loan payoff calculator', blurb: 'Pay off credit cards and personal loans faster.' },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[softwareApplicationSchema(), faqSchema(homeFaqs)]} />

      <section className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl">
            Australian pay calculator
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            Work out your take-home pay in seconds. Enter your salary, choose your pay
            period, and see the breakdown of income tax, Medicare, HECS-HELP and
            superannuation — updated for the current ATO financial year.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600 dark:text-ink-400">
            <span className="chip">FY 2026–27 rates</span>
            <span className="chip">Stage 3 tax cuts included</span>
            <span className="chip">12% super guarantee</span>
            <span>Methodology last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></span>
          </div>
        </div>
        <aside className="lg:col-span-2">
          <div className="rounded-2xl border border-ink-200 bg-white p-5 text-sm text-ink-600 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300">
            <p className="font-semibold text-ink-900 dark:text-ink-50">Why trust these numbers?</p>
            <ul className="mt-3 space-y-2 pl-5 list-disc">
              <li>Every rate is sourced from the ATO and cited in <Link href="/methodology" className="text-brand-600 underline-offset-2 hover:underline dark:text-brand-300">our methodology</Link>.</li>
              <li>Tested against the ATO published PAYG formulas ({sources.paygFormulas.label}).</li>
              <li>No login, no tracking of your salary, no ads above the calculator.</li>
              <li>Built and maintained in Australia.</li>
            </ul>
          </div>
        </aside>
      </section>

      <div className="mt-12">
        <PayCalculator />
      </div>

      <section className="mt-20 max-w-5xl">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-50 sm:text-3xl">How the calculation works</h2>
          <p className="mt-4 text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            Australian income tax is progressive — different rates apply to different portions of your income, not a single flat rate on the whole amount. Here is the actual calculation, with numbers, for someone earning $85,000 in FY 2026–27.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {/* Worked example card */}
          <div className="card not-prose lg:col-span-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">Step-by-step for $85,000 annual</h3>
              <span className="chip">FY 2026–27</span>
            </div>
            <ol className="mt-5 space-y-3 text-sm">
              <li className="flex items-baseline justify-between gap-3">
                <span className="text-ink-600 dark:text-ink-400">1. Start with gross pay</span>
                <span className="font-mono font-semibold tabular-nums text-ink-900 dark:text-ink-100">$85,000.00</span>
              </li>
              <li className="flex items-baseline justify-between gap-3">
                <span className="text-ink-600 dark:text-ink-400">2. Subtract pre-tax salary sacrifice</span>
                <span className="font-mono font-semibold tabular-nums text-ink-900 dark:text-ink-100">$0.00</span>
              </li>
              <li className="flex items-baseline justify-between gap-3">
                <span className="text-ink-600 dark:text-ink-400">3. Taxable income</span>
                <span className="font-mono font-semibold tabular-nums text-ink-900 dark:text-ink-100">$85,000.00</span>
              </li>
              <li className="flex items-baseline justify-between gap-3 border-t border-ink-200 pt-3 dark:border-ink-700">
                <span className="text-ink-600 dark:text-ink-400">4. Income tax (bracket method)</span>
                <span className="font-mono font-semibold tabular-nums text-ink-900 dark:text-ink-100">$16,020.00</span>
              </li>
              <li className="flex items-baseline justify-between gap-3 pl-4 text-xs text-ink-500 dark:text-ink-500">
                <span>0% on $0–$18,200 + 15% on $18,201–$45,000 + 30% on $45,001–$85,000</span>
              </li>
              <li className="flex items-baseline justify-between gap-3">
                <span className="text-ink-600 dark:text-ink-400">5. Less LITO (phased out above $66,667)</span>
                <span className="font-mono font-semibold tabular-nums text-ink-900 dark:text-ink-100">$0.00</span>
              </li>
              <li className="flex items-baseline justify-between gap-3">
                <span className="text-ink-600 dark:text-ink-400">6. Medicare levy (2%)</span>
                <span className="font-mono font-semibold tabular-nums text-ink-900 dark:text-ink-100">$1,700.00</span>
              </li>
              <li className="flex items-baseline justify-between gap-3">
                <span className="text-ink-600 dark:text-ink-400">7. HECS-HELP repayment (not enabled)</span>
                <span className="font-mono font-semibold tabular-nums text-ink-900 dark:text-ink-100">$0.00</span>
              </li>
              <li className="flex items-baseline justify-between gap-3 border-t-2 border-ink-300 pt-3 dark:border-ink-600">
                <span className="font-semibold text-ink-900 dark:text-ink-50">Net take-home</span>
                <span className="font-mono text-lg font-bold tabular-nums text-brand-700 dark:text-brand-300">$67,280.00 / yr</span>
              </li>
              <li className="flex items-baseline justify-between gap-3 text-xs text-ink-500 dark:text-ink-500">
                <span>Plus employer super 12% (paid on top, not deducted)</span>
                <span className="font-mono tabular-nums">$10,200.00 / yr</span>
              </li>
            </ol>
          </div>

          {/* Where the money goes — stacked bar */}
          <div className="card not-prose lg:col-span-2">
            <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">Where the money goes</h3>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-500">$85,000 gross split into take-home, tax, and super.</p>

            <div className="mt-6">
              <div className="flex h-9 w-full overflow-hidden rounded-lg ring-1 ring-ink-200 dark:ring-ink-700" aria-label="Breakdown of $85,000 gross">
                <div className="bg-brand-500" style={{ width: '79.2%' }} title="Net take-home: 79.2%">
                  <span className="sr-only">Net take-home 79.2%</span>
                </div>
                <div className="bg-rose-500" style={{ width: '18.8%' }} title="Income tax: 18.8%">
                  <span className="sr-only">Income tax 18.8%</span>
                </div>
                <div className="bg-amber-500" style={{ width: '2.0%' }} title="Medicare: 2.0%">
                  <span className="sr-only">Medicare 2.0%</span>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5 text-sm">
                <li className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-sm bg-brand-500" />
                    <span className="text-ink-700 dark:text-ink-300">Net take-home</span>
                  </span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-ink-900 dark:text-ink-100">$67,280</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-sm bg-rose-500" />
                    <span className="text-ink-700 dark:text-ink-300">Income tax</span>
                  </span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-ink-900 dark:text-ink-100">$16,020</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-sm bg-amber-500" />
                    <span className="text-ink-700 dark:text-ink-300">Medicare levy</span>
                  </span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-ink-900 dark:text-ink-100">$1,700</span>
                </li>
                <li className="flex items-center justify-between gap-3 border-t border-ink-200 pt-2.5 dark:border-ink-700">
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-sm bg-ink-300 dark:bg-ink-600" />
                    <span className="text-ink-700 dark:text-ink-300">Super (employer, on top)</span>
                  </span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-ink-500 dark:text-ink-400">$10,200</span>
                </li>
              </ul>

              <div className="mt-5 rounded-lg border border-ink-200 bg-ink-50 p-3 text-xs text-ink-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300">
                <strong className="text-ink-900 dark:text-ink-50">Effective tax rate:</strong> 20.85% (income tax + Medicare on gross).
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 max-w-3xl">
          <h3 className="text-xl font-bold text-ink-900 dark:text-ink-50">What about PAYG withholding?</h3>
          <p className="mt-3 text-base text-ink-600 dark:text-ink-400">
            Employers use a separate formula published in ATO Schedule 1 (NAT 1004) to work out how much to withhold from each pay. The formula uses weekly-equivalent earnings and small rounding coefficients, which is why your payslip can show a slightly different number to a "what tax will I pay" calculation. The withholding method intentionally collects slightly more or less than the actual tax so the difference gets reconciled when you lodge your return. This calculator shows the actual annual tax, which is what most people mean by "how much tax will I pay on $X".
          </p>
        </div>
      </section>

      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-50">All the ways to calculate your pay</h2>
        <p className="mt-3 text-base text-ink-600 dark:text-ink-400">
          People search for this calculation under a dozen different names — wage calculator, paycheck calculator, salary calculator, annual income calculator, take home pay calculator, online payroll calculator. They are all the same problem: <em>how much of what I earn actually lands in my bank account</em>. What changes is the framing, not the math.
        </p>
        <ul className="mt-5 space-y-3 text-sm text-ink-700 dark:text-ink-300">
          <li>
            <strong className="text-ink-900 dark:text-ink-50">Wage calculator / hourly wage calculator / hourly to salary calculator</strong> — for people paid by the hour. Enter your hourly rate, set hours per week and weeks per year, and the calculator annualises the rest.
          </li>
          <li>
            <strong className="text-ink-900 dark:text-ink-50">Salary calculator / annual salary calculator / annual income calculator</strong> — for salaried employees. Enter your package as an annual figure and the calculator shows the monthly, fortnightly and weekly take-home equivalents.
          </li>
          <li>
            <strong className="text-ink-900 dark:text-ink-50">Paycheck calculator / take home pay calculator</strong> — for the everyday question of "how much is in my next pay". The same calculation, but the calculator shows the per-period number prominently.
          </li>
          <li>
            <strong className="text-ink-900 dark:text-ink-50">Payroll calculator / online payroll calculator / payroll hours calculator / payroll taxes calculator</strong> — the same math, from the employer\u2019s side. Your employer\u2019s payroll software applies the same PAYG withholding rules to every pay, which is why the per-period number is what arrives in your bank.
          </li>
          <li>
            <strong className="text-ink-900 dark:text-ink-50">Salary comparison</strong> — for people weighing two job offers. The calculator makes it easy to enter each offer and see the after-tax, after-super comparison.
          </li>
          <li>
            <strong className="text-ink-900 dark:text-ink-50">Holiday entitlement calculator</strong> — annual leave is paid at the ordinary rate (casuals receive 25% casual loading instead of paid leave). The main calculator shows your take-home per pay; the annual leave component is just your ordinary rate multiplied by the hours of leave accrued.
          </li>
        </ul>
        <p className="mt-5 text-base text-ink-600 dark:text-ink-400">
          The calculator above is set up to handle all of these. Pick a pay period (hourly, daily, weekly, fortnightly, monthly or annual), enter the gross, and the math is the same.
        </p>
      </section>

      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-50">All calculators</h2>
        <p className="mt-2 text-sm text-ink-600 dark:text-ink-400">
          One for every common Australian pay scenario. All use the same ATO-sourced math.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {calculators.map((c) => (
            <li key={c.href} className="rounded-2xl border border-ink-200 bg-white p-5 transition hover:border-brand-300 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700">
              <Link href={c.href} className="block">
                <h3 className="text-sm font-semibold text-ink-900 hover:text-brand-700 dark:text-ink-100 dark:hover:text-brand-300">
                  {c.title} →
                </h3>
                <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">{c.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-50">Guides</h2>
        <p className="mt-2 text-sm text-ink-600 dark:text-ink-400">
          Long-form explainers to help you understand the numbers and make better decisions.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {topGuides.map((g) => (
            <li key={g.slug} className="rounded-2xl border border-ink-200 bg-white p-5 transition hover:border-brand-300 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700">
              <Link href={`/guides/${g.slug}`} className="text-sm font-semibold text-ink-900 hover:text-brand-700 dark:text-ink-100 dark:hover:text-brand-300">
                {g.title} →
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/guides" className="text-brand-600 underline-offset-2 hover:underline dark:text-brand-300">See all guides →</Link>
        </p>
      </section>

      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-50">Frequently asked questions</h2>
        <div className="mt-5 space-y-3">
          {homeFaqs.map((q) => (
            <details key={q.question} className="card group">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink-900 dark:text-ink-50">
                <span aria-hidden="true" className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition dark:text-brand-300">›</span>
                {q.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{q.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link href="/faq" className="text-brand-600 underline-offset-2 hover:underline dark:text-brand-300">See all 30+ questions →</Link>
        </p>
      </section>
    </>
  );
}
