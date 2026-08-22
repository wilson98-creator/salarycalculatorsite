'use client';

import { useMemo, useState } from 'react';
import { amortize, formatYearsMonths, formatAUD, formatAUD0 } from '@/lib/tax/amortize';

export function MortgageCalculator() {
  const [principal, setPrincipal] = useState<number>(650000);
  const [rate, setRate] = useState<number>(6.25);
  const [years, setYears] = useState<number>(30);
  const [extraMonthly, setExtraMonthly] = useState<number>(0);

  const r = rate / 100 / 12;
  const termMonths = years * 12;
  const minPayment = useMemo(() => {
    if (r === 0) return principal / termMonths;
    return (principal * r) / (1 - Math.pow(1 + r, -termMonths));
  }, [principal, r, termMonths]);

  const base = useMemo(
    () => amortize({ principal, annualRate: rate, termMonths, monthlyPayment: minPayment, extraMonthly: 0 }),
    [principal, rate, termMonths, minPayment],
  );
  const withExtra = useMemo(
    () => amortize({ principal, annualRate: rate, termMonths, monthlyPayment: minPayment, extraMonthly }),
    [principal, rate, termMonths, minPayment, extraMonthly],
  );

  const interestSaved = base.totalInterest - withExtra.totalInterest;
  const monthsSaved = base.monthsToPayoff - withExtra.monthsToPayoff;

  return (
    <section aria-labelledby="mortgage-calc-heading" className="card not-prose">
      <h2 id="mortgage-calc-heading" className="sr-only">Mortgage calculator with extra payments</h2>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="loan-amount" className="label">Loan amount</label>
            <div className="flex items-stretch gap-2">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-ink-50 px-3 text-ink-600">$</span>
              <input
                id="loan-amount"
                type="number"
                min={0}
                step="1000"
                className="input rounded-l-none"
                value={Number.isFinite(principal) ? principal : ''}
                onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="loan-rate" className="label">Interest rate (% p.a.)</label>
            <input
              id="loan-rate"
              type="number"
              min={0}
              max={20}
              step="0.01"
              className="input"
              value={Number.isFinite(rate) ? rate : ''}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label htmlFor="loan-term" className="label">Loan term (years)</label>
            <input
              id="loan-term"
              type="number"
              min={1}
              max={40}
              step="1"
              className="input"
              value={Number.isFinite(years) ? years : ''}
              onChange={(e) => setYears(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="extra-payment" className="label">Extra monthly repayment (optional)</label>
          <div className="flex items-stretch gap-2">
            <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-ink-50 px-3 text-ink-600">$</span>
            <input
              id="extra-payment"
              type="number"
              min={0}
              step="50"
              className="input rounded-l-none"
              value={Number.isFinite(extraMonthly) ? extraMonthly : ''}
              onChange={(e) => setExtraMonthly(parseFloat(e.target.value) || 0)}
            />
          </div>
          <p className="help">Paid in addition to the minimum monthly repayment. Often the fastest way to cut years off your loan.</p>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="mb-1 text-base font-semibold text-ink-900">Monthly repayment</h3>
        <p className="font-mono text-3xl font-bold tabular-nums text-brand-700">
          {formatAUD(minPayment + extraMonthly)}
          <span className="ml-1 text-sm font-normal text-ink-600">/ month</span>
        </p>

        <div className="my-4 h-px bg-ink-200" />

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-600">Payoff time (minimum only)</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-ink-900">
              {formatYearsMonths(base.monthsToPayoff)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-600">Total interest (minimum only)</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-ink-900">
              {formatAUD0(base.totalInterest)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-600">Total cost of loan</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-ink-900">
              {formatAUD0(base.totalPaid)}
            </p>
          </div>
        </div>

        {extraMonthly > 0 && (
          <>
            <div className="my-4 h-px bg-ink-200" />
            <h4 className="text-sm font-semibold text-ink-900">With {formatAUD(extraMonthly)} extra per month</h4>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-600">Time saved</p>
                <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                  {formatYearsMonths(Math.max(0, monthsSaved))}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-600">Interest saved</p>
                <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                  {formatAUD0(interestSaved)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-600">New payoff time</p>
                <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-ink-900">
                  {formatYearsMonths(withExtra.monthsToPayoff)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
