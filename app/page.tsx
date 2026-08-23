import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { PayCalculator } from '@/components/PayCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';
import { NewsletterForm } from '@/components/NewsletterForm';
import {
  JsonLd,
  softwareApplicationSchema,
  faqSchema,
  articleSchema,
} from '@/components/Schema';
import { sources } from '@/lib/tax/sources';
import { getLatestNews } from '@/lib/news/loader';

export const metadata: Metadata = {
  title: 'Australian Pay Calculator (FY 2026–27)',
  description:
    'Free, accurate Australian pay calculator, also covers wage, salary, paycheck, annual income, hourly wage, payroll, salary comparison and holiday entitlement. FY 2026–27 ATO rates.',
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
      'For FY 2026–27, on a $80,000 annual salary you pay $14,520 in income tax plus $1,600 Medicare levy, a net take-home of about $63,880 per year, or around $2,457 per fortnight. Use the calculator above for the exact figure for your situation. Employer super of $9,600 (12%) is paid on top.',
  },
  {
    question: 'Does this include superannuation?',
    answer:
      'Yes. The Superannuation Guarantee is shown as a separate line, it is an employer cost paid on top of your salary, not a deduction from your take-home pay. If your offer is a Total Employment Cost that includes super, tick "My gross includes super" and the calculator will peel super off the top before computing tax.',
  },
  {
    question: 'How is HECS-HELP repayment calculated?',
    answer:
      'From 1 July 2025 HECS-HELP uses a marginal bracket system, you only pay the higher rate on income above each threshold, not on your whole income. For FY 2026–27 the threshold is around $69,528. Tick the "I have a HECS-HELP debt" option in the calculator to see the impact on your take-home pay.',
  },
  {
    question: 'Is this financial advice?',
    answer:
      'No. SalaryCalc provides estimates only based on published ATO rates. It is not a substitute for advice from a registered tax agent or financial adviser. See our disclaimer for the full statement.',
  },
];

const calculators = [
  { href: '/', title: 'Pay calculator', blurb: 'Annual, monthly, fortnightly, weekly, daily, hourly.' },
  { href: '/salary-sacrifice-calculator', title: 'Salary sacrifice calculator', blurb: 'See how much tax you save by sacrificing into super.' },
  { href: '/hecs-calculator', title: 'HECS-HELP calculator', blurb: 'Repayment under the new 2025–26 marginal system.' },
  { href: '/casual-pay-calculator', title: 'Casual pay calculator', blurb: 'Loaded rate + tax + HECS for casuals on Modern Awards.' },
  { href: '/mortgage-calculator', title: 'Mortgage calculator', blurb: 'Repayments, total interest, and savings from extra payments.' },
  { href: '/loan-payoff-calculator', title: 'Loan payoff calculator', blurb: 'Pay off credit cards and personal loans faster.' },
  { href: '/salary-packaging-calculator', title: 'Salary packaging calculator', blurb: 'Novated lease cars, extra super, and other pre-tax benefits.' },
];

export default function HomePage() {
  const latestNews = getLatestNews(2);
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          faqSchema(homeFaqs),
          articleSchema({
            headline: 'Australian Pay Calculator (FY 2026–27), Take-Home Pay After Tax',
            description: brand.shortDescription,
            url: brand.url,
          }),
        ]}
      />

      {/* ──────────────────────────────────────────────────────────
          HERO, Editorial Ledger. Kicker, H1 with oxblood underline,
          calculator on the right. Newspaper rhythm.
          ────────────────────────────────────────────────────────── */}
      <section className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <p className="kicker">Australian Pay Calculator · FY 2026–27 · ATO-Grounded</p>
          <h1 className="h-display mt-6 text-ink-800">
            What you actually <span className="oxblood-underline">take</span> home.
          </h1>
          <p className="mt-8 max-w-md text-lg text-ink-600">
            The honest, ATO-grounded Australian pay calculator. No login,
            no tracking, every rate cited, every bracket explained.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-600">
            <span>Methodology last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></span>
            <span>Sources: ATO</span>
          </div>
        </div>
        <aside className="lg:col-span-6 lg:pl-12 lg:border-l lg:border-ink-200">
          <div className="lg:sticky lg:top-24">
            <PayCalculator />
          </div>
        </aside>
      </section>

      {/* ──────────────────────────────────────────────────────────
          § 01, How the calculation works
          ────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="section-index">§ 01</p>
            <h2 className="h-section mt-4 text-ink-900">
              How the calculation works.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="drop-cap text-base text-ink-700 sm:text-lg">
              Australian income tax is progressive, different rates apply
              to different portions of your income, not a single flat rate
              on the whole amount. Here is the actual calculation, with
              numbers, for someone earning $85,000 in FY 2026–27. Source:{' '}
              <a href={sources.taxRates.url} target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-4 hover:decoration-2">
                {sources.taxRates.label}
              </a>
              .
            </p>

            <ol className="mt-10 border-t border-ink-300">
              {[
                {
                  n: '01',
                  label: 'Start with gross pay',
                  detail: null,
                  value: '$85,000.00',
                  variant: 'neutral',
                },
                {
                  n: '02',
                  label: 'Subtract pre-tax salary sacrifice',
                  detail: null,
                  value: '$0.00',
                  variant: 'neutral',
                },
                {
                  n: '03',
                  label: 'Taxable income',
                  detail: null,
                  value: '$85,000.00',
                  variant: 'neutral',
                },
                {
                  n: '04',
                  label: 'Income tax (bracket method)',
                  detail: '0% to $18,200 · 15% to $45,000 · 30% to $85,000',
                  value: '$16,020.00',
                  variant: 'deduction',
                },
                {
                  n: '05',
                  label: 'Less LITO',
                  detail: 'Phased out above $66,667',
                  value: '$0.00',
                  variant: 'neutral',
                },
                {
                  n: '06',
                  label: 'Medicare levy',
                  detail: '2% of taxable income',
                  value: '$1,700.00',
                  variant: 'deduction',
                },
                {
                  n: '07',
                  label: 'HECS-HELP repayment',
                  detail: 'Not enabled',
                  value: '$0.00',
                  variant: 'neutral',
                },
              ].map((step) => (
                <li key={step.n} className="border-b border-ink-300 py-4 sm:py-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <div className="flex items-start gap-4 sm:items-center">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ink-300 bg-ink-100 font-mono text-xs font-semibold tabular-nums text-ink-700">
                        {step.n}
                      </span>
                      <div>
                        <p className="text-base font-semibold text-ink-800 sm:text-lg">
                          {step.label}
                        </p>
                        {step.detail && (
                          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-600">
                            {step.detail}
                          </p>
                        )}
                      </div>
                    </div>
                    <span
                      className={
                        step.variant === 'deduction'
                          ? 'result-value result-value-deduction self-start sm:self-auto'
                          : 'result-value self-start sm:self-auto'
                      }
                    >
                      {step.value}
                    </span>
                  </div>
                </li>
              ))}
              <li className="py-6 sm:py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <div className="flex items-start gap-4 sm:items-center">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-ledger-500 bg-ledger-500 font-mono text-sm font-bold tabular-nums text-ink-900">
                      ✓
                    </span>
                    <div>
                      <p className="kicker">Result</p>
                      <p className="mt-1 text-lg font-semibold text-ink-800 sm:text-xl">
                        Net take-home per year
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-600">
                      Annual net
                    </p>
                    <p className="result-figure mt-1">$67,280</p>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          § 02, PAYG vs your actual tax
          ────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="section-index">§ 02</p>
            <h2 className="h-section mt-4 text-ink-900">
              PAYG vs. your actual tax.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-base text-ink-700 sm:text-lg">
              Employers use the formulas in ATO Schedule 1 (NAT 1004) to
              work out how much to withhold from each pay. These formulas
              use weekly-equivalent earnings and small rounding
              coefficients, which is why your payslip can show a slightly
              different number to a &quot;what tax will I pay&quot;
              calculation. The withholding method intentionally collects
              slightly more or less than the actual tax so the difference
              gets reconciled when you lodge your return. This calculator
              shows the actual annual tax, which is what most people mean
              by &quot;how much tax will I pay on $X&quot;.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          § 03, Other calculators
          ────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="section-index">§ 03</p>
            <h2 className="h-section mt-4 text-ink-900">
              Other calculators.
            </h2>
            <p className="mt-4 text-sm text-ink-600">
              One for every common Australian pay scenario. All use the
              same ATO-sourced math.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ul className="rule-line border-t border-ink-200">
              {calculators.map((c) => (
                <li key={c.href} className="rule-line border-b border-ink-200">
                  <Link
                    href={c.href}
                    className="block py-6 transition hover:opacity-60"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-600">
                      Calculator
                    </p>
                    <p className="mt-2 text-lg font-semibold text-ink-900 sm:text-xl">
                      {c.title} <span className="text-ink-400">→</span>
                    </p>
                    <p className="mt-1 text-sm text-ink-600">{c.blurb}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          § 04, All the ways to calculate your pay
          ────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="section-index">§ 04</p>
            <h2 className="h-section mt-4 text-ink-900">
              All the ways to calculate your pay.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-base text-ink-700 sm:text-lg">
              People search for this calculation under a dozen different
              names, wage calculator, paycheck calculator, salary
              calculator, annual income calculator, take home pay
              calculator, online payroll calculator. They are all the
              same problem: <em>how much of what I earn actually lands in
              my bank account</em>. What changes is the framing, not the
              math.
            </p>
            <ul className="mt-10 space-y-6 text-base text-ink-700">
              <li>
                <strong className="text-ink-900">Wage calculator / hourly wage calculator / hourly to salary calculator</strong>, for people paid by the hour. Enter your hourly rate, set hours per week and weeks per year, and the calculator annualises the rest.
              </li>
              <li>
                <strong className="text-ink-900">Salary calculator / annual salary calculator / annual income calculator</strong>, for salaried employees. Enter your package as an annual figure and the calculator shows the monthly, fortnightly and weekly take-home equivalents.
              </li>
              <li>
                <strong className="text-ink-900">Paycheck calculator / take home pay calculator</strong>, for the everyday question of &quot;how much is in my next pay&quot;. The same calculation, but the calculator shows the per-period number prominently.
              </li>
              <li>
                <strong className="text-ink-900">Payroll calculator / online payroll calculator / payroll hours calculator / payroll taxes calculator</strong>, the same math, from the employer&apos;s side. Your employer&apos;s payroll software applies the same PAYG withholding rules to every pay, which is why the per-period number is what arrives in your bank.
              </li>
              <li>
                <strong className="text-ink-900">Salary comparison</strong>, for people weighing two job offers. The calculator makes it easy to enter each offer and see the after-tax, after-super comparison.
              </li>
              <li>
                <strong className="text-ink-900">Holiday entitlement calculator</strong>, annual leave is paid at the ordinary rate (casuals receive 25% casual loading instead of paid leave). The main calculator shows your take-home per pay; the annual leave component is just your ordinary rate multiplied by the hours of leave accrued.
              </li>
            </ul>
            <p className="mt-8 text-base text-ink-700">
              The calculator above is set up to handle all of these. Pick a
              pay period (hourly, daily, weekly, fortnightly, monthly or
              annual), enter the gross, and the math is the same.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          § 06, Latest Money Briefs
          ────────────────────────────────────────────────────────── */}
      {latestNews.length > 0 && (
        <section className="section">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="section-index">§ 06</p>
              <h2 className="h-section mt-4 text-ink-900">
                Money Briefs.
              </h2>
              <p className="mt-4 text-sm text-ink-600">
                The week in Australian money, interest rates, tax, super, wages,
                property, explained in plain English. New briefs on Tuesdays and Fridays.
              </p>
              <p className="mt-6">
                <Link
                  href="/news/"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-900 underline decoration-1 underline-offset-4 hover:decoration-2 hover:text-ledger-500"
                >
                  See all briefs →
                </Link>
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-0">
                {latestNews.map((post) => (
                  <li key={post.id} className="rule-line border-t border-b border-ink-200 py-6">
                    <Link
                      href={`/news/${post.id}/`}
                      className="group block"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="kicker">{post.kicker || 'Money brief'}</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-600">
                          {new Date(post.date).toLocaleDateString('en-AU', { day: '2-digit', month: 'short' })}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-ink-900 group-hover:text-ledger-500 sm:text-2xl">
                        {post.title}
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm text-ink-600 sm:text-base">
                        {post.excerpt}
                      </p>
                      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-600">
                        Read brief →
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────
          § 07, Common questions
          ────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="section-index">§ 07</p>
            <h2 className="h-section mt-4 text-ink-900">
              Common questions.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <ul className="space-y-0">
              {homeFaqs.map((q, i) => (
                <li key={q.question} className="rule-line border-t border-b border-ink-200 py-6">
                  <details className="group">
                    <summary className="flex cursor-pointer items-baseline justify-between gap-4 text-base font-semibold text-ink-900 sm:text-lg">
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-400">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>{q.question}</span>
                      </span>
                      <span className="font-mono text-ink-400 transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 pl-8 text-base text-ink-600">
                      {q.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link href="/faq" className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-900 underline decoration-1 underline-offset-4 hover:decoration-2">
                See all 30+ questions →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          § 08 — Newsletter capture (Web3Forms)
          ────────────────────────────────────────────────────────── */}
      <section className="section">
        <NewsletterForm
          accessKey={process.env.NEXT_PUBLIC_NEWSLETTER_KEY}
          source="home-bottom"
          heading="Get the Money Briefs in your inbox."
          description="Every Tuesday and Friday we send the week's biggest Australian financial news, explained in plain English. Free, twice a week, unsubscribe with one click."
        />
      </section>
    </>
  );
}
