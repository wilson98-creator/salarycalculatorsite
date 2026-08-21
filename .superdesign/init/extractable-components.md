# Extractable Components — SalaryCalc

Components that could be extracted as reusable Superdesign `DraftComponent` entities for redesign work.

## Layout Components (appear on most pages)

### AppShell
- Source: `components/AppShell.tsx`
- Category: layout
- Description: Wraps every page; provides sidebar context (open/collapsed state) and renders Header + Sidebar + main + Footer.
- Extractable props: none (uses internal state for sidebar open/collapsed)
- Hardcoded: Header, Sidebar, Footer are all imported directly

### Header
- Source: `components/Header.tsx`
- Category: layout
- Description: Sticky top bar with hamburger, logo, top nav (FAQ/About), theme toggle.
- Extractable props: none currently
- Hardcoded: nav links (FAQ, About), logo image, hamburger icon

### Sidebar
- Source: `components/Sidebar.tsx`
- Category: layout
- Description: Three-section collapsible sidebar (Calculators / Reference / Learn) with active-state highlighting.
- Extractable props: 
  - `sections` (Section[] — currently hardcoded, could be a prop for reusability)
  - `isOpen` (boolean — mobile drawer state, from context)
  - `isCollapsed` (boolean — desktop collapsed state, from context)
- Hardcoded: section labels, item labels, icon-derivation logic (`label.replace(/[^A-Za-z]/g, '').slice(0, 2)`)

### Footer
- Source: `components/Footer.tsx`
- Category: layout
- Description: 5-column footer with brand info, calculator/learn/trust link columns, disclaimer.
- Extractable props: none currently
- Hardcoded: link lists (could be data-driven)

## Basic Components (used across pages)

### ThemeToggle
- Source: `components/ThemeToggle.tsx`
- Category: basic
- Description: Sun/moon icon button that toggles dark mode and persists to localStorage.
- Extractable props: none
- Hardcoded: localStorage key (`salarycalc_theme`), icon SVGs

### CookieBanner
- Source: `components/CookieBanner.tsx`
- Category: basic
- Description: Bottom-fixed cookie consent banner. Shows on first visit, remembers choice.
- Extractable props: none
- Hardcoded: copy text, localStorage key

### Schema (JSON-LD)
- Source: `components/Schema.tsx`
- Category: utility
- Description: Injects JSON-LD `<script>` tags for Google rich results. Exports `JsonLd` wrapper and schema factories (`organizationSchema`, `websiteSchema`, `softwareApplicationSchema`, `faqSchema`).
- Extractable props: `data` (array of schema objects)
- Used in: every page (via `app/layout.tsx` for site-wide schemas, plus page-level FAQ schema)

## Calculator Components (page-specific, but share patterns)

The 6 calculator pages each have a `*Calculator` component:
- `PayCalculator.tsx`
- `SalarySacrificeCalculator.tsx`
- `HecsCalculator.tsx`
- `CasualPayCalculator.tsx`
- `MortgageCalculator.tsx`
- `LoanPayoffCalculator.tsx`

All follow a similar pattern:
- Gross pay input + pay period selector
- Residency + financial year selectors
- HECS / gross-includes-super toggles
- "Show advanced options" collapsible (salary sacrifice, hours/week, super rate, etc.)
- Results panel with "Take-home per period" 4-box grid + detailed breakdown

These are **not** easily extracted as shared components because each has different domain logic. But the **input/result structure pattern** is reusable for any future financial calculator.

## Recommended focus areas for redesign

1. **Header** — currently logo-only, no primary CTA in the top bar. Most finance sites have a "Calculate" or "Get started" CTA. User feedback might be: "I don't know what to do first."

2. **Sidebar nav** — works well, but the 2-letter icon derivation is unintuitive. Could use real icons (Heroicons, Lucide).

3. **Calculator input form** — the gross pay + pay period are on the same row but the relationship isn't obvious. Consider a more guided input (e.g. "How much do you earn per year?" with clearer period selection).

4. **Results presentation** — currently the net pay is shown once with a chip indicating the period. Adding a "Take-home per period" 4-box grid (already done) was a good move. Could go further with: gross in each period, tax in each period, comparison to average.

5. **Footer** — dense text, no social links, no newsletter signup. Most competitors have a newsletter or social proof in the footer.

6. **Dark mode toggle** — icon-only, no label. New users might not know what it does.
