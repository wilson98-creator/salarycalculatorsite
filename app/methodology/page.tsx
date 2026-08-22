import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, articleSchema, howToSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Methodology, how SalaryCalc calculates Australian take-home pay',
  description:
    'Line-by-line explanation of how SalaryCalc calculates Australian take-home pay, with source links to the ATO for every rate and threshold. FY 2026-27 brackets fully cited.',
  alternates: { canonical: '/methodology' },
  keywords: [
    'methodology',
    'australian pay calculator methodology',
    'how is tax calculated australia',
    'ato source',
    'payg formula',
    'hecs repayment calculation',
  ],
  openGraph: {
    title: 'Methodology, how SalaryCalc calculates your pay',
    description: 'Every rate, threshold, and formula on SalaryCalc, with a direct link to the ATO source.',
    url: `${brand.url}/methodology`,
    type: 'article',
  },
};

const howToSteps = [
  {
    name: 'Convert your gross pay to annual',
    text: 'Hourly, daily, weekly, fortnightly, and monthly figures are converted to an annual amount using 38 hours/week and 52 weeks/year by default (you can change this in the advanced options).',
  },
  {
    name: 'Strip super if your gross includes it',
    text: 'If your offer is a Total Employment Cost that includes super, tick the "My gross includes super" option and the calculator peels super off the top before taxing.',
  },
  {
    name: 'Subtract pre-tax salary sacrifice',
    text: 'Anything you salary sacrifice into super or a novated lease reduces your taxable income. The sacrificed amount is taxed at 15% inside super instead of your marginal rate.',
  },
  {
    name: 'Apply the ATO income tax brackets',
    text: 'The progressive ATO brackets for the selected financial year are applied to your taxable income. Each bracket is cited in our rate file with a direct link to the ATO publication.',
  },
  {
    name: 'Subtract the Low Income Tax Offset (LITO)',
    text: 'LITO is up to $700 for Australian residents, phasing out 5c per dollar between $37,500 and $45,000, then 1.5c per dollar between $45,000 and $66,667. Non-residents are not eligible.',
  },
  {
    name: 'Add the Medicare levy',
    text: 'The Medicare levy is 2% of taxable income for Australian residents with no exemption. Foreign residents and working holiday makers are not liable.',
  },
  {
    name: 'Add the HECS-HELP repayment',
    text: 'If you have a study debt and your repayment income exceeds the threshold, the calculator applies the marginal HECS-HELP rate (1% to 10% depending on income band).',
  },
  {
    name: 'Show the result for every pay period',
    text: 'Net take-home is shown as a single annual figure, then converted to monthly, fortnightly, and weekly. The selected input period is highlighted.',
  },
];

const faqs = [
  {
    question: 'Why does my payslip show a different number to the calculator?',
    answer:
      'Your employer uses the ATO Schedule 1 (NAT 1004) PAYG withholding formulas, which use weekly-equivalent earnings and small rounding coefficients. The calculator uses the actual annual tax-bracket method, which represents what you will owe on the year. The two figures differ by a few dollars per pay; the difference is reconciled at tax time.',
  },
  {
    question: 'Does the calculator handle the Medicare Levy Surcharge?',
    answer:
      'Not in the main calculator. The Medicare Levy Surcharge is 1-1.5% on top of the Medicare levy for high-income earners without private hospital cover, and depends on the family threshold. The methodology page documents this in the "What we don\'t model" section. If you are close to the threshold, talk to a registered tax agent or use the ATO\'s MLS estimator.',
  },
  {
    question: 'How is the HECS-HELP marginal rate calculated?',
    answer:
      'From 1 July 2025 HECS-HELP uses a marginal bracket system, similar to income tax. You only pay the higher rate on the income above each threshold, not on your whole repayment income. The schedule starts at 1% above the lower threshold and rises to 10% above $200,000.',
  },
  {
    question: 'What is "repayment income" for HECS?',
    answer:
      'Repayment income is your taxable income plus reportable fringe benefits, reportable employer super contributions (including any salary sacrifice), total net investment loss, and exempt foreign employment income. For most employees on a single salary with no rental losses, it is close to taxable income. The calculator uses taxable income as a simplified estimate.',
  },
  {
    question: 'How do I know the rate is current?',
    answer:
      'Every page on the site that uses a rate shows a "last reviewed" date in the footer. The methodology page itself shows the date at the top. The rate file (lib/tax/brackets.ts) is the source of truth and is updated whenever the ATO publishes new brackets.',
  },
  {
    question: 'Can I see the source code for the calculation?',
    answer:
      'Yes. The full source code is on GitHub at github.com/wilson98-creator/salarycalculatorsite. The rate file is a single, plain TypeScript file that any developer can read in under a minute. If you find an error, please report it and we will fix it within 24 hours.',
  },
  {
    question: 'What about the new $1,000 standard work-related deduction?',
    answer:
      'The $1,000 standard work-related deduction (effective from the 2026-27 financial year) is a tax-time benefit, not a per-pay withholding. The calculator does not model it because the impact is at year-end reconciliation, not on each pay.',
  },
];

export default function MethodologyPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'Methodology, how SalaryCalc calculates Australian take-home pay',
            description: metadata.description as string,
            url: `${brand.url}/methodology`,
            datePublished: '2026-01-15',
            dateModified: brand.lastReviewed,
          }),
          howToSchema({
            name: 'How SalaryCalc calculates your Australian take-home pay',
            description: 'Step-by-step process the calculator runs on every input, from gross pay to net take-home.',
            steps: howToSteps,
          }),
          faqSchema(faqs),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-10">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Methodology' }]} />
          <h1 className="h-display mt-6 text-ink-900">
            How we calculate your pay
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 sm:text-lg">
            Every number on SalaryCalc comes from a published Australian Taxation
            Office source. This page documents exactly which file each rate came
            from, when we last reviewed the figures, and what the calculator does not
            (yet) model. If you spot a discrepancy between our output and your
            payslip, please <Link href="/contact">let us know</Link>.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">
              Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
            </span>
            <span className="kicker">Every rate cited</span>
            <span className="kicker">Source code published</span>
            <span className="kicker">Open to correction</span>
          </div>
        </header>

        {/* TL;DR summary table, the headline is the pipeline, but most users
            want to see "what's the rate, where does it come from" first. */}
        <section aria-labelledby="rates-summary" className="card not-prose mb-12">
          <h2 id="rates-summary" className="text-base font-semibold text-ink-900">
            Rate source summary, at a glance
          </h2>
          <p className="mt-1 text-sm text-ink-600">
            Every rate, threshold, and coefficient on the site links back to one of
            these ATO publications.
          </p>
          <ul className="mt-5 divide-y divide-ink-200">
            <SourceRow
              label="Income tax brackets (FY 2026-27)"
              source={sources.taxRates.label}
              url={sources.taxRates.url}
            />
            <SourceRow
              label="Medicare levy (2%)"
              source={sources.medicareLevy.label}
              url={sources.medicareLevy.url}
            />
            <SourceRow
              label="Low Income Tax Offset (LITO)"
              source={sources.lito.label}
              url={sources.lito.url}
            />
            <SourceRow
              label="HECS-HELP / VSL repayment thresholds"
              source={sources.hecsRepayment.label}
              url={sources.hecsRepayment.url}
            />
            <SourceRow
              label="Superannuation Guarantee rate (12%)"
              source={sources.superGuarantee.label}
              url={sources.superGuarantee.url}
            />
            <SourceRow
              label="PAYG withholding formulas (Schedule 1)"
              source={sources.paygFormulas.label}
              url={sources.paygFormulas.url}
            />
          </ul>
          <p className="mt-5 text-xs text-ink-600">
            All links open the ATO publication in a new tab. The rate file in our
            source code is the single source of truth for the calculator.
          </p>
        </section>

        {/* 1. The pipeline */}
        <section className="prose prose-slate prose-invert max-w-3xl">
          <h2>1. The pipeline</h2>
          <p>
            Every time you change an input, the calculator runs the following
            pipeline. The whole thing takes a few milliseconds in your browser , 
            nothing is sent to a server.
          </p>
          <ol>
            {howToSteps.map((step, i) => (
              <li key={step.name}>
                <strong>{step.name}.</strong> {step.text}
              </li>
            ))}
          </ol>

          <h2>2. Income tax brackets (Australian residents, FY 2026-27)</h2>
          <p>
            Source:{' '}
            <a href={sources.taxRates.url} target="_blank" rel="noopener noreferrer">
              {sources.taxRates.label}
            </a>
            .
          </p>
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
            The 15% second-bracket rate took effect on 1 July 2026 under the
            Treasury Laws Amendment (More Cost of Living Relief) Act 2025. A
            further reduction to 14% is scheduled for 1 July 2027. The
            calculator exposes all four financial years (2024-25, 2025-26,
            2026-27, 2027-28) so you can compare the impact of the Stage 3
            changes.
          </p>

          <h2>3. Medicare levy</h2>
          <p>
            Source:{' '}
            <a href={sources.medicareLevy.url} target="_blank" rel="noopener noreferrer">
              {sources.medicareLevy.label}
            </a>
            .
          </p>
          <p>
            The Medicare levy is 2% of taxable income for Australian residents with
            no exemption. A low-income threshold means no levy is payable below
            that income (around $28,011 for singles in FY 2025-26), and a
            shade-in band between the lower and upper thresholds applies a 10% rate
            to the excess over the lower threshold. Foreign residents are not
            liable. Working holiday makers (subclass 417/462) pay the levy once
            their worldwide income exceeds the resident threshold.
          </p>

          <h2>4. LITO</h2>
          <p>
            Source:{' '}
            <a href={sources.lito.url} target="_blank" rel="noopener noreferrer">
              {sources.lito.label}
            </a>
            .
          </p>
          <p>
            The Low Income Tax Offset provides up to $700 of offset. It phases in
            fully up to a taxable income of $37,500, reduces by 5c per dollar
            between $37,500 and $45,000, and by 1.5c per dollar between $45,000
            and $66,667. Non-residents are not eligible. The calculator applies
            LITO to residents only and shows the offset as a separate line in the
            breakdown.
          </p>

          <h2>5. HECS-HELP / VSL / TSL / SSL / SFSS</h2>
          <p>
            Source:{' '}
            <a href={sources.hecsRepayment.url} target="_blank" rel="noopener noreferrer">
              {sources.hecsRepayment.label}
            </a>
            .
          </p>
          <p>
            Compulsory repayments are calculated on &quot;repayment income&quot;
            (taxable income plus reportable fringe benefits plus reportable
            employer super contributions). The current marginal schedule ranges
            from 1% at the lower threshold up to 10% above $200,000. Salaried
            employees with HECS debt have the repayment withheld by their
            employer. The MVP treats repayment income as taxable income for
            simplicity; turn on the salary-sacrifice toggle if you make pre-tax
            super contributions (which reduce your repayment income).
          </p>

          <h2>6. Superannuation</h2>
          <p>
            Source:{' '}
            <a href={sources.superGuarantee.url} target="_blank" rel="noopener noreferrer">
              {sources.superGuarantee.label}
            </a>
            .
          </p>
          <p>
            The Superannuation Guarantee is the minimum amount your employer must
            contribute on top of your salary. It is 12% of ordinary time
            earnings from 1 July 2025 onwards. It is not deducted from your
            take-home pay, the calculator shows it as a separate line so the
            number is never confused with your net pay.
          </p>

          <h2>7. Why this differs from PAYG withholding</h2>
          <p>
            Source:{' '}
            <a href={sources.paygFormulas.url} target="_blank" rel="noopener noreferrer">
              {sources.paygFormulas.label}
            </a>
            .
          </p>
          <p>
            Employers use the formulas in ATO Schedule 1 (NAT 1004) to work out
            how much to withhold from each pay. These formulas use
            weekly-equivalent earnings and small rounding coefficients and may
            differ from the actual tax by a few dollars per pay. The difference
            is reconciled at tax time. The calculator on {brand.name} uses the
            actual tax-bracket method, which represents what you will owe on the
            year.
          </p>

          <h2>8. What we don&apos;t model</h2>
          <p>
            We aim to be honest about the limits of the calculator. The following
            are out of scope of the MVP:
          </p>
          <ul>
            <li>
              <strong>Medicare Levy Surcharge</strong> (1-1.5% on top of the levy
              for high-income earners without private hospital cover).
            </li>
            <li>
              <strong>Private health insurance rebate</strong> (income-tested
              offset on premiums).
            </li>
            <li>
              <strong>Reportable fringe benefits, reportable employer super
              contributions, net investment losses</strong> (which can shift your
              HELP repayment income and your MLS income).
            </li>
            <li>
              <strong>State payroll tax</strong> (an employer cost, not a
              deduction from your pay).
            </li>
            <li>
              <strong>The new $1,000 standard work-related deduction</strong> (a
              tax-time benefit, not a per-pay withholding).
            </li>
            <li>
              <strong>Child support, garnishee orders, and other court-ordered
              deductions.</strong>
            </li>
          </ul>
          <p>
            For any of the above, talk to a registered tax agent or use the{' '}
            <a
              href="https://www.ato.gov.au/calculators-and-tools"
              target="_blank"
              rel="noopener noreferrer"
            >
              ATO&apos;s own calculators
            </a>
            .
          </p>
        </section>

        {/* FAQ */}
        <section aria-labelledby="methodology-faq" className="mt-16 max-w-3xl">
          <h2 id="methodology-faq" className="text-2xl font-bold text-ink-900">
            Common methodology questions
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

        {/* Trust cluster */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink-900">
            Trust and how to reach us
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrustLink href="/about" title="About SalaryCalc" detail="The story, editorial standards, corrections policy." />
            <TrustLink href="/disclaimer" title="Disclaimer" detail="The full legal disclaimer." />
            <TrustLink href="/privacy" title="Privacy policy" detail="What we collect (almost nothing) and why." />
            <TrustLink href="/terms" title="Terms of service" detail="Using the site, and what we will not do." />
            <TrustLink href="/contact" title="Contact" detail="Email us about an error or a suggestion." />
            <TrustLink href="/tax-rates" title="FY 2026-27 tax rates" detail="All ATO brackets in one place." />
          </ul>
        </section>
      </article>
    </>
  );
}

function SourceRow({ label, source, url }: { label: string; source: string; url: string }) {
  return (
    <li className="flex items-baseline justify-between gap-3 py-2.5">
      <span className="text-sm text-ink-700">{label}</span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-brand-600 underline-offset-2 hover:underline"
      >
        {source} ↗
      </a>
    </li>
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
