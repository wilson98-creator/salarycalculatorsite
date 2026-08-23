'use client';

import { useMemo, useState } from 'react';
import { calculate, formatAUD, type PayInputs } from '@/lib/tax/calculate';
import type { FinancialYear, Residency } from '@/lib/tax/brackets';

const fyOptions: { value: FinancialYear; label: string }[] = [
  { value: '2024-25', label: 'FY 2024–25' },
  { value: '2025-26', label: 'FY 2025–26' },
  { value: '2026-27', label: 'FY 2026–27 (current)' },
  { value: '2027-28', label: 'FY 2027-28 (projected)' },
];

const residencyOptions: { value: Residency; label: string }[] = [
  { value: 'resident', label: 'Australian resident' },
  { value: 'non-resident', label: 'Non-resident' },
  { value: 'working-holiday', label: 'Working holiday maker' },
];

type PackageType = 'novated-lease' | 'super' | 'general';

interface PackageOption {
  value: PackageType;
  label: string;
  description: string;
  fbt: string;
  hasCap: boolean;
  cap?: number;
}

const packageOptions: PackageOption[] = [
  {
    value: 'novated-lease',
    label: 'Novated lease (car)',
    description: 'Pre-tax car lease payments + running costs, paid via your employer',
    fbt: 'Fringe Benefits Tax applies (47% on the grossed-up taxable value of the car). The employer pays the FBT, but the effective cost is part of your total package.',
    hasCap: false,
  },
  {
    value: 'super',
    label: 'Extra super contributions',
    description: 'Pre-tax contributions to super above the 12% Superannuation Guarantee',
    fbt: 'No FBT. Concessional contributions cap is $30,000 per year for FY 2025–26 onwards. Excess is taxed at the top marginal rate.',
    hasCap: true,
    cap: 30000,
  },
  {
    value: 'general',
    label: 'Other packaging (phone, laptop, fees)',
    description: 'Pre-tax payments for work-related items, generally exempt from FBT if used for work',
    fbt: 'Generally FBT-exempt if the item is primarily for work use and provided under a salary packaging arrangement. Speak to your employer or tax agent about your specific items.',
    hasCap: false,
  },
];

export function SalaryPackagingCalculator() {
  const [gross, setGross] = useState<number>(95000);
  const [packageAmount, setPackageAmount] = useState<number>(10000);
  const [packageType, setPackageType] = useState<PackageType>('novated-lease');
  const [fy, setFy] = useState<FinancialYear>('2026-27');
  const [residency, setResidency] = useState<Residency>('resident');

  const baseInputs: PayInputs = useMemo(
    () => ({
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
    }),
    [gross, residency, fy]
  );

  const packagedInputs: PayInputs = useMemo(
    () => ({ ...baseInputs, salarySacrifice: packageAmount }),
    [baseInputs, packageAmount]
  );

  const base = useMemo(() => calculate(baseInputs), [baseInputs]);
  const packaged = useMemo(() => calculate(packagedInputs), [packagedInputs]);

  const taxSaving = base.incomeTax - packaged.incomeTax;
  const medicareSaving = base.medicare - packaged.medicare;
  const totalSaving = taxSaving + medicareSaving;
  const effectiveBenefit = packageAmount + totalSaving; // employer cost (pre-tax) + tax saved
  const selectedPackage = packageOptions.find((p) => p.value === packageType)!;
  const overCap = selectedPackage.hasCap && packageAmount > (selectedPackage.cap ?? 0);

  return (
    <section aria-labelledby="pkg-calc-heading" className="card not-prose">
      <h2 id="pkg-calc-heading" className="sr-only">Salary packaging and novated lease calculator</h2>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="pkg-gross" className="label">Gross salary (annual)</label>
            <div className="flex items-stretch gap-2">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-400 bg-ink-100 px-3 text-ink-700">$</span>
              <input
                id="pkg-gross"
                type="number"
                inputMode="decimal"
                min={0}
                step="1000"
                className="input rounded-l-none"
                value={Number.isFinite(gross) ? gross : ''}
                onChange={(e) => setGross(parseFloat(e.target.value) || 0)}
              />
            </div>
            <p className="help">Total package value before any pre-tax deductions.</p>
          </div>
          <div>
            <label htmlFor="pkg-fy" className="label">Financial year</label>
            <select
              id="pkg-fy"
              className="input"
              value={fy}
              onChange={(e) => setFy(e.target.value as FinancialYear)}
            >
              {fyOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <p className="help">Tax brackets and FBT rate depend on the financial year.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="pkg-residency" className="label">Residency</label>
            <select
              id="pkg-residency"
              className="input"
              value={residency}
              onChange={(e) => setResidency(e.target.value as Residency)}
            >
              {residencyOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <p className="help">Non-residents and working holiday makers have different marginal rates and no Medicare levy.</p>
          </div>
          <div>
            <label htmlFor="pkg-amount" className="label">Annual package amount</label>
            <div className="flex items-stretch gap-2">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-400 bg-ink-100 px-3 text-ink-700">$</span>
              <input
                id="pkg-amount"
                type="number"
                inputMode="decimal"
                min={0}
                step="500"
                className="input rounded-l-none"
                value={Number.isFinite(packageAmount) ? packageAmount : ''}
                onChange={(e) => setPackageAmount(parseFloat(e.target.value) || 0)}
              />
            </div>
            <p className="help">How much of your package you are putting into the chosen benefit per year.</p>
          </div>
        </div>

        <div>
          <label className="label">What you are packaging</label>
          <div className="mt-2 space-y-2">
            {packageOptions.map((opt) => (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition ${
                  packageType === opt.value
                    ? 'border-ledger-500 bg-ink-100'
                    : 'border-ink-300 hover:border-ink-400'
                }`}
              >
                <input
                  type="radio"
                  name="packageType"
                  value={opt.value}
                  checked={packageType === opt.value}
                  onChange={() => setPackageType(opt.value)}
                  className="mt-1 h-4 w-4 border-ink-400 text-ledger-500 focus:ring-ledger-500"
                />
                <div>
                  <p className="text-sm font-semibold text-ink-800">{opt.label}</p>
                  <p className="mt-0.5 text-xs text-ink-600">{opt.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-12">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-ink-800">Your package impact</h3>
          <span className="chip">FY {fy}</span>
        </div>

        <div className="result-row border-b border-ink-300">
          <span className="result-label">Income tax (no package)</span>
          <span className="result-value">{formatAUD(base.incomeTax)}</span>
        </div>
        <div className="result-row border-b border-ink-300">
          <span className="result-label">Income tax (with package)</span>
          <span className="result-value result-value-deduction">{formatAUD(packaged.incomeTax)}</span>
        </div>
        <div className="result-row border-b border-ink-300">
          <span className="result-label">Medicare levy (no package)</span>
          <span className="result-value">{formatAUD(base.medicare)}</span>
        </div>
        <div className="result-row border-b border-ink-300">
          <span className="result-label">Medicare levy (with package)</span>
          <span className="result-value result-value-deduction">{formatAUD(packaged.medicare)}</span>
        </div>

        {/* Highlight the savings */}
        <div className="mt-4 rounded-lg border border-ledger-500 bg-ink-100 p-4">
          <p className="kicker">Total tax saved</p>
          <p className="mt-1 text-3xl font-bold text-ledger-500">{formatAUD(totalSaving)}</p>
          <p className="mt-1 text-sm text-ink-700">
            per year, by sacrificing {formatAUD(packageAmount)} pre-tax instead of post-tax.
          </p>
        </div>

        {selectedPackage.hasCap && (
          <div className="mt-3 text-xs text-ink-600">
            Concessional contributions cap: {formatAUD(selectedPackage.cap ?? 0)} per FY.
            {overCap ? (
              <span className="ml-1 text-danger-500">
                You are {formatAUD(packageAmount - (selectedPackage.cap ?? 0))} over. Excess is taxed at your top marginal rate.
              </span>
            ) : (
              <span className="ml-1">
                You are {formatAUD((selectedPackage.cap ?? 0) - packageAmount)} under the cap.
              </span>
            )}
          </div>
        )}

        <div className="mt-4 rounded-lg border border-ink-300 bg-ink-100 p-4 text-sm text-ink-700">
          <p className="kicker">FBT note for {selectedPackage.label.toLowerCase()}</p>
          <p className="mt-2">{selectedPackage.fbt}</p>
          {packageType === 'novated-lease' && (
            <p className="mt-2">
              The employer effectively pays the FBT out of your total package, so a
              $20,000 novated lease with FBT might cost you $15,000-$17,000 of take-home
              reduction depending on the car's FBT taxable value. Get a quote from a
              novated lease provider for the exact figure.
            </p>
          )}
        </div>

        <div className="mt-3 grid gap-2 text-xs text-ink-500 sm:grid-cols-3">
          <div>
            <p className="font-mono">Net pay (no package)</p>
            <p className="font-mono text-sm text-ink-700">{formatAUD(base.net)}</p>
          </div>
          <div>
            <p className="font-mono">Net pay (with package)</p>
            <p className="font-mono text-sm text-ink-700">{formatAUD(packaged.net)}</p>
          </div>
          <div>
            <p className="font-mono">Take-home change</p>
            <p className="font-mono text-sm text-ink-700">{formatAUD(packaged.net - base.net)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
