import Link from 'next/link';
import { brand } from '@/lib/brand';
import { PayCalculator } from '@/components/PayCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';
import type { Metadata } from 'next';

export interface SalaryAfterTaxData {
  gross: number;
  /** Optional path segment, e.g. '70000' */
  slug: string;
  /** Pre-computed annual take-home values for FY 2026-27 resident, no HECS, no salary sacrifice. */
  tax: number;
  medicare: number;
  lito: number;
  net: number;
  /** Per-period breakdown */
  perWeek: number;
  perFortnight: number;
  perMonth: number;
  /** Optional context blurb that varies by salary. */
  blurb: string;
  /** Common questions for FAQ schema. */
  faqs: { question: string; answer: string }[];
}

/** Reusable page body for "$X after tax" landing pages.
 *  Each page (50k/70k/85k/100k/120k) imports this and passes the pre-computed numbers. */
export function SalaryAfterTaxPage({ data, metadata }: { data: SalaryAfterTaxData; metadata: Metadata }) {
  const effectiveRate = (((data.tax + data.medicare) / data.gross) * 100).toFixed(2);
  const fortnightly = data.perFortnight;

  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          faqSchema(data.faqs),
          articleSchema({
            headline: metadata.title as string,
            description: metadata.description as string,
            url: `${brand.url}/salary-${data.slug}-after-tax`,
          }),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-8">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'After-tax salaries' },
              { name: `$${data.gross.toLocaleString()} after tax` },
            ]}
          />
          <h1 className="h-display mt-6 text-ink-900 dark:text-ink-50">
            ${data.gross.toLocaleString()} after tax{' '}
            Australia
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            On a ${data.gross.toLocaleString()} annual salary in Australia, your take-home pay is
            approximately{' '}
            <strong className="text-success-700 dark:text-success-400">
              ${data.net.toLocaleString()} per year
            </strong>{' '}
            (${fortnightly.toLocaleString()} per fortnight, before super). Here is the
            full breakdown for FY 2026–27, plus the live calculator if you want to
            adjust for HECS, salary sacrifice, or a different period.
          </p>
        </header>

        {/* Result panel — the hero. Calculator-is-the-hero pattern. */}
        <section aria-labelledby="result-heading" className="card not-prose mb-10">
          <h2 id="result-heading" className="sr-only">
            ${data.gross.toLocaleString()} after tax — at a glance
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400">Net take-home (per year)</p>
              <p className="result-figure mt-1">${data.net.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400">Per fortnight</p>
              <p className="font-mono text-3xl font-bold tabular-nums text-ink-900 dark:text-ink-100 mt-1">
                ${data.perFortnight.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400">Effective tax rate</p>
              <p className="font-mono text-3xl font-bold tabular-nums text-ink-900 dark:text-ink-100 mt-1">
                {effectiveRate}%
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-ink-200 pt-4 dark:border-ink-700">
            <p className="text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400 mb-3">Take-home per period</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <PeriodBox label="Annual" value={data.net} />
              <PeriodBox label="Monthly" value={data.perMonth} />
              <PeriodBox label="Fortnightly" value={data.perFortnight} highlight />
              <PeriodBox label="Weekly" value={data.perWeek} />
            </div>
          </div>
        </section>

        {/* Breakdown */}
        <section className="card not-prose mb-10">
          <h2 className="text-xl font-bold text-ink-900 dark:text-ink-50">Where the ${data.gross.toLocaleString()} goes</h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">FY 2026–27 · Australian resident · No HECS · No salary sacrifice</p>

          <ul className="mt-6 space-y-3 text-sm">
            <Row label="Gross salary" value={`$${data.gross.toLocaleString()}.00`} bold />
            <Row label="Income tax" value={`−$${data.tax.toLocaleString()}.00`} negative />
            {data.lito > 0 && (
              <Row label="Less: Low Income Tax Offset (LITO)" value={`−$${data.lito.toLocaleString()}.00`} positive />
            )}
            <Row label="Medicare levy (2%)" value={`−$${data.medicare.toLocaleString()}.00`} negative />
            <Row label="Net take-home" value={`$${data.net.toLocaleString()}.00`} bold total />
            <Row label="Plus: Employer super (12%, on top)" value={`$${Math.round(data.gross * 0.12).toLocaleString()}.00 / yr`} muted />
          </ul>
        </section>

        {/* Live calculator for adjustments */}
        <section className="mt-10">
          <h2 className="h-section mt-4 text-ink-900 dark:text-ink-50">
            Adjust for your situation
          </h2>
          <p className="mt-3 text-base text-ink-600 dark:text-ink-400">
            The numbers above assume an Australian resident with no HECS-HELP debt and no
            salary sacrifice. Use the live calculator below to add HECS, salary sacrifice,
            or change the pay period.
          </p>
          <div className="mt-6">
            <PayCalculator />
          </div>
        </section>

        {/* Long-form content */}
        <section className="prose prose-slate dark:prose-invert mt-14 max-w-3xl">
          <h2>How we calculated ${data.gross.toLocaleString()} after tax</h2>
          <p>{data.blurb}</p>
          <p>
            The actual tax is calculated using the ATO&apos;s progressive bracket system.
            For FY 2026–27, the brackets are:
          </p>
          <ul>
            <li><strong>$0 – $18,200</strong> — 0% (tax-free threshold)</li>
            <li><strong>$18,201 – $45,000</strong> — 15% (down from 16% in FY 2024–25)</li>
            <li><strong>$45,001 – $135,000</strong> — 30%</li>
            <li><strong>$135,001 – $190,000</strong> — 37%</li>
            <li><strong>$190,001+</strong> — 45%</li>
          </ul>
          <p>
            The Medicare levy adds another 2% of taxable income. Together, this gives the
            effective tax rate of <strong>{effectiveRate}%</strong> shown above.
          </p>

          <h2>How this compares to last year</h2>
          <p>
            FY 2026–27 is the second phase of the Stage 3 tax cuts — the 16% bracket
            dropped to 15%. On a ${data.gross.toLocaleString()} salary, the change is worth
            about <strong>${Math.round(data.gross * 0.01).toLocaleString()} in tax savings per year</strong>
            compared to FY 2024–25. The tax-free threshold stayed at $18,200.
          </p>

          <h2>What changes the answer</h2>
          <ul>
            <li><strong>HECS-HELP debt</strong> — adds a marginal repayment once you cross the HECS threshold (around $69,528 for FY 2026–27). Most mid-career professionals have a HELP debt.</li>
            <li><strong>Salary sacrifice into super</strong> — reduces your taxable income, but the sacrificed amount is locked until age 60.</li>
            <li><strong>Private hospital cover</strong> — avoids the Medicare Levy Surcharge (only relevant above ~$93k for singles).</li>
            <li><strong>Sole trader / contractor income</strong> — adds a 5% Medicare levy surcharge and removes the PAYG-withheld assumption (you pay quarterly PAYG instalments instead).</li>
            <li><strong>Working holiday maker (subclass 417/462)</strong> — flat 15% on the first $45,000, then resident rates. Different brackets, different answer.</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-50">Common questions about ${data.gross.toLocaleString()} after tax</h2>
          <div className="mt-5 space-y-3">
            {data.faqs.map((q) => (
              <details key={q.question} className="card group">
                <summary className="cursor-pointer list-none text-base font-semibold text-ink-900 dark:text-ink-50">
                  <span aria-hidden="true" className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition dark:text-brand-300">›</span>
                  {q.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{q.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related links */}
        <section className="prose prose-slate dark:prose-invert mt-12 max-w-3xl">
          <h2>Related calculators</h2>
          <ul>
            <li><Link href="/">Pay calculator</Link> — full live calculator with HECS, sacrifice, and all periods.</li>
            <li><Link href="/salary-sacrifice-calculator">Salary sacrifice calculator</Link> — see what you save by sacrificing into super.</li>
            <li><Link href="/hecs-calculator">HECS-HELP calculator</Link> — add the marginal HECS repayment.</li>
            <li><Link href="/methodology">Methodology</Link> — every formula, fully cited.</li>
            <li><Link href="/tax-rates">FY 2026–27 tax rates</Link> — all brackets in one place.</li>
          </ul>
        </section>
      </article>
    </>
  );
}

function PeriodBox({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div
      className={
        highlight
          ? 'rounded-lg border border-brand-500 bg-brand-50 p-3 dark:bg-brand-900/30'
          : 'rounded-lg border border-ink-200 p-3 dark:border-ink-700'
      }
    >
      <p className="text-xs text-ink-500 dark:text-ink-400">{label}</p>
      <p className="mt-1 font-mono text-base font-semibold tabular-nums text-ink-900 dark:text-ink-100">
        ${value.toLocaleString()}
      </p>
    </div>
  );
}

function Row({ label, value, negative = false, positive = false, bold = false, total = false, muted = false }: {
  label: string;
  value: string;
  negative?: boolean;
  positive?: boolean;
  bold?: boolean;
  total?: boolean;
  muted?: boolean;
}) {
  const valueClass = negative
    ? 'result-deduction'
    : positive
    ? 'text-success-600 dark:text-success-400 font-mono text-base font-semibold tabular-nums'
    : muted
    ? 'font-mono text-sm tabular-nums text-ink-500 dark:text-ink-400'
    : 'font-mono text-base font-semibold tabular-nums text-ink-900 dark:text-ink-100';
  return (
    <li className={
      total
        ? 'flex items-baseline justify-between gap-3 border-t-2 border-ink-300 pt-3 dark:border-ink-600'
        : 'flex items-baseline justify-between gap-3'
    }>
      <span className={bold ? 'font-semibold text-ink-900 dark:text-ink-50' : muted ? 'text-xs text-ink-500 dark:text-ink-400' : 'text-ink-700 dark:text-ink-300'}>
        {label}
      </span>
      <span className={valueClass}>{value}</span>
    </li>
  );
}
