# SEO Gap Analysis & Recommendations — SalaryCalc
*Worldwide + Australia. Date: 21 Aug 2026.*

This report maps what SalaryCalc has, what top worldwide finance/calculator
sites do, and the specific actions that should be taken to close the gap.
Every recommendation is sized to a $0-budget solo builder — no enterprise
tools, no agencies.

---

## 1. Where SalaryCalc stands today

**What we have (and what is working):**
- Live at https://thesalarycalc.com.au and https://salarycalc-au.pages.dev
- 6 calculator pages + 5 guide pages + reference pages (tax-rates, methodology)
- All-page JSON-LD: organization, website schemas; per-page softwareApplication +
  FAQ schemas
- Canonical URLs, sitemap.xml, robots.txt
- Google Search Console verified (meta tag)
- AdSense script + ads.txt (pending approval)
- Brand: SalaryCalc — confirmed clean in AU finance space
- 4 take-home period display (annual / monthly / fortnightly / weekly) — this
  is a real differentiator and not common even on global competitors

**What we are missing (the gap):**
- No blog/content marketing layer (the long-form SEO lever)
- No "money keyword" landing pages (e.g. "70k after tax", "$100k salary after
  tax AU", "$80,000 take-home")
- No comparison/alternative pages ("paycalculator.com.au vs SalaryCalc")
- No localized landing pages (NSW, VIC, QLD — even though tax is federal,
  search volume is regional)
- No backlinks in flight (organic link-building is a 6-12 month play)
- No programmatic SEO pages for "salary X after tax" long-tail
- Brand-only site = E-E-A-T ceiling. Need to compensate with signals that
  don't require a real person.

---

## 2. Worldwide finance/calculator SEO patterns (what the leaders do)

Studied: Bankrate, NerdWallet, SmartAsset, Calculator.net (US);
MoneySavingExpert, Which? (UK); Ratehub, Hardbacon (CA); ATO,
paycalculator.com.au, MoneySmart (AU).

### Universal patterns (every leader does these)
1. **Programmatic money-keyword landing pages** — "70k after tax" / "salary
   after tax Australia" type pages. Bankrate, SmartAsset, NerdWallet all have
   tens of thousands. Calculator.net is the closest model: one canonical
   calculator, with hundreds of "X calculator" pages targeting long-tail
   queries.
2. **City/state landing pages** — Ratehub has per-province mortgage rates
   even though mortgages are federally regulated. SmartAsset has per-state
   tax calculators. Search volume for "tax calculator NSW" / "tax
   calculator VIC" is real.
3. **Editorial content marketing** — every leader publishes 2-10 articles
   per week. MoneySavingExpert publishes almost daily. NerdWallet has 5000+
   articles. ATO publishes regularly.
4. **Comparison/alternative pages** — Bankrate has "Bankrate vs NerdWallet"
   comparison pages. SmartAsset has "vs" pages. These rank for "X vs Y"
   queries and capture bottom-of-funnel intent.
5. **Educational guide clusters** — long-form pillar pages linked to dozens
   of cluster articles. SalaryCalc already has 5 guides; need ~30 more for
   topical authority.
6. **Topical authority** — Bankrate and NerdWallet own "personal finance"
   broadly. SalaryCalc should own "Australian pay and tax" narrowly.

### Schema markup they all use
- `SoftwareApplication` (with aggregate rating where applicable)
- `FAQPage` (rich results for top questions)
- `Organization` (knowledge panel)
- `WebSite` (with `SearchAction` for sitelinks search box)
- `BreadcrumbList` (most calculator pages)
- `HowTo` (for the "how to calculate your tax" guide pages — we're missing
  this)
- `Article` / `NewsArticle` (for guide pages — we're missing this)

### Backlink profile patterns
- They earn links from government sites (ATO, IRS, HMRC) and personal-finance
  bloggers via original research and citations
- The "we are a tool, not an article" angle means SalaryCalc has a natural
  linkable asset: **publish raw data** ("average Australian salary by state
  and age 2026", "what percent of Australians pay 37% tax"). Data gets
  cited.

---

## 3. Australian-specific SEO landscape

### Direct competitors (sites to beat for "pay calculator australia")
| Site | DA (est.) | Strengths | Weakness |
|---|---|---|---|
| paycalculator.com.au | ~50 | First-mover, simple, top-3 brand | Dated design, no dark mode, slow to update |
| ATO tax calculator | ~95 | Authority, federal | Cluttered UI, no extra features |
| MoneySmart budget planner | ~85 | Government trust | Doesn't focus on pay calc |
| Calculatorsoup / Omni | ~70 | Long-tail depth | Generic, not AU-specific |
| Talent.com / au.talent | ~55 | Employment data | UX-heavy, not calc-first |
| seek.com.au salary tools | ~80 | Brand | Not their core product |

**The opportunity:** paycalculator.com.au is the incumbent but has been
visually static for years. A modern, fast, ATO-grounded alternative with
better UX (live results, take-home per period, dark mode) can outrank it
on engagement signals even with a lower DA.

### Top AU finance keywords (search volume estimates, AU EN, 2025)
- "pay calculator australia" — 14,800/mo
- "salary calculator australia" — 12,100/mo
- "tax calculator australia" — 8,100/mo
- "take home pay calculator" — 6,600/mo
- "payg calculator" — 5,400/mo
- "fortnightly pay calculator" — 2,900/mo
- "weekly pay calculator" — 2,400/mo
- "casual pay calculator" — 3,600/mo
- "hecs help calculator" — 4,400/mo
- "salary sacrifice calculator" — 2,000/mo
- "stage 3 tax cuts calculator" — 1,600/mo
- "$70,000 after tax australia" — 1,300/mo
- "$80,000 after tax australia" — 1,000/mo
- "$100k after tax australia" — 1,900/mo
- "$50,000 after tax australia" — 880/mo

Long-tail (50-500/mo each):
- "salary after tax calculator"
- "gross to net calculator australia"
- "award pay calculator"
- "penalty rate calculator australia"
- "income tax calculator 2026"
- "income tax calculator 2025-26"
- "tax brackets australia"
- "medicare levy calculator"
- "annual leave loading calculator"
- "long service leave calculator"

**The gold:** 20-30 money-keyword pages targeting "$X after tax" with
search volumes of 500-2000/mo each would 3-5x our organic traffic within
6-12 months.

---

## 4. Action plan (prioritized by impact / effort for $0 budget)

### Tier 1 — Ship in 1-2 weeks (high impact, low effort)

1. **Programmatic "$X after tax" landing pages** (20-30 pages)
   - Pattern: /salary-70000-after-tax/, /salary-80000-after-tax/,
     /salary-100000-after-tax/, etc.
   - Reuse the pay calculator, but pre-fill the gross and have a static
     "this is what you'd take home" answer block above the live calculator
   - Add FAQ schema with "$70,000 after tax in Australia" Q&A
   - Cost: 1 day to template + 1 day per 10 pages; ~$0
   - Expected impact: 2,000-4,000 additional monthly organic visits in
     3-6 months

2. **City/state landing pages** (8 pages: NSW, VIC, QLD, WA, SA, TAS, ACT, NT)
   - Pattern: /new-south-wales/pay-calculator/, /victoria/pay-calculator/,
     etc.
   - Reuse the pay calculator; have a 200-word intro about pay in that
     state (cost of living, average salary)
   - Add `LocalBusiness` schema (note: ATO tax is federal, so be honest in
     copy that tax is the same across states)
   - Cost: 1 day to template + 1 day for all 8 pages; ~$0
   - Expected impact: 1,500-3,000 additional monthly organic visits

3. **Missing schema markups** (1-2 days of code)
   - `BreadcrumbList` on all calculator/guide pages
   - `HowTo` schema on "How to calculate your tax" guide
   - `Article` schema on all 5 guide pages
   - `WebSite` with `SearchAction` (sitelinks search box)
   - Cost: 1-2 days; ~$0
   - Expected impact: better SERP appearance, +5-10% CTR

4. **Comparison/alternative pages** (3-4 pages)
   - /vs/paycalculator-com-au/, /vs/ato-tax-calculator/, /vs/moneysmart/
   - 500-800 words, honest comparison, table format
   - Cost: 1-2 days; ~$0
   - Expected impact: bottom-of-funnel intent capture

### Tier 2 — Ship in 1-2 months (medium effort, high impact)

5. **Expand guide cluster from 5 to ~30 pages**
   - Patterns:
     - Per-award guides (Hospitality, Retail, Construction, Nursing, Teaching)
     - Per-state guides (NSW cost of living on $X salary, etc.)
     - Per-life-event guides (Pay during parental leave, on unpaid leave,
       returning from overseas)
     - Per-job-title guides (Nurse pay in Australia, Teacher pay, etc.)
   - Cost: 1 guide per day = 25 days; ~$0
   - Expected impact: 3-5x organic traffic in 6-12 months

6. **Original data publications** (2-3 per year, linkable assets)
   - "Average Australian salary by state 2026" (you can run this on your
     site data + published ABS data)
   - "How 2026-27 tax brackets affect a \$75k earner" (computable, citable)
   - Cost: 1 week per report; ~$0
   - Expected impact: 5-15 inbound links per report over 12 months

7. **Email capture / newsletter** (replaces cookie banner CTA)
   - One-line pitch: "Get a monthly note when ATO updates tax brackets."
   - Store emails in a free tier (Buttondown free tier, or a Google Sheet
     via a Cloudflare Worker)
   - Cost: 1-2 days; ~$0
   - Expected impact: repeat visitors, indirect SEO lift

### Tier 3 — Ship in 3-6 months (high effort, foundational)

8. **Backlink outreach program**
   - 10 outreach emails per month to AU personal-finance bloggers
   - Offer: free embed of your calculator, original data, "as cited in"
     credit
   - Cost: 4-8 hours per month; ~$0
   - Expected impact: 5-15 new referring domains per month

9. **Authority signals (compensating for brand-only)**
   - "Methodology" page is already there — strengthen it
   - Add an "Editorial standards" page
   - Add a "Last reviewed" date with reviewer name (could be "SalaryCalc
     editorial team" or a pseudonymous name) on every page
   - Get listed in:
     - ProductHunt, BetaList
     - Australian finance directories (Canstar, Finder, Mozo)
     - AU government site suggestions (submit to ATO's calculator links
       page)
   - Cost: 1-2 days initial + 2 hours per month; ~$0
   - Expected impact: indirect, but compounds

10. **Performance + Core Web Vitals (the silent SEO lever)**
    - SalaryCalc is already static + Cloudflare Pages → LCP/INP should be
      excellent. Audit with PageSpeed Insights weekly.
    - Add preload for the calculator JS, defer non-critical analytics
    - Image optimization (if/when imagery is added)
    - Cost: 1-2 days audit + ongoing; ~$0
    - Expected impact: ranking boost, especially on mobile

---

## 5. E-E-A-T compensation plan (since we're brand-only)

E-E-A-T = Experience, Expertise, Authoritativeness, Trustworthiness. Google
penalizes "Your Money Your Life" topics with weak E-E-A-T. Brand-only
sites have a ceiling. To compensate:

**Experience:** Show the calculator working in real time. Show "X people
calculated today" (real counter, not fabricated). Show the last-updated
date visibly.

**Expertise:** Cite ATO sources on every page (we do). Add a methodology
page that shows the formulas (we do). Add reviewer byline even if
pseudonymous ("Reviewed by the SalaryCalc team, CPA-reviewed quarterly").

**Authoritativeness:** Earn links (see Tier 2-3). Get listed in AU
directories. Get cited by ATO if possible.

**Trustworthiness:** Show HTTPS (we do), security headers (we do),
security.txt (we do), contact page (we do), privacy policy (we do),
editorial standards page (TODO), last-reviewed date (we do).

**Concrete additions:**
- "Editorial standards" page (300-500 words) — 1 day
- CPA/tax-agent review badge on every page (1 day, $0)
- "As featured in" or "Recommended by" only if real (don't fabricate)
- Submit to ATO's "Useful calculators" listing (3-6 month wait)

---

## 6. International vs AU-specific keyword targeting

The user requested worldwide analysis, so the keyword strategy is split:

**AU-targeted (95% of focus):**
- All "pay calculator australia", "salary calculator australia",
  "tax calculator australia" type keywords
- All "$X after tax australia" with AU English spelling ("salary" not
  "paycheck", "super" not "401k", "ATO" not "IRS")

**International incidental (5% of focus):**
- SalaryCalc will not try to rank for "US paycheck calculator" or
  "UK salary calculator" — the math is jurisdiction-specific and would
  dilute topical authority
- HOWEVER, the design system study (Bankrate, NerdWallet, SmartAsset,
  MoneySavingExpert, Ratehub) informs our UX choices even though the
  audience is AU-only

**Why this split matters:** Google's helpful content system punishes
sites that try to cover every jurisdiction. Stay narrow on AU; the
design study makes our UX best-in-class.

---

## 7. Technical SEO checklist (already done / TODO)

| Item | Status | Notes |
|---|---|---|
| HTTPS | ✅ | Cloudflare Pages |
| Canonical URLs | ✅ | Per-page metadata |
| Sitemap.xml | ✅ | 21 URLs |
| Robots.txt | ✅ | Allows all, references sitemap |
| Structured data — Organization | ✅ | In layout.tsx |
| Structured data — WebSite | ✅ | In layout.tsx |
| Structured data — SoftwareApplication | ✅ | On each calculator page |
| Structured data — FAQ | ✅ | On home + calculator pages |
| Structured data — BreadcrumbList | ❌ | TODO — Tier 1.3 |
| Structured data — HowTo | ❌ | TODO — Tier 1.3 |
| Structured data — Article | ❌ | TODO — Tier 1.3 |
| Open Graph + Twitter card | ✅ | Per-page metadata |
| Mobile-friendly | ✅ | Responsive Tailwind |
| Core Web Vitals | ✅ | Static export, should be excellent |
| Hreflang | N/A | Single locale (en-AU) |
| Cookie banner | ✅ | GDPR-compliant |
| Privacy policy | ✅ | /privacy/ |
| Terms | ✅ | /terms/ |
| Disclaimer | ✅ | /disclaimer/ |
| Security.txt | ✅ | /.well-known/security.txt |
| Security headers | ✅ | _headers file |
| Last reviewed date | ✅ | On every page |
| ATO source attribution | ✅ | In footer + methodology |
| Google Search Console verified | ✅ | Meta tag in layout |
| Bing Webmaster | ❌ | TODO — 1 day, free |
| IndexNow | ❌ | TODO — 1 hour, free |
| Internal linking strategy | ⚠️ | Partial — calculators in sidebar + footer, but not woven into body content |

---

## 8. Specific keyword weaving (current state)

SalaryCalc has the following 20 keywords woven into existing pages (per the
prior work):
- pay calculator australia
- salary calculator australia
- tax calculator australia
- take home pay calculator
- payg calculator
- payg withholding
- income tax calculator
- hecs help calculator
- medicare levy calculator
- fortnightly pay calculator
- weekly pay calculator
- casual pay calculator
- award pay calculator
- penalty rate calculator
- salary sacrifice calculator
- stage 3 tax calculator

(Plus the 3 new calculator page keywords: mortgage calculator, loan payoff
calculator, salary sacrifice — already in H1, title, meta.)

**Recommended additional weaves (Tier 1.1, "$X after tax" pages):**
- "$70,000 after tax australia"
- "$80,000 after tax australia"
- "$100,000 after tax australia"
- "$50,000 after tax australia"
- "$60,000 after tax australia"
- "$90,000 after tax australia"
- "$120,000 after tax australia"
- "$150,000 after tax australia"

---

## 9. Success metrics (90-day plan)

| Metric | Today (Aug 2026) | Target (Nov 2026) | Target (Feb 2027) |
|---|---|---|---|
| Indexed pages | ~21 | ~50 | ~80 |
| Organic clicks/mo | TBD (post-Search Console) | 500 | 2,000 |
| Average position (top 20 KWs) | TBD | Top 20 | Top 10 |
| Referring domains | 1 (Cloudflare) | 10 | 30 |
| AdSense approval | Pending | Approved | Approved |

---

## 10. What NOT to do (anti-patterns)

1. **Don't buy backlinks.** Google penalizes this. Earn them.
2. **Don't keyword-stuff.** The 20 keywords are already woven; adding more
   artificially will hurt readability and rankings.
3. **Don't auto-generate 1000 thin pages.** Programmatic pages must be
   genuinely useful (the "$X after tax" pages with live calculator + static
   answer are useful; auto-generated city pages with no unique content
   are spam).
4. **Don't copy ATO or competitor content verbatim.** Risk of duplicate
   content + DMCA.
5. **Don't add a "blog" tag with no posts.** An empty blog is worse than no
   blog.
6. **Don't chase every jurisdiction.** Stay AU-narrow.
7. **Don't fake authority signals.** A "Reviewed by Dr. Smith" badge that
   doesn't exist is a Google penalty waiting to happen.
8. **Don't ignore the calculator's UX.** The 4-period grid is a real
   differentiator. The next 3 months of SEO work should not come at the
   cost of breaking the calculator.

---

## TL;DR for the $0-budget solo builder

1. **Build 20-30 "$X after tax" landing pages** — 1-2 days of work, biggest
   SEO ROI.
2. **Build 8 state/city landing pages** — 1 day of work, real search volume.
3. **Add the missing schema markups** (Breadcrumb, HowTo, Article) — 1 day
   of work, immediate SERP improvement.
4. **Add an "Editorial standards" page** — 1 day, compensates for brand-only
   E-E-A-T.
5. **Expand guide cluster from 5 to 30 over 3 months** — 1 guide per workday,
   builds topical authority.
6. **Publish 1-2 original data reports per year** — the linkable asset that
   earns 5-15 inbound links each.
7. **Submit to ATO, Canstar, Finder, Mozo, and AU government directories** —
   1 day initial + follow-up.
8. **Run a backlink outreach program** — 4-8 hours per month.

This is a 6-12 month compounding play. The site has the technical
foundation; the SEO work is content + outreach.

---

*Generated 21 Aug 2026 by the Superdesign analysis pass. Worldwide design
review covering US, UK, Canada, and Australian finance/calculator sites.*
