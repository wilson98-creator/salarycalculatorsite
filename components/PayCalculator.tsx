'use client';

import { useMemo, useState } from 'react';
import {
  calculate,
  formatAUD,
  fromAnnual,
  type PayInputs,
  type PayPeriod,
  type PayResult,
} from '@/lib/tax/calculate';
import type { FinancialYear, Residency } from '@/lib/tax/brackets';

const periods: { value: PayPeriod; label: string }[] = [
  { value: 'annual', label: 'Annual' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'daily', label: 'Daily' },
  { value: 'hourly', label: 'Hourly' },
];

const residencyOptions: { value: Residency; label: string }[] = [
  { value: 'resident', label: 'Australian resident' },
  { value: 'non-resident', label: 'Non-resident (foreign resident)' },
  { value: 'working-holiday', label: 'Working holiday maker (417/462)' },
];

const fyOptions: { value: FinancialYear; label: string }[] = [
  { value: '2024-25', label: 'FY 2024–25' },
  { value: '2025-26', label: 'FY 2025–26' },
  { value: '2026-27', label: 'FY 2026–27 (current)' },
  { value: '2027-28', label: 'FY 2027–28 (projected)' },
];

export function PayCalculator() {
  const [period, setPeriod] = useState<PayPeriod>('annual');
  const [gross, setGross] = useState<number>(85000);
  const [residency, setResidency] = useState<Residency>('resident');
  const [fy, setFy] = useState<FinancialYear>('2026-27');
  const [salarySacrifice, setSalarySacrifice] = useState<number>(0);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(38);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);
  const [superRate, setSuperRate] = useState<number>(0.12);
  const [grossIncludesSuper, setGrossIncludesSuper] = useState<boolean>(false);
  const [hasHecs, setHasHecs] = useState<boolean>(false);
  const [medicareExemption, setMedicareExemption] = useState<'full' | 'half' | 'none'>('none');
  const [postTax, setPostTax] = useState<number>(0);
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);

  const inputs: PayInputs = {
    gross,
    period,
    residency,
    financialYear: fy,
    salarySacrifice,
    hoursPerWeek,
    weeksPerYear,
    superRate,
    grossIncludesSuper,
    hasHecsDebt: hasHecs,
    medicareExemption,
    postTaxDeductions: postTax,
  };

  const result: PayResult = useMemo(() => calculate(inputs), [
    gross, period, residency, fy, salarySacrifice, hoursPerWeek, weeksPerYear,
    superRate, grossIncludesSuper, hasHecs, medicareExemption, postTax,
  ]);

  return (
    <section aria-labelledby="calculator-heading" className="not-prose">
      <h2 id="calculator-heading" className="sr-only">Pay calculator</h2>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor="gross" className="label">Gross pay</label>
            <div className="flex items-stretch gap-2">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-ink-50 px-3 text-ink-500 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-400">$</span>
              <input
                id="gross"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.01"
                className="input rounded-l-none"
                value={Number.isFinite(gross) ? gross : ''}
                onChange={(e) => setGross(parseFloat(e.target.value) || 0)}
              />
            </div>
            <p className="help">Enter your salary before tax. The calculator handles all the math.</p>
          </div>
          <div>
            <label htmlFor="period" className="label">Pay period</label>
            <select
              id="period"
              className="input"
              value={period}
              onChange={(e) => setPeriod(e.target.value as PayPeriod)}
            >
              {periods.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="residency" className="label">Tax residency</label>
            <select
              id="residency"
              className="input"
              value={residency}
              onChange={(e) => setResidency(e.target.value as Residency)}
            >
              {residencyOptions.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="fy" className="label">Financial year</label>
            <select
              id="fy"
              className="input"
              value={fy}
              onChange={(e) => setFy(e.target.value as FinancialYear)}
            >
              {fyOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-ink-300 text-brand-500 focus:ring-brand-500 dark:border-ink-600 dark:bg-ink-800"
              checked={hasHecs}
              onChange={(e) => setHasHecs(e.target.checked)}
            />
            I have a HECS-HELP / VSL / SFSS debt
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-ink-300 text-brand-500 focus:ring-brand-500 dark:border-ink-600 dark:bg-ink-800"
              checked={grossIncludesSuper}
              onChange={(e) => setGrossIncludesSuper(e.target.checked)}
            />
            My gross includes super (Total Employment Cost)
          </label>
        </div>

        <button
          type="button"
          className="btn-ghost self-start"
          onClick={() => setAdvancedOpen((v) => !v)}
          aria-expanded={advancedOpen}
        >
          {advancedOpen ? 'Hide' : 'Show'} advanced options
        </button>

        {advancedOpen && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="sacrifice" className="label">Pre-tax salary sacrifice (annual)</label>
              <input
                id="sacrifice"
                type="number"
                min={0}
                step="50"
                className="input"
                value={salarySacrifice || ''}
                onChange={(e) => setSalarySacrifice(parseFloat(e.target.value) || 0)}
              />
              <p className="help">Super, novated lease, or other pre-tax deductions.</p>
            </div>
            <div>
              <label htmlFor="posttax" className="label">Post-tax deductions (annual)</label>
              <input
                id="posttax"
                type="number"
                min={0}
                step="10"
                className="input"
                value={postTax || ''}
                onChange={(e) => setPostTax(parseFloat(e.target.value) || 0)}
              />
              <p className="help">Union fees, salary-packaged benefits, etc.</p>
            </div>
            <div>
              <label htmlFor="hours" className="label">Hours per week</label>
              <input
                id="hours"
                type="number"
                min={1}
                max={80}
                className="input"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseFloat(e.target.value) || 38)}
              />
            </div>
            <div>
              <label htmlFor="weeks" className="label">Working weeks per year</label>
              <input
                id="weeks"
                type="number"
                min={1}
                max={52}
                className="input"
                value={weeksPerYear}
                onChange={(e) => setWeeksPerYear(parseFloat(e.target.value) || 52)}
              />
            </div>
            <div>
              <label htmlFor="super" className="label">Superannuation rate</label>
              <select
                id="super"
                className="input"
                value={superRate}
                onChange={(e) => setSuperRate(parseFloat(e.target.value))}
              >
                <option value={0.115}>11.5% (FY 2023–24)</option>
                <option value={0.12}>12% (FY 2025–26 onwards)</option>
              </select>
            </div>
            <div>
              <label htmlFor="medicare" className="label">Medicare levy exemption</label>
              <select
                id="medicare"
                className="input"
                value={medicareExemption}
                onChange={(e) => setMedicareExemption(e.target.value as 'full' | 'half' | 'none')}
              >
                <option value="none">None — full 2% applies</option>
                <option value="half">Half exemption</option>
                <option value="full">Full exemption</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <Results result={result} />
    </section>
  );
}

function Results({ result }: { result: PayResult }) {
  const periodLabel = periods.find((p) => p.value === result.period)?.label ?? 'Period';
  // Derive annual net from the per-period result, then convert to all common periods.
  const periodMultiplier: Record<PayPeriod, number> = {
    annual: 1,
    monthly: 12,
    fortnightly: 26,
    weekly: 52,
    daily: 5 * 52,
    hourly: 38 * 52,
  };
  const annualNet = result.net * periodMultiplier[result.period];
  const allPeriods: { key: PayPeriod; label: string; amount: number; isSelected: boolean }[] = [
    { key: 'annual', label: 'Annual', amount: fromAnnual(annualNet, 'annual', 38, 52), isSelected: result.period === 'annual' },
    { key: 'monthly', label: 'Monthly', amount: fromAnnual(annualNet, 'monthly', 38, 52), isSelected: result.period === 'monthly' },
    { key: 'fortnightly', label: 'Fortnightly', amount: fromAnnual(annualNet, 'fortnightly', 38, 52), isSelected: result.period === 'fortnightly' },
    { key: 'weekly', label: 'Weekly', amount: fromAnnual(annualNet, 'weekly', 38, 52), isSelected: result.period === 'weekly' },
  ];
  return (
    <div className="mt-12">
      {/* The result figure — the ONLY orange element. */}
      <p className="section-index">Take-home pay</p>
      <p className="result-figure mt-2">{formatAUD(result.net)}</p>
      <p className="kicker mt-3">
        as of {new Date().toISOString().slice(0, 10)} · {periodLabel.toLowerCase()}
      </p>

      {/* Take-home per period — horizontal rows with hairlines, not a grid */}
      <div className="mt-12">
        <p className="kicker">Per period</p>
        <ul className="mt-3 rule-line border-t border-ink-200 dark:border-ink-800">
          {allPeriods.map((p) => (
            <li
              key={p.key}
              className="rule-line flex items-baseline justify-between gap-3 border-b border-ink-200 py-3 dark:border-ink-800"
            >
              <span className={`font-mono text-[11px] uppercase tracking-[0.15em] ${p.isSelected ? 'text-ink-900 dark:text-ink-50' : 'text-ink-500 dark:text-ink-400'}`}>
                {p.isSelected && <span className="text-accent-500">· </span>}
                {p.label}
              </span>
              <span className="font-mono text-lg font-semibold tabular-nums text-ink-900 dark:text-ink-50">
                {formatAUD(p.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Breakdown — monospace, no zebra, just top/bottom rule lines */}
      <div className="mt-12">
        <p className="kicker">Breakdown</p>
        <ul className="mt-3 rule-line border-t border-ink-200 dark:border-ink-800">
          <BreakdownRow label="Gross salary" value={formatAUD(result.gross)} />
          <BreakdownRow label="Taxable income" value={formatAUD(result.taxableIncome)} muted />
          <BreakdownRow label="Income tax" value={`−${formatAUD(result.incomeTax)}`} deduction />
          <BreakdownRow label="Medicare levy" value={`−${formatAUD(result.medicare)}`} deduction />
          {result.hecsRepayment > 0 && (
            <BreakdownRow label="HECS-HELP repayment" value={`−${formatAUD(result.hecsRepayment)}`} deduction />
          )}
          {result.postTaxDeductions > 0 && (
            <BreakdownRow label="Post-tax deductions" value={`−${formatAUD(result.postTaxDeductions)}`} deduction />
          )}
          <BreakdownRow label="Net take-home" value={formatAUD(result.net)} bold total />
          <BreakdownRow label="Superannuation (employer, on top)" value={formatAUD(result.superannuation)} muted />
        </ul>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-500">
          <span>Effective rate: {(result.effectiveRate * 100).toFixed(1)}%</span>
          <span>Marginal rate: {(result.marginalRate * 100).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  deduction = false,
  bold = false,
  muted = false,
  total = false,
}: {
  label: string;
  value: string;
  deduction?: boolean;
  bold?: boolean;
  muted?: boolean;
  total?: boolean;
}) {
  const valueClass = deduction
    ? 'font-mono text-base font-medium tabular-nums text-ink-500 dark:text-ink-400'
    : bold
    ? 'font-mono text-lg font-bold tabular-nums text-ink-900 dark:text-ink-50'
    : muted
    ? 'font-mono text-sm tabular-nums text-ink-500 dark:text-ink-400'
    : 'font-mono text-base font-semibold tabular-nums text-ink-900 dark:text-ink-50';
  return (
    <li
      className={`rule-line flex items-baseline justify-between gap-3 border-b border-ink-200 dark:border-ink-800 ${
        total ? 'py-4' : 'py-3'
      }`}
    >
      <span
        className={`text-sm ${muted ? 'text-ink-500 dark:text-ink-400' : 'text-ink-700 dark:text-ink-300'}`}
      >
        {label}
      </span>
      <span className={valueClass}>{value}</span>
    </li>
  );
}
/* triggered rebuild at Wed Aug 19 22:41:52 UTC 2026 */
