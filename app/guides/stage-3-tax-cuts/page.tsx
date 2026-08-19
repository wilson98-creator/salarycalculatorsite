import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';

export const metadata: Metadata = {
  title: 'Stage 3 tax cuts and what\'s coming next',
  description:
    'The Stage 3 cuts that took effect on 1 July 2024, the further 16% → 15% reduction on 1 July 2026, and the legislated 14% cut on 1 July 2027.',
  alternates: { canonical: '/guides/stage-3-tax-cuts' },
};

export default function Stage3Guide() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <p className="not-prose text-sm text-ink-500">Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></p>
      <h1>Stage 3 tax cuts and what\'s coming next</h1>
      <p className="lead">
        The "Stage 3" tax cuts were originally legislated in 2019 as the third tranche of a 10-year plan to flatten the Australian tax system. The legislation was substantially rewritten in early 2024 and took effect on 1 July 2024. A further cost-of-living cut took effect on 1 July 2026, and another is scheduled for 1 July 2027. This guide walks through the history, what actually changed, and what is still to come.
      </p>

      <h2>1. The original plan (2019)</h2>
      <p>
        In 2019 the then-government legislated the original Stage 3 plan: flatten the 32.5% bracket to 30%, raise the top threshold from $180,000 to $200,000, and remove the 37% bracket entirely. The change was meant to start on 1 July 2024 and primarily benefited higher-income earners.
      </p>

      <h2>2. The 2024 rewrite</h2>
      <p>
        The original plan was politically contentious. The government that came to power in 2022 negotiated a different version, which passed Parliament in early 2024 (Treasury Laws Amendment (Cost of Living Tax Cuts) Act 2024) and took effect on 1 July 2024. The new version kept the top 45% rate but redistributed the benefits to lower and middle incomes:
      </p>
      <ul>
        <li>The 19% bracket became 16% (income $18,201 – $45,000)</li>
        <li>The 32.5% bracket became 30% (income $45,001 – $135,000), extended up from $120,000</li>
        <li>The 37% bracket threshold rose from $120,000 to $135,000</li>
        <li>The 45% bracket threshold rose from $180,000 to $190,000</li>
      </ul>
      <p>
        The 2024 cuts were retrospectively described as "Stage 3" cuts. They were estimated to cost around $20 billion per year once fully implemented, with the largest dollar benefits flowing to earners in the $50,000–$130,000 range.
      </p>

      <h2>3. The FY 2025-26 brackets (1 July 2024 onwards)</h2>
      <table>
        <thead><tr><th>Taxable income</th><th>Rate</th></tr></thead>
        <tbody>
          <tr><td>$0 – $18,200</td><td>0%</td></tr>
          <tr><td>$18,201 – $45,000</td><td>16%</td></tr>
          <tr><td>$45,001 – $135,000</td><td>30%</td></tr>
          <tr><td>$135,001 – $190,000</td><td>37%</td></tr>
          <tr><td>$190,001+</td><td>45%</td></tr>
        </tbody>
      </table>

      <h2>4. The 2026-27 cut: 16% → 15%</h2>
      <p>
        A further cut was legislated in the Treasury Laws Amendment (More Cost of Living Relief) Act 2025. From 1 July 2026, the second bracket drops from 16% to 15%. The thresholds are unchanged. Maximum saving: $268 per year for a taxpayer earning $45,000 or more. The saving scales linearly from $0 at $18,200 to $268 at $45,000.
      </p>
      <p>
        For FY 2026-27, the resident brackets are:
      </p>
      <table>
        <thead><tr><th>Taxable income</th><th>Rate</th></tr></thead>
        <tbody>
          <tr><td>$0 – $18,200</td><td>0%</td></tr>
          <tr><td>$18,201 – $45,000</td><td>15%</td></tr>
          <tr><td>$45,001 – $135,000</td><td>30%</td></tr>
          <tr><td>$135,001 – $190,000</td><td>37%</td></tr>
          <tr><td>$190,001+</td><td>45%</td></tr>
        </tbody>
      </table>

      <h2>5. The 2027-28 cut: 15% → 14% (already legislated)</h2>
      <p>
        A further reduction from 15% to 14% on the second bracket is already legislated for 1 July 2027. Maximum saving at the new rate: $536 per year for a taxpayer earning $45,000 or more (combined with the 2026-27 cut). The combined benefit of the two cost-of-living cuts, relative to the 2025-26 rates, is $268 in 2026-27 and $536 in 2027-28.
      </p>
      <p>
        For FY 2027-28, the resident brackets will be:
      </p>
      <table>
        <thead><tr><th>Taxable income</th><th>Rate</th></tr></thead>
        <tbody>
          <tr><td>$0 – $18,200</td><td>0%</td></tr>
          <tr><td>$18,201 – $45,000</td><td>14%</td></tr>
          <tr><td>$45,001 – $135,000</td><td>30%</td></tr>
          <tr><td>$135,001 – $190,000</td><td>37%</td></tr>
          <tr><td>$190,001+</td><td>45%</td></tr>
        </tbody>
      </table>
      <p>
        For someone earning $80,000, the three cuts combined deliver a tax saving of about $3,070 per year relative to the pre-2024 rates.
      </p>

      <h2>6. Practical effect on your pay</h2>
      <p>
        The annual savings are real but modest in weekly terms — around $5–$10 per week for most middle-income earners. The big pay change from 1 July 2024 was the shift in the second bracket, not the new cut. The 2026 and 2027 cuts are smaller and more targeted.
      </p>
      <p>
        The Stage 3 cuts do not flow through to your payslip automatically in the same week the new rates take effect. The ATO updates its PAYG withholding schedules, employers update their payroll systems, and the new withholding starts from the first pay period beginning on or after 1 July. Most employees see the change in their first pay in July.
      </p>

      <h2>7. What the cuts do not do</h2>
      <ul>
        <li>They do not change the Medicare levy, the Medicare Levy Surcharge, the Low Income Tax Offset, the HECS-HELP thresholds, or the Superannuation Guarantee.</li>
        <li>They do not affect foreign residents or working holiday makers — those schedules are unchanged.</li>
        <li>They do not retroactively refund money already paid under the old rates. The new rates apply from 1 July of each year; the previous year\'s tax is final.</li>
        <li>They do not affect the gross amount of tax on income above $190,000. The 45% top rate has not changed.</li>
      </ul>

      <h2>8. Where the rules come from</h2>
      <p>
        The Stage 3 cuts are in the Treasury Laws Amendment (Cost of Living Tax Cuts) Act 2024 and the Treasury Laws Amendment (More Cost of Living Relief) Act 2025. Source: <a href={sources.taxRates.url} target="_blank" rel="noopener noreferrer">{sources.taxRates.label}</a>.
      </p>

      <h2>9. Try the calculator</h2>
      <p>
        The <Link href="/">calculator on the homepage</Link> lets you switch between FY 2024-25, FY 2025-26, FY 2026-27, and the projected FY 2027-28 brackets. The effective rate, marginal rate, and per-period take-home pay update automatically.
      </p>
    </article>
  );
}
