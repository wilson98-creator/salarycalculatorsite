import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';

export const metadata: Metadata = {
  title: 'Australian income tax: a complete guide',
  description:
    'How Australian income tax works end-to-end: brackets, offsets, Medicare, residency, and the difference between PAYG withholding and what you actually owe.',
  alternates: { canonical: '/guides/australian-income-tax' },
};

export default function IncomeTaxGuide() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <p className="not-prose text-sm text-ink-500">
        Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time> · {Math.round(2200 / 200)}-minute read
      </p>
      <h1>Australian income tax: a complete guide</h1>
      <p className="lead">
        Australian income tax is progressive — different rates apply to different portions of your income, not a single flat rate on the whole amount. This guide walks through how the system works, who pays what, and the most common ways people end up with the wrong outcome at tax time.
      </p>

      <h2>1. The structure of the system</h2>
      <p>
        The Australian Taxation Office (ATO) administers a self-assessment system. You report your income to the ATO each year (via your tax return), the ATO calculates your tax using the published rates, and you pay any difference. To make sure you do not get a giant bill at the end of the year, your employer withholds tax from each pay under the Pay As You Go (PAYG) system.
      </p>
      <p>
        The two pieces of machinery — what you actually owe and what your employer withholds — use slightly different math. The withholding method (ATO Schedule 1, NAT 1004) uses weekly-equivalent earnings and small rounding coefficients and is designed to get close to but not exactly match the annual tax. The annual tax brackets (the "real" tax) are what the ATO uses at assessment time. The two reconcile when you lodge your return.
      </p>

      <h2>2. The current brackets (FY 2026–27)</h2>
      <p>For Australian residents, the FY 2026–27 brackets are:</p>
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
      <p>
        These rates are exclusive of the 2% Medicare levy, which is calculated on top. Foreign residents for tax purposes are not eligible for the tax-free threshold or the Medicare levy — see the residency section below.
      </p>
      <p>
        Source: <a href={sources.taxRates.url} target="_blank" rel="noopener noreferrer">{sources.taxRates.label}</a>.
      </p>

      <h2>3. How the math actually works</h2>
      <p>Imagine you earn $80,000 in FY 2026–27. The tax is calculated bracket by bracket:</p>
      <ol>
        <li>0% on the first $18,200 = $0</li>
        <li>15% on the next $26,800 ($18,201 to $45,000) = $4,020</li>
        <li>30% on the next $35,000 ($45,001 to $80,000) = $10,500</li>
      </ol>
      <p>Total income tax = $14,520. Then add the Medicare levy of $1,600 (2% of $80,000). Your gross tax on the year is $16,120, leaving net of $63,880 before any HECS-HELP repayment or post-tax deductions.</p>

      <h2>4. The Low Income Tax Offset (LITO)</h2>
      <p>
        LITO is a tax offset of up to $700 for low-to-middle income earners. It phases in fully at $37,500 of taxable income, reduces by 5 cents per dollar between $37,500 and $45,000, and then by 1.5 cents per dollar between $45,000 and $66,667. Above $66,667 the offset is zero. Non-residents are not eligible.
      </p>
      <p>
        For an $80,000 earner, LITO has been fully phased out — the marginal reduction below the phase-out point is larger than the remaining offset. The Wagewise calculator applies LITO automatically.
      </p>

      <h2>5. Medicare levy</h2>
      <p>
        The Medicare levy is a 2% tax on taxable income that funds Australia's public healthcare system. Most Australian residents pay it on top of income tax. There is a low-income threshold below which no levy is payable, and a "shade-in" band where the rate is reduced.
      </p>
      <p>
        The thresholds are indexed each year. For FY 2025–26 they were $28,011 (lower) and $35,013 (upper) for singles. The 2026–27 thresholds are slightly higher. The thresholds for families are higher and increase with dependent children. The calculator uses the current figures automatically.
      </p>

      <h2>6. Medicare Levy Surcharge (MLS)</h2>
      <p>
        The Medicare Levy Surcharge is an extra 1% to 1.5% charged to higher earners who do not hold an appropriate private hospital cover policy. For FY 2026–27 it applies to singles earning above $105,000 and families above $210,000. It is paid at tax time, not through PAYG withholding, so the Wagewise pay calculator does not model it.
      </p>
      <p>
        The MLS is calculated on "MLS income" — taxable income plus reportable fringe benefits, reportable employer super contributions, and net investment losses. Many people do not realise the surcharge applies to the whole of your MLS income, not just the portion above the threshold — so a $200,000 earner pays 1% on the whole $200,000, not just on the $95,000 above $105,000.
      </p>

      <h2>7. HECS-HELP repayments</h2>
      <p>
        If you have a HECS-HELP, VSL, TSL, SSL, or SFSS debt, compulsory repayments kick in once your "repayment income" exceeds the threshold for the financial year. From 1 July 2025 the repayment system is marginal — you only pay the higher rate on income above each threshold, not on your whole income. For FY 2026–27 the threshold is around $69,528.
      </p>
      <p>
        The Wagewise HECS calculator models the marginal method automatically based on the year you select.
      </p>

      <h2>8. Residency for tax purposes</h2>
      <p>
        Whether you are an Australian resident for tax purposes depends on a number of factors including the length and purpose of your stay, your family and asset ties, and your intentions. The ATO has a residency test on its website. As a rule of thumb: Australian and New Zealand citizens are typically residents; people on most temporary visas (including student visas and many skilled visas) are typically residents; people on working holiday visas (417/462) are typically foreign residents and taxed under the working holiday maker schedule.
      </p>
      <p>
        Foreign residents are not eligible for the tax-free threshold, the LITO, or the Medicare levy. Working holiday makers are taxed at 15% on the first $45,000 of taxable income, then at the standard foreign resident rates.
      </p>

      <h2>9. PAYG withholding vs. your actual tax</h2>
      <p>
        Your employer uses the formulas in <a href={sources.paygFormulas.url} target="_blank" rel="noopener noreferrer">ATO Schedule 1 (NAT 1004)</a> to calculate how much to withhold from each pay. The formulas are based on weekly-equivalent earnings and use small rounding coefficients. They are designed to slightly over- or under-collect during the year, with the difference reconciled at tax time.
      </p>
      <p>
        In practice, this means your payslip number for tax can differ by a few dollars from a "what tax do I actually owe" calculation. Neither is wrong — they are different methods. The Wagewise calculator uses the actual tax-bracket method, which is what the ATO uses to assess your final tax position.
      </p>

      <h2>10. What this guide does not cover</h2>
      <p>
        This guide covers the most common situations. The Australian tax system has many moving parts that are out of scope here: capital gains tax, investment income, rental property, foreign income, trust distributions, sole trader and partnership income, Division 293 on super contributions for high earners, child support and garnishee orders, the private health insurance rebate, and many more.
      </p>
      <p>
        For your actual tax position, use a registered tax agent or the ATO's own <a href="https://www.ato.gov.au/calculators-and-tools" target="_blank" rel="noopener noreferrer">calculators and tools</a>.
      </p>

      <h2>11. Try the calculator</h2>
      <p>
        The calculator on the <Link href="/">homepage</Link> applies every rate and threshold described in this guide. Select your pay period, residency, financial year, and any optional adjustments (HECS, salary sacrifice, super rate), and you will see a full breakdown of your take-home pay with each component labelled.
      </p>
    </article>
  );
}
