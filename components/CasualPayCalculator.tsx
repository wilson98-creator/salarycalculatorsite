'use client';

import { useMemo, useState } from 'react';
import { commonAwards, type Award } from '@/lib/tax/awards';
import { calculate, formatAUD, type PayInputs, type PayPeriod } from '@/lib/tax/calculate';
import type { FinancialYear, Residency } from '@/lib/tax/brackets';

const fyOptions: { value: FinancialYear; label: string }[] = [
  { value: '2025-26', label: 'FY 2025–26' },
  { value: '2026-27', label: 'FY 2026–27 (current)' },
];

const residencyOptions: { value: Residency; label: string }[] = [
  { value: 'resident', label: 'Australian resident' },
  { value: 'non-resident', label: 'Non-resident' },
  { value: 'working-holiday', label: 'Working holiday maker' },
];

export function CasualPayCalculator() {
  const [awardCode, setAwardCode] = useState<string>('NMW');
  const [baseRate, setBaseRate] = useState<number>(24.10);
  const [loading, setLoading] = useState<number>(25);
  const [hours, setHours] = useState<number>(20);
  const [weeks, setWeeks] = useState<number>(52);
  const [fy, setFy] = useState<FinancialYear>('2026-27');
  const [residency, setResidency] = useState<Residency>('resident');
  const [hasHecs, setHasHecs] = useState<boolean>(false);

  const selectedAward: Award | undefined = useMemo(
    () => commonAwards.find((a) => a.code === awardCode),
    [awardCode],
  );

  // When user picks a new award, update the base rate to match.
  const onAwardChange = (code: string) => {
    setAwardCode(code);
    const award = commonAwards.find((a) => a.code === code);
    if (award) {
      setBaseRate(award.baseRate);
      setLoading(award.defaultCasualLoading * 100);
    }
  };

  const loadedRate = baseRate * (1 + loading / 100);
  const annualGross = loadedRate * hours * weeks;

  const payInputs: PayInputs = {
    gross: annualGross,
    period: 'annual' as PayPeriod,
    residency,
    financialYear: fy,
    salarySacrifice: 0,
    hoursPerWeek: hours,
    weeksPerYear: weeks,
    superRate: 0.12,
    grossIncludesSuper: false,
    hasHecsDebt: hasHecs,
    medicareExemption: 'none',
    postTaxDeductions: 0,
  };
  const result = useMemo(() => calculate(payInputs), [annualGross, residency, fy, hours, weeks, hasHecs]);

  return (
    <section aria-labelledby="casual-calc-heading" className="card not-prose">
      <h2 id="casual-calc-heading" className="sr-only">Casual pay calculator</h2>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="award" className="label">Award</label>
            <select
              id="award"
              className="input"
              value={awardCode}
              onChange={(e) => onAwardChange(e.target.value)}
            >
              {commonAwards.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.name} (${a.baseRate.toFixed(2)}/hr)
                </option>
              ))}
            </select>
            <p className="help">
              {selectedAward ? `Adult base rate from ${selectedAward.effectiveFrom}. ` : ''}
              Defaults to the Fair Work national minimum wage; override below for your actual classification.
            </p>
          </div>
          <div>
            <label htmlFor="base" className="label">Base hourly rate</label>
            <div className="flex items-stretch gap-2">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-ink-50 px-3 text-ink-500 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-400">$</span>
              <input
                id="base"
                type="number"
                min={0}
                step="0.05"
                className="input rounded-l-none"
                value={Number.isFinite(baseRate) ? baseRate : ''}
                onChange={(e) => setBaseRate(parseFloat(e.target.value) || 0)}
              />
            </div>
            <p className="help">Override if you are on a higher classification than the award minimum.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="loading" className="label">Casual loading (%)</label>
            <input
              id="loading"
              type="number"
              min={0}
              max={50}
              step="0.5"
              className="input"
              value={Number.isFinite(loading) ? loading : ''}
              onChange={(e) => setLoading(parseFloat(e.target.value) || 0)}
            />
            <p className="help">Typically 25% under most Modern Awards.</p>
          </div>
          <div>
            <label htmlFor="hours" className="label">Hours per week</label>
            <input
              id="hours"
              type="number"
              min={0}
              max={80}
              className="input"
              value={Number.isFinite(hours) ? hours : ''}
              onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
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
              value={Number.isFinite(weeks) ? weeks : ''}
              onChange={(e) => setWeeks(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="casual-fy" className="label">Financial year</label>
            <select
              id="casual-fy"
              className="input"
              value={fy}
              onChange={(e) => setFy(e.target.value as FinancialYear)}
            >
              {fyOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="casual-residency" className="label">Tax residency</label>
            <select
              id="casual-residency"
              className="input"
              value={residency}
              onChange={(e) => setResidency(e.target.value as Residency)}
            >
              {residencyOptions.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-300">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-ink-300 text-brand-500 focus:ring-brand-500 dark:border-ink-600 dark:bg-ink-800"
            checked={hasHecs}
            onChange={(e) => setHasHecs(e.target.checked)}
          />
          I have a HECS-HELP / VSL / SFSS debt
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50/60 p-6 dark:border-brand-800 dark:bg-brand-900/20">
        <h3 className="mb-3 text-base font-semibold text-ink-900 dark:text-ink-50">Your casual pay</h3>

        <div className="result-row">
          <span className="result-label">Loaded hourly rate</span>
          <span className="result-value text-2xl text-brand-700 dark:text-brand-300">{formatAUD(loadedRate)}/hr</span>
        </div>
        <div className="my-2 h-px bg-ink-200 dark:bg-ink-700" />

        <div className="result-row">
          <span className="result-label">Annual gross</span>
          <span className="result-value">{formatAUD(result.gross)}</span>
        </div>
        <div className="result-row">
          <span className="result-label">PAYG income tax</span>
          <span className="result-value text-rose-700 dark:text-rose-400">−{formatAUD(result.incomeTax)}</span>
        </div>
        <div className="result-row">
          <span className="result-label">Medicare levy</span>
          <span className="result-value text-rose-700 dark:text-rose-400">−{formatAUD(result.medicare)}</span>
        </div>
        {result.hecsRepayment > 0 && (
          <div className="result-row">
            <span className="result-label">HECS-HELP repayment</span>
            <span className="result-value text-rose-700 dark:text-rose-400">−{formatAUD(result.hecsRepayment)}</span>
          </div>
        )}
        <div className="my-2 h-px bg-ink-200 dark:bg-ink-700" />
        <div className="result-row">
          <span className="result-label">Annual net</span>
          <span className="result-value text-lg text-brand-700 dark:text-brand-300">{formatAUD(result.net)}</span>
        </div>
        <div className="result-row">
          <span className="result-label">Weekly net (estimate)</span>
          <span className="result-value">{formatAUD(result.net / 52)}</span>
        </div>
        <div className="result-row">
          <span className="result-label">Fortnightly net (estimate)</span>
          <span className="result-value">{formatAUD(result.net / 26)}</span>
        </div>
        <div className="result-row">
          <span className="result-label text-ink-500 dark:text-ink-400">Superannuation (employer, on top)</span>
          <span className="result-value text-ink-700 dark:text-ink-300">{formatAUD(result.superannuation)}/yr</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-600 dark:text-ink-400">
          <span className="chip bg-white dark:bg-ink-900">Effective tax: {(result.effectiveRate * 100).toFixed(1)}%</span>
          <span className="chip bg-white dark:bg-ink-900">Marginal: {(result.marginalRate * 100).toFixed(0)}%</span>
        </div>
      </div>
    </section>
  );
}
