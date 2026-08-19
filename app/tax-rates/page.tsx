import type { Metadata } from 'next';
import { residentBrackets } from '@/lib/tax/brackets';
import { medicareParams } from '@/lib/tax/medicare';
import { sources } from '@/lib/tax/sources';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Australian tax rates — current and historical',
  description: 'Australian resident and non-resident income tax brackets, Medicare levy thresholds, and HECS-HELP repayment schedules for the current and previous financial years.',
  alternates: { canonical: '/tax-rates' },
};

const fys: ('2024-25' | '2025-26' | '2026-27')[] = ['2024-25', '2025-26', '2026-27'];

export default function TaxRatesPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <h1>Australian tax rates</h1>
      <p>
        Current and historical tax brackets, Medicare levy thresholds, and
        HECS-HELP repayment rates. All figures sourced from the{' '}
        <a href={sources.atoHomepage} target="_blank" rel="noopener noreferrer">Australian Taxation Office</a>.
      </p>
      <p className="text-sm text-ink-500">Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>.</p>

      <h2>Resident income tax brackets</h2>
      {fys.map((fy) => (
        <div key={fy}>
          <h3>FY {fy}</h3>
          <table>
            <thead>
              <tr><th>Taxable income</th><th>Rate</th><th>Tax on the bottom of the bracket</th></tr>
            </thead>
            <tbody>
              {residentBrackets[fy].map((b) => (
                <tr key={b.label}>
                  <td>{b.label.split(' (')[0]}</td>
                  <td>{(b.rate * 100).toFixed(0)}%</td>
                  <td>{b.base === 0 ? '—' : `$${b.base.toLocaleString('en-AU')}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <h2>Medicare levy thresholds</h2>
      <table>
        <thead>
          <tr><th>Financial year</th><th>Lower threshold (no levy)</th><th>Upper threshold (full 2%)</th><th>Shade-in rate</th></tr>
        </thead>
        <tbody>
          {fys.map((fy) => {
            const p = medicareParams[fy];
            if (!p) return null;
            return (
              <tr key={fy}>
                <td>{fy}</td>
                <td>${p.lowerThreshold.toLocaleString('en-AU')}</td>
                <td>${p.upperThreshold.toLocaleString('en-AU')}</td>
                <td>{(p.shadeInRate * 100).toFixed(0)}% of excess</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Where these numbers come from</h2>
      <ul>
        <li><a href={sources.taxRates.url} target="_blank" rel="noopener noreferrer">{sources.taxRates.label}</a></li>
        <li><a href={sources.medicareLevy.url} target="_blank" rel="noopener noreferrer">{sources.medicareLevy.label}</a></li>
        <li><a href={sources.hecsRepayment.url} target="_blank" rel="noopener noreferrer">{sources.hecsRepayment.label}</a></li>
      </ul>
    </article>
  );
}
