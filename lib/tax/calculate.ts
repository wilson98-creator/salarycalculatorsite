// Main pay calculation pipeline.
// This is what the calculator component calls. Everything is pure,
// deterministic, and easy to test.
//
// Pipeline:
//   1. Convert the entered gross to ANNUAL gross (the basis for all ATO math).
//   2. Subtract pre-tax salary sacrifice (reduces taxable income).
//   3. Apply income tax brackets to compute gross tax.
//   4. Subtract LITO (residents only).
//   5. Add Medicare levy (residents only).
//   6. Add HECS-HELP repayment if enabled.
//   7. Net = Annual gross - tax - medicare - hecs - post-tax deductions.
//   8. Divide back to the requested pay period.
//
// Note: we use the tax-bracket method (not the PAYG withholding formula from
// NAT 1004). The withholding formula is what an *employer* uses to estimate
// each pay, with rounding/coeffs that result in minor over/under-collection
// reconciled at tax time. The bracket method is the actual annual tax owed,
// which is what users mean by "how much tax will I pay on $X". See
// /methodology for the full explanation.

import { getBrackets, type FinancialYear, type Residency } from './brackets';
import { lito } from './lito';
import { medicareLevy } from './medicare';
import { hecsRepayment } from './hecs';

export type PayPeriod = 'annual' | 'monthly' | 'fortnightly' | 'weekly' | 'daily' | 'hourly';

export interface PayInputs {
  gross: number;
  period: PayPeriod;
  residency: Residency;
  financialYear: FinancialYear;
  /** Pre-tax salary sacrifice (annual AUD). Reduces taxable income. */
  salarySacrifice: number;
  /** Standard hours worked per week. Used for hourly conversions. */
  hoursPerWeek: number;
  /** Working weeks per year (default 52, less for leave-without-pay). */
  weeksPerYear: number;
  /** Apply the 1 July 2025 12% Superannuation Guarantee. */
  superRate: number;
  /** Whether the entered gross is inclusive of super (Total Employment Cost). */
  grossIncludesSuper: boolean;
  /** Repayment income override (defaults to taxable income). */
  repaymentIncomeOverride?: number;
  /** HECS-HELP / VSL / TSL / SSL / SFSS debt enabled? */
  hasHecsDebt: boolean;
  /** Medicare levy exemption. */
  medicareExemption: 'full' | 'half' | 'none';
  /** Optional post-tax deductions (union fees, etc.) in annual AUD. */
  postTaxDeductions: number;
}

export interface PayResult {
  /** Per-period breakdown. */
  period: PayPeriod;
  gross: number;
  taxableIncome: number;
  incomeTax: number;
  medicare: number;
  lito: number;
  hecsRepayment: number;
  superannuation: number;
  postTaxDeductions: number;
  net: number;
  /** Effective tax rate (income tax + medicare + hecs) / gross. */
  effectiveRate: number;
  /** Marginal tax rate at this income level. */
  marginalRate: number;
}

const HOURS_PER_FULL_TIME_WEEK = 38;
const WEEKS_PER_YEAR_DEFAULT = 52;

/** Convert any period gross to annual gross. */
export function toAnnual(gross: number, period: PayPeriod, hoursPerWeek: number, weeksPerYear: number): number {
  switch (period) {
    case 'annual': return gross;
    case 'monthly': return gross * 12;
    case 'fortnightly': return gross * 26;
    case 'weekly': return gross * weeksPerYear;
    case 'daily': return gross * 5 * weeksPerYear; // 5 working days/week
    case 'hourly': return gross * hoursPerWeek * weeksPerYear;
  }
}

/** Convert annual to a target period gross. */
export function fromAnnual(annual: number, period: PayPeriod, hoursPerWeek: number, weeksPerYear: number): number {
  switch (period) {
    case 'annual': return annual;
    case 'monthly': return annual / 12;
    case 'fortnightly': return annual / 26;
    case 'weekly': return annual / weeksPerYear;
    case 'daily': return annual / (5 * weeksPerYear);
    case 'hourly': return annual / (hoursPerWeek * weeksPerYear);
  }
}

/** Apply a bracket schedule to compute income tax. */
export function incomeTax(taxableIncome: number, fy: FinancialYear, residency: Residency): number {
  if (taxableIncome <= 0) return 0;
  const brackets = getBrackets(fy, residency);
  for (const b of brackets) {
    if (b.max === null || taxableIncome <= b.max) {
      return b.base + (taxableIncome - b.min) * b.rate;
    }
  }
  // Past the highest bracket — should not happen.
  const top = brackets[brackets.length - 1];
  return top.base + (taxableIncome - top.min) * top.rate;
}

/** Marginal rate at a given income level. */
export function marginalRateOf(taxableIncome: number, fy: FinancialYear, residency: Residency): number {
  if (taxableIncome <= 0) return 0;
  const brackets = getBrackets(fy, residency);
  for (const b of brackets) {
    if (b.max === null || taxableIncome <= b.max) return b.rate;
  }
  return brackets[brackets.length - 1].rate;
}

export function calculate(inputs: PayInputs): PayResult {
  const hoursPerWeek = inputs.hoursPerWeek || HOURS_PER_FULL_TIME_WEEK;
  const weeksPerYear = inputs.weeksPerYear || WEEKS_PER_YEAR_DEFAULT;

  // Step 1: annual gross
  let annualGross = toAnnual(inputs.gross, inputs.period, hoursPerWeek, weeksPerYear);

  // If the user entered a Total Employment Cost figure, peel super off the top
  // so the base salary is what we tax.
  if (inputs.grossIncludesSuper) {
    annualGross = annualGross / (1 + inputs.superRate);
  }

  // Step 2: taxable income (post salary sacrifice)
  const taxableIncome = Math.max(0, annualGross - inputs.salarySacrifice);

  // Step 3 + 4: income tax minus LITO
  const rawTax = incomeTax(taxableIncome, inputs.financialYear, inputs.residency);
  const litoOffset = lito(taxableIncome, inputs.residency);
  const incomeTaxNet = Math.max(0, rawTax - litoOffset);

  // Step 5: Medicare
  const medicare = medicareLevy(
    taxableIncome,
    inputs.financialYear,
    inputs.residency,
    inputs.medicareExemption,
  );

  // Step 6: HECS
  const hecs = inputs.hasHecsDebt
    ? hecsRepayment(inputs.repaymentIncomeOverride ?? taxableIncome, inputs.financialYear)
    : 0;

  // Super is an employer cost on top of salary (not a deduction from take-home).
  const superannuation = annualGross * inputs.superRate;

  // Step 7: net
  const netAnnual = Math.max(0, annualGross - incomeTaxNet - medicare - hecs - inputs.postTaxDeductions);

  // Step 8: convert back to the requested period
  const period = inputs.period;
  const gross = fromAnnual(annualGross, period, hoursPerWeek, weeksPerYear);
  const net = fromAnnual(netAnnual, period, hoursPerWeek, weeksPerYear);

  return {
    period,
    gross,
    taxableIncome: fromAnnual(taxableIncome, period, hoursPerWeek, weeksPerYear),
    incomeTax: fromAnnual(incomeTaxNet, period, hoursPerWeek, weeksPerYear),
    medicare: fromAnnual(medicare, period, hoursPerWeek, weeksPerYear),
    lito: fromAnnual(litoOffset, period, hoursPerWeek, weeksPerYear),
    hecsRepayment: fromAnnual(hecs, period, hoursPerWeek, weeksPerYear),
    superannuation: fromAnnual(superannuation, period, hoursPerWeek, weeksPerYear),
    postTaxDeductions: fromAnnual(inputs.postTaxDeductions, period, hoursPerWeek, weeksPerYear),
    net,
    effectiveRate: annualGross > 0 ? (incomeTaxNet + medicare + hecs) / annualGross : 0,
    marginalRate: marginalRateOf(taxableIncome, inputs.financialYear, inputs.residency),
  };
}

/** Format AUD with thousands separators and 2 decimals. */
export function formatAUD(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return '—';
  return n.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Format AUD with no decimals (for whole-dollar displays). */
export function formatAUD0(n: number): string {
  return formatAUD(n, 0);
}
