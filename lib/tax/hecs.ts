// HECS-HELP / VSL / TSL / SSL / SFSS compulsory repayment.
//
// Source: ATO "Study and training loan repayment thresholds and rates"
// https://www.ato.gov.au/tax-rates-and-codes/study-and-training-support-loans-rates-and-repayment-thresholds
//
// System history:
// - FY 2024-25 and earlier: FLAT-RATE system. The bracket rate applies to the
//   WHOLE repayment income. 19 brackets, rates 0%-10%.
// - FY 2025-26 onwards: MARGINAL system. Each bracket rate applies only to
//   the income WITHIN that band (like income tax). 4 brackets, 0%/15%/17%/10%.
//
// Repayment is calculated on "repayment income" = taxable income + reportable
// fringe benefits + reportable employer super contributions + total net
// investment loss + exempt foreign employment income.

export interface HecsBand {
  /** Lower bound of this band (the upper bound is the next band's threshold). */
  threshold: number;
  /** Rate applied in this band. For flat-rate system, applies to whole income. */
  rate: number;
}

export type HecsSystem = 'flat' | 'marginal';

/**
 * FY 2024-25 (and earlier) FLAT-RATE system.
 * Rate applies to the WHOLE repayment income, not just the slice in the band.
 * Source: ATO Table 3 — 2024-25 repayment income thresholds and rates.
 */
export const hecsFlatBands: Record<string, HecsBand[]> = {
  '2024-25': [
    { threshold: 0, rate: 0 },
    { threshold: 54435, rate: 0.01 },
    { threshold: 62851, rate: 0.02 },
    { threshold: 66621, rate: 0.025 },
    { threshold: 70619, rate: 0.03 },
    { threshold: 74856, rate: 0.035 },
    { threshold: 79347, rate: 0.04 },
    { threshold: 84108, rate: 0.045 },
    { threshold: 89155, rate: 0.05 },
    { threshold: 94504, rate: 0.055 },
    { threshold: 100175, rate: 0.06 },
    { threshold: 106186, rate: 0.065 },
    { threshold: 112557, rate: 0.07 },
    { threshold: 119310, rate: 0.075 },
    { threshold: 126468, rate: 0.08 },
    { threshold: 134057, rate: 0.085 },
    { threshold: 142101, rate: 0.09 },
    { threshold: 150627, rate: 0.095 },
    { threshold: 159664, rate: 0.10 },
  ],
};

/**
 * FY 2025-26 onwards MARGINAL system (like income tax).
 * Each band rate applies only to the slice of income within that band.
 * Source: ATO Tables 1 & 2 — 2025-26 and 2026-27 repayment thresholds and rates.
 */
export const hecsMarginalBands: Record<string, HecsBand[]> = {
  '2025-26': [
    { threshold: 0, rate: 0 },
    { threshold: 67000, rate: 0.15 },
    { threshold: 125000, rate: 0.17 },
    { threshold: 179285, rate: 0.10 },
  ],
  '2026-27': [
    { threshold: 0, rate: 0 },
    { threshold: 69528, rate: 0.15 },
    { threshold: 129717, rate: 0.17 },
    { threshold: 186050, rate: 0.10 },
  ],
  // 2027-28 estimated by 3.8% WPI indexation (matching 2025-26→2026-27 uplift).
  // Update the day ATO publishes actual figures (typically late June).
  '2027-28': [
    { threshold: 0, rate: 0 },
    { threshold: 72170, rate: 0.15 },
    { threshold: 134644, rate: 0.17 },
    { threshold: 193120, rate: 0.10 },
  ],
};

/**
 * Backwards-compatible single export used by the UI.
 * 2024-25 and earlier: flat-rate system.
 * 2025-26 onwards: marginal system.
 */
export const hecsBands: Record<string, HecsBand[]> = {
  ...hecsFlatBands,
  ...hecsMarginalBands,
};

/**
 * Identify which system applies to a given FY.
 */
export function hecsSystemForFy(fy: string): HecsSystem {
  if (hecsFlatBands[fy]) return 'flat';
  if (hecsMarginalBands[fy]) return 'marginal';
  return 'marginal'; // default to current
}

/**
 * First HECS threshold (the income at which compulsory repayment starts) for a
 * given FY, regardless of system.
 */
export function hecsFirstThreshold(fy: string): number {
  const flat = hecsFlatBands[fy];
  if (flat) return flat[1]?.threshold ?? 0;
  const marginal = hecsMarginalBands[fy];
  if (marginal) return marginal[1]?.threshold ?? 0;
  return 67000;
}

/**
 * Calculate the HECS-HELP repayment for the FY under the correct system.
 * - FY 2024-25 and earlier: flat rate of the highest matching band applied to whole income.
 * - FY 2025-26 onwards: marginal method (rate applies to slice of income in each band).
 */
export function hecsRepayment(repaymentIncome: number, fy: string): number {
  const system = hecsSystemForFy(fy);
  if (system === 'flat') {
    const bands = hecsFlatBands[fy] ?? hecsFlatBands['2024-25'];
    if (repaymentIncome <= bands[1].threshold) return 0;
    // Flat system: apply the rate of the highest band where income > threshold
    // to the WHOLE income.
    let rate = 0;
    for (const band of bands) {
      if (repaymentIncome > band.threshold) {
        rate = band.rate;
      }
    }
    return repaymentIncome * rate;
  }
  // Marginal system
  const bands = hecsMarginalBands[fy] ?? hecsMarginalBands['2026-27'];
  if (repaymentIncome <= bands[1].threshold) return 0;
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
 * Simplified reference schedule used by paycalculator.com.au (4 brackets,
 * marginal method). Matches the ATO 2025-26+ system closely in dollar terms
 * at most incomes. Kept for comparison only — the ATO's actual marginal
 * schedule is what your employer withholds.
 */
export const paycalculatorHecsBands: HecsBand[] = [
  { threshold: 0, rate: 0 },
  { threshold: 69528, rate: 0.15 },
  { threshold: 129717, rate: 0.17 },
  { threshold: 186050, rate: 0.10 },
];

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
  /**
   * Which system's bands to use for the projection. Default 'ato' uses the
   * actual ATO schedule for the given FY. 'paycalculator' uses the
   * simplified 4-bracket reference schedule.
   */
  systemOverride?: 'ato' | 'paycalculator';
}

/**
 * HECS repayment for a given income against a custom band set, using the
 * marginal method (works for the ATO's 2025-26+ schedule and the paycalculator
 * 4-bracket reference — both are marginal).
 */
function hecsRepaymentMarginalCustom(
  repaymentIncome: number,
  bands: HecsBand[],
): number {
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
 * The bands must be a marginal schedule (not flat-rate) for the math to be
 * correct.
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
    const compulsory = hecsRepaymentMarginalCustom(currentIncome, bands);
    let voluntary = voluntaryAnnual;
    let repayment = compulsory + voluntary;
    const ending = starting + indexation - repayment;
    if (ending < 0) {
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
  const bands =
    options.systemOverride === 'paycalculator'
      ? paycalculatorHecsBands
      : (hecsMarginalBands[fy] ?? hecsMarginalBands['2026-27']);
  return projectPayoffWithBands(
    startingBalance,
    repaymentIncome,
    indexationRate,
    options,
    bands,
  );
}
