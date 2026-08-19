// Common Australian Modern Awards with adult base hourly rates.
// Used by the casual pay calculator as sensible defaults — the user can
// always override the base rate for their actual classification.
//
// IMPORTANT: award rates change every 1 July when the Fair Work Commission
// announces the annual wage review. Always verify with the official Fair Work
// Pay and Conditions Tool (PACT) before relying on a specific number.
// Source: https://www.fairwork.gov.au/pay-and-wages/minimum-wages

export interface Award {
  /** Fair Work award code (e.g. MA000004). "NMW" for the national minimum wage. */
  code: string;
  /** Human-readable award name. */
  name: string;
  /** Adult base hourly rate (AUD). For classifications, this is the lowest adult level. */
  baseRate: number;
  /** Effective date for the listed rate (YYYY-MM-DD). */
  effectiveFrom: string;
  /** Casual loading percentage (typically 25%, varies by award). */
  defaultCasualLoading: number;
}

export const commonAwards: Award[] = [
  {
    code: 'NMW',
    name: 'National Minimum Wage',
    baseRate: 24.10,
    effectiveFrom: '2025-07-01',
    defaultCasualLoading: 0.25,
  },
  {
    code: 'MA000004',
    name: 'General Retail Industry Award',
    baseRate: 25.05,
    effectiveFrom: '2025-07-01',
    defaultCasualLoading: 0.25,
  },
  {
    code: 'MA000009',
    name: 'Hospitality Industry (General) Award',
    baseRate: 25.32,
    effectiveFrom: '2025-07-01',
    defaultCasualLoading: 0.25,
  },
  {
    code: 'MA000003',
    name: 'Fast Food Industry Award',
    baseRate: 25.05,
    effectiveFrom: '2025-07-01',
    defaultCasualLoading: 0.25,
  },
  {
    code: 'MA000009-C',
    name: 'Children\u2019s Services Award',
    baseRate: 26.10,
    effectiveFrom: '2025-07-01',
    defaultCasualLoading: 0.25,
  },
  {
    code: 'MA000089',
    name: 'Manufacturing and Associated Industries Award',
    baseRate: 26.55,
    effectiveFrom: '2025-07-01',
    defaultCasualLoading: 0.25,
  },
  {
    code: 'MA000018',
    name: 'Vehicle Repair, Services and Retail Award',
    baseRate: 25.95,
    effectiveFrom: '2025-07-01',
    defaultCasualLoading: 0.25,
  },
  {
    code: 'MA000104',
    name: 'Vehicle Wash and Detailing Award',
    baseRate: 25.05,
    effectiveFrom: '2025-07-01',
    defaultCasualLoading: 0.25,
  },
  {
    code: 'MA000022',
    name: 'Pharmacy Industry Award',
    baseRate: 26.45,
    effectiveFrom: '2025-07-01',
    defaultCasualLoading: 0.25,
  },
];

export function getAwardByCode(code: string): Award | undefined {
  return commonAwards.find((a) => a.code === code);
}
