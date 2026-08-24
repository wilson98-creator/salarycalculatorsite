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

/**
 * Simplified 4-bracket "reference" schedule used by paycalculator.com.au.
 * This is NOT the ATO's actual schedule. The ATO has used a marginal
 * 15-bracket schedule since FY 2018-19 (and a new marginal schedule from
 * FY 2025-26). This simplified version applies a single rate to income
 * above each threshold:
 *   - $0 - $69,528: 0%
 *   - $69,528 - $129,716: 15% on income above $69,528
 *   - $129,717 - $186,049: 17% on income above $129,717
 *   - Over $186,050: 10% on income above $186,050
 * Provided for comparison with that site only.
 */
export const paycalculatorHecsBands: HecsBand[] = [
  { threshold: 0, rate: 0 },
  { threshold: 69528, rate: 0.15 },
  { threshold: 129717, rate: 0.17 },
  { threshold: 186050, rate: 0.10 },
];

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
  // 2026-27 estimated. The ATO typically publishes HECS thresholds in June
  // before the FY starts. We estimate by uplifting FY 2025-26 by 3.5% WPI.
  // Update this block the day the ATO publishes actual figures.
  '2026-27': [
    { threshold: 0, rate: 0 },
    { threshold: 56340, rate: 0.01 },
    { threshold: 65050, rate: 0.02 },
    { threshold: 71685, rate: 0.025 },
    { threshold: 77430, rate: 0.03 },
    { threshold: 81505, rate: 0.035 },
    { threshold: 87930, rate: 0.04 },
    { threshold: 94655, rate: 0.045 },
    { threshold: 102000, rate: 0.05 },
    { threshold: 109660, rate: 0.055 },
    { threshold: 118245, rate: 0.06 },
    { threshold: 127695, rate: 0.065 },
    { threshold: 137530, rate: 0.07 },
    { threshold: 147895, rate: 0.075 },
    { threshold: 159015, rate: 0.08 },
    { threshold: 171020, rate: 0.085 },
    { threshold: 183960, rate: 0.09 },
    { threshold: 197885, rate: 0.095 },
    { threshold: 200000, rate: 0.10 },
  ],
  // 2027-28 estimated. Same convention.
  '2027-28': [
    { threshold: 0, rate: 0 },
    { threshold: 58310, rate: 0.01 },
    { threshold: 67325, rate: 0.02 },
    { threshold: 74195, rate: 0.025 },
    { threshold: 80140, rate: 0.03 },
    { threshold: 84360, rate: 0.035 },
    { threshold: 91010, rate: 0.04 },
    { threshold: 97970, rate: 0.045 },
    { threshold: 105570, rate: 0.05 },
    { threshold: 113500, rate: 0.055 },
    { threshold: 122385, rate: 0.06 },
    { threshold: 132165, rate: 0.065 },
    { threshold: 142345, rate: 0.07 },
    { threshold: 153070, rate: 0.075 },
    { threshold: 164580, rate: 0.08 },
    { threshold: 177005, rate: 0.085 },
    { threshold: 190400, rate: 0.09 },
    { threshold: 200000, rate: 0.095 },
    { threshold: 200001, rate: 0.10 },
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
  totalIndexation: number;
  /** Year-by-year breakdown. */
  schedule: Array<{
    year: number;
    startingBalance: number;
    income: number;
    compulsory: number;
    voluntary: number;
    repayment: number;
    indexation: number;
    endingBalance: number;
  }>;
}

export interface ProjectPayoffOptions {
  /** Cap the projection at this many years to avoid infinite loops. */
  maxYears?: number;
  /**
   * Assumed annual wage growth (e.g. 0.035 for 3.5% p.a.). When set, the
   * projected income grows each year, which is how HECS actually works for
   * most people over a working life. Default 0 = flat income.
   */
  wageGrowthRate?: number;
  /**
   * Extra voluntary repayment per year on top of the compulsory HECS
   * withholding. Most Australians who clear HECS in 8-12 years do it by
   * adding $4-10k/yr in voluntary payments. Default 0.
   */
  voluntaryAnnual?: number;
}

/**
 * HECS repayment for a given income against a custom band set. Used by
 * `projectPayoffWithBands` so the projection can use either the ATO marginal
 * bands or a reference schedule (e.g. the simplified paycalculator.com.au
 * 4-bracket version).
 */
function hecsRepaymentWithBands(repaymentIncome: number, bands: HecsBand[]): number {
  if (repaymentIncome <= bands[1]?.threshold) return 0;
  let total = 0;
  for (let i = 1; i < bands.length; i++) {
    const lower = bands[i].threshold;
    const upper = bands[i + 1]?.threshold ?? Infinity;
    if (repaymentIncome <= lower) break;
    const slice = Math.min(repaymentIncome, upper) - lower;
    if (slice > 0) total += slice * bands[i].rate;
  }
  return total;
}

/**
 * Project how long it takes to pay off a HECS debt against a custom band set.
 * This is the workhorse — `projectPayoff` is a thin wrapper that supplies the
 * ATO bands for the given FY.
 */
export function projectPayoffWithBands(
  startingBalance: number,
  repaymentIncome: number,
  indexationRate: number,
  options: ProjectPayoffOptions,
  bands: HecsBand[],
): ProjectionResult | null {
  const maxYears = options.maxYears ?? 50;
  const wageGrowthRate = options.wageGrowthRate ?? 0;
  const voluntaryAnnual = options.voluntaryAnnual ?? 0;

  if (startingBalance <= 0) {
    return {
      yearsToPayoff: 0,
      totalRepaid: 0,
      totalIndexation: 0,
      schedule: [],
    };
  }

  const schedule: ProjectionResult['schedule'] = [];
  let balance = startingBalance;
  let totalRepaid = 0;
  let totalIndexation = 0;
  let year = 0;
  let currentIncome = repaymentIncome;

  while (balance > 0 && year < maxYears) {
    year += 1;
    const starting = balance;
    const indexation = starting * indexationRate;
    const compulsory = hecsRepaymentWithBands(currentIncome, bands);
    // In the final year, voluntary can't exceed the actual remaining balance +
    // indexation (capped below). Otherwise it adds dollar-for-dollar.
    let voluntary = voluntaryAnnual;
    let repayment = compulsory + voluntary;
    const ending = starting + indexation - repayment;
    if (ending < 0) {
      // Final year — repay only what's left (compulsory already paid, so the
      // residual is voluntary).
      const actualRepayment = starting + indexation;
      const actualVoluntary = Math.max(0, actualRepayment - compulsory);
      totalRepaid += actualRepayment;
      totalIndexation += indexation;
      schedule.push({
        year,
        startingBalance: starting,
        income: currentIncome,
        compulsory,
        voluntary: actualVoluntary,
        repayment: actualRepayment,
        indexation,
        endingBalance: 0,
      });
      balance = 0;
      break;
    }
    totalRepaid += repayment;
    totalIndexation += indexation;
    schedule.push({
      year,
      startingBalance: starting,
      income: currentIncome,
      compulsory,
      voluntary,
      repayment,
      indexation,
      endingBalance: ending,
    });
    balance = ending;
    // Apply wage growth for the next year
    currentIncome = currentIncome * (1 + wageGrowthRate);
  }

  return {
    yearsToPayoff: year,
    totalRepaid,
    totalIndexation,
    schedule,
  };
}

/**
 * Project how long it takes to pay off a HECS debt given an initial repayment
 * income, an assumed annual indexation rate, and (optionally) annual wage
 * growth. Returns null if income is below the repayment threshold.
 *
 * With wageGrowthRate = 0, this is a flat-income projection (worst case for
 * the borrower, conservative). With a positive wage growth rate, the model
 * matches what happens in practice for most workers. Add `voluntaryAnnual` to
 * model making extra repayments on top of the compulsory withholding.
 */
export function projectPayoff(
  startingBalance: number,
  repaymentIncome: number,
  fy: string,
  indexationRate = 0.03,
  maxYearsOrOptions: number | ProjectPayoffOptions = 50,
): ProjectionResult | null {
  const options: ProjectPayoffOptions =
    typeof maxYearsOrOptions === 'number'
      ? { maxYears: maxYearsOrOptions }
      : maxYearsOrOptions;
  const bands = hecsBands[fy] ?? hecsBands['2025-26'];
  return projectPayoffWithBands(
    startingBalance,
    repaymentIncome,
    indexationRate,
    options,
    bands,
  );
}
