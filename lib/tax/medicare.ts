// Medicare Levy computation (2% of taxable income for most residents).
// Source: ATO "Medicare levy"
// https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy
//
// The levy has a low-income threshold (no levy below) and a "shade-in" band
// (10% of the excess over the threshold up to a shade-out point).
//
// Thresholds are indexed annually. Below are the 2024-25 figures published by
// the ATO. Update yearly around 1 July.

export interface MedicareParams {
  /** Income below which no Medicare levy is payable (singles). */
  lowerThreshold: number;
  /** Income above which the full 2% levy applies (singles). */
  upperThreshold: number;
  /** Shade-in rate (typically 0.10 for the full levy, 0.05 for the half levy). */
  shadeInRate: number;
  /** Rate applied above upperThreshold (typically 0.02). */
  fullRate: number;
}

export const medicareParams: Record<string, MedicareParams> = {
  // 2024-25 ATO-published figures.
  '2024-25': {
    lowerThreshold: 27222,
    upperThreshold: 34027,
    shadeInRate: 0.1,
    fullRate: 0.02,
  },
  // 2025-26 (indexed). Check ATO around each FY change.
  '2025-26': {
    lowerThreshold: 28011,
    upperThreshold: 35013,
    shadeInRate: 0.1,
    fullRate: 0.02,
  },
  // 2026-27 placeholder. Update when ATO publishes the FY2026-27 thresholds.
  '2026-27': {
    lowerThreshold: 28681,
    upperThreshold: 35851,
    shadeInRate: 0.1,
    fullRate: 0.02,
  },
  '2027-28': {
    lowerThreshold: 29351,
    upperThreshold: 36689,
    shadeInRate: 0.1,
    fullRate: 0.02,
  },
};

/**
 * Compute the Medicare levy for a given taxable income and FY.
 * Foreign residents and Working Holiday Makers are not liable.
 */
export function medicareLevy(
  taxableIncome: number,
  fy: string,
  residency: 'resident' | 'non-resident' | 'working-holiday',
  exemption: 'full' | 'half' | 'none' = 'none',
): number {
  if (residency !== 'resident') return 0;
  if (exemption === 'full') return 0;
  const params = medicareParams[fy] ?? medicareParams['2025-26'];
  const rate = exemption === 'half' ? params.fullRate / 2 : params.fullRate;
  const shadeInRate = exemption === 'half' ? params.shadeInRate / 2 : params.shadeInRate;

  if (taxableIncome <= params.lowerThreshold) return 0;
  if (taxableIncome >= params.upperThreshold) return taxableIncome * rate;

  // Shade-in band
  return (taxableIncome - params.lowerThreshold) * shadeInRate;
}
