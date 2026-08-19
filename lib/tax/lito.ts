// Low Income Tax Offset (LITO).
// Source: ATO "Low income tax offset (LITO)"
// https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/tax-offsets-and-rebates/low-income-tax-offset
//
// Maximum LITO is $700. It phases in fully up to $37,500, then reduces by
// 5c per dollar between $37,500 and $45,000, then by 1.5c per dollar between
// $45,000 and $66,667 (where it phases out completely).
//
// Foreign residents are not eligible.

export interface LitoParams {
  max: number;
  phaseInEnd: number; // Income at which full LITO is reached
  tier1End: number; // Phase-out end of first tier (5c)
  phaseOutEnd: number; // Income at which LITO fully phases out
  tier1Rate: number;
  tier2Rate: number;
}

export const litoParams: LitoParams = {
  max: 700,
  phaseInEnd: 37500,
  tier1End: 45000,
  phaseOutEnd: 66667,
  tier1Rate: 0.05,
  tier2Rate: 0.015,
};

export function lito(
  taxableIncome: number,
  residency: 'resident' | 'non-resident' | 'working-holiday',
): number {
  if (residency !== 'resident') return 0;
  if (taxableIncome <= litoParams.phaseInEnd) return litoParams.max;
  if (taxableIncome <= litoParams.tier1End) {
    return litoParams.max - (taxableIncome - litoParams.phaseInEnd) * litoParams.tier1Rate;
  }
  if (taxableIncome <= litoParams.phaseOutEnd) {
    const afterTier1 =
      litoParams.max - (litoParams.tier1End - litoParams.phaseInEnd) * litoParams.tier1Rate;
    return Math.max(0, afterTier1 - (taxableIncome - litoParams.tier1End) * litoParams.tier2Rate);
  }
  return 0;
}
