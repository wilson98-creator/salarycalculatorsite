import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';

export const metadata: Metadata = {
  title: 'Medicare Levy Surcharge: who pays it and how to avoid it',
  description:
    'The 1%–1.5% Medicare Levy Surcharge for high earners without private hospital cover. Thresholds, exemptions, and what to do at tax time.',
  alternates: { canonical: '/guides/medicare-levy-surcharge' },
};

export default function MlsGuide() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <p className="not-prose text-sm text-ink-500">Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></p>
      <h1>Medicare Levy Surcharge: who pays it and how to avoid it</h1>
      <p className="lead">
        The Medicare Levy Surcharge (MLS) is an additional 1% to 1.5% charged to higher-income earners who do not hold an appropriate level of private hospital cover. It is paid on top of the standard 2% Medicare levy. This guide explains the thresholds, how the surcharge is calculated, and the simplest ways to avoid it.
      </p>

      <h2>1. What the surcharge is for</h2>
      <p>
        The MLS is designed to encourage higher-income earners to take out private hospital cover, easing demand on the public hospital system. The surcharge was introduced in 1997 alongside the original Medicare levy private health insurance incentive.
      </p>

      <h2>2. The thresholds (FY 2026–27)</h2>
      <table>
        <thead><tr><th>Status</th><th>Income threshold</th><th>Surcharge rate</th></tr></thead>
        <tbody>
          <tr><td>Singles, below $105,000</td><td>No surcharge</td><td>0%</td></tr>
          <tr><td>Singles, $105,000 – $141,000</td><td>Tier 1</td><td>1.0%</td></tr>
          <tr><td>Singles, above $141,000</td><td>Tier 2</td><td>1.5%</td></tr>
          <tr><td>Families, below $210,000</td><td>No surcharge</td><td>0%</td></tr>
          <tr><td>Families, $210,000 – $282,000</td><td>Tier 1</td><td>1.0%</td></tr>
          <tr><td>Families, above $282,000</td><td>Tier 2</td><td>1.5%</td></tr>
        </tbody>
      </table>
      <p>
        Family thresholds increase by $1,500 for each dependent child after the first. The income used to determine the tier is your "MLS income" — taxable income plus reportable fringe benefits, reportable employer super contributions, and net investment losses.
      </p>

      <h2>3. How the surcharge is calculated</h2>
      <p>
        Once you cross the threshold, the surcharge rate is applied to the whole of your MLS income, not just the portion above the threshold. A single person earning $150,000 with no private hospital cover pays 1.5% on the whole $150,000 — $2,250 on top of the standard $3,000 Medicare levy. The total Medicare-related cost is $5,250.
      </p>
      <p>
        Compare that to a basic hospital cover policy, which might cost $1,500–$2,500 per year for a single person. For many higher-income earners, taking out even the cheapest compliant hospital cover is significantly cheaper than paying the surcharge.
      </p>

      <h2>4. The "appropriate level" of private cover</h2>
      <p>
        To avoid the surcharge, you need "appropriate private patient hospital cover" — that is, hospital cover that includes all of the clinical categories required by the ATO. It does not need to be the most expensive top-tier policy, and it does not need to include extras (dental, optical, etc.). Many basic hospital policies qualify.
      </p>
      <p>
        Your health insurer can confirm whether your existing policy qualifies. If you take out a qualifying policy partway through the financial year, the surcharge is pro-rated based on the number of days you were covered.
      </p>

      <h2>5. Lifetime Health Cover loading</h2>
      <p>
        If you take out private hospital cover for the first time after the age of 31, you will pay a Lifetime Health Cover (LHC) loading of 2% per year over the age of 30, up to a maximum of 70%. The loading applies for 10 years of continuous cover.
      </p>
      <p>
        LHC loading is a separate consideration to the MLS. It can be a reason to take out cover earlier, even if you do not currently earn above the MLS threshold — you lock in no loading while you are young, and you can always drop the policy later (though you will pay the loading again if you re-take it after a gap).
      </p>

      <h2>6. When the surcharge is paid</h2>
      <p>
        The MLS is calculated and paid at tax time, not through PAYG withholding. Your employer withholds the standard 2% Medicare levy from each pay. The MLS appears on your notice of assessment after you lodge your return, and is added to any tax payable or refunded.
      </p>
      <p>
        If you take out hospital cover partway through the year, you can use the ATO\'s private health insurance rebate and MLS variation tools to estimate the impact on your final tax.
      </p>

      <h2>7. Common mistakes</h2>
      <ul>
        <li><strong>Thinking extras cover counts.</strong> Extras-only policies (dental, optical, physio) do not exempt you from the MLS. You need hospital cover with the ATO-compliant clinical categories.</li>
        <li><strong>Forgetting about MLS income.</strong> The threshold test is on MLS income, not just taxable income. Reportable employer super contributions and reportable fringe benefits can push you over the line even when your salary alone would not.</li>
        <li><strong>Not telling your employer about the variation.</strong> If you take out hospital cover, you can lodge a Medicare levy variation declaration with your employer to stop the standard levy being withheld. You still pay it at tax time based on your actual situation.</li>
        <li><strong>Paying the surcharge when cheap cover would have been cheaper.</strong> Always compare. A $1,200 hospital policy can save $2,000+ in surcharge.</li>
      </ul>

      <h2>8. Where the rules come from</h2>
      <p>
        Source: <a href={sources.medicareLevy.url} target="_blank" rel="noopener noreferrer">{sources.medicareLevy.label}</a> and the ATO\'s "Medicare levy surcharge" page.
      </p>

      <h2>9. Try the calculator</h2>
      <p>
        The main pay calculator on the <Link href="/">homepage</Link> does not include the MLS — it models only what your employer withholds through PAYG. For an MLS-aware estimate, use the ATO\'s <a href="https://www.ato.gov.au/calculators-and-tools/medicare-levy-surcharge-calculator" target="_blank" rel="noopener noreferrer">MLS calculator</a>, or talk to a registered tax agent at tax time.
      </p>
    </article>
  );
}
