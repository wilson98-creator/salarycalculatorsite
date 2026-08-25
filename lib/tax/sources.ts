// Source citations for every rate, threshold, and coefficient used by the
// calculator. Surface these on /methodology and in the schema so Google (and
// users) can verify the math comes from authoritative sources.

export const sources = {
  atoHomepage: 'https://www.ato.gov.au/',
  taxRates: {
    label: 'Tax rates – Australian residents',
    url: 'https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents',
  },
  paygFormulas: {
    label: 'Schedule 1 – Statement of formulas for calculating amounts to be withheld (NAT 1004)',
    url: 'https://www.ato.gov.au/tax-rates-and-codes/payg-withholding-schedule-1-statement-of-formulas-for-calculating-amounts-to-be-withheld',
  },
  medicareLevy: {
    label: 'Medicare levy',
    url: 'https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy',
  },
  lito: {
    label: 'Low income tax offset (LITO)',
    url: 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/tax-offsets-and-rebates/low-income-tax-offset',
  },
  hecsRepayment: {
    label: 'Study and training loan repayment thresholds and rates',
    url: 'https://www.ato.gov.au/tax-rates-and-codes/study-and-training-support-loans-rates-and-repayment-thresholds',
  },
  superGuarantee: {
    label: 'Superannuation guarantee',
    url: 'https://www.ato.gov.au/businesses-and-organisations/super-for-employers/superannuation-guarantee',
  },
  budget2025: {
    label: '2025–26 Federal Budget – personal tax rate changes',
    url: 'https://hlb.com.au/media/2025/03/2025-26-Federal-Budget-Report.pdf',
  },
} as const;
