# Pages — component dependency trees

Traced from each `page.tsx` entry, following local imports only (skipping node_modules).

## / (Home Page)
Entry: `app/page.tsx`
- `lib/brand` (constants)
- `components/PayCalculator`
- `components/Schema` (JSON-LD for SoftwareApplication + FAQ)
- `components/AppShell` (via root layout)
- `components/Header` (via AppShell)
- `components/Sidebar` (via AppShell)
- `components/Footer` (via AppShell)
- `components/ThemeToggle` (via Header)

## /salary-sacrifice-calculator/ (Salary sacrifice)
Entry: `app/salary-sacrifice-calculator/page.tsx`
- `lib/brand`
- `lib/tax/brackets` (types: FinancialYear, Residency)
- `lib/tax/calculate` (calculate, PayInputs, PayResult)
- `components/SalarySacrificeCalculator`
- `components/Schema`

## /hecs-calculator/ (HECS)
Entry: `app/hecs-calculator/page.tsx`
- `lib/brand`
- `components/HecsCalculator`
- `components/Schema`

## /casual-pay-calculator/ (Casual)
Entry: `app/casual-pay-calculator/page.tsx`
- `lib/brand`
- `components/CasualPayCalculator`
- `components/Schema`

## /mortgage-calculator/ (Mortgage)
Entry: `app/mortgage-calculator/page.tsx`
- `lib/brand`
- `lib/tax/amortize` (amortize, formatYearsMonths, formatAUD, formatAUD0)
- `components/MortgageCalculator`
- `components/Schema`

## /loan-payoff-calculator/ (Loan payoff)
Entry: `app/loan-payoff-calculator/page.tsx`
- `lib/brand`
- `lib/tax/amortize`
- `components/LoanPayoffCalculator`
- `components/Schema`

## /tax-rates/ (Tax rates reference)
Entry: `app/tax-rates/page.tsx`
- `lib/brand`
- `lib/tax/sources` (citation links)
- `components/Schema` (FAQ schema for tax bracket questions)

## /methodology/ (Methodology)
Entry: `app/methodology/page.tsx`
- `lib/brand`
- `lib/tax/sources` (citations)
- `components/Schema`

## /about/, /faq/, /privacy/, /terms/, /disclaimer/, /contact/
Single-page text content. Each uses:
- `lib/brand`
- `components/Schema` (FAQ schema on /faq/)

## /guides/ and /guides/<slug>/
Entry: `app/guides/page.tsx` (index) and `app/guides/<slug>/page.tsx` (individual)
- `lib/brand`
- `components/Schema`
- Same `app/layout.tsx` shell

## Key observations
- All calculator pages have **near-identical structure** — same `Results` component pattern
- The header/sidebar/footer shell is **always** the same (via root layout)
- Each page has its own `metadata` export (title, description) — SEO-friendly
- Calculator components are **large client components** with significant state — heavy use of `useMemo` and `useState`
