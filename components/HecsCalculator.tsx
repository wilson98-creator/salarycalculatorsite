'use client';

import { useMemo, useState } from 'react';
import { hecsBands, hecsRepayment, projectPayoff } from '@/lib/tax/hecs';
import type { FinancialYear } from '@/lib/tax/brackets';
import { formatAUD } from '@/lib/tax/calculate';
import { LineChart } from '@/components/LineChart';

const fyOptions: { value: FinancialYear; label: string }[] = [
  { value: '2024-25', label: 'FY 2024–25' },
  { value: '2025-26', label: 'FY 2025–26 (current marginal system)' },
  { value: '2026-27', label: 'FY 2026–27' },
  { value: '2027-28', label: 'FY 2027–28' },
];

const PROJECTION_MAX_YEARS = 70;

export function HecsCalculator() {
  const [income, setIncome] = useState<number>(85000);
  const [fy, setFy] = useState<FinancialYear>('2025-26');
  const [debtBalance, setDebtBalance] = useState<number>(35000);
  const [indexation, setIndexation] = useState<number>(3.5);

  const bands = hecsBands[fy] ?? hecsBands['2025-26'];
  const firstThreshold = bands[1]?.threshold ?? 54435;
  const belowThreshold = income <= firstThreshold;
  const repayment = useMemo(() => hecsRepayment(income, fy), [income, fy]);
  const projection = useMemo(
    () => projectPayoff(debtBalance, income, fy, indexation / 100, PROJECTION_MAX_YEARS),
    [debtBalance, income, fy, indexation],
  );

  // For the chart: build series showing starting balance each year vs ending balance
  const chartSeries = useMemo(() => {
    if (!projection || debtBalance <= 0) return [];
    const pts = projection.schedule.map((row) => ({ x: row.year, y: row.endingBalance }));
    if (pts.length > 0) {
      pts.unshift({ x: 0, y: debtBalance });
    }
    return [
      {
        name: 'Outstanding balance',
        color: 'var(--ledger-500)',
        points: pts,
      },
    ];
  }, [projection, debtBalance]);

  // Determine warning state
  const isGrowing = projection && projection.yearsToPayoff >= PROJECTION_MAX_YEARS && projection.schedule[PROJECTION_MAX_YEARS - 1]?.endingBalance > debtBalance;
  const isSlow = projection && projection.yearsToPayoff >= 25 && projection.yearsToPayoff < PROJECTION_MAX_YEARS;
  const isQuick = projection && projection.yearsToPayoff > 0 && projection.yearsToPayoff < 25;

  // The "tipping point" — the income at which HECS repayment first covers
  // the indexation on the current debt. Below this, the debt grows.
  const tippingPointIncome = useMemo(() => {
    if (debtBalance <= 0 || indexation <= 0) return null;
    const targetRepayment = debtBalance * (indexation / 100);
    // Find the lowest income where HECS >= targetRepayment.
    for (let testIncome = firstThreshold; testIncome <= 300000; testIncome += 100) {
      if (hecsRepayment(testIncome, fy) >= targetRepayment) {
        return testIncome;
      }
    }
    return null;
  }, [debtBalance, indexation, fy, firstThreshold]);

  // Is current repayment less than indexation? (the danger zone)
  const interestPerYear = debtBalance * (indexation / 100);
  const isDangerZone = !belowThreshold && repayment < interestPerYear;
  const annualShortfall = isDangerZone ? interestPerYear - repayment : 0;

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
            <p className="help">Taxable income + reportable fringe benefits + reportable super. The HECS repayment threshold for FY {fy} is {formatAUD(firstThreshold, 0)}.</p>
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

        <details className="rounded-xl border border-ink-200 bg-ink-50/40">
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
              <p className="help">WPI-capped since 2024. Recent years: 7.1% (2023), 4.7% (2024), 3.2% (2025).</p>
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
          <span className="result-value result-value-lg text-brand-700">{formatAUD(repayment)}</span>
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

        {/* PROMINENT: Danger zone warning — when HECS < indexation */}
        {isDangerZone && debtBalance > 0 && (
          <div className="mt-6 rounded-lg border-2 border-rose-300 bg-rose-50 p-4 text-sm text-rose-900 dark:border-rose-800/40 dark:bg-rose-900/20 dark:text-rose-200">
            <p className="font-semibold text-base">⚠ Your compulsory HECS won&apos;t cover indexation.</p>
            <p className="mt-2">
              At {formatAUD(income, 0)} income, your annual HECS repayment is{' '}
              <span className="font-mono font-semibold">{formatAUD(repayment)}</span>, but your balance is being indexed at{' '}
              <span className="font-mono font-semibold">{formatAUD(interestPerYear)}/yr</span> ({indexation}%).
              The shortfall is <span className="font-mono font-semibold">{formatAUD(annualShortfall)}/yr</span>, which is why the debt grows.
            </p>
            {tippingPointIncome && (
              <p className="mt-2">
                <strong>Tipping point:</strong> at <span className="font-mono font-semibold">{formatAUD(tippingPointIncome, 0)}</span> income,
                your HECS repayment would first cover indexation. Below that, you&apos;re losing ground.
              </p>
            )}
            <p className="mt-3 text-rose-800 dark:text-rose-300">
              <strong>What you can do:</strong> make voluntary repayments (they reduce the balance dollar-for-dollar),
              or salary sacrifice into super to lower your repayment income.
            </p>
          </div>
        )}

        {belowThreshold && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
            Your income is below the HECS threshold of {formatAUD(firstThreshold, 0)}, so no compulsory repayment this year. Your balance will still be indexed on 1 June.
          </div>
        )}
      </div>

      {/* Projection section */}
      {projection && debtBalance > 0 && (
        <div className="mt-10 border-t border-ink-200 pt-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-ink-900">Payoff projection</h3>
            <span className="kicker">flat income, {indexation}% p.a. indexation</span>
          </div>

          {/* Chart */}
          {chartSeries.length > 0 && (
            <div className="mb-6">
              <LineChart
                series={chartSeries}
                xLabel="Year"
                yLabel="Balance"
                xFormat={(v) => v.toString()}
                caption={
                  isGrowing
                    ? `Balance at year ${PROJECTION_MAX_YEARS}: ${formatAUD(projection.schedule[PROJECTION_MAX_YEARS - 1]?.endingBalance ?? 0)} (was ${formatAUD(debtBalance)} at year 0). The line slopes up because indexation outpaces your repayment.`
                    : isSlow
                    ? `Balance declines over ${projection.yearsToPayoff} years but the line is gentle — small voluntary repayments would accelerate this.`
                    : isQuick
                    ? `Balance declines steadily. Loan free in ${projection.yearsToPayoff} years.`
                    : undefined
                }
              />
            </div>
          )}

          {/* Numbers */}
          <div className="result-row">
            <span className="result-label">Years to pay off</span>
            <span className="result-value result-value-lg">
              {isGrowing ? `${PROJECTION_MAX_YEARS}+` : projection.yearsToPayoff}
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">Total repaid</span>
            <span className="result-value">{formatAUD(projection.totalRepaid)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Total interest added</span>
            <span className="result-value result-value-deduction">{formatAUD(projection.totalInterest)}</span>
          </div>
          {projection.yearsToPayoff > 0 && (
            <div className="result-row">
              <span className="result-label">Payoff date (calendar)</span>
              <span className="result-value">
                {(() => {
                  const d = new Date();
                  d.setFullYear(d.getFullYear() + projection.yearsToPayoff);
                  return d.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' });
                })()}
              </span>
            </div>
          )}

          {/* Warnings — separate, contextual */}
          {isGrowing && (
            <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900 dark:border-rose-800/40 dark:bg-rose-900/20 dark:text-rose-200">
              <p className="font-semibold">Bottom line: the projection shows {PROJECTION_MAX_YEARS}+ years because the debt is growing.</p>
              <p className="mt-1">
                See the warning above for the full explanation and tipping point. The fastest ways out: voluntary repayments (any amount, any time), or salary sacrifice into super to lower your repayment income.
              </p>
            </div>
          )}

          {isSlow && !isGrowing && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
              <p className="font-semibold">Long payoff horizon.</p>
              <p className="mt-1">
                Your debt will be paid off in {projection.yearsToPayoff} years. Even small voluntary repayments (e.g. {formatAUD(2000)}/yr) can cut years off the total. Voluntary repayments are tax-effective if you make them through your employer as pre-tax salary sacrifice.
              </p>
            </div>
          )}

          {isQuick && (
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900 dark:border-emerald-800/40 dark:bg-emerald-900/20 dark:text-emerald-200">
              <p className="font-semibold">On track to pay off in {projection.yearsToPayoff} years.</p>
              <p className="mt-1">
                Your income comfortably covers indexation. The HECS system is designed to clear the debt for people in your income bracket within a reasonable horizon.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
