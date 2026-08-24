'use client';

import { useMemo, useState } from 'react';
import { amortize, formatYearsMonths, formatAUD, formatAUD0 } from '@/lib/tax/amortize';
import { LineChart } from '@/components/LineChart';

export function LoanPayoffCalculator() {
  const [balance, setBalance] = useState<number>(25000);
  const [rate, setRate] = useState<number>(11.0);
  const [payment, setPayment] = useState<number>(500);
  const [extraMonthly, setExtraMonthly] = useState<number>(200);
  const [redundancy, setRedundancy] = useState<number>(0);

  const base = useMemo(
    () => amortize({ principal: balance, annualRate: rate, termMonths: 12 * 30, monthlyPayment: payment, extraMonthly: 0 }),
    [balance, rate, payment],
  );
  const withExtra = useMemo(
    () => amortize({ principal: balance, annualRate: rate, termMonths: 12 * 30, monthlyPayment: payment, extraMonthly }),
    [balance, rate, payment, extraMonthly],
  );
  // Redundancy: assume a lump-sum payment at month 0, just apply it to the balance.
  const withRedundancyBalance = Math.max(0, balance - redundancy);
  const withRedundancy = useMemo(
    () => amortize({ principal: withRedundancyBalance, annualRate: rate, termMonths: 12 * 30, monthlyPayment: payment, extraMonthly }),
    [withRedundancyBalance, rate, payment, extraMonthly],
  );

  const interestSaved = base.totalInterest - withExtra.totalInterest;
  const monthsSaved = base.monthsToPayoff - withExtra.monthsToPayoff;
  const baseMonthlyInterest = (balance * (rate / 100)) / 12;
  const paymentCoversInterest = payment > baseMonthlyInterest;

  return (
    <section aria-labelledby="loan-calc-heading" className="card not-prose">
      <h2 id="loan-calc-heading" className="sr-only">Loan payoff calculator</h2>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="lp-balance" className="label">Current loan balance</label>
            <div className="flex items-stretch gap-2">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-ink-50 px-3 text-ink-600">$</span>
              <input
                id="lp-balance"
                type="number"
                min={0}
                step="100"
                className="input rounded-l-none"
                value={Number.isFinite(balance) ? balance : ''}
                onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="lp-rate" className="label">Interest rate (% p.a.)</label>
            <input
              id="lp-rate"
              type="number"
              min={0}
              max={30}
              step="0.1"
              className="input"
              value={Number.isFinite(rate) ? rate : ''}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            />
            <p className="help">Credit cards are typically 18–22%. Personal loans 9–14%. Mortgages 5–7%.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="lp-payment" className="label">Current monthly payment</label>
            <div className="flex items-stretch gap-2">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-ink-50 px-3 text-ink-600">$</span>
              <input
                id="lp-payment"
                type="number"
                min={0}
                step="50"
                className="input rounded-l-none"
                value={Number.isFinite(payment) ? payment : ''}
                onChange={(e) => setPayment(parseFloat(e.target.value) || 0)}
              />
            </div>
            <p className="help">If less than {formatAUD(baseMonthlyInterest)} of monthly interest, the loan will grow.</p>
          </div>
          <div>
            <label htmlFor="lp-extra" className="label">Extra monthly payment</label>
            <div className="flex items-stretch gap-2">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-ink-50 px-3 text-ink-600">$</span>
              <input
                id="lp-extra"
                type="number"
                min={0}
                step="50"
                className="input rounded-l-none"
                value={Number.isFinite(extraMonthly) ? extraMonthly : ''}
                onChange={(e) => setExtraMonthly(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="lp-redundancy" className="label">Lump sum (e.g. redundancy payout), optional</label>
          <div className="flex items-stretch gap-2">
            <span className="inline-flex items-center rounded-l-lg border border-r-0 border-ink-200 bg-ink-50 px-3 text-ink-600">$</span>
            <input
              id="lp-redundancy"
              type="number"
              min={0}
              step="100"
              className="input rounded-l-none"
              value={Number.isFinite(redundancy) ? redundancy : ''}
              onChange={(e) => setRedundancy(parseFloat(e.target.value) || 0)}
            />
          </div>
          <p className="help">A one-off payment applied to the balance, useful for modelling a redundancy payout, bonus, or inheritance.</p>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="mb-1 text-base font-semibold text-ink-900">With current payment of {formatAUD(payment)}/month</h3>

        {!paymentCoversInterest && (
          <p className="mt-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-200">
            Your monthly payment is less than the monthly interest ({formatAUD(baseMonthlyInterest)}). At this rate the balance will grow, not shrink. Increase the payment or the loan term runs out before the balance is paid off.
          </p>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-600">Payoff time</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-ink-900">
              {base.monthsToPayoff > 12 * 30 ? '30+ years' : formatYearsMonths(base.monthsToPayoff)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-600">Total interest</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-ink-900">
              {formatAUD0(base.totalInterest)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-600">Total cost</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-ink-900">
              {formatAUD0(base.totalPaid)}
            </p>
          </div>
        </div>
      </div>

      {(extraMonthly > 0 || redundancy > 0) && (
        <div className="mt-12">
          <h3 className="text-base font-semibold text-emerald-900 dark:text-emerald-200">
            Savings {redundancy > 0 ? `with lump sum + ${formatAUD(extraMonthly)}/month extra` : `with ${formatAUD(extraMonthly)} extra per month`}
          </h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">New payoff time</p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-emerald-900 dark:text-emerald-200">
                {formatYearsMonths(withRedundancy.monthsToPayoff)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Time saved</p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-emerald-900 dark:text-emerald-200">
                {formatYearsMonths(Math.max(0, monthsSaved))}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">New total interest</p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-emerald-900 dark:text-emerald-200">
                {formatAUD0(withRedundancy.totalInterest)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Interest saved</p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-emerald-900 dark:text-emerald-200">
                {formatAUD0(Math.max(0, base.totalInterest - withRedundancy.totalInterest))}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loan balance over time chart */}
      <div className="mt-8">
        <h4 className="mb-3 text-sm font-semibold text-ink-900">Loan balance over time</h4>
        <LineChart
          series={[
            {
              name: 'Current payment',
              color: 'var(--brand-500)',
              points: monthlyYearlyBalances(base.schedule, balance),
            },
            ...(extraMonthly > 0 || redundancy > 0
              ? [
                  {
                    name: 'With extra / lump sum',
                    color: 'var(--ledger-500)',
                    points: monthlyYearlyBalances(withRedundancy.schedule, withRedundancyBalance),
                  },
                ]
              : []),
          ]}
          xLabel="Year"
          yLabel="Balance"
          xFormat={(v) => `Y${v}`}
          caption="A steeper drop means faster payoff. Watch the two lines diverge over time — that gap is the interest you save."
        />
      </div>
    </section>
  );
}

/** Sample a monthly amortization schedule to one point per year, plus the starting point. */
function monthlyYearlyBalances(
  schedule: ReturnType<typeof amortize>['schedule'],
  startBalance: number,
): Array<{ x: number; y: number }> {
  const points = [{ x: 0, y: startBalance }];
  for (let year = 1; year <= Math.ceil(schedule.length / 12); year++) {
    const lastMonthOfYear = schedule[Math.min(year * 12, schedule.length) - 1];
    if (lastMonthOfYear) points.push({ x: year, y: lastMonthOfYear.closingBalance });
    else break;
  }
  return points;
}
