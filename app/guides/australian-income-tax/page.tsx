import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Australian income tax: a complete guide (FY 2026-27)',
  description:
    'How Australian income tax works end-to-end: brackets, offsets, Medicare, residency, and the difference between PAYG withholding and what you actually owe. FY 2026-27 rates, ATO-sourced.',
  alternates: { canonical: '/guides/australian-income-tax' },
  keywords: [
    'australian income tax',
    'tax brackets australia',
    'payg withholding',
    'medicare levy',
    'lito',
    'tax rates',
  ],
  openGraph: {
    title: 'Australian income tax: a complete guide',
    description: 'How Australian income tax works end-to-end. FY 2026-27 brackets, offsets, and Medicare.',
    url: `${brand.url}/guides/australian-income-tax`,
    type: 'article',
  },
};

const faqs = [
  {
    question: 'How is Australian income tax calculated?',
    answer:
      'Australian income tax is progressive, different rates apply to different portions of your income. For FY 2026-27 the resident brackets are 0% to $18,200, 15% to $45,000, 30% to $135,000, 37% to $190,000, and 45% above that. Add the 2% Medicare levy on top, subtract the Low Income Tax Offset (LITO) if eligible, and add the HECS-HELP repayment if you have a study debt.',
  },
  {
    question: 'What is the difference between PAYG and the actual tax?',
    answer:
      'Your employer withholds tax from each pay using the ATO Schedule 1 (NAT 1004) formulas, which use weekly-equivalent earnings and small rounding coefficients. The actual tax uses the annual brackets. The two methods can differ by a few dollars per pay; the difference is reconciled at tax time. The SalaryCalc calculator uses the actual annual tax method, which is what the ATO uses to assess your final position.',
  },
  {
    question: 'What is the tax-free threshold in Australia?',
    answer:
      'The tax-free threshold for Australian residents is $18,200 per year. Income up to $18,200 is taxed at 0%. The threshold is built into the first tax bracket and is not a separate allowance. Foreign residents for tax purposes do not get the threshold and pay tax on every dollar from $0.',
  },
  {
    question: 'Do I get the LITO on top of the tax-free threshold?',
    answer:
      'Yes, in a sense. LITO is a tax offset of up to $700 for low-to-middle income earners. It phases in fully at $37,500, reduces by 5c per dollar between $37,500 and $45,000, and by 1.5c per dollar between $45,000 and $66,667. Above $66,667 the offset is zero. Non-residents are not eligible.',
  },
  {
    question: 'How much is the Medicare levy?',
    answer:
      'The Medicare levy is 2% of taxable income for Australian residents. There is a low-income threshold below which no levy is payable (around $28,011 for singles in FY 2025-26) and a shade-in band where the rate is reduced. Family thresholds are higher and increase with dependent children. Foreign residents are not liable.',
  },
  {
    question: 'What is the Medicare Levy Surcharge?',
    answer:
      'The Medicare Levy Surcharge (MLS) is an extra 1-1.5% charged to higher-income earners who do not hold appropriate private hospital cover. For FY 2026-27 it applies to singles earning above $105,000 and families above $210,000. It is paid at tax time, not through PAYG withholding, so the SalaryCalc calculator does not model it. See the dedicated MLS guide for the thresholds and exemptions.',
  },
  {
    question: 'How do I check if my payslip is correct?',
    answer:
      'Compare the year-to-date tax withheld on your payslip with what the SalaryCalc calculator shows for the same period. Small differences (a few dollars per pay) are normal, they are the rounding difference between the PAYG Schedule 1 formulas and the annual bracket method. Large differences (tens or hundreds of dollars) suggest a problem: an incorrect TFN declaration, missing HELP code, or a payroll software error. Talk to your payroll officer if the gap is large.',
  },
  {
    question: 'When does a small pay rise stop being worth it?',
    answer:
      'In the old HECS repayment system, crossing a threshold could mean a flat percentage of your entire income was now subject to repayment, sometimes more than the pay rise. The new marginal HECS system (from 1 July 2025) fixed this. For income tax, the progressive bracket system means every dollar is taxed at its own marginal rate, so any pay rise is always worth more than the tax on the last dollar.',
  },
];

export default function IncomeTaxGuide() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'Australian income tax: a complete guide (FY 2026-27)',
            description: metadata.description as string,
            url: `${brand.url}/guides/australian-income-tax`,
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
            { name: 'Australian income tax' },
          ]} />
          <h1 className="h-display mt-6 text-ink-900">
            Australian income tax: a complete guide
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 sm:text-lg">
            Australian income tax is progressive, different rates apply to
            different portions of your income, not a single flat rate on the
            whole amount. This guide walks through how the system works, who
            pays what, and the most common ways people end up with the wrong
            outcome at tax time.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">
              Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
            </span>
            <span className="kicker">11 min read</span>
            <span className="kicker">FY 2026-27</span>
            <span className="kicker">ATO-sourced</span>
          </div>
        </header>

        {/* TL;DR */}
        <section aria-labelledby="tax-tldr" className="card not-prose mb-10">
          <h2 id="tax-tldr" className="text-base font-semibold text-ink-900">
            The 60-second version
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                The Australian tax system is <strong>progressive</strong>: 0% to $18,200, 15% to $45,000, 30% to $135,000, 37% to $190,000, 45% above (FY 2026-27 residents).
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                Your employer withholds a slightly different number (PAYG) than your actual annual tax, the difference reconciles at tax time.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                Add the <strong>2% Medicare levy</strong>, subtract <strong>LITO</strong> if eligible (up to $700), and add <strong>HECS-HELP</strong> repayment if you have a study debt.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                Foreign residents do not get the tax-free threshold, LITO, or Medicare levy.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                The <Link href="/">SalaryCalc calculator</Link> applies every rate and threshold in this guide. Use it for everyday estimates; use a registered tax agent for binding decisions.
              </span>
            </li>
          </ul>
        </section>

        <section className="prose prose-slate prose-invert max-w-3xl">
          <h2>1. The structure of the system</h2>
          <p>
            The Australian Taxation Office (ATO) administers a self-assessment
            system. You report your income to the ATO each year (via your tax
            return), the ATO calculates your tax using the published rates, and
            you pay any difference. To make sure you do not get a giant bill at
            the end of the year, your employer withholds tax from each pay under
            the Pay As You Go (PAYG) system.
          </p>
          <p>
            The two pieces of machinery, what you actually owe and what your
            employer withholds, use slightly different math. The withholding
            method (ATO Schedule 1, NAT 1004) uses weekly-equivalent earnings
            and small rounding coefficients and is designed to get close to but
            not exactly match the annual tax. The annual tax brackets (the
            &quot;real&quot; tax) are what the ATO uses at assessment time. The
            two reconcile when you lodge your return.
          </p>

          <h2>2. The current brackets (FY 2026-27)</h2>
          <p>For Australian residents, the FY 2026-27 brackets are:</p>
          <table>
            <thead>
              <tr>
                <th>Taxable income</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$0 – $18,200</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>$18,201 – $45,000</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>$45,001 – $135,000</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>$135,001 – $190,000</td>
                <td>37%</td>
              </tr>
              <tr>
                <td>$190,001+</td>
                <td>45%</td>
              </tr>
            </tbody>
          </table>
          <p>
            These rates are exclusive of the 2% Medicare levy, which is
            calculated on top. Foreign residents for tax purposes are not
            eligible for the tax-free threshold or the Medicare levy, see the
            residency section below.
          </p>
          <p>
            Source:{' '}
            <a href={sources.taxRates.url} target="_blank" rel="noopener noreferrer">
              {sources.taxRates.label}
            </a>
            .
          </p>

          <h2>3. How the math actually works</h2>
          <p>
            Imagine you earn $80,000 in FY 2026-27. The tax is calculated
            bracket by bracket:
          </p>
          <ol>
            <li>0% on the first $18,200 = $0</li>
            <li>15% on the next $26,800 ($18,201 to $45,000) = $4,020</li>
            <li>30% on the next $35,000 ($45,001 to $80,000) = $10,500</li>
          </ol>
          <p>
            Total income tax = $14,520. Then add the Medicare levy of $1,600
            (2% of $80,000). Your gross tax on the year is $16,120, leaving
            net of $63,880 before any HECS-HELP repayment or post-tax
            deductions.
          </p>

          <h2>4. The Low Income Tax Offset (LITO)</h2>
          <p>
            LITO is a tax offset of up to $700 for low-to-middle income
            earners. It phases in fully at $37,500 of taxable income, reduces
            by 5 cents per dollar between $37,500 and $45,000, and then by
            1.5 cents per dollar between $45,000 and $66,667. Above $66,667
            the offset is zero. Non-residents are not eligible.
          </p>
          <p>
            For an $80,000 earner, LITO has been fully phased out, the
            marginal reduction below the phase-out point is larger than the
            remaining offset. The SalaryCalc calculator applies LITO
            automatically.
          </p>

          <h2>5. Medicare levy</h2>
          <p>
            The Medicare levy is a 2% tax on taxable income that funds
            Australia&apos;s public healthcare system. Most Australian
            residents pay it on top of income tax. There is a low-income
            threshold below which no levy is payable, and a &quot;shade-in&quot;
            band where the rate is reduced.
          </p>
          <p>
            The thresholds are indexed each year. For FY 2025-26 they were
            $28,011 (lower) and $35,013 (upper) for singles. The 2026-27
            thresholds are slightly higher. The thresholds for families are
            higher and increase with dependent children. The calculator uses
            the current figures automatically.
          </p>

          <h2>6. Medicare Levy Surcharge (MLS)</h2>
          <p>
            The Medicare Levy Surcharge is an extra 1% to 1.5% charged to
            higher earners who do not hold an appropriate private hospital
            cover policy. For FY 2026-27 it applies to singles earning above
            $105,000 and families above $210,000. It is paid at tax time, not
            through PAYG withholding, so the SalaryCalc pay calculator does
            not model it.
          </p>
          <p>
            The MLS is calculated on &quot;MLS income&quot;, taxable income
            plus reportable fringe benefits, reportable employer super
            contributions, and net investment losses. Many people do not
            realise the surcharge applies to the whole of your MLS income, not
            just the portion above the threshold, so a $200,000 earner pays
            1% on the whole $200,000, not just on the $95,000 above $105,000.
            See the dedicated{' '}
            <Link href="/guides/medicare-levy-surcharge">MLS guide</Link> for
            the full thresholds and exemptions.
          </p>

          <h2>7. HECS-HELP repayments</h2>
          <p>
            If you have a HECS-HELP, VSL, TSL, SSL, or SFSS debt, compulsory
            repayments kick in once your &quot;repayment income&quot;
            exceeds the threshold for the financial year. From 1 July 2025
            the repayment system is marginal, you only pay the higher rate
            on income above each threshold, not on your whole income. For
            FY 2026-27 the threshold is around $69,528.
          </p>
          <p>
            The SalaryCalc <Link href="/hecs-calculator">HECS calculator</Link>{' '}
            models the marginal method automatically based on the year you
            select. See the dedicated{' '}
            <Link href="/guides/hecs-repayment">HECS guide</Link> for the
            long-form explainer.
          </p>

          <h2>8. Residency for tax purposes</h2>
          <p>
            Whether you are an Australian resident for tax purposes depends on
            a number of factors including the length and purpose of your
            stay, your family and asset ties, and your intentions. The ATO
            has a residency test on its website. As a rule of thumb:
            Australian and New Zealand citizens are typically residents;
            people on most temporary visas (including student visas and many
            skilled visas) are typically residents; people on working
            holiday visas (417/462) are typically foreign residents and
            taxed under the working holiday maker schedule.
          </p>
          <p>
            Foreign residents are not eligible for the tax-free threshold,
            the LITO, or the Medicare levy. Working holiday makers are taxed
            at 15% on the first $45,000 of taxable income, then at the
            standard foreign resident rates.
          </p>

          <h2>9. PAYG withholding vs. your actual tax</h2>
          <p>
            Your employer uses the formulas in{' '}
            <a href={sources.paygFormulas.url} target="_blank" rel="noopener noreferrer">
              ATO Schedule 1 (NAT 1004)
            </a>{' '}
            to calculate how much to withhold from each pay. The formulas are
            based on weekly-equivalent earnings and use small rounding
            coefficients. They are designed to slightly over- or
            under-collect during the year, with the difference reconciled at
            tax time.
          </p>
          <p>
            In practice, this means your payslip number for tax can differ by
            a few dollars from a &quot;what tax do I actually owe&quot;
            calculation. Neither is wrong, they are different methods. The
            SalaryCalc calculator uses the actual tax-bracket method, which
            is what the ATO uses to assess your final tax position.
          </p>

          <h2>10. What this guide does not cover</h2>
          <p>
            This guide covers the most common situations. The Australian tax
            system has many moving parts that are out of scope here: capital
            gains tax, investment income, rental property, foreign income,
            trust distributions, sole trader and partnership income, Division
            293 on super contributions for high earners, child support and
            garnishee orders, the private health insurance rebate, and many
            more.
          </p>
          <p>
            For your actual tax position, use a registered tax agent or the
            ATO&apos;s own{' '}
            <a
              href="https://www.ato.gov.au/calculators-and-tools"
              target="_blank"
              rel="noopener noreferrer"
            >
              calculators and tools
            </a>
            .
          </p>
        </section>

        {/* FAQ */}
        <section aria-labelledby="tax-faq" className="mt-16 max-w-3xl">
          <h2 id="tax-faq" className="text-2xl font-bold text-ink-900">
            Common questions about Australian income tax
          </h2>
          <div className="mt-5 space-y-3">
            {faqs.map((q) => (
              <details key={q.question} className="card group">
                <summary className="cursor-pointer list-none text-base font-semibold text-ink-900">
                  <span
                    aria-hidden="true"
                    className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition"
                  >
                    ›
                  </span>
                  {q.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink-900">Related guides and tools</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrustLink href="/" title="Pay calculator" detail="Live take-home pay calculator with all FY 2026-27 rates." />
            <TrustLink href="/hecs-calculator" title="HECS-HELP calculator" detail="Repayment under the new 2025-26 marginal system." />
            <TrustLink href="/salary-sacrifice-calculator" title="Salary sacrifice calculator" detail="See how much tax you save by sacrificing into super." />
            <TrustLink href="/guides/stage-3-tax-cuts" title="Stage 3 tax cuts" detail="What changed and what is still to come." />
            <TrustLink href="/guides/hecs-repayment" title="HECS-HELP guide" detail="The long-form explainer with indexation projections." />
            <TrustLink href="/methodology" title="Methodology" detail="How every number is calculated, with citations." />
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
        className="block transition hover:border-brand-300"
      >
        <p className="text-sm font-semibold text-ink-900 hover:text-brand-700">
          {title} →
        </p>
        <p className="mt-1 text-xs text-ink-600">{detail}</p>
      </Link>
    </li>
  );
}
