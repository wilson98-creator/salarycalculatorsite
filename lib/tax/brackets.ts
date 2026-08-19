// Australian resident personal income tax brackets, by financial year.
// Source: ATO "Tax rates – Australian residents"
// https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents
//
// These rates exclude the Medicare levy. Medicare is computed separately in
// ./medicare.ts. Offsets (LITO, SAPTO) are applied separately.
//
// Always use a "current" FY flag and a known-coefficient lookup so the
// calculator can be updated by changing this file and bumping `lastReviewed`.

export type FinancialYear =
  | '2024-25'
  | '2025-26'
  | '2026-27'
  | '2027-28';

export interface TaxBracket {
  /** Upper bound of this bracket (AUD, inclusive). The last bracket has min=null = no upper. */
  min: number;
  max: number | null;
  /** Marginal rate applied to income within (min, max]. */
  rate: number;
  /** Base tax payable at `min` (cumulative tax at the bottom of the bracket). */
  base: number;
  /** Plain-English description of the bracket. */
  label: string;
}

/**
 * Resident brackets. Order: ascending.
 * Source: ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents
 */
export const residentBrackets: Record<FinancialYear, TaxBracket[]> = {
  // Pre-Stage 3. Kept for historical comparisons and the "previous FY" view.
  '2024-25': [
    { min: 0, max: 18200, rate: 0, base: 0, label: '$0 – $18,200 (0%)' },
    { min: 18201, max: 45000, rate: 0.16, base: 0, label: '$18,201 – $45,000 (16%)' },
    { min: 45001, max: 135000, rate: 0.3, base: 4288, label: '$45,001 – $135,000 (30%)' },
    { min: 135001, max: 190000, rate: 0.37, base: 31288, label: '$135,001 – $190,000 (37%)' },
    { min: 190001, max: null, rate: 0.45, base: 51638, label: '$190,001+ (45%)' },
  ],
  // Current FY at time of writing.
  '2025-26': [
    { min: 0, max: 18200, rate: 0, base: 0, label: '$0 – $18,200 (0%)' },
    { min: 18201, max: 45000, rate: 0.16, base: 0, label: '$18,201 – $45,000 (16%)' },
    { min: 45001, max: 135000, rate: 0.3, base: 4288, label: '$45,001 – $135,000 (30%)' },
    { min: 135001, max: 190000, rate: 0.37, base: 31288, label: '$135,001 – $190,000 (37%)' },
    { min: 190001, max: null, rate: 0.45, base: 51638, label: '$190,001+ (45%)' },
  ],
  // Stage 3 second phase: second bracket drops 16% → 15% from 1 July 2026.
  // Source: Treasury Laws Amendment (More Cost of Living Relief) Act 2025.
  '2026-27': [
    { min: 0, max: 18200, rate: 0, base: 0, label: '$0 – $18,200 (0%)' },
    { min: 18201, max: 45000, rate: 0.15, base: 0, label: '$18,201 – $45,000 (15%)' },
    { min: 45001, max: 135000, rate: 0.3, base: 4020, label: '$45,001 – $135,000 (30%)' },
    { min: 135001, max: 190000, rate: 0.37, base: 31020, label: '$135,001 – $190,000 (37%)' },
    { min: 190001, max: null, rate: 0.45, base: 51370, label: '$190,001+ (45%)' },
  ],
  // Third phase already legislated: 15% → 14% from 1 July 2027.
  '2027-28': [
    { min: 0, max: 18200, rate: 0, base: 0, label: '$0 – $18,200 (0%)' },
    { min: 18201, max: 45000, rate: 0.14, base: 0, label: '$18,201 – $45,000 (14%)' },
    { min: 45001, max: 135000, rate: 0.3, base: 3752, label: '$45,001 – $135,000 (30%)' },
    { min: 135001, max: 190000, rate: 0.37, base: 30752, label: '$135,001 – $190,000 (37%)' },
    { min: 190001, max: null, rate: 0.45, base: 51102, label: '$190,001+ (45%)' },
  ],
};

/**
 * Foreign resident (non-resident for tax purposes) brackets.
 * Source: ATO "Tax rates – Foreign residents"
 * No tax-free threshold, no Medicare levy, no LITO.
 */
export const nonResidentBrackets: Record<FinancialYear, TaxBracket[]> = {
  '2024-25': [
    { min: 0, max: 135000, rate: 0.3, base: 0, label: '$0 – $135,000 (30%)' },
    { min: 135001, max: 190000, rate: 0.37, base: 40500, label: '$135,001 – $190,000 (37%)' },
    { min: 190001, max: null, rate: 0.45, base: 60950, label: '$190,001+ (45%)' },
  ],
  '2025-26': [
    { min: 0, max: 135000, rate: 0.3, base: 0, label: '$0 – $135,000 (30%)' },
    { min: 135001, max: 190000, rate: 0.37, base: 40500, label: '$135,001 – $190,000 (37%)' },
    { min: 190001, max: null, rate: 0.45, base: 60950, label: '$190,001+ (45%)' },
  ],
  '2026-27': [
    { min: 0, max: 135000, rate: 0.3, base: 0, label: '$0 – $135,000 (30%)' },
    { min: 135001, max: 190000, rate: 0.37, base: 40500, label: '$135,001 – $190,000 (37%)' },
    { min: 190001, max: null, rate: 0.45, base: 60950, label: '$190,001+ (45%)' },
  ],
  '2027-28': [
    { min: 0, max: 135000, rate: 0.3, base: 0, label: '$0 – $135,000 (30%)' },
    { min: 135001, max: 190000, rate: 0.37, base: 40500, label: '$135,001 – $190,000 (37%)' },
    { min: 190001, max: null, rate: 0.45, base: 60950, label: '$190,001+ (45%)' },
  ],
};

export const workingHolidayMakerRate = 0.15; // First $45,000 then resident rates; simplified for MVP.

/** Pick the right bracket set for the user's residency. */
export function getBrackets(fy: FinancialYear, residency: Residency): TaxBracket[] {
  if (residency === 'non-resident') return nonResidentBrackets[fy];
  return residentBrackets[fy];
}

export type Residency = 'resident' | 'non-resident' | 'working-holiday';

/** Resolve the financial year a given date falls into. FY runs 1 July → 30 June. */
export function financialYearForDate(date: Date = new Date()): FinancialYear {
  const y = date.getFullYear();
  const m = date.getMonth(); // 0-indexed; 6 = July
  if (m >= 6) {
    // July–Dec
    const fy = `${y}-${(y + 1).toString().slice(-2)}`;
    if (fy === '2024-25' || fy === '2025-26' || fy === '2026-27' || fy === '2027-28') {
      return fy as FinancialYear;
    }
  } else {
    // Jan–June
    const fy = `${y - 1}-${y.toString().slice(-2)}`;
    if (fy === '2024-25' || fy === '2025-26' || fy === '2026-27' || fy === '2027-28') {
      return fy as FinancialYear;
    }
  }
  // Default to the latest FY we know about.
  return '2026-27';
}
