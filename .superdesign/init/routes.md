# Routes — SalaryCalc

Routing: Next.js 15 App Router, `output: 'export'` (static), `trailingSlash: true` (all routes have `/` suffix).

## URL map

| URL | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Home — pay calculator + landing-page SEO content |
| `/salary-sacrifice-calculator/` | `app/salary-sacrifice-calculator/page.tsx` | Salary sacrifice calculator |
| `/hecs-calculator/` | `app/hecs-calculator/page.tsx` | HECS-HELP repayment calculator |
| `/casual-pay-calculator/` | `app/casual-pay-calculator/page.tsx` | Casual pay calculator (with award + loading) |
| `/mortgage-calculator/` | `app/mortgage-calculator/page.tsx` | Mortgage calculator with extra payments |
| `/loan-payoff-calculator/` | `app/loan-payoff-calculator/page.tsx` | Loan payoff calculator (debt repayment) |
| `/tax-rates/` | `app/tax-rates/page.tsx` | FY 2026-27 ATO tax brackets reference |
| `/methodology/` | `app/methodology/page.tsx` | How every number is calculated |
| `/about/` | `app/about/page.tsx` | About + values + editorial standards |
| `/faq/` | `app/faq/page.tsx` | 30+ Q&As |
| `/contact/` | `app/contact/page.tsx` | Contact form / email |
| `/privacy/` | `app/privacy/page.tsx` | Privacy policy |
| `/terms/` | `app/terms/page.tsx` | Terms of service |
| `/disclaimer/` | `app/disclaimer/page.tsx` | Financial disclaimer |
| `/guides/` | `app/guides/page.tsx` | All guides index |
| `/guides/australian-income-tax/` | `app/guides/australian-income-tax/page.tsx` | Guide |
| `/guides/hecs-repayment/` | `app/guides/hecs-repayment/page.tsx` | Guide |
| `/guides/medicare-levy-surcharge/` | `app/guides/medicare-levy-surcharge/page.tsx` | Guide |
| `/guides/salary-sacrifice/` | `app/guides/salary-sacrifice/page.tsx` | Guide |
| `/guides/stage-3-tax-cuts/` | `app/guides/stage-3-tax-cuts/page.tsx` | Guide |
| `/guides/superannuation/` | `app/guides/superannuation/page.tsx` | Guide |

## Layouts used
- **All routes:** wrapped in `app/layout.tsx` (root) → `<AppShell>` (sidebar shell)
- No nested layouts (`app/<route>/layout.tsx` is not used)

## Calculator input semantics
All 6 calculator pages share the same input/result structure:
- Top: gross pay + pay period selector
- Middle: residency + financial year + HECS toggle + gross-includes-super toggle
- "Show advanced options" collapsible
- Results: net pay + "Take-home per period" grid (annual/monthly/fortnightly/weekly) + detailed breakdown

This is intentional — consistent UX means users only have to learn the interface once.
