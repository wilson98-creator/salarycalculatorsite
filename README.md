# Paywise AU — Australian Pay Calculator

A free, accurate Australian take-home pay calculator. Built to be a credible alternative to the established pay-calculator sites: server-rendered, schema-rich, methodology-transparency-first, and optimized for the "pay calculator" head term in AU search.

**Status:** MVP. Flagship pay calculator + trust pages + tax-rates reference. No ads, no mid-tail calculators, no editorial guides yet — those come in Phase 2.

---

## Quick start

```bash
cd paywise-au
npm install
npm run dev
# open http://localhost:3000
```

To build for production:

```bash
npm run build
npm run start
```

---

## Project structure

```
paywise-au/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, metadata, global schema
│   ├── page.tsx            # Homepage = the pay calculator
│   ├── globals.css         # Tailwind + small custom utilities
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Auto-generated robots.txt
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── disclaimer/         # Legal disclaimer
│   ├── methodology/        # How the math works (E-E-A-T asset)
│   ├── privacy/            # Privacy policy
│   ├── tax-rates/          # Tax-rates reference page
│   └── terms/              # Terms of use
├── components/
│   ├── PayCalculator.tsx   # The main client-side calculator
│   ├── Header.tsx          # Site header with primary nav
│   ├── Footer.tsx          # Site footer
│   ├── Analytics.tsx       # GA4 + Plausible loader
│   └── Schema.tsx          # JSON-LD schema generators
├── lib/
│   ├── brand.ts            # Site name, URL, last-reviewed date — change here to rebrand
│   └── tax/
│       ├── brackets.ts     # ATO resident + non-resident brackets by FY
│       ├── calculate.ts    # Main calculation pipeline + period converters
│       ├── hecs.ts         # HECS-HELP / VSL / SFSS repayment tables + calculator
│       ├── lito.ts         # Low Income Tax Offset
│       ├── medicare.ts     # Medicare levy (with low-income shade-in)
│       └── sources.ts      # ATO source URLs cited in the methodology page
├── public/
│   ├── icons/              # PWA icons (SVG, swap in PNGs for production)
│   ├── manifest.webmanifest
│   └── robots.txt
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── package.json
└── .env.example
```

---

## Configuration

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SITE_URL=https://paywise.example.com.au
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
NEXT_PUBLIC_GSC_VERIFICATION=
```

All of these are optional except `NEXT_PUBLIC_SITE_URL` (which is used for canonical tags and the sitemap).

---

## How to rebrand

Everything is keyed off `lib/brand.ts`. Change the `name`, `tagline`, `shortDescription`, `contactEmail`, and `url` there. The rest of the site picks up the new name automatically.

To rename the brand, search for `Paywise` and `paywise` across the codebase (it's also used in `package.json`, in metadata, and in a few page titles). Most occurrences live in `lib/brand.ts`, `app/layout.tsx`, `app/page.tsx`, and the PWA manifest.

---

## How to update the tax rates

Tax rates change on 1 July each year. The process:

1. Open `lib/tax/brackets.ts` and add the new FY to the `FinancialYear` type.
2. Add a new entry to `residentBrackets`, `nonResidentBrackets`, and the `financialYearForDate` lookup.
3. Open `lib/tax/medicare.ts` and add a new entry to `medicareParams` (sourced from the ATO Medicare levy page).
4. Open `lib/tax/hecs.ts` and add a new entry to `hecsBands` (sourced from the ATO HECS repayment page).
5. Bump `lastReviewed` in `lib/brand.ts`.
6. Update the date in `app/methodology/page.tsx` and `app/tax-rates/page.tsx` (or just trust the `brand.lastReviewed` value).

A pull-request template for FY changes is in `docs/FY-CHANGE.md` (TODO: write this when you do your first FY update).

---

## Deploying to Vercel (free tier)

1. Push this directory to a GitHub repo.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.example`.
4. Deploy. The default domain will be `<project>.vercel.app` — point a custom domain at it for production.

Total cost: **$0** on Vercel's free tier (sufficient for the first ~50K monthly pageviews).

---

## What's NOT in this MVP (Phase 2+)

- [ ] Mid-tail calculator pages: `/take-home-pay-calculator`, `/fortnightly-pay-calculator`, `/hecs-calculator`, `/salary-sacrifice-calculator`, `/bonus-tax-calculator`, etc. Each gets its own URL, schema, and 600+ words of supporting copy.
- [ ] Editorial guides: 6 in-depth guides (income tax, MLS, HECS, salary sacrifice, super, Stage 3 cuts) for E-E-A-T and ad inventory.
- [ ] State pages: `/land-tax-calculator/nsw`, `/stamp-duty-calculator/vic`, etc.
- [ ] Profession pages: `/nurse-pay/nsw`, `/teacher-pay/vic`, etc., built from Fair Work award data + state public service pay scales.
- [ ] Newsletter capture: "ATO changes you missed this month" — even at 1% capture rate of 50K visitors/month, that's 500 subscribers.
- [ ] Ad integration: Publift or Ezoic (sub-100K), then AdThrive/Raptive or Mediavine (100K+).
- [ ] Real PNG icons: replace the SVG placeholders in `public/icons/` with proper 192/512 PNGs.
- [ ] A reviewer's name and credentials on the About page (ideally a CPA Australia member) — this is the single biggest E-E-A-T unlock.
- [ ] Search Console verification + sitemap submission.
- [ ] OG image (the layout currently references one — generate `public/og-image.png` at 1200×630).

---

## The hard truth about E-E-A-T

Finance is **YMYL** (Your Money or Your Life) in Google's classification, and Google holds it to a higher standard. Anonymous content on finance sites does not rank well in 2026.

This MVP is **methodology-transparency-strong but people-weak**. The `/methodology` page is bulletproof, every rate is cited, the disclaimer is real. But there is no named human on the About page.

**Strongly recommend** before public launch:

1. Get a CPA Australia member, registered tax agent, or BAS agent to review the methodology and put their name (with their LinkedIn) on the site. Even a small fee for review is worth it.
2. Get a legal review of the disclaimer and privacy pages.
3. Buy a real domain (rename in `lib/brand.ts`).

These three changes will materially affect ranking. Without them, expect to be stuck behind paycalculator.com.au on the head term and wagecalculator.com.au on the mid-tail for 12–18 months.

---

## The math — accuracy notes

- **Income tax** uses the bracket method, which represents the actual annual tax. Employers use a different formula (PAYG withholding, NAT 1004) that produces slightly different per-pay numbers because of weekly-equivalent rounding. The difference is reconciled at tax time.
- **Medicare levy** includes the low-income shade-in band (10% of the excess over the lower threshold up to the upper threshold). Medicare Levy Surcharge (1%–1.5% on high-income earners without private cover) is **not** modelled — see methodology.
- **HECS-HELP** uses the marginal method, treating each repayment band incrementally. The default repayment income is taxable income; if you salary sacrifice, repayment income is lower (and the calculator does not currently model that — TODO).
- **Superannuation** is shown as a separate line. It is an employer cost on top of salary.

If the output disagrees with your payslip by more than $5, the most likely causes are:
- You selected the wrong financial year.
- Your employer is using a different pay period than you entered.
- Your payslip includes a one-off adjustment (back pay, leave loading, etc.).
- The PAYG withholding formula is producing a different number to the bracket method (this is normal and gets reconciled at tax time).

---

## License

Proprietary for now. Switch to MIT (or your preferred OSS license) when ready.
