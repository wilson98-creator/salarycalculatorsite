import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Stage 3 tax cuts and what is coming next (FY 2026-27)',
  description:
    'The Stage 3 cuts that took effect on 1 July 2024, the further 16% → 15% reduction on 1 July 2026, and the legislated 14% cut on 1 July 2027. ATO-sourced.',
  alternates: { canonical: '/guides/stage-3-tax-cuts' },
  keywords: [
    'stage 3 tax cuts',
    'cost of living tax cuts',
    'australian tax brackets',
    '15 percent bracket',
    '14 percent bracket',
  ],
  openGraph: {
    title: 'Stage 3 tax cuts and what is coming next',
    description: 'What changed on 1 July 2024, 1 July 2026, and the legislated 14% cut on 1 July 2027.',
    url: `${brand.url}/guides/stage-3-tax-cuts`,
    type: 'article',
  },
};

const faqs = [
  {
    question: 'When did the Stage 3 tax cuts start?',
    answer:
      'The rewritten Stage 3 tax cuts took effect on 1 July 2024 (Treasury Laws Amendment (Cost of Living Tax Cuts) Act 2024). They were the most significant personal income tax change in Australia in 20 years, with an estimated cost of around $20 billion per year once fully implemented.',
  },
  {
    question: 'What changed on 1 July 2024?',
    answer:
      'The 19% bracket became 16% (income $18,201 to $45,000), the 32.5% bracket became 30% (income $45,001 to $135,000, extended up from $120,000), the 37% bracket threshold rose from $120,000 to $135,000, and the 45% bracket threshold rose from $180,000 to $190,000. The top 45% rate was unchanged.',
  },
  {
    question: 'What changed on 1 July 2026?',
    answer:
      'The second bracket dropped from 16% to 15% (income $18,201 to $45,000). The thresholds are unchanged. Maximum saving: $268 per year for a taxpayer earning $45,000 or more, scaling linearly from $0 at $18,200 to $268 at $45,000. This was legislated in the Treasury Laws Amendment (More Cost of Living Relief) Act 2025.',
  },
  {
    question: 'What is coming on 1 July 2027?',
    answer:
      'A further reduction from 15% to 14% on the second bracket is already legislated. Maximum saving at the new rate: $536 per year for a taxpayer earning $45,000 or more (combined with the 2026-27 cut). For FY 2027-28 the second-bracket rate will be 14%.',
  },
  {
    question: 'How much will I save from the combined cuts?',
    answer:
      'For someone earning $80,000, the three cuts combined (2024, 2026, 2027) deliver a tax saving of about $3,070 per year relative to the pre-2024 rates. For a $50,000 earner, the saving is about $1,070. For a $150,000 earner, the saving is about $5,070. The cuts are progressive in their distribution.',
  },
  {
    question: 'Do the cuts change the Medicare levy?',
    answer:
      'No. The Medicare levy (2% of taxable income), the Medicare Levy Surcharge, the Low Income Tax Offset (LITO), the HECS-HELP thresholds, and the Superannuation Guarantee rate are all unchanged by the Stage 3 cuts. They are separate line items in the tax system.',
  },
  {
    question: 'When will I see the new withholding in my pay?',
    answer:
      'The ATO updates its PAYG withholding schedules, employers update their payroll systems, and the new withholding starts from the first pay period beginning on or after the new rates take effect. Most employees see the change in their first pay in July. The change does not flow through automatically to your payslip in the same week the new rates start — payroll software takes a few days to roll out.',
  },
  {
    question: 'Do the cuts affect foreign residents?',
    answer:
      'No. Foreign residents are taxed under a separate schedule (0% threshold, no LITO, no Medicare levy) and the Stage 3 cuts do not apply. Working holiday makers are taxed under their own schedule and are also unaffected by these cuts.',
  },
];

export default function Stage3Guide() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'Stage 3 tax cuts and what is coming next (FY 2026-27)',
            description: metadata.description as string,
            url: `${brand.url}/guides/stage-3-tax-cuts`,
            datePublished: '2026-01-15',
            dateModified: brand.lastReviewed,
          }),
          faqSchema(faqs),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-10">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Guides', href: '/guides' },
            { name: 'Stage 3 tax cuts' },
          ]} />
          <h1 className="h-display mt-6 text-ink-900">
            Stage 3 tax cuts and what is coming next
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 sm:text-lg">
            The &quot;Stage 3&quot; tax cuts were originally legislated in
            2019 as the third tranche of a 10-year plan to flatten the
            Australian tax system. The legislation was substantially rewritten
            in early 2024 and took effect on 1 July 2024. A further
            cost-of-living cut took effect on 1 July 2026, and another is
            scheduled for 1 July 2027. This guide walks through the history,
            what actually changed, and what is still to come.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">
              Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
            </span>
            <span className="kicker">6 min read</span>
            <span className="kicker">FY 2026-27</span>
            <span className="kicker">3 cuts to date</span>
          </div>
        </header>

        {/* TL;DR timeline */}
        <section aria-labelledby="stage3-tldr" className="card not-prose mb-10">
          <h2 id="stage3-tldr" className="text-base font-semibold text-ink-900">
            The 60-second version — the three cuts
          </h2>
          <ol className="mt-5 space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="font-mono font-semibold text-brand-600">1.</span>
              <div>
                <p className="font-semibold text-ink-900">1 July 2024 — Stage 3 rewrite</p>
                <p className="text-ink-700">
                  19% became 16% ($18,201-$45,000). 32.5% became 30% ($45,001-$135,000). 37% threshold rose to $135,000. 45% threshold rose to $190,000. Top rate unchanged.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-mono font-semibold text-brand-600">2.</span>
              <div>
                <p className="font-semibold text-ink-900">1 July 2026 — Cost of living cut</p>
                <p className="text-ink-700">
                  Second bracket dropped from 16% to 15%. Maximum saving: $268/year for income $45,000+. Already legislated.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-mono font-semibold text-brand-600">3.</span>
              <div>
                <p className="font-semibold text-ink-900">1 July 2027 — Next cut (already legislated)</p>
                <p className="text-ink-700">
                  Second bracket will drop from 15% to 14%. Maximum saving at the new rate: $536/year for income $45,000+ (combined with the 2026-27 cut).
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="prose prose-slate prose-invert max-w-3xl">
          <h2>1. The original plan (2019)</h2>
          <p>
            In 2019 the then-government legislated the original Stage 3 plan:
            flatten the 32.5% bracket to 30%, raise the top threshold from
            $180,000 to $200,000, and remove the 37% bracket entirely. The
            change was meant to start on 1 July 2024 and primarily benefited
            higher-income earners.
          </p>

          <h2>2. The 2024 rewrite</h2>
          <p>
            The original plan was politically contentious. The government
            that came to power in 2022 negotiated a different version, which
            passed Parliament in early 2024 (Treasury Laws Amendment (Cost
            of Living Tax Cuts) Act 2024) and took effect on 1 July 2024.
            The new version kept the top 45% rate but redistributed the
            benefits to lower and middle incomes:
          </p>
          <ul>
            <li>The 19% bracket became 16% (income $18,201 – $45,000)</li>
            <li>The 32.5% bracket became 30% (income $45,001 – $135,000), extended up from $120,000</li>
            <li>The 37% bracket threshold rose from $120,000 to $135,000</li>
            <li>The 45% bracket threshold rose from $180,000 to $190,000</li>
          </ul>
          <p>
            The 2024 cuts were retrospectively described as
            &quot;Stage 3&quot; cuts. They were estimated to cost around
            $20 billion per year once fully implemented, with the largest
            dollar benefits flowing to earners in the $50,000-$130,000
            range.
          </p>

          <h2>3. The FY 2025-26 brackets (1 July 2024 onwards)</h2>
          <table>
            <thead>
              <tr>
                <th>Taxable income</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$0 – $18,200</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>$18,201 – $45,000</td>
                <td>16%</td>
              </tr>
              <tr>
                <td>$45,001 – $135,000</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>$135,001 – $190,000</td>
                <td>37%</td>
              </tr>
              <tr>
                <td>$190,001+</td>
                <td>45%</td>
              </tr>
            </tbody>
          </table>

          <h2>4. The 2026-27 cut: 16% → 15%</h2>
          <p>
            A further cut was legislated in the Treasury Laws Amendment (More
            Cost of Living Relief) Act 2025. From 1 July 2026, the second
            bracket drops from 16% to 15%. The thresholds are unchanged.
            Maximum saving: $268 per year for a taxpayer earning $45,000
            or more. The saving scales linearly from $0 at $18,200 to $268
            at $45,000.
          </p>
          <p>For FY 2026-27, the resident brackets are:</p>
          <table>
            <thead>
              <tr>
                <th>Taxable income</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$0 – $18,200</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>$18,201 – $45,000</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>$45,001 – $135,000</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>$135,001 – $190,000</td>
                <td>37%</td>
              </tr>
              <tr>
                <td>$190,001+</td>
                <td>45%</td>
              </tr>
            </tbody>
          </table>

          <h2>5. The 2027-28 cut: 15% → 14% (already legislated)</h2>
          <p>
            A further reduction from 15% to 14% on the second bracket is
            already legislated for 1 July 2027. Maximum saving at the new
            rate: $536 per year for a taxpayer earning $45,000 or more
            (combined with the 2026-27 cut). The combined benefit of the
            two cost-of-living cuts, relative to the 2025-26 rates, is $268
            in 2026-27 and $536 in 2027-28.
          </p>
          <p>For FY 2027-28, the resident brackets will be:</p>
          <table>
            <thead>
              <tr>
                <th>Taxable income</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$0 – $18,200</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>$18,201 – $45,000</td>
                <td>14%</td>
              </tr>
              <tr>
                <td>$45,001 – $135,000</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>$135,001 – $190,000</td>
                <td>37%</td>
              </tr>
              <tr>
                <td>$190,001+</td>
                <td>45%</td>
              </tr>
            </tbody>
          </table>
          <p>
            For someone earning $80,000, the three cuts combined deliver a
            tax saving of about $3,070 per year relative to the pre-2024
            rates.
          </p>

          <h2>6. Practical effect on your pay</h2>
          <p>
            The annual savings are real but modest in weekly terms — around
            $5-$10 per week for most middle-income earners. The big pay
            change from 1 July 2024 was the shift in the second bracket, not
            the new cut. The 2026 and 2027 cuts are smaller and more
            targeted.
          </p>
          <p>
            The Stage 3 cuts do not flow through to your payslip
            automatically in the same week the new rates take effect. The
            ATO updates its PAYG withholding schedules, employers update
            their payroll systems, and the new withholding starts from the
            first pay period beginning on or after 1 July. Most employees
            see the change in their first pay in July.
          </p>

          <h2>7. What the cuts do not do</h2>
          <ul>
            <li>
              They do not change the Medicare levy, the Medicare Levy
              Surcharge, the Low Income Tax Offset, the HECS-HELP
              thresholds, or the Superannuation Guarantee.
            </li>
            <li>
              They do not affect foreign residents or working holiday makers
              — those schedules are unchanged.
            </li>
            <li>
              They do not retroactively refund money already paid under the
              old rates. The new rates apply from 1 July of each year; the
              previous year&apos;s tax is final.
            </li>
            <li>
              They do not affect the gross amount of tax on income above
              $190,000. The 45% top rate has not changed.
            </li>
          </ul>

          <h2>8. Where the rules come from</h2>
          <p>
            The Stage 3 cuts are in the Treasury Laws Amendment (Cost of
            Living Tax Cuts) Act 2024 and the Treasury Laws Amendment (More
            Cost of Living Relief) Act 2025. Source:{' '}
            <a href={sources.taxRates.url} target="_blank" rel="noopener noreferrer">
              {sources.taxRates.label}
            </a>
            .
          </p>

          <h2>9. Try the calculator</h2>
          <p>
            The <Link href="/">calculator on the homepage</Link> lets you
            switch between FY 2024-25, FY 2025-26, FY 2026-27, and the
            projected FY 2027-28 brackets. The effective rate, marginal
            rate, and per-period take-home pay update automatically.
          </p>
        </section>

        <section aria-labelledby="stage3-faq" className="mt-16 max-w-3xl">
          <h2 id="stage3-faq" className="text-2xl font-bold text-ink-900">
            Common questions about the Stage 3 tax cuts
          </h2>
          <div className="mt-5 space-y-3">
            {faqs.map((q) => (
              <details key={q.question} className="card group">
                <summary className="cursor-pointer list-none text-base font-semibold text-ink-900">
                  <span
                    aria-hidden="true"
                    className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition"
                  >
                    ›
                  </span>
                  {q.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink-900">Related guides and tools</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrustLink href="/" title="Pay calculator" detail="Switch between FY 2024-25, 2025-26, 2026-27, and 2027-28 brackets." />
            <TrustLink href="/tax-rates" title="FY 2026-27 tax rates" detail="All ATO brackets in one place." />
            <TrustLink href="/guides/australian-income-tax" title="Australian income tax guide" detail="How the tax system works end-to-end." />
            <TrustLink href="/guides/hecs-repayment" title="HECS-HELP guide" detail="The marginal HECS system, indexation, and voluntary repayment." />
            <TrustLink href="/methodology" title="Methodology" detail="How every number is calculated, with citations." />
            <TrustLink href="/about" title="About SalaryCalc" detail="Story, editorial standards, corrections policy." />
          </ul>
        </section>
      </article>
    </>
  );
}

function TrustLink({ href, title, detail }: { href: string; title: string; detail: string }) {
  return (
    <li>
      <Link
        href={href}
        className="block transition hover:border-brand-300"
      >
        <p className="text-sm font-semibold text-ink-900 hover:text-brand-700">
          {title} →
        </p>
        <p className="mt-1 text-xs text-ink-600">{detail}</p>
      </Link>
    </li>
  );
}
