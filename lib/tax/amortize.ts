// Amortization helpers for mortgages and personal loans.
// Pure functions, easy to unit test.

export interface AmortizationInput {
  /** Outstanding loan balance (AUD). */
  principal: number;
  /** Annual interest rate as a percentage (e.g. 6.5 for 6.5%). */
  annualRate: number;
  /** Total number of monthly payments. */
  termMonths: number;
  /** Minimum monthly payment (P&I). If 0, the minimum is calculated from the standard formula. */
  monthlyPayment: number;
  /** Optional extra payment applied every month on top of the minimum. */
  extraMonthly?: number;
}

export interface AmortizationMonth {
  month: number;
  /** Opening balance for this month. */
  openingBalance: number;
  /** Interest charged this month. */
  interest: number;
  /** Principal repaid this month. */
  principal: number;
  /** Closing balance. */
  closingBalance: number;
}

export interface AmortizationResult {
  schedule: AmortizationMonth[];
  /** Number of months until the loan is fully paid off. */
  monthsToPayoff: number;
  /** Total interest paid over the life of the loan. */
  totalInterest: number;
  /** Total amount paid (interest + principal). */
  totalPaid: number;
  /** Date the loan is paid off (rough — based on adding months to "today"). */
  payoffDate: Date;
}

const MAX_MONTHS = 12 * 80; // 80 years — sanity cap

export function amortize(input: AmortizationInput): AmortizationResult {
  const { principal, annualRate, termMonths, monthlyPayment, extraMonthly = 0 } = input;
  const r = annualRate / 100 / 12;
  const schedule: AmortizationMonth[] = [];
  let balance = principal;
  let totalInterest = 0;
  let month = 0;

  // If the caller didn't pass a minimum payment, derive it from the standard formula.
  let minPayment = monthlyPayment;
  if (minPayment <= 0 && r > 0 && termMonths > 0) {
    minPayment = (principal * r) / (1 - Math.pow(1 + r, -termMonths));
  }

  while (balance > 0.01 && month < MAX_MONTHS) {
    month += 1;
    const opening = balance;
    const interest = balance * r;
    let payment = minPayment + extraMonthly;
    let principalPaid = payment - interest;

    // If the payment is less than the interest, the loan grows — we still record it.
    if (principalPaid < 0) principalPaid = 0;

    // Don't overpay on the final month
    if (principalPaid > balance) principalPaid = balance;

    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;

    schedule.push({
      month,
      openingBalance: opening,
      interest,
      principal: principalPaid,
      closingBalance: balance,
    });
  }

  const totalPaid = principal + totalInterest;
  const today = new Date();
  const payoff = new Date(today.getFullYear(), today.getMonth() + month, today.getDate());

  return {
    schedule,
    monthsToPayoff: month,
    totalInterest,
    totalPaid,
    payoffDate: payoff,
  };
}

/** Format a number of months as "Xy Ym" (e.g. 28y 3m). */
export function formatYearsMonths(months: number): string {
  if (months <= 0) return '0m';
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m}m`;
  if (m === 0) return `${y}y`;
  return `${y}y ${m}m`;
}

/** Format currency with the given number of decimals (default 2). */
export function formatAUD(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return '—';
  return n.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Format currency with no decimals. */
export function formatAUD0(n: number): string {
  return formatAUD(n, 0);
}
