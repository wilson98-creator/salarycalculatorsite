'use client';

import { useMemo, useState } from 'react';
import {
  hecsBands,
  hecsRepayment,
  paycalculatorHecsBands,
  projectPayoffWithBands,
  type HecsBand,
} from '@/lib/tax/hecs';
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

type HecsSchedule = 'ato-new' | 'paycalculator';

const scheduleOptions: { value: HecsSchedule; label: string; description: string }[] = [
  {
    value: 'ato-new',
    label: 'Current ATO system (FY 2025-26+ marginal)',
    description: 'Marginal brackets, 1% to 10%. What the ATO actually charges from 1 July 2025.',
  },
  {
    value: 'paycalculator',
    label: 'Reference: paycalculator.com.au (simplified)',
    description: '4-bracket simplified version: 0% / 15% / 17% / 10%. Not the actual ATO schedule — kept for comparison.',
  },
];

/** Compute HECS repayment against a custom band set (marginal method). */
function repaymentWithBands(income: number, bands: HecsBand[]): number {
  if (income <= bands[1]?.threshold) return 0;
  let total = 0;
  for (let i = 1; i < bands.length; i++) {
    const lower = bands[i].threshold;
    const upper = bands[i + 1]?.threshold ?? Infinity;
    if (income <= lower) break;
    const slice = Math.min(income, upper) - lower;
    if (slice > 0) total += slice * bands[i].rate;
  }
  return total;
}

export function HecsCalculator() {
  const [income, setIncome] = useState<number>(85000);
  const [fy, setFy] = useState<FinancialYear>('2026-27');
  const [debtBalance, setDebtBalance] = useState<number>(35000);
  const [indexation, setIndexation] = useState<number>(2.8);
  const [wageGrowth, setWageGrowth] = useState<number>(3.5);
  const [voluntaryAnnual, setVoluntaryAnnual] = useState<number>(0);
  const [schedule, setSchedule] = useState<HecsSchedule>('ato-new');

  // Pick the band set and repayment function based on the schedule toggle.
  const usingPaycalculator = schedule === 'paycalculator';
  const bands = usingPaycalculator
    ? paycalculatorHecsBands
    : (hecsBands[fy] ?? hecsBands['2025-26']);
  const firstThreshold = bands[1]?.threshold ?? 54435;
  const belowThreshold = income <= firstThreshold;
  const repayment = useMemo(
    () => (usingPaycalculator ? repaymentWithBands(income, bands) : hecsRepayment(income, fy)),
    [income, fy, usingPaycalculator, bands],
  );
  const projection = useMemo(
    () => projectPayoffWithBands(
      debtBalance, income, indexation / 100,
      { maxYears: PROJECTION_MAX_YEARS, wageGrowthRate: wageGrowth / 100, voluntaryAnnual },
      bands,
    ),
    [debtBalance, income, indexation, wageGrowth, voluntaryAnnual, bands],
  );

  // For comparison, also compute the flat-income projection (conservative)
  const flatProjection = useMemo(
    () => projectPayoffWithBands(
      debtBalance, income, indexation / 100,
      { maxYears: PROJECTION_MAX_YEARS, wageGrowthRate: 0, voluntaryAnnual },
      bands,
    ),
    [debtBalance, income, indexation, voluntaryAnnual, bands],
  );

  // What if you add $X more in voluntary? Show a quick comparison.
  const projectionWithMoreVoluntary = useMemo(() => {
    if (voluntaryAnnual <= 0) return null;
    return projectPayoffWithBands(
      debtBalance, income, indexation / 100,
      { maxYears: PROJECTION_MAX_YEARS, wageGrowthRate: wageGrowth / 100, voluntaryAnnual: voluntaryAnnual + 4000 },
      bands,
    );
  }, [debtBalance, income, indexation, wageGrowth, voluntaryAnnual, bands]);

  const projectionWithoutVoluntary = useMemo(() => {
    if (voluntaryAnnual <= 0) return null;
    return projectPayoffWithBands(
      debtBalance, income, indexation / 100,
      { maxYears: PROJECTION_MAX_YEARS, wageGrowthRate: wageGrowth / 100, voluntaryAnnual: 0 },
      bands,
    );
  }, [debtBalance, income, indexation, wageGrowth, voluntaryAnnual, bands]);

  // For the chart: build series showing starting balance each year vs ending balance
  const chartSeries = useMemo(() => {
    if (!projection || debtBalance <= 0) return [];
    const pts = projection.schedule.map((row) => ({ x: row.year, y: row.endingBalance }));
    if (pts.length > 0) {
      pts.unshift({ x: 0, y: debtBalance });
    }
    const volLabel = voluntaryAnnual > 0 ? ` + $${voluntaryAnnual.toLocaleString()}/yr voluntary` : '';
    return [
      {
        name: `With ${wageGrowth}% annual wage growth${volLabel}`,
        color: 'var(--ledger-500)',
        points: pts,
      },
      ...(wageGrowth > 0 && flatProjection
        ? [
            {
              name: `With flat income (no raises)${volLabel}`,
              color: 'var(--ink-500)',
              points: [
                { x: 0, y: debtBalance },
                ...flatProjection.schedule.map((row) => ({ x: row.year, y: row.endingBalance })),
              ],
            },
          ]
        : []),
    ];
  }, [projection, flatProjection, debtBalance, wageGrowth, voluntaryAnnual]);

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
      const testRepayment = usingPaycalculator
        ? repaymentWithBands(testIncome, bands)
        : hecsRepayment(testIncome, fy);
      if (testRepayment >= targetRepayment) {
        return testIncome;
      }
    }
    return null;
  }, [debtBalance, indexation, fy, firstThreshold, usingPaycalculator, bands]);

  // At the current wage growth rate, when does income cross the tipping point?
  const yearsToTippingPoint = useMemo(() => {
    if (!tippingPointIncome || income <= 0 || wageGrowth <= 0) return null;
    if (income >= tippingPointIncome) return 0;
    // Solve income * (1 + g)^y >= tippingPointIncome
    const ratio = tippingPointIncome / income;
    const years = Math.log(ratio) / Math.log(1 + wageGrowth / 100);
    return Math.ceil(years);
  }, [income, tippingPointIncome, wageGrowth]);

  // Is current repayment less than indexation? (the danger zone)
  const indexationPerYear = debtBalance * (indexation / 100);
  const isDangerZone = !belowThreshold && repayment < indexationPerYear;
  const annualShortfall = isDangerZone ? indexationPerYear - repayment : 0;

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

        <div className="mt-2 rounded-lg border border-ink-200 bg-ink-50 p-3">
          <label htmlFor="hecs-schedule" className="label flex items-baseline gap-2">
            HECS schedule
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-500">Compare</span>
          </label>
          <select
            id="hecs-schedule"
            className="input"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value as HecsSchedule)}
          >
            {scheduleOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <p className="help">{scheduleOptions.find((o) => o.value === schedule)?.description}</p>
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
              <p className="help">WPI-capped since 2024. Recent years: 7.1% (2023), 4.7% (2024), 3.2% (2025), 2.8% (2026). Default is 2.8% (FY 2026-27 ATO rate).</p>
            </div>
            <div>
              <label htmlFor="hecs-wage-growth" className="label">Annual wage growth (% p.a.)</label>
              <div className="flex items-stretch gap-2">
                <input
                  id="hecs-wage-growth"
                  type="number"
                  min={0}
                  max={20}
                  step="0.1"
                  className="input rounded-r-none"
                  value={Number.isFinite(wageGrowth) ? wageGrowth : ''}
                  onChange={(e) => setWageGrowth(parseFloat(e.target.value) || 0)}
                />
                <span className="inline-flex items-center rounded-r-lg border border-l-0 border-ink-200 bg-ink-50 px-3 text-ink-600">%</span>
              </div>
              <p className="help">Typical Australian wage growth is 3-4% p.a. Set to 0 for a flat-income projection.</p>
            </div>
            <div>
              <label htmlFor="hecs-voluntary" className="label">Voluntary extra repayment ($/yr)</label>
              <div className="flex items-stretch gap-2">
                <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-white px-3 text-ink-600">$</span>
                <input
                  id="hecs-voluntary"
                  type="number"
                  min={0}
                  step="500"
                  className="input rounded-l-none"
                  value={Number.isFinite(voluntaryAnnual) ? voluntaryAnnual : ''}
                  onChange={(e) => setVoluntaryAnnual(parseFloat(e.target.value) || 0)}
                />
              </div>
              <p className="help">Any extra you pay on top of the compulsory withholding. Most people who clear HECS in 8-12 years add $4-10k/yr here.</p>
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

        {/* Marginal vs effective rate explainer — when the gap is large */}
        {!belowThreshold && !usingPaycalculator && income > 0 && (() => {
          const effective = (repayment / income) * 100;
          // Find the marginal bracket rate the user is currently in
          const marginalBand = bands.find((b, i) => {
            const next = bands[i + 1]?.threshold ?? Infinity;
            return income > b.threshold && income <= next;
          });
          const marginalRate = marginalBand && marginalBand.rate > 0 ? marginalBand.rate * 100 : null;
          if (!marginalRate || effective >= marginalRate * 0.85) return null;
          return (
            <div className="mt-4 rounded-lg border border-ink-200 bg-ink-50/50 p-3 text-sm text-ink-700 dark:border-ink-700 dark:bg-ink-800/40 dark:text-ink-200">
              <p>
                <strong>Marginal vs effective rate.</strong> Your income is in the {marginalRate.toFixed(1)}% HECS bracket, but because HECS is calculated <em>marginal</em> (like income tax), the first {formatAUD(bands[1].threshold, 0)} is exempt and lower brackets apply to the layers below. The effective rate against your full income is only <span className="font-mono font-semibold">{effective.toFixed(2)}%</span>, so the compulsory repayment is much smaller than the {marginalRate.toFixed(0)}% headline figure suggests.
              </p>
            </div>
          );
        })()}

        {/* PROMINENT: Danger zone warning — when HECS < indexation */}
        {usingPaycalculator && (
          <div className="mt-6 rounded-lg border-2 border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
            <p className="font-semibold text-base">⚠ Showing the paycalculator.com.au simplified schedule.</p>
            <p className="mt-1">
              This is a 4-bracket simplified version, not what the ATO actually charges. The ATO uses a
              15-bracket marginal schedule from 1 July 2025 (marginal brackets 1% to 10%). Switch the
              schedule dropdown to &lsquo;Current ATO system&rsquo; to see the official numbers.
            </p>
          </div>
        )}
        {isDangerZone && debtBalance > 0 && (
          <div className="mt-6 rounded-lg border-2 border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
            <p className="font-semibold text-base">⚠ At your current income, HECS doesn&apos;t cover indexation — but this is usually temporary.</p>
            <p className="mt-2">
              At {formatAUD(income, 0)} income, your annual HECS repayment is{' '}
              <span className="font-mono font-semibold">{formatAUD(repayment)}</span>, but your balance is being indexed at{' '}
              <span className="font-mono font-semibold">{formatAUD(indexationPerYear)}/yr</span> ({indexation}%).
              The shortfall is <span className="font-mono font-semibold">{formatAUD(annualShortfall)}/yr</span>.
            </p>
            {tippingPointIncome && yearsToTippingPoint !== null && wageGrowth > 0 && (
              <p className="mt-2">
                <strong>Tipping point:</strong> at <span className="font-mono font-semibold">{formatAUD(tippingPointIncome, 0)}</span> income, your HECS would first cover indexation.
                At {wageGrowth}% annual wage growth, you&apos;ll hit that in roughly{' '}
                <span className="font-mono font-semibold">{yearsToTippingPoint} year{yearsToTippingPoint === 1 ? '' : 's'}</span>.
                After that the debt starts shrinking.
              </p>
            )}
            {tippingPointIncome && (wageGrowth === 0 || yearsToTippingPoint === null) && (
              <p className="mt-2">
                <strong>Tipping point:</strong> at <span className="font-mono font-semibold">{formatAUD(tippingPointIncome, 0)}</span> income,
                your HECS would first cover indexation. Without wage growth, the debt grows every year.
              </p>
            )}
            <p className="mt-3 text-amber-800 dark:text-amber-300">
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
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-base font-semibold text-ink-900">Payoff projection</h3>
            <span className="kicker">
              {wageGrowth > 0 ? `${wageGrowth}% wage growth` : 'flat income'}, {indexation}% idx
              {voluntaryAnnual > 0 ? `, $${voluntaryAnnual.toLocaleString()}/yr voluntary` : ''}
            </span>
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
            <span className="result-label">Total indexation added</span>
            <span className="result-value result-value-deduction">{formatAUD(projection.totalIndexation)}</span>
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

          {isSlow && !isGrowing && voluntaryAnnual === 0 && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
              <p className="font-semibold">Long payoff horizon — voluntary repayments make a big difference here.</p>
              <p className="mt-1">
                Your debt will be paid off in {projection.yearsToPayoff} years under the compulsory-only scenario. Most Australians in your bracket clear the loan in 8-12 years by adding voluntary payments. Try the &ldquo;Voluntary extra repayment&rdquo; input above to see the impact.
              </p>
              {projectionWithMoreVoluntary && (
                <p className="mt-2 font-mono text-xs text-amber-800 dark:text-amber-300">
                  Example: adding <span className="font-semibold">$4,000/yr</span> on top of the compulsory brings payoff down to{' '}
                  <span className="font-semibold">
                    {projectionWithMoreVoluntary.yearsToPayoff >= PROJECTION_MAX_YEARS ? `${PROJECTION_MAX_YEARS}+` : projectionWithMoreVoluntary.yearsToPayoff} years
                  </span>.
                </p>
              )}
            </div>
          )}

          {isSlow && !isGrowing && voluntaryAnnual > 0 && projectionWithoutVoluntary && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
              <p className="font-semibold">Voluntary repayments are doing real work here.</p>
              <p className="mt-1">
                Without your ${voluntaryAnnual.toLocaleString()}/yr voluntary contribution, payoff would be{' '}
                <span className="font-mono font-semibold">
                  {projectionWithoutVoluntary.yearsToPayoff >= PROJECTION_MAX_YEARS ? `${PROJECTION_MAX_YEARS}+` : projectionWithoutVoluntary.yearsToPayoff} years
                </span>{' '}
                (compulsory only). With it, you finish in {projection.yearsToPayoff} years — saving{' '}
                <span className="font-mono font-semibold">
                  {Math.max(0, (projectionWithoutVoluntary.yearsToPayoff >= PROJECTION_MAX_YEARS ? PROJECTION_MAX_YEARS : projectionWithoutVoluntary.yearsToPayoff) - projection.yearsToPayoff)} years
                </span>.
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
