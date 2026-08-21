# Design System — SalaryCalc (worldwide synthesis)

This design system is the **source of truth** for all generated drafts. It synthesizes
patterns observed across the world's top finance/calculator sites, adapted for
SalaryCalc's brand identity, Australian context, and $0-budget constraints.

## Reference sites studied

| Site | Region | Pattern absorbed |
|---|---|---|
| **Bankrate** | US | Editorial blue accent, pale tinted background, type-as-graphic hero |
| **Calculator.net** | US | Form-first calculator hero, no marketing chrome |
| **SmartAsset** | US | Two-column calculator panel as the page hero, deep blue + orange |
| **Ratehub** | CA | Comparison-table trust aesthetic, hairline-bordered rate cards |
| **Which?** | UK | Civic-editorial white field, peach callout band, photographic topic tiles |

The Australian context: most AU finance sites (paycalculator.com.au, ATO, MoneyQuest)
are form-first with very dense input groups and minimal marketing chrome. SalaryCalc
should beat them on **trust + speed + clarity** without inheriting their dated feel.

---

## Brand identity

- **Brand name:** SalaryCalc
- **Positioning:** The honest, ATO-grounded Australian pay calculator. Brand-only (no
  real person). $0 budget.
- **Persona:** Plain-spoken, accurate, never oversold. Closer to a serious spreadsheet
  than a SaaS landing page.
- **Tone of voice:** Professional, AU English, no financial-advisor jargon. Says
  "we are a calculator" not "we are your financial partner."
- **Aesthetic register:** Swiss/International editorial × civic trust × modern fintech
  utility. **NOT** glassmorphism. **NOT** dark-mode default. **NOT** aurora/mesh
  gradients. Light-mode dominant with a dark-mode toggle.

---

## Color system

### Surface & text (the `ink` scale)
Light-mode-default, paper-like, slightly tinted (not pure white) to read as a document
rather than a generic SaaS page — this matches Bankrate's `#EAF1FF` decision but
pushed further toward white to stay calm and high-legibility.

- `ink-50` `#f8fafc` — page background light
- `ink-100` `#f1f5f9` — subtle wash / alternating row
- `ink-200` `#e2e8f0` — hairline borders
- `ink-300` `#cbd5e1` — dividers
- `ink-400` `#94a3b8` — muted text
- `ink-500` `#64748b` — helper text
- `ink-700` `#334155` — labels
- `ink-900` `#0f172a` — body text, headings
- `ink-950` `#020617` — page background dark

Dark mode inverts ink-50/ink-900 roles; surfaces stay near-black, text stays near-white.

### Brand (the `brand` scale, single accent family)
A saturated blue, rationed to: primary CTA, active nav state, link hovers, focus ring.
**NOT** used for backgrounds or large areas. Matches Bankrate's `#0061FE` and Which?'s
`#0050B3` pattern of single-accent discipline.

- `brand-50` `#eef6ff` — active nav bg light
- `brand-100` `#d9eaff` — focus ring fill
- `brand-500` `#1e6fff` — **PRIMARY, CTA, logo** (Bankrate-aligned, slightly punchier)
- `brand-600` `#1758cc` — hover
- `brand-700` `#134299` — pressed

### Semantic accents (results panel only)
A tiny rationed palette, used **only** on the result-figure band. Inspired by
SmartAsset's `green result figure` + Ratehub's teal data accent. These are the only
exceptions to "blue is the only accent" — confined to ≤ 3% of pixel area.

- `success-500` `#10b981` — net take-home (the figure the user came for)
- `danger-500` `#ef4444` — tax (a deduction)
- `warning-500` `#f59e0b` — Medicare (a deduction)
- `neutral-500` `#94a3b8` — super

### Footer band (the only saturated structural color)
The footer is the only place we use a deep blue, mirroring the universal
"deep-navy bookend" pattern across Bankrate, SmartAsset, Ratehub, Which?.

- `footer-900` `#0c1f47` — footer background, footer text on white

**Guardrail:** Color is rationed. The single brand blue is the only color outside the
ink scale, except (a) semantic accents inside result panels, and (b) the footer band.
Reject the SmartAsset orange-on-blue temptation — it complicates trust signalling.

---

## Typography

**No display fonts, no paid fonts.** System sans for $0-budget. This matches
Calculator.net's Arial discipline and is a reasonable proxy for the
Gordita/Proxima Nova/RecifeText patterns seen at $0 cost.

- **Sans (UI & body):** `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
- **Mono (numbers, results):** `ui-monospace, SFMono-Regular, Menlo, monospace` —
  used for **every** currency value (this is the financial-utility norm from
  Calculator.net and Ratehub)
- **Serif (one restrained accent):** Georgia for the page H1 only, picked up from
  the Bankrate/Which? "editorial moment" pattern — it gives the home page a quiet
  "we are a publication, not a startup" feel without spending money on fonts

### Type scale (Tailwind defaults, 1rem = 16px)
- `text-xs` (0.75rem) — helper text, microcopy
- `text-sm` (0.875rem) — form labels, dense UI
- `text-base` (1rem) — body
- `text-lg` (1.125rem) — secondary body
- `text-xl` (1.25rem) — section H3
- `text-2xl` (1.5rem) — section H2
- `text-3xl` (1.875rem) — page H1 mobile
- `text-4xl` (2.25rem) — page H1 desktop

**Headings:** `font-bold tracking-tight` (`-0.02em`). Numerals in `font-mono tabular-nums`.

---

## Spacing

8px base, with 12/16/24/32/48/80 cadence. Matches the universal financial-site scale.

- `py-10 sm:py-14` — page top/bottom (40px → 56px)
- `p-6` — card padding (24px)
- `mt-20` — section gap (80px) between major bands
- `gap-6` — default grid gap (24px)
- container max-width: **1280px** (`2xl`)

---

## Radii

- `rounded-lg` (8px) — inputs, buttons, small chips
- `rounded-2xl` (16px) — cards, calculator panel
- `rounded-full` — badges, toggles, focus rings

**Guardrail:** No component larger than 16px radius. This matches the "flat, paper-like,
ledger" pattern from Bankrate, Ratehub, and Which? — not the soft rounded-card SaaS look.

---

## Shadows

- Light mode: `shadow-sm` on cards, `shadow-2xl` on mobile sidebar
- Dark mode: **no shadows** (borders only)
- Calculator panel: `shadow-md shadow-ink-900/5` — soft, low-opacity, "barely lifted"
  (this is the Ratehub/SmartAsset `rgba(0,0,0,0.04) 0px 8px 45px 0px` pattern)
- Result figure card: `shadow-sm ring-1 ring-success-500/10` — color-tinted ring, not
  a colored shadow

---

## Components

### Top navigation (Header)
- Sticky, edge-to-edge (0px inset), `h-16`, white/90 + backdrop-blur
- Three zones: hamburger | logo (centered on mobile) | top nav (FAQ, About) | theme toggle
- **No primary CTA in the nav** — the calculator is the primary, and it lives in the
  page. This matches Calculator.net's "no CTA in nav" pattern and prevents
  redundancy with the calculator panel below.

### Sidebar (desktop navigation)
- **Differentiator from competitors:** All five reference sites use a top nav with
  dropdowns. SalaryCalc's collapsible left sidebar (current implementation) gives a
  "desktop productivity app" feel that more closely matches Excel/Google Sheets than
  a marketing site — appropriate for a serious tool, not a content farm.
- 3 sections: Calculators (6) / Reference (2) / Learn (7)
- 2-letter icon derivation is being kept (matches the "icon-only collapsed" feel of
  Ratehub's category tiles) but the real fix is **replacing the manual `slice(0,2)`
  with a curated icon map** for the 6 calculators.

### Calculator panel (the hero)
- **Card is the hero, not a marketing section.** Matches SmartAsset's
  `card-calculator-panel` pattern: two columns (inputs left, results right) inside
  one large rounded white card on the first screen, with a single short headline
  above it.
- Inputs left column: form fields with labels above, helper text below
- Results right column: large net take-home figure (semantic green), then
  "Take-home per period" 4-box grid (annual / monthly / fortnightly / weekly),
  then a detailed breakdown table
- **No "Calculate" button** — results are live (a universal finance-calculator
  norm, and a competitive advantage for time-to-result)

### Result figure (the only big number on the page)
- Mono numerals, `text-4xl sm:text-5xl`, `font-bold tabular-nums`
- Color: `text-success-500` for net take-home (the universal green-for-money pattern
  from SmartAsset/Ratehub/Which?)
- Above: a small label "Take-home pay" in `text-sm text-ink-500`
- Below: a chip indicating selected period (`bg-ink-100 text-ink-700 rounded-full`)

### Take-home per period grid
- 4 boxes in a 2×2 grid on mobile, 4×1 on desktop (`grid grid-cols-2 lg:grid-cols-4 gap-3`)
- Each box: `rounded-lg border border-ink-200 p-3` — hairline-bordered, not elevated
- Selected period: `border-brand-500 bg-brand-50` — light brand wash
- Unselected: white
- Currency value: `font-mono font-semibold text-base`
- Period label: `text-xs text-ink-500`

### Breakdown table
- Below the 4-box grid
- `divide-y divide-ink-200` between rows
- Each row: label left (ink-700) / value right (mono, ink-900)
- Negative rows (tax, Medicare) get `text-danger-500` on the value
- Total row: `font-semibold border-t-2 border-ink-300 pt-2`

### FAQ accordion (page-level, for SEO)
- Used on home, calculator pages, and FAQ page
- `border-b border-ink-200` between items
- Chevron rotates 90° when open
- Answer body uses `@tailwindcss/typography` prose, sized down to `prose-sm`

### Footer (the deep-navy bookend)
- `bg-footer-900 text-ink-100` — the only place a non-ink color is a surface
- 5-column grid: brand info (2 cols) | Calculators | Learn | Trust & legal
- Above the grid: a single line of "last reviewed" + ATO-source attribution
- Below the grid: a thin disclaimer + "Made in Australia. Sources: ATO."

---

## Layout system

### Page anatomy (home + calculator pages)
1. **Top band** — sticky header (h-16)
2. **Hero band** — headline (Georgia H1, max 2 lines) + 1-line subhead
3. **Calculator band** — calculator panel card (the centerpiece)
4. **Result highlight band** — only on calculator pages, repeats the net take-home +
   "Take-home per period" grid for users who scrolled past the form
5. **Trust band** — small "Last reviewed 2026-08-19 · ATO sources" row
6. **Content band** — long-form text (how the calculator works, what FY means, etc.)
7. **FAQ band** — 5-8 common questions in accordion
8. **Related calculators** — 3-up card grid linking to other calculators
9. **Footer** — deep navy

This 9-band rhythm is denser than a marketing site but lighter than
Calculator.net's 700+ line reference page — it gives the page enough substance
for SEO without making it feel like reading a tax act.

### Container
- `max-w-7xl` (1280px) for the full page
- `max-w-3xl` for the long-form text band
- `max-w-4xl` for the calculator panel
- Padding: 1.25rem mobile → 2rem desktop

### Mobile (< lg)
- Sidebar becomes a slide-in drawer (existing behavior)
- Calculator panel collapses to single column (inputs above results)
- Take-home grid becomes 2×2
- Hero H1 downscales to text-3xl
- Footer collapses to 2-col then 1-col

---

## Motion

- All transitions: 0.2s `ease-in-out` on `color`, `background-color`, `border-color`
- Hover state on links/buttons: instant color shift, no transform
- Sidebar drawer slide: 0.3s `ease-in-out` on `transform`
- No scroll-linked animations, no parallax, no entrance choreography
- Theme toggle: instant, no transition (avoids flash-of-wrong-theme)

This matches Calculator.net's "no motion language" and Which?'s "0.3s ease-in-out
only" patterns — finance-utility sites don't benefit from playful motion.

---

## Breakpoints

- `sm` 640px
- `md` 768px
- `lg` 1024px (sidebar appears, calculator becomes 2-column)
- `xl` 1200px
- `2xl` 1280px (container max)

---

## Iconography

- **Lucide icons** (already likely in deps or `lucide-react`) — pick at draft time
- Each calculator gets a real icon: `Calculator` for Pay, `PiggyBank` for Salary
  Sacrifice, `GraduationCap` for HECS, `Clock` for Casual, `Home` for Mortgage,
  `CreditCard` for Loan Payoff
- Icon size: 20px in sidebar (collapsed), 16px in body, 24px in hero stat panels
- Stroke: 1.5px (matches Tailwind `stroke-[1.5]`)

---

## Dark mode

- Class-based (`darkMode: 'class'` in Tailwind config)
- Inline bootstrap script in `<head>` (pre-hydration) — already in `app/layout.tsx`
- Persists to `localStorage` as `salarycalc_theme`
- System preference as fallback
- **Dark mode surface:** `ink-950` background, `ink-900` cards, `ink-100` text
- **Dark mode accent:** `brand-400` instead of `brand-500` (improves contrast on dark)
- **Dark mode result color:** `success-400` (`#34d399`) — softer green, not pure neon

---

## What we are NOT doing (anti-patterns)

1. **No glassmorphism, no backdrop-blur on cards** — feels cheap for finance
2. **No aurora/mesh gradients** — Calculator.net/Bankrate/Which? all use flat fills
3. **No oversized display fonts above 2.25rem** — keeps the page documentary, not
   marketing
4. **No emoji as iconography** — finance users want symbols, not smileys
5. **No scroll-triggered animations** — finance-utility sites don't benefit
6. **No "hero screenshot" of the calculator** — the calculator IS the hero
7. **No 2nd CTA on the home page above the fold** — Calculator.net has the only
   button as the form submit; we don't even need that (live results)
8. **No testimonials** — brand-only, no real person, no social proof to fabricate
9. **No "as seen in" logo strip** — same reason
10. **No "X users this month" counter** — fabricated numbers hurt trust

---

## SEO + content alignment (the non-visual part of the design system)

The design system includes the **content slots** that drafts must fill. Each band
on the home page has a defined purpose for SEO and trust:

| Band | SEO role | Content slot |
|---|---|---|
| H1 | Primary keyword | "Australian pay calculator" |
| Subhead | Secondary keyword + value prop | "Calculate your take-home pay for FY 2026-27" |
| Calculator | Above-the-fold engagement | Live form (no copy needed) |
| "How it works" | Long-tail keyword cluster | 3-step explainer (gross → tax → net) |
| "What's new" | Recency signal | "Updated 19 Aug 2026 for FY 2026-27 brackets" |
| FAQ band | Featured snippet targeting | 5-8 Q&As (also in JSON-LD) |
| Related calculators | Internal linking | 3-up grid of other calculators |
| Footer | Site links + legal | Trust + legal pages |

The same skeleton applies to all 6 calculator pages, with the H1 and FAQ swapped
per calculator.

---

## Drafting instructions for Superdesign

When generating drafts:
1. **Calculator panel must be in the first screen** — no exceptions
2. **Headline must use the Georgia serif** (the one restrained editorial moment)
3. **Every currency value uses mono** — never let a font fall back to proportional
4. **The "Take-home per period" 4-box grid is the differentiator** — feature it
5. **Result figure must be green** (`text-success-500`) — universal financial-utility
   pattern
6. **Footer is the only deep-navy bookend** — keep that bookend
7. **No primary CTA in the header** — the calculator is the primary
8. **No marketing hero illustration** — text-only hero, calculator below
9. **Dark mode is a parallel citizen** — every draft should show light + dark
10. **Mobile is a peer, not an afterthought** — every desktop draft has a mobile twin
