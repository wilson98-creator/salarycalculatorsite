import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Superannuation basics for employees (FY 2026-27)',
  description:
    'The Superannuation Guarantee, how your balance grows, when you can access it, and the four levers that move your retirement outcome the most. ATO-sourced.',
  alternates: { canonical: '/guides/superannuation' },
  keywords: [
    'superannuation',
    'super guarantee',
    'super basics',
    'retirement savings',
    'preservation age',
    'super funds',
  ],
  openGraph: {
    title: 'Superannuation basics for employees',
    description: 'The Superannuation Guarantee, growth, access, and the four levers that matter most.',
    url: `${brand.url}/guides/superannuation`,
    type: 'article',
  },
};

const faqs = [
  {
    question: 'What is the Superannuation Guarantee?',
    answer:
      'The Superannuation Guarantee (SG) is the minimum amount your employer must pay into your super fund on top of your salary. The current rate is 12% of ordinary time earnings, effective from 1 July 2025. For an $80,000 salary, the SG contribution is $9,600 per year. The rate has stepped up gradually from 9% in 2013.',
  },
  {
    question: 'Is super paid on top of my salary or deducted from it?',
    answer:
      'On top. The SG is an employer cost — your employer pays 12% of your salary into your super fund in addition to your take-home pay. If you are offered a "Total Employment Cost" package (e.g. $100,000 including super), the calculator will peel the super off the top to find your taxable gross.',
  },
  {
    question: 'When can I access my super?',
    answer:
      'Super is preserved until you reach preservation age (60 for everyone born after 1 July 1964) and meet a condition of release. From age 60 you can access it even if still working, subject to the relevant release rules. Earlier access is possible in limited circumstances: severe financial hardship, compassionate grounds (medical expenses, mortgage arrears), terminal illness, or permanent incapacity.',
  },
  {
    question: 'How is super taxed?',
    answer:
      'Concessional contributions are taxed at 15% on the way in. Investment earnings inside the fund are taxed at up to 15% (0% in the accumulation phase for some assets, depending on the fund structure). Withdrawals after age 60 are tax-free. Before age 60, withdrawals are taxed at your marginal rate with a 15% tax offset (so effectively taxed at your marginal rate minus 15%).',
  },
  {
    question: 'What is salary sacrifice into super?',
    answer:
      'Salary sacrifice is an arrangement with your employer to redirect part of your pre-tax salary into super. The sacrificed amount is taxed at 15% inside super instead of your marginal rate (typically 30% or 37%). The concessional cap is $30,000 per year for FY 2025-26, including the SG paid by your employer. See the salary sacrifice guide for the full numbers.',
  },
  {
    question: 'Can I choose my own super fund?',
    answer:
      'Yes. You can choose your own super fund, or accept the "MySuper" default fund your employer nominates. To choose your own, give your employer a Standard Choice form with your fund details. If you change jobs frequently, consolidating into one fund avoids paying multiple sets of fees — use the ATO "lost super" search via myGov to find old accounts.',
  },
  {
    question: 'Should I consolidate my super accounts?',
    answer:
      'If you have changed jobs and not consolidated, you could be paying multiple sets of fees (admin, investment, advice, insurance). Consolidate into one fund — use the ATO lost super search to find old accounts, then roll them into your preferred fund in a few clicks. Watch out for insurance you might lose when you close an old account.',
  },
  {
    question: 'What is the default investment option?',
    answer:
      'Most funds default you to a "Balanced" option around 60-70% growth assets. Younger people with longer time horizons can usually afford more growth assets; people approaching retirement usually shift to more conservative options to reduce the risk of a market downturn eating into their savings just as they need them. Most funds let you switch investment options online for free, but a switch only affects future contributions and rebalancing — it does not retroactively change past returns.',
  },
];

export default function SuperGuide() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'Superannuation basics for employees (FY 2026-27)',
            description: metadata.description as string,
            url: `${brand.url}/guides/superannuation`,
            datePublished: '2026-01-15',
            dateModified: brand.lastReviewed,
          }),
          faqSchema(faqs),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-10">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Guides', href: '/guides' },
            { name: 'Superannuation' },
          ]} />
          <h1 className="h-serif mt-3 text-3xl text-ink-900 dark:text-ink-50 sm:text-4xl">
            Superannuation <span className="h-highlight">basics</span> for employees
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            Superannuation is Australia&apos;s mandatory private retirement
            savings system. Your employer pays at least 12% of your salary
            into a super fund on your behalf, the money is invested, and
            you can access it from age 60 (preservation age). This guide
            covers how the system works and the four levers that have the
            biggest impact on your retirement outcome.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600 dark:text-ink-400">
            <span className="chip">
              Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
            </span>
            <span className="chip">7 min read</span>
            <span className="chip">FY 2026-27</span>
            <span className="chip">12% SG</span>
          </div>
        </header>

        {/* TL;DR — the four levers */}
        <section aria-labelledby="super-tldr" className="card not-prose mb-10">
          <h2 id="super-tldr" className="text-base font-semibold text-ink-900 dark:text-ink-50">
            The 60-second version — the four levers
          </h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Your retirement outcome is driven by these four factors, in this order of impact.
          </p>
          <ol className="mt-5 space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">1.</span>
              <div>
                <p className="font-semibold text-ink-900 dark:text-ink-50">Time in the market</p>
                <p className="text-ink-700 dark:text-ink-300">
                  The single biggest driver. Starting at 25 vs 35 can mean a 2-3x difference in final balance. Compound growth over decades.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">2.</span>
              <div>
                <p className="font-semibold text-ink-900 dark:text-ink-50">How much goes in</p>
                <p className="text-ink-700 dark:text-ink-300">
                  SG (12% from your employer) + any salary sacrifice + any after-tax contributions. Concessional cap: $30,000/year.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">3.</span>
              <div>
                <p className="font-semibold text-ink-900 dark:text-ink-50">Investment return</p>
                <p className="text-ink-700 dark:text-ink-300">
                  Diversified growth options have historically returned 7-9% per year over 20+ year periods, with significant short-term volatility.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">4.</span>
              <div>
                <p className="font-semibold text-ink-900 dark:text-ink-50">Fees</p>
                <p className="text-ink-700 dark:text-ink-300">
                  A 1% difference in annual fees on $500,000 over 20 years is around $150,000 in returns foregone. Compare fund fees carefully.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="prose prose-slate dark:prose-invert max-w-3xl">
          <h2>1. The Superannuation Guarantee</h2>
          <p>
            The Superannuation Guarantee (SG) is the minimum amount your
            employer must pay into your super fund on top of your salary.
            The current rate is 12% of ordinary time earnings, effective
            from 1 July 2025. The rate has stepped up gradually from 9% in
            2013.
          </p>
          <p>
            For an $80,000 salary, the SG contribution is $9,600 per year.
            Your employer pays this in addition to your take-home pay — it
            is not deducted from your gross salary.
          </p>
          <p>
            SG contributions are paid at least quarterly, and most employers
            pay them monthly with each pay run. Check your payslip: the
            super line shows the amount paid and the fund it went to.
          </p>

          <h2>2. The four levers that matter</h2>
          <p>
            Whatever the SG rate, your retirement outcome depends on four
            factors:
          </p>
          <ol>
            <li>
              <strong>How much goes in.</strong> SG + any salary sacrifice +
              any after-tax contributions. The concessional (pre-tax) cap is
              $30,000 per year for FY 2025-26.
            </li>
            <li>
              <strong>How long it is invested.</strong> Time in the market is
              the single biggest driver. Starting at 25 versus starting at
              35 can mean a 2-3x difference in final balance.
            </li>
            <li>
              <strong>What return you earn.</strong> Diversified growth
              options have historically returned 7-9% per year over 20+
              year periods, but with significant short-term volatility.
            </li>
            <li>
              <strong>What fees you pay.</strong> A 1% difference in annual
              fees compounds to a meaningful difference over 30+ years.
              Compare fund fees, admin fees, and investment option fees.
            </li>
          </ol>

          <h2>3. Choosing a fund</h2>
          <p>
            You can choose your own super fund, or accept the
            &quot;MySuper&quot; default fund your employer nominates. Most
            large employers use industry funds (AustralianSuper, Hostplus,
            REST, Cbus) or retail funds (Australian Retirement Trust, BT,
            Colonial First State).
          </p>
          <p>When comparing funds, look at:</p>
          <ul>
            <li>Total annual fees (admin + investment + advice)</li>
            <li>Investment option performance over 5, 10, and 20 years (not 1 year)</li>
            <li>Insurance offered (default death and TPD cover can be useful but is not free)</li>
            <li>Customer service reputation</li>
            <li>Whether the fund has any ethical or sustainability investment options that interest you</li>
          </ul>
          <p>
            The ATO&apos;s{' '}
            <a
              href="https://www.ato.gov.au/individuals-and-families/super-for-me-individuals/choosing-and-managing-your-super"
              target="_blank"
              rel="noopener noreferrer"
            >
              YourSuper comparison tool
            </a>{' '}
            is a good neutral starting point.
          </p>

          <h2>4. Investment options</h2>
          <p>
            Most funds offer a menu of investment options ranging from
            &quot;Conservative&quot; (mostly cash and bonds) to &quot;High
            Growth&quot; (mostly shares and property). The default is usually
            a &quot;Balanced&quot; option around 60-70% growth assets.
          </p>
          <p>
            Younger people with longer time horizons can usually afford more
            growth assets, accepting the short-term volatility for higher
            long-term returns. As you approach retirement, gradually shifting
            to more conservative options reduces the risk of a market
            downturn eating into your savings just as you need them.
          </p>

          <h2>5. When you can access it</h2>
          <p>
            Super is &quot;preserved&quot; — you cannot withdraw it until
            you reach preservation age and meet a condition of release.
            Preservation age is 60 for everyone born after 1 July 1964.
            From age 60 you can access your super even if you are still
            working, subject to the relevant release rules.
          </p>
          <p>
            Earlier access is possible in limited circumstances: severe
            financial hardship, compassionate grounds (medical expenses,
            mortgage arrears), terminal illness, or permanent incapacity.
            You cannot normally access super just because you want the
            money, even if you have left Australia permanently.
          </p>

          <h2>6. How super is taxed</h2>
          <p>
            Super has its own tax system. Contributions are taxed at 15% on
            the way in (concessional), and investment earnings are taxed at
            15% inside the fund. Withdrawals after age 60 are tax-free.
            Before age 60, withdrawals are taxed at your marginal rate with
            a 15% offset (so effectively taxed at your marginal rate minus
            15%).
          </p>
          <p>
            The 15% super tax rate is much lower than most people&apos;s
            marginal income tax rate, which is why salary sacrificing into
            super is so tax-effective. See the{' '}
            <Link href="/guides/salary-sacrifice">salary sacrifice guide</Link>{' '}
            for the numbers.
          </p>

          <h2>7. Insurance inside super</h2>
          <p>
            Most super funds offer default insurance cover: death and total
            &amp; permanent disability (TPD) and often income protection.
            The premiums are deducted from your super balance. The cover is
            often automatic when you start a new job, and you may need to
            opt out if you do not want it.
          </p>
          <p>
            The insurance offered through super is usually cheaper than
            equivalent cover bought directly, but the trade-off is that
            premiums come out of your retirement balance. For a 25-year-old
            with no dependents, the insurance may not be worth the erosion.
            For a 40-year-old with a family, it usually is.
          </p>

          <h2>8. Common mistakes</h2>
          <ul>
            <li>
              <strong>Having multiple super accounts.</strong> If you have
              changed jobs and not consolidated, you could be paying
              multiple sets of fees. Consolidate into one fund — use the
              ATO&apos;s &quot;lost super&quot; search.
            </li>
            <li>
              <strong>Choosing the wrong investment option.</strong> Many
              people stay in the default balanced option their whole career,
              which is often too conservative for a 25-year-old and too
              aggressive for a 60-year-old.
            </li>
            <li>
              <strong>Ignoring fees.</strong> A 1% difference in fees on a
              $500,000 balance over 20 years is around $150,000 in returns
              foregone.
            </li>
            <li>
              <strong>Not salary sacrificing when it would help.</strong> If
              you earn above $45,000 and can afford the reduced take-home,
              salary sacrifice into super is one of the best financial moves
              available to most Australians.
            </li>
            <li>
              <strong>Withdrawing super early to pay debt.</strong> The
              long-term cost of taking $30,000 out of super at 35 vastly
              exceeds the benefit of clearing $30,000 of credit card debt.
              The compounding is hard to reverse.
            </li>
          </ul>

          <h2>9. Where the rules come from</h2>
          <p>
            Super rules are in the <em>Superannuation Industry (Supervision)
            Act 1993</em>, the <em>Income Tax Assessment Act 1997</em>, and
            the <em>Superannuation Guarantee (Administration) Act 1992</em>.
            Source:{' '}
            <a
              href={sources.superGuarantee.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {sources.superGuarantee.label}
            </a>
            . The ATO&apos;s{' '}
            <a
              href="https://www.ato.gov.au/individuals-and-families/super-for-me-individuals"
              target="_blank"
              rel="noopener noreferrer"
            >
              super for individuals
            </a>{' '}
            page is the most useful starting point.
          </p>
        </section>

        <section aria-labelledby="super-faq" className="mt-16 max-w-3xl">
          <h2 id="super-faq" className="text-2xl font-bold text-ink-900 dark:text-ink-50">
            Common questions about superannuation
          </h2>
          <div className="mt-5 space-y-3">
            {faqs.map((q) => (
              <details key={q.question} className="card group">
                <summary className="cursor-pointer list-none text-base font-semibold text-ink-900 dark:text-ink-50">
                  <span
                    aria-hidden="true"
                    className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition dark:text-brand-300"
                  >
                    ›
                  </span>
                  {q.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-50">Related guides and tools</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrustLink href="/salary-sacrifice-calculator" title="Salary sacrifice calculator" detail="See how sacrifice changes your take-home and super." />
            <TrustLink href="/" title="Pay calculator" detail="Live take-home pay with super guarantee shown separately." />
            <TrustLink href="/guides/salary-sacrifice" title="Salary sacrifice guide" detail="The full explainer with $30K cap and Division 293." />
            <TrustLink href="/guides/stage-3-tax-cuts" title="Stage 3 tax cuts" detail="What changed and what is still to come." />
            <TrustLink href="/methodology" title="Methodology" detail="How every number is calculated, with citations." />
            <TrustLink href="/about" title="About SalaryCalc" detail="Story, editorial standards, corrections policy." />
          </ul>
        </section>
      </article>
    </>
  );
}

function TrustLink({ href, title, detail }: { href: string; title: string; detail: string }) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-2xl border border-ink-200 bg-white p-4 transition hover:border-brand-300 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700"
      >
        <p className="text-sm font-semibold text-ink-900 hover:text-brand-700 dark:text-ink-100 dark:hover:text-brand-300">
          {title} →
        </p>
        <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">{detail}</p>
      </Link>
    </li>
  );
}
