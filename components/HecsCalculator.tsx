'use client';

import { useMemo, useState } from 'react';
import { hecsRepayment, projectPayoff } from '@/lib/tax/hecs';
import type { FinancialYear } from '@/lib/tax/brackets';
import { formatAUD } from '@/lib/tax/calculate';

const fyOptions: { value: FinancialYear; label: string }[] = [
  { value: '2024-25', label: 'FY 2024–25' },
  { value: '2025-26', label: 'FY 2025–26 (new marginal system)' },
  { value: '2026-27', label: 'FY 2026–27' },
  { value: '2027-28', label: 'FY 2027–28 (projected)' },
];

export function HecsCalculator() {
  const [income, setIncome] = useState<number>(75000);
  const [fy, setFy] = useState<FinancialYear>('2026-27');
  const [debtBalance, setDebtBalance] = useState<number>(30000);
  const [indexation, setIndexation] = useState<number>(3.0);

  const repayment = useMemo(() => hecsRepayment(income, fy), [income, fy]);
  const projection = useMemo(
    () => projectPayoff(debtBalance, income, fy, indexation / 100),
    [debtBalance, income, fy, indexation],
  );
  const belowThreshold = income <= 54000; // rough; actual threshold depends on FY

  return (
    <section aria-labelledby="hecs-calc-heading" className="card not-prose">
      <h2 id="hecs-calc-heading" className="sr-only">HECS-HELP repayment calculator</h2>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="hecs-income" className="label">Repayment income (annual)</label>
            <div className="flex items-stretch gap-2">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-ink-50 px-3 text-ink-600">$</span>
              <input
                id="hecs-income"
                type="number"
                inputMode="decimal"
                min={0}
                step="1000"
                className="input rounded-l-none"
                value={Number.isFinite(income) ? income : ''}
                onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
              />
            </div>
            <p className="help">Taxable income + reportable fringe benefits + reportable super + net investment losses.</p>
          </div>
          <div>
            <label htmlFor="hecs-fy" className="label">Financial year</label>
            <select
              id="hecs-fy"
              className="input"
              value={fy}
              onChange={(e) => setFy(e.target.value as FinancialYear)}
            >
              {fyOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <p className="help">From FY 2025–26 the system is marginal (similar to income tax).</p>
          </div>
        </div>

        <details className="rounded-xl border border-ink-200 bg-ink-50/40/40">
          <summary className="cursor-pointer list-none p-4 text-sm font-semibold text-ink-900">
            Project years to pay off (optional)
          </summary>
          <div className="grid gap-4 p-4 pt-0 sm:grid-cols-2">
            <div>
              <label htmlFor="hecs-debt" className="label">Current HELP balance</label>
              <div className="flex items-stretch gap-2">
                <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-white px-3 text-ink-600">$</span>
                <input
                  id="hecs-debt"
                  type="number"
                  min={0}
                  step="1000"
                  className="input rounded-l-none"
                  value={Number.isFinite(debtBalance) ? debtBalance : ''}
                  onChange={(e) => setDebtBalance(parseFloat(e.target.value) || 0)}
                />
              </div>
              <p className="help">Find it on your ATO account via myGov.</p>
            </div>
            <div>
              <label htmlFor="hecs-index" className="label">Assumed indexation (% p.a.)</label>
              <div className="flex items-stretch gap-2">
                <input
                  id="hecs-index"
                  type="number"
                  min={0}
                  max={20}
                  step="0.1"
                  className="input rounded-r-none"
                  value={Number.isFinite(indexation) ? indexation : ''}
                  onChange={(e) => setIndexation(parseFloat(e.target.value) || 0)}
                />
                <span className="inline-flex items-center rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-3 text-ink-600">%</span>
              </div>
              <p className="help">WPI-capped since 2024. Recent average ~3–4%.</p>
            </div>
          </div>
        </details>
      </div>

      <div className="mt-12">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-ink-900">Annual HECS-HELP repayment</h3>
          <span className="chip">FY {fy}</span>
        </div>
        <div className="result-row">
          <span className="result-label">Compulsory repayment</span>
          <span className="result-value text-2xl text-brand-700">{formatAUD(repayment)}</span>
        </div>
        <div className="my-2 h-px bg-ink-200" />
        <div className="result-row">
          <span className="result-label">Effective rate (vs repayment income)</span>
          <span className="result-value">{income > 0 ? ((repayment / income) * 100).toFixed(2) : '0.00'}%</span>
        </div>
        <div className="result-row">
          <span className="result-label">Per fortnight (estimate)</span>
          <span className="result-value">{formatAUD(repayment / 26)}</span>
        </div>
        <div className="result-row">
          <span className="result-label">Per month (estimate)</span>
          <span className="result-value">{formatAUD(repayment / 12)}</span>
        </div>

        {belowThreshold && (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
            Your income is below the repayment threshold — no compulsory repayment this year, but your balance will still be indexed on 1 June.
          </p>
        )}

        {projection && debtBalance > 0 && (
          <>
            <div className="my-3 h-px bg-ink-200" />
            <h4 className="text-sm font-semibold text-ink-900">Projection (flat income, {indexation}% indexation)</h4>
            <div className="result-row">
              <span className="result-label">Years to pay off</span>
              <span className="result-value">{projection.yearsToPayoff || '—'}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Total repaid</span>
              <span className="result-value">{formatAUD(projection.totalRepaid)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Total interest added</span>
              <span className="result-value text-rose-700 dark:text-rose-400">{formatAUD(projection.totalInterest)}</span>
            </div>
            {projection.yearsToPayoff >= 50 && (
              <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
                Your repayment doesn&apos;t cover the annual indexation — your debt is projected to grow for 50+ years. Consider voluntary repayments, salary sacrifice into super (which lowers your repayment income), or talking to a financial counsellor.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
