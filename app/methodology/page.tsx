import type { Metadata } from 'next';
import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';

export const metadata: Metadata = {
  title: 'Methodology — how the pay calculator works',
  description:
    'A line-by-line explanation of how Paywise calculates Australian take-home pay, with source links to the ATO for every rate and threshold.',
  alternates: { canonical: '/methodology' },
};

export default function MethodologyPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <h1>How we calculate your pay</h1>
      <p>
        Every number in our calculator comes from a published Australian Taxation
        Office (ATO) source. This page documents exactly which file each rate came
        from and when we last reviewed the figures. If you spot a discrepancy
        between our output and your payslip, please{' '}
        <a href="/contact" className="text-brand-600">let us know</a>.
      </p>

      <p className="text-sm text-ink-500">
        Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>.
      </p>

      <h2>1. The pipeline</h2>
      <ol>
        <li><strong>Convert to annual.</strong> Hourly, daily, weekly, fortnightly and monthly figures are converted to an annual amount using 38 hours/week and 52 weeks/year by default (you can change this).</li>
        <li><strong>Strip super if "Total Employment Cost".</strong> If your offer includes super in the headline figure, we peel it off the top before taxing.</li>
        <li><strong>Subtract pre-tax salary sacrifice.</strong> Anything you salary sacrifice (super, novated lease) reduces your taxable income.</li>
        <li><strong>Apply income tax brackets.</strong> The progressive ATO brackets for the selected financial year are applied to your taxable income.</li>
        <li><strong>Subtract the Low Income Tax Offset (LITO)</strong> if you are an Australian resident for tax purposes.</li>
        <li><strong>Add the Medicare levy</strong> at 2% (with the low-income shade-in if applicable). Non-residents and working holiday makers are not liable.</li>
        <li><strong>Add the HECS-HELP repayment</strong> if you have a study debt and your repayment income exceeds the threshold.</li>
        <li><strong>Subtract post-tax deductions</strong> (union fees, salary-packaged benefits) and divide the result back to the requested pay period.</li>
        <li><strong>Show superannuation</strong> as a separate line — it is paid on top of salary, not deducted from take-home pay.</li>
      </ol>

      <h2>2. Income tax brackets (Australian residents)</h2>
      <p>Source: <a href={sources.taxRates.url} target="_blank" rel="noopener noreferrer">{sources.taxRates.label}</a>.</p>

      <h3>FY 2026–27 (current)</h3>
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
        The 15% second-bracket rate took effect on 1 July 2026 under the Treasury
        Laws Amendment (More Cost of Living Relief) Act 2025. A further reduction
        to 14% is scheduled for 1 July 2027.
      </p>

      <h2>3. Medicare levy</h2>
      <p>Source: <a href={sources.medicareLevy.url} target="_blank" rel="noopener noreferrer">{sources.medicareLevy.label}</a>.</p>
      <p>
        The Medicare levy is 2% of taxable income for Australian residents with no
        exemption. A low-income threshold means no levy is payable below that
        income (around $28,011 for singles in FY 2025–26), and a "shade-in" band
        between the lower and upper thresholds applies a 10% rate to the excess
        over the lower threshold. Foreign residents are not liable.
      </p>

      <h2>4. LITO</h2>
      <p>Source: <a href={sources.lito.url} target="_blank" rel="noopener noreferrer">{sources.lito.label}</a>.</p>
      <p>
        The Low Income Tax Offset provides up to $700 of offset. It phases in fully
        up to a taxable income of $37,500, reduces by 5c per dollar between
        $37,500 and $45,000, and by 1.5c per dollar between $45,000 and $66,667.
        Non-residents are not eligible.
      </p>

      <h2>5. HECS-HELP / VSL / TSL / SSL / SFSS</h2>
      <p>Source: <a href={sources.hecsRepayment.url} target="_blank" rel="noopener noreferrer">{sources.hecsRepayment.label}</a>.</p>
      <p>
        Compulsory repayments are calculated on "repayment income" (taxable
        income plus reportable fringe benefits plus reportable employer super
        contributions). The current marginal schedule ranges from 1% at the lower
        threshold up to 10% above $200,000. Salaried employees with HECS debt
        have the repayment withheld by their employer. The MVP treats repayment
        income as taxable income for simplicity; turn on the salary-sacrifice
        toggle if you make pre-tax super contributions (which reduce your
        repayment income).
      </p>

      <h2>6. Superannuation</h2>
      <p>Source: <a href={sources.superGuarantee.url} target="_blank" rel="noopener noreferrer">{sources.superGuarantee.label}</a>.</p>
      <p>
        The Superannuation Guarantee is the minimum amount your employer must
        contribute on top of your salary. It is 12% of ordinary time earnings
        from 1 July 2025 onwards. It is not deducted from your take-home pay.
      </p>

      <h2>7. Why this differs from PAYG withholding</h2>
      <p>Source: <a href={sources.paygFormulas.url} target="_blank" rel="noopener noreferrer">{sources.paygFormulas.label}</a>.</p>
      <p>
        Employers use the formulas in ATO Schedule 1 (NAT 1004) to work out how
        much to withhold from each pay. These formulas use weekly-equivalent
        earnings and small rounding coefficients and may differ from the actual
        tax by a few dollars per pay. The difference is reconciled at tax time.
        The calculator on {brand.name} uses the actual tax-bracket method,
        which represents what you will owe on the year.
      </p>

      <h2>8. What we don't model</h2>
      <ul>
        <li>Medicare Levy Surcharge (1%–1.5% on top of the levy for high-income earners without private hospital cover).</li>
        <li>Private health insurance rebate.</li>
        <li>Reportable fringe benefits, reportable employer super contributions, net investment losses (which can shift your HELP repayment income and your MLS income).</li>
        <li>State payroll tax (an employer cost, not a deduction from your pay).</li>
        <li>The new $1,000 standard work-related deduction (a tax-time benefit, not a per-pay withholding).</li>
        <li>Child support, garnishee orders, and other court-ordered deductions.</li>
      </ul>
      <p>
        For any of the above, talk to a registered tax agent or use the{' '}
        <a href="https://www.ato.gov.au/calculators-and-tools" target="_blank" rel="noopener noreferrer">ATO's own calculators</a>.
      </p>
    </article>
  );
}
