import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';

export const metadata: Metadata = {
  title: 'HECS-HELP repayment: a practical guide for graduates',
  description:
    'How the new marginal HECS repayment system works, when indexation hurts, voluntary repayment strategies, and how to project when you\'ll be debt-free.',
  alternates: { canonical: '/guides/hecs-repayment' },
};

export default function HecsGuide() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <p className="not-prose text-sm text-ink-500">Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></p>
      <h1>HECS-HELP repayment: a practical guide for graduates</h1>
      <p className="lead">
        HECS-HELP is Australia's income-contingent student loan scheme. You only repay when you earn above a threshold, repayments are withheld by your employer, and the balance is indexed each year. This guide covers the new marginal repayment system that took effect on 1 July 2025, when indexation hurts the most, and strategies for paying the debt down faster.
      </p>

      <h2>1. What HECS-HELP is</h2>
      <p>
        HECS-HELP is the loan the Australian government provides to cover the cost of Commonwealth-supported university places. Related schemes include VET Student Loans (VSL), Trade Support Loans (TSL), Student Start-up Loans (SSL), and the now-closed Student Financial Supplement Scheme (SFSS). They all use the same repayment machinery through the ATO.
      </p>
      <p>
        You do not make repayments while you are a student. Your loan is repaid through the tax system once your repayment income exceeds the threshold for the financial year.
      </p>

      <h2>2. The new marginal system (from 1 July 2025)</h2>
      <p>
        Before 1 July 2025, HECS repayments used a flat-rate system: once your income crossed a threshold, you paid a flat percentage of your entire repayment income. That created "cliff edges" where a small pay rise could cost you more than it earned.
      </p>
      <p>
        From 1 July 2025 the system is marginal — like income tax, you only pay the higher rate on the income above each threshold, not on your whole income. For FY 2025–26 the schedule was:
      </p>
      <table>
        <thead><tr><th>Repayment income</th><th>Repayment</th></tr></thead>
        <tbody>
          <tr><td>Below $54,435</td><td>Nil</td></tr>
          <tr><td>$54,435 – $125,000</td><td>15c per $1 above $54,435</td></tr>
          <tr><td>$125,001 – $159,664</td><td>$10,585 + 17c per $1 above $125,000</td></tr>
          <tr><td>$159,665 and over</td><td>10% of total repayment income</td></tr>
        </tbody>
      </table>
      <p>
        For FY 2026–27 the thresholds have shifted up — the lower threshold is now around $69,528. The Wagewise <Link href="/">calculator</Link> applies the marginal method automatically.
      </p>

      <h2>3. What "repayment income" actually is</h2>
      <p>
        Repayment income is not the same as your taxable income. It is your taxable income plus:
      </p>
      <ul>
        <li>Reportable fringe benefits</li>
        <li>Total net investment loss (e.g. rental property losses)</li>
        <li>Reportable employer super contributions (including any salary sacrifice)</li>
        <li>Exempt foreign employment income</li>
      </ul>
      <p>
        For most employees on a single salary with no rental losses, repayment income is close to taxable income. For people with negative gearing, large salary sacrifice, or reportable fringe benefits, repayment income can be significantly higher.
      </p>

      <h2>4. Indexation — when it hurts and when it doesn't</h2>
      <p>
        On 1 June each year the ATO increases your HECS balance by the lower of CPI and the Wage Price Index (WPI) for the previous 12 months. The WPI cap was introduced by the Universities Accord Act 2024 after several years of high CPI-only indexation that caused widespread alarm.
      </p>
      <p>
        Recent indexation rates:
      </p>
      <ul>
        <li>June 2023: 7.1%</li>
        <li>June 2024: 4.7%</li>
        <li>June 2025: 3.2%</li>
        <li>June 2026: 2.8%</li>
      </ul>
      <p>
        A $30,000 debt at 7.1% grows by $2,130 in a single year. For people who earn below the repayment threshold, the debt can grow for years before repayments start reducing it.
      </p>

      <h2>5. Should you make voluntary repayments?</h2>
      <p>
        The calculus depends on the indexation rate versus what your money would earn (or cost you) elsewhere. If indexation is running at 4% and you can earn 5% in a high-interest savings account, keeping the cash makes sense. If you have a mortgage at 6% and indexation is 3%, the comparison is closer — and the psychological benefit of clearing the debt matters too.
      </p>
      <p>
        The ATO has an <a href="https://www.ato.gov.au/individuals-and-families/education-and-study/managing-your-study-loan/repaying-your-study-loan/making-voluntary-repayments" target="_blank" rel="noopener noreferrer">official voluntary repayment calculator</a>. Voluntary repayments are made via BPAY to the ATO using the reference on your ATO account (linked to your myGov). There is no minimum, no penalty, and the payment is credited to your HELP balance within a few business days.
      </p>

      <h2>6. Indexation credits and the 20% reduction</h2>
      <p>
        As part of the same 2024 reforms, the government announced a 20% reduction in the outstanding HELP debt for everyone who had a balance on 1 June 2024. The reduction was applied automatically; no action was required from borrowers. It is the largest single change to HELP balances in the scheme's history.
      </p>

      <h2>7. How long until you\'re debt-free?</h2>
      <p>
        For most graduates on a typical career trajectory, the balance is repaid within 8-15 years. The exact timeline depends on your starting balance, your income growth, the future indexation rate, and whether you make voluntary repayments.
      </p>
      <p>
        The Wagewise HECS calculator includes a debt balance and years-to-payoff estimate that accounts for indexation. The default indexation assumption is around 3% per year — adjust if you expect a higher or lower long-term rate.
      </p>

      <h2>8. Common mistakes</h2>
      <ul>
        <li><strong>Not ticking the HECS box on your TFN declaration.</strong> If you do not tick the box, your employer will not withhold any HECS repayment, and the ATO will calculate the full amount at tax time — which can be a nasty surprise.</li>
        <li><strong>Ignoring indexation while earning below the threshold.</strong> If you are earning below the repayment threshold, your debt is still growing each June. Plan for it.</li>
        <li><strong>Not realising salary sacrifice increases repayment income.</strong> Salary sacrifice into super is a reportable employer super contribution, which adds to your repayment income. This is usually a small effect, but worth knowing.</li>
        <li><strong>Forgetting about VSL/TSL/SSL/SFSS.</strong> If you took out any of the related loans, they are all repaid through the same machinery, and they all count toward your repayment income threshold.</li>
      </ul>

      <h2>9. Where the rules come from</h2>
      <p>
        Source: <a href={sources.hecsRepayment.url} target="_blank" rel="noopener noreferrer">{sources.hecsRepayment.label}</a>, plus the Universities Accord Act 2024 (which introduced the WPI indexation cap and the 20% debt reduction).
      </p>
    </article>
  );
}
