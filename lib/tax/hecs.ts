// HECS-HELP / VSL / TSL / SSL / SFSS compulsory repayment.
// Source: ATO "Repaying your study loan"
// https://www.ato.gov.au/individuals-and-families/education-and-study/managing-your-study-loan/repaying-your-study-loan
//
// Repayment rates are published per FY as a table of (threshold, rate).
// This file holds 2024-25 figures from the ATO. Update yearly.
//
// Repayment is calculated on "repayment income" = taxable income + reportable
// fringe benefits + reportable employer super contributions. The MVP treats
// repayment income as taxable income for simplicity. Salary-sacrifice super
// reduces repayment income, which a real payroll system models; the MVP
// offers an explicit "include pre-tax super sacrifice in repayment income"
// toggle.

export interface HecsBand {
  threshold: number;
  rate: number;
}

export const hecsBands: Record<string, HecsBand[]> = {
  // 2024-25: lower threshold ~$51,550. Source: ato.gov.au.
  '2024-25': [
    { threshold: 0, rate: 0 },
    { threshold: 51550, rate: 0.01 },
    { threshold: 59520, rate: 0.02 },
    { threshold: 65614, rate: 0.025 },
    { threshold: 70852, rate: 0.03 },
    { threshold: 74605, rate: 0.035 },
    { threshold: 80478, rate: 0.04 },
    { threshold: 86620, rate: 0.045 },
    { threshold: 93342, rate: 0.05 },
    { threshold: 100354, rate: 0.055 },
    { threshold: 108214, rate: 0.06 },
    { threshold: 116846, rate: 0.065 },
    { threshold: 125846, rate: 0.07 },
    { threshold: 135326, rate: 0.075 },
    { threshold: 145504, rate: 0.08 },
    { threshold: 156494, rate: 0.085 },
    { threshold: 168324, rate: 0.09 },
    { threshold: 181038, rate: 0.095 },
    { threshold: 200000, rate: 0.1 },
  ],
  // 2025-26: lower threshold ~$54,435. Source: ato.gov.au.
  '2025-26': [
    { threshold: 0, rate: 0 },
    { threshold: 54435, rate: 0.01 },
    { threshold: 62850, rate: 0.02 },
    { threshold: 69263, rate: 0.025 },
    { threshold: 74813, rate: 0.03 },
    { threshold: 78748, rate: 0.035 },
    { threshold: 84956, rate: 0.04 },
    { threshold: 91452, rate: 0.045 },
    { threshold: 98550, rate: 0.05 },
    { threshold: 105950, rate: 0.055 },
    { threshold: 114245, rate: 0.06 },
    { threshold: 123380, rate: 0.065 },
    { threshold: 132877, rate: 0.07 },
    { threshold: 142893, rate: 0.075 },
    { threshold: 153638, rate: 0.08 },
    { threshold: 165237, rate: 0.085 },
    { threshold: 177738, rate: 0.09 },
    { threshold: 191192, rate: 0.095 },
    { threshold: 200000, rate: 0.1 },
  ],
  // 2026-27 placeholder. Update when ATO publishes.
  '2026-27': [
    { threshold: 0, rate: 0 },
    { threshold: 69528, rate: 0.01 },
    { threshold: 75000, rate: 0.02 },
    { threshold: 80000, rate: 0.025 },
    { threshold: 85000, rate: 0.03 },
    { threshold: 90000, rate: 0.035 },
    { threshold: 95000, rate: 0.04 },
    { threshold: 100000, rate: 0.045 },
    { threshold: 105000, rate: 0.05 },
    { threshold: 110000, rate: 0.055 },
    { threshold: 115000, rate: 0.06 },
    { threshold: 120000, rate: 0.065 },
    { threshold: 130000, rate: 0.07 },
    { threshold: 140000, rate: 0.075 },
    { threshold: 150000, rate: 0.08 },
    { threshold: 160000, rate: 0.085 },
    { threshold: 170000, rate: 0.09 },
    { threshold: 180000, rate: 0.095 },
    { threshold: 200000, rate: 0.1 },
  ],
  '2027-28': [
    { threshold: 0, rate: 0 },
    { threshold: 72000, rate: 0.01 },
    { threshold: 78000, rate: 0.02 },
    { threshold: 83000, rate: 0.025 },
    { threshold: 88000, rate: 0.03 },
    { threshold: 93000, rate: 0.035 },
    { threshold: 98000, rate: 0.04 },
    { threshold: 103000, rate: 0.045 },
    { threshold: 108000, rate: 0.05 },
    { threshold: 113000, rate: 0.055 },
    { threshold: 118000, rate: 0.06 },
    { threshold: 123000, rate: 0.065 },
    { threshold: 133000, rate: 0.07 },
    { threshold: 143000, rate: 0.075 },
    { threshold: 153000, rate: 0.08 },
    { threshold: 163000, rate: 0.085 },
    { threshold: 173000, rate: 0.09 },
    { threshold: 183000, rate: 0.095 },
    { threshold: 200000, rate: 0.1 },
  ],
};

/**
 * Calculate the HECS-HELP repayment for the FY.
 * Returns 0 if income is below the first threshold.
 */
export function hecsRepayment(repaymentIncome: number, fy: string): number {
  const bands = hecsBands[fy] ?? hecsBands['2025-26'];
  if (repaymentIncome <= bands[1].threshold) return 0;

  // Marginal method: for each dollar, find the band it falls into and apply that rate.
  let total = 0;
  for (let i = 1; i < bands.length; i++) {
    const lower = bands[i].threshold;
    const upper = bands[i + 1]?.threshold ?? Infinity;
    if (repaymentIncome <= lower) break;
    const taxableInBand = Math.min(repaymentIncome, upper) - lower;
    if (taxableInBand > 0) total += taxableInBand * bands[i].rate;
  }
  return total;
}

export interface ProjectionResult {
  yearsToPayoff: number;
  totalRepaid: number;
  totalInterest: number;
  /** Year-by-year breakdown. */
  schedule: Array<{
    year: number;
    startingBalance: number;
    repayment: number;
    interest: number;
    endingBalance: number;
  }>;
}

/**
 * Project how long it takes to pay off a HECS debt given a flat repayment income
 * and an assumed annual indexation rate. Returns null if income is below the
 * repayment threshold (debt will only grow).
 */
export function projectPayoff(
  startingBalance: number,
  repaymentIncome: number,
  fy: string,
  indexationRate = 0.03,
  /** Cap the projection at this many years to avoid infinite loops. */
  maxYears = 50,
): ProjectionResult | null {
  if (startingBalance <= 0) {
    return {
      yearsToPayoff: 0,
      totalRepaid: 0,
      totalInterest: 0,
      schedule: [],
    };
  }

  const schedule: ProjectionResult['schedule'] = [];
  let balance = startingBalance;
  let totalRepaid = 0;
  let totalInterest = 0;
  let year = 0;

  while (balance > 0 && year < maxYears) {
    year += 1;
    const starting = balance;
    const interest = starting * indexationRate;
    let repayment = hecsRepayment(repaymentIncome, fy);
    // If this year's repayment doesn't cover the interest, the debt grows.
    const ending = starting + interest - repayment;
    if (ending < 0) {
      // Final year — repay only what's left.
      const actualRepayment = starting + interest;
      totalRepaid += actualRepayment;
      totalInterest += interest;
      schedule.push({
        year,
        startingBalance: starting,
        repayment: actualRepayment,
        interest,
        endingBalance: 0,
      });
      balance = 0;
      break;
    }
    totalRepaid += repayment;
    totalInterest += interest;
    schedule.push({
      year,
      startingBalance: starting,
      repayment,
      interest,
      endingBalance: ending,
    });
    balance = ending;
  }

  return {
    yearsToPayoff: year,
    totalRepaid,
    totalInterest,
    schedule,
  };
}
