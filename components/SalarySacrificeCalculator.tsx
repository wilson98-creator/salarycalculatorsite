'use client';

import { useMemo, useState } from 'react';
import { calculate, formatAUD, formatAUD0, type PayInputs } from '@/lib/tax/calculate';
import type { FinancialYear, Residency } from '@/lib/tax/brackets';

const fyOptions: { value: FinancialYear; label: string }[] = [
  { value: '2024-25', label: 'FY 2024–25' },
  { value: '2025-26', label: 'FY 2025–26' },
  { value: '2026-27', label: 'FY 2026–27 (current)' },
  { value: '2027-28', label: 'FY 2027–28 (projected)' },
];

const residencyOptions: { value: Residency; label: string }[] = [
  { value: 'resident', label: 'Australian resident' },
  { value: 'non-resident', label: 'Non-resident' },
  { value: 'working-holiday', label: 'Working holiday maker' },
];

const CONCESSIONAL_CAP = 30000; // FY 2025-26 cap (indexed after)

export function SalarySacrificeCalculator() {
  const [gross, setGross] = useState<number>(95000);
  const [sacrifice, setSacrifice] = useState<number>(10000);
  const [fy, setFy] = useState<FinancialYear>('2026-27');
  const [residency, setResidency] = useState<Residency>('resident');
  const [sgAlready, setSgAlready] = useState<number>(11400); // 12% of 95k

  const baseInputs: PayInputs = {
    gross,
    period: 'annual',
    residency,
    financialYear: fy,
    salarySacrifice: 0,
    hoursPerWeek: 38,
    weeksPerYear: 52,
    superRate: 0.12,
    grossIncludesSuper: false,
    hasHecsDebt: false,
    medicareExemption: 'none',
    postTaxDeductions: 0,
  };
  const sacrifiedInputs: PayInputs = { ...baseInputs, salarySacrifice: sacrifice };

  const before = useMemo(() => calculate(baseInputs), [gross, residency, fy]);
  const after = useMemo(() => calculate(sacrifiedInputs), [gross, sacrifice, residency, fy]);

  const taxSaved = before.incomeTax + before.medicare - after.incomeTax - after.medicare;
  const takeHomeChange = after.net - before.net;
  const superGained = sacrifice * 0.85; // 15% super tax
  const totalBenefit = taxSaved + superGained;
  const newConcessionalTotal = sgAlready + sacrifice;
  const overCap = newConcessionalTotal > CONCESSIONAL_CAP;

  return (
    <section aria-labelledby="sacrifice-calc-heading" className="card not-prose">
      <h2 id="sacrifice-calc-heading" className="sr-only">Salary sacrifice calculator</h2>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ss-gross" className="label">Annual gross salary</label>
            <div className="flex items-stretch gap-2">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-ink-50 px-3 text-ink-500 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-400">$</span>
              <input
                id="ss-gross"
                type="number"
                min={0}
                step="1000"
                className="input rounded-l-none"
                value={Number.isFinite(gross) ? gross : ''}
                onChange={(e) => setGross(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="ss-amount" className="label">Pre-tax sacrifice (annual)</label>
            <div className="flex items-stretch gap-2">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-ink-50 px-3 text-ink-500 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-400">$</span>
              <input
                id="ss-amount"
                type="number"
                min={0}
                step="500"
                className="input rounded-l-none"
                value={Number.isFinite(sacrifice) ? sacrifice : ''}
                onChange={(e) => setSacrifice(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ss-fy" className="label">Financial year</label>
            <select id="ss-fy" className="input" value={fy} onChange={(e) => setFy(e.target.value as FinancialYear)}>
              {fyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="ss-residency" className="label">Tax residency</label>
            <select id="ss-residency" className="input" value={residency} onChange={(e) => setResidency(e.target.value as Residency)}>
              {residencyOptions.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="ss-sg" className="label">Employer super guarantee this year</label>
          <div className="flex items-stretch gap-2">
            <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-ink-50 px-3 text-ink-500 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-400">$</span>
            <input
              id="ss-sg"
              type="number"
              min={0}
              step="100"
              className="input rounded-l-none"
              value={Number.isFinite(sgAlready) ? sgAlready : ''}
              onChange={(e) => setSgAlready(parseFloat(e.target.value) || 0)}
            />
          </div>
          <p className="help">Your employer&apos;s 12% SG contribution. Counts toward the $30,000 concessional cap.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-ink-700 dark:bg-ink-900">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Without sacrifice</h3>
          <div className="mt-3 space-y-2">
            <Row label="Income tax" value={before.incomeTax} />
            <Row label="Medicare levy" value={before.medicare} />
            <Row label="Net take-home" value={before.net} bold />
            <Row label="Super (employer, on top)" value={before.superannuation} muted />
          </div>
        </div>

        <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5 dark:border-brand-800 dark:bg-brand-900/20">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">With {formatAUD(sacrifice)} sacrifice</h3>
          <div className="mt-3 space-y-2">
            <Row label="Income tax" value={after.incomeTax} />
            <Row label="Medicare levy" value={after.medicare} />
            <Row label="Net take-home" value={after.net} bold />
            <Row label="Super (employer + sacrifice)" value={after.superannuation + sacrifice} muted />
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-800 dark:bg-emerald-900/20">
        <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Net benefit of sacrificing {formatAUD(sacrifice)}</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Tax saved</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-emerald-900 dark:text-emerald-200">{formatAUD(taxSaved)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Super gained (after 15% super tax)</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-emerald-900 dark:text-emerald-200">{formatAUD(superGained)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Take-home change</p>
            <p className={`mt-1 font-mono text-lg font-semibold tabular-nums ${takeHomeChange < 0 ? 'text-rose-700 dark:text-rose-400' : 'text-emerald-900 dark:text-emerald-200'}`}>
              {takeHomeChange >= 0 ? '+' : ''}{formatAUD(takeHomeChange)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Total first-year benefit</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-emerald-900 dark:text-emerald-200">{formatAUD(totalBenefit)}</p>
          </div>
        </div>
      </div>

      {overCap && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
          Heads up: your total concessional contributions (SG {formatAUD(sgAlready)} + sacrifice {formatAUD(sacrifice)} = {formatAUD(newConcessionalTotal)}) exceed the {formatAUD0(CONCESSIONAL_CAP)} cap. The excess is added to your assessable income and taxed at your marginal rate, with a 15% offset — usually not worth doing past the cap.
        </p>
      )}
    </section>
  );
}

function Row({ label, value, bold = false, muted = false }: { label: string; value: number; bold?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className={`text-sm ${muted ? 'text-ink-500 dark:text-ink-400' : 'text-ink-700 dark:text-ink-300'}`}>{label}</span>
      <span className={`font-mono tabular-nums ${bold ? 'text-lg font-semibold text-ink-900 dark:text-ink-50' : 'text-sm text-ink-700 dark:text-ink-300'}`}>
        {formatAUD(value)}
      </span>
    </div>
  );
}
