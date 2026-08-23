import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';
import { Breadcrumb } from '@/components/Breadcrumb';
import { NewsletterForm } from '@/components/NewsletterForm';
import { JsonLd, faqSchema, articleSchema, breadcrumbSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'How to read your Australian payslip',
  description: 'Every line on an Australian payslip explained: gross pay, ordinary time earnings, pre-tax deductions, PAYG withholding, Medicare levy, HECS-HELP, super guarantee, post-tax deductions, net pay, and YTD figures.',
  alternates: { canonical: '/guides/how-to-read-your-payslip/' },
  openGraph: {
    title: 'How to read your Australian payslip',
    description: 'Every line on an Australian payslip explained in plain English, with a sample annotated payslip and what each number means for your tax.',
    url: `${brand.url}/guides/how-to-read-your-payslip/`,
    type: 'article',
  },
};

const faqs = [
  {
    question: 'Why is my net pay different from what the calculator says?',
    answer: 'Your payslip shows the actual amount your employer paid you for the period, after applying the ATO PAYG withholding formulas. The calculator on this site shows the actual annual tax you owe. The two can differ because: (1) PAYG withholding uses weekly-equivalent formulas and small rounding coefficients, (2) it intentionally collects slightly more or less than your real tax so the difference gets reconciled at tax time, (3) back-pays, leave loading, and one-off payments can affect a single pay. The end-of-year difference is usually small and gets squared up when you lodge your return.',
  },
  {
    question: 'What is ordinary time earnings?',
    answer: 'Ordinary time earnings (OTE) is the part of your pay that your employer uses to calculate your 12% Superannuation Guarantee. It usually includes base salary, regular overtime, shift loadings, and commissions. It generally excludes annual leave loading, expense reimbursements, and one-off payments like bonuses or back-pay. If your OTE on the payslip is lower than your gross pay, the difference is being excluded from super. This is allowed for some items but not for ordinary hours of work.',
  },
  {
    question: 'Why does my employer withhold more tax than I actually owe?',
    answer: 'The PAYG withholding system is designed to collect tax throughout the year so you do not get a huge bill at tax time. For most people the withholding is close to the actual tax, but it can be slightly more or less depending on your exact situation. If too much was withheld, you get a refund. If too little, you owe the difference. Either way, your annual tax return reconciles it.',
  },
  {
    question: 'What is the difference between gross and taxable income?',
    answer: 'Gross pay is what you earned before any deductions. Taxable income is what the ATO taxes you on, after pre-tax deductions (salary sacrifice into super, pre-tax packaging, reportable fringe benefits). On a payslip, your gross might be $5,000 per fortnight, your pre-tax deductions might be $500, and your taxable gross for PAYG purposes would be $4,500.',
  },
  {
    question: 'Why is super listed separately and not added to my take-home?',
    answer: 'The 12% Superannuation Guarantee is paid by your employer on top of your gross pay, not deducted from it. It is an employer cost, not a deduction from your hourly rate. That is why a $100,000 salary costs the employer about $112,000 in total but your take-home pay is calculated as if you earned $100,000.',
  },
  {
    question: 'What is reportable fringe benefits on my payment summary?',
    answer: 'Reportable fringe benefits are non-cash benefits (a car, insurance, low-interest loan) that are above the FBT threshold and need to be reported on your end-of-year payment summary. They do not add to your taxable income, but they can affect things like the Medicare levy surcharge, child support, and HECS-HELP repayment income. Your employer should provide a separate payment summary if you have reportable fringe benefits.',
  },
];

export default function HowToReadYourPayslipPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Guides', href: '/guides/' },
          { name: 'How to read your payslip' },
        ]}
      />

      <article className="max-w-3xl">
        <header className="mb-10">
          <p className="mt-3 text-sm text-ink-600">Guide · Pay</p>
          <h1 className="h-display mt-3 text-ink-800">
            How to read your Australian payslip.
          </h1>
          <p className="mt-4 text-base text-ink-700 sm:text-lg">
            Every line on a standard Australian payslip, what it means, where it
            comes from, and what to check each pay. With a fully annotated
            sample payslip you can compare against your own.
          </p>
        </header>

        <section className="prose-content">
          <h2>The full picture: a sample payslip</h2>
          <p>
            Before we go line by line, here is what a typical full-time payslip
            looks like. This is for a permanent employee on $85,000 a year, paid
            fortnightly, with HECS-HELP debt, salary sacrificing $1,000 a
            fortnight into super.
          </p>

          <div className="my-10 rounded-lg border border-ink-300 bg-ink-100 overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-ink-300">
                  <td className="px-4 py-3 text-ink-700">Employee</td>
                  <td className="px-4 py-3 text-ink-800">A. Worker</td>
                  <td className="px-4 py-3 text-ink-700">Period</td>
                  <td className="px-4 py-3 text-ink-800">Fortnight ending 22 Aug 2026</td>
                </tr>
                <tr className="border-b border-ink-300 bg-ink-200">
                  <td colSpan={4} className="px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-700">Earnings</td>
                </tr>
                <tr className="border-b border-ink-300">
                  <td className="px-4 py-3 text-ink-700">Ordinary hours</td>
                  <td className="px-4 py-3 font-mono text-ink-800">76.00 hrs</td>
                  <td className="px-4 py-3 text-ink-700">Hourly rate</td>
                  <td className="px-4 py-3 font-mono text-ink-800">$40.87</td>
                </tr>
                <tr className="border-b border-ink-300">
                  <td className="px-4 py-3 text-ink-700">Gross pay (this period)</td>
                  <td className="px-4 py-3 font-mono text-ink-800">$3,269.23</td>
                  <td className="px-4 py-3 text-ink-700">YTD gross</td>
                  <td className="px-4 py-3 font-mono text-ink-800">$58,846.15</td>
                </tr>
                <tr className="border-b border-ink-300 bg-ink-200">
                  <td colSpan={4} className="px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-700">Pre-tax deductions</td>
                </tr>
                <tr className="border-b border-ink-300">
                  <td className="px-4 py-3 text-ink-700">Salary sacrifice (super)</td>
                  <td className="px-4 py-3 font-mono text-danger-500">−$1,000.00</td>
                  <td className="px-4 py-3 text-ink-700">YTD sacrificed</td>
                  <td className="px-4 py-3 font-mono text-ink-800">$18,000.00</td>
                </tr>
                <tr className="border-b border-ink-300">
                  <td className="px-4 py-3 text-ink-700">Taxable gross (PAYG)</td>
                  <td className="px-4 py-3 font-mono text-ink-800">$2,269.23</td>
                  <td className="px-4 py-3 text-ink-700">YTD taxable</td>
                  <td className="px-4 py-3 font-mono text-ink-800">$40,846.15</td>
                </tr>
                <tr className="border-b border-ink-300 bg-ink-200">
                  <td colSpan={4} className="px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-700">Tax and statutory</td>
                </tr>
                <tr className="border-b border-ink-300">
                  <td className="px-4 py-3 text-ink-700">PAYG tax withheld</td>
                  <td className="px-4 py-3 font-mono text-danger-500">−$360.00</td>
                  <td className="px-4 py-3 text-ink-700">YTD PAYG</td>
                  <td className="px-4 py-3 font-mono text-ink-800">$6,480.00</td>
                </tr>
                <tr className="border-b border-ink-300">
                  <td className="px-4 py-3 text-ink-700">Medicare levy</td>
                  <td className="px-4 py-3 font-mono text-danger-500">−$45.38</td>
                  <td className="px-4 py-3 text-ink-700">YTD Medicare</td>
                  <td className="px-4 py-3 font-mono text-ink-800">$816.92</td>
                </tr>
                <tr className="border-b border-ink-300">
                  <td className="px-4 py-3 text-ink-700">HECS-HELP repayment</td>
                  <td className="px-4 py-3 font-mono text-danger-500">−$11.35</td>
                  <td className="px-4 py-3 text-ink-700">YTD HECS</td>
                  <td className="px-4 py-3 font-mono text-ink-800">$204.23</td>
                </tr>
                <tr className="border-b border-ink-300 bg-ink-200">
                  <td colSpan={4} className="px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-700">Post-tax deductions</td>
                </tr>
                <tr className="border-b border-ink-300">
                  <td className="px-4 py-3 text-ink-700">Union fees</td>
                  <td className="px-4 py-3 font-mono text-danger-500">−$25.00</td>
                  <td className="px-4 py-3 text-ink-700">YTD union</td>
                  <td className="px-4 py-3 font-mono text-ink-800">$450.00</td>
                </tr>
                <tr className="border-b border-ink-300 bg-ledger-500">
                  <td className="px-4 py-3 font-semibold text-ink-900">Net pay (take-home)</td>
                  <td className="px-4 py-3 font-mono font-semibold text-ink-900">$1,827.50</td>
                  <td className="px-4 py-3 font-semibold text-ink-900">YTD net</td>
                  <td className="px-4 py-3 font-mono font-semibold text-ink-900">$32,895.00</td>
                </tr>
                <tr className="bg-ink-200">
                  <td colSpan={4} className="px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-700">Superannuation (employer cost, on top of gross)</td>
                </tr>
                <tr className="border-b border-ink-300">
                  <td className="px-4 py-3 text-ink-700">Super guarantee (12%)</td>
                  <td className="px-4 py-3 font-mono text-ink-800">$392.31</td>
                  <td className="px-4 py-3 text-ink-700">YTD super</td>
                  <td className="px-4 py-3 font-mono text-ink-800">$7,061.54</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="prose-content">
          <h2>Gross pay (earnings)</h2>
          <p>
            The top section of your payslip shows what you earned for the period
            before any deductions. For most full-time workers this is just
            ordinary hours multiplied by hourly rate, but it can also include:
          </p>
          <ul>
            <li>Overtime (usually paid at 150% or 200% of the base rate)</li>
            <li>Shift loadings (e.g. afternoon or night shift)</li>
            <li>Allowances (e.g. laundry, uniform, travel)</li>
            <li>Annual leave paid out</li>
            <li>Personal leave taken</li>
            <li>Long service leave</li>
            <li>Back-pay (if a pay rise is backdated)</li>
            <li>Bonuses and commissions</li>
          </ul>
          <p>
            <strong>YTD (year-to-date) gross</strong> is the running total since
            1 July. It will approach $85,000 by the end of the financial year.
          </p>
        </section>

        <section className="prose-content">
          <h2>Ordinary time earnings (OTE)</h2>
          <p>
            Your employer will show ordinary time earnings as a separate number on
            some payslips. OTE is the part of your pay that counts towards the
            12% Superannuation Guarantee. It is usually equal to or slightly
            less than your gross pay. The difference (gross minus OTE) is
            overtime, allowances, and other items that are not counted towards
            super.
          </p>
          <p>
            If your OTE looks too low compared to your gross, ask your employer.
            Some employers under-calculate OTE by excluding things that should
            be included, which costs you super.
          </p>
        </section>

        <section className="prose-content">
          <h2>Pre-tax deductions</h2>
          <p>
            These are amounts deducted from your pay <em>before</em> income tax
            is calculated. The most common is salary sacrifice into super, but
            you can also package cars (novated lease), fees, and other items
            pre-tax. Each pre-tax dollar reduces your taxable income, which
            saves you your marginal tax rate.
          </p>
          <p>
            On the sample payslip, $1,000 of salary sacrifice reduces the
            taxable gross from $3,269.23 to $2,269.23. PAYG withholding is then
            calculated on the lower number.
          </p>
          <p>
            <strong>Watch out:</strong> pre-tax super contributions count
            against the $30,000 concessional contributions cap per year (from
            FY 2025–26). Use the{' '}
            <Link href="/salary-packaging-calculator">salary packaging
            calculator</Link> to see if you are over.
          </p>
        </section>

        <section className="prose-content">
          <h2>PAYG tax withheld</h2>
          <p>
            This is the income tax your employer has withheld from this pay on
            behalf of the ATO. The amount is calculated using the formulas in
            ATO Schedule 1 (NAT 1004), which use weekly-equivalent earnings and
            small rounding coefficients. This is what makes the number on your
            payslip slightly different from what a "how much tax will I pay"
            calculator shows.
          </p>
          <p>
            The PAYG system is designed to collect tax throughout the year so
            you do not get a huge bill on 1 July. It will not always match
            your actual tax liability exactly. Any difference gets reconciled
            when you lodge your tax return. If too much was withheld, you get
            a refund. If too little, you owe the difference (with no penalty
            as long as you lodge on time).
          </p>
        </section>

        <section className="prose-content">
          <h2>Medicare levy</h2>
          <p>
            The 2% Medicare levy is collected through PAYG withholding, same
            mechanism as income tax. Your employer withholds roughly 2% of
            your taxable gross each pay, and the ATO reconciles the actual
            amount at tax time.
          </p>
          <p>
            Low-income earners may have the levy reduced or removed (the
            Medicare levy low-income reduction). If you are a foreign resident
            with no Medicare entitlement, your employer should not be
            withholding Medicare, so tick the "foreign resident" or "no
            Medicare levy" box on your TFN declaration.
          </p>
        </section>

        <section className="prose-content">
          <h2>HECS-HELP repayment</h2>
          <p>
            If you have a HECS-HELP, VSL, or other study loan, your employer is
            required to withhold additional amounts from your pay once your
            income crosses the repayment threshold. From 1 July 2025 the
            system is marginal (similar to income tax brackets), so the
            percentage increases as you earn more.
          </p>
          <p>
            You need to tick the HECS box on your TFN declaration for your
            employer to withhold. If you do not tick it, you will owe the
            full amount assessed at tax time.
          </p>
          <p>
            Use the{' '}
            <Link href="/hecs-calculator">HECS-HELP calculator</Link> to see
            your expected repayment based on your annual income.
          </p>
        </section>

        <section className="prose-content">
          <h2>Post-tax deductions</h2>
          <p>
            These are amounts deducted from your pay <em>after</em> tax is
            calculated. The tax has already been paid on the gross, so
            post-tax deductions do not change your tax. Common examples:
          </p>
          <ul>
            <li>Union fees</li>
            <li>Workplace giving (charity deductions from your pay)</li>
            <li>Private health insurance premium (if you arrange it through your employer)</li>
            <li>Income protection insurance premiums</li>
            <li>Loan repayments (some employers offer salary-deducted loan repayments)</li>
            <li>Childcare fees (if not pre-tax packaged)</li>
            <li>Workplace parking fees (after FBT)</li>
          </ul>
        </section>

        <section className="prose-content">
          <h2>Net pay (take-home)</h2>
          <p>
            The number at the bottom that lands in your bank account. It is
            calculated as:
          </p>
          <p>
            <strong>Gross pay</strong> minus pre-tax deductions, minus PAYG
            tax, minus Medicare levy, minus HECS-HELP, minus post-tax
            deductions.
          </p>
          <p>
            On the sample payslip:
            <br />$3,269.23 − $1,000.00 − $360.00 − $45.38 − $11.35 − $25.00 ={' '}
            <strong>$1,827.50</strong> net.
          </p>
          <p>
            This is the number that should match your bank deposit within a day
            or two. If it does not, raise it with payroll immediately.
          </p>
        </section>

        <section className="prose-content">
          <h2>Superannuation (employer cost, on top of gross)</h2>
          <p>
            The 12% Superannuation Guarantee line is shown separately because
            it is paid by your employer on top of your gross, not deducted
            from your pay. Your employer must pay it into your nominated
            super fund at least quarterly (though most pay it monthly or
            with each pay).
          </p>
          <p>
            <strong>Check this number</strong>. Common errors include the
            employer paying SG on overtime but not reporting it correctly,
            paying on ordinary hours but excluding allowances, or
            contributing late. The ATO publishes SG shortfalls and they
            charge employers interest and penalties. If you suspect your SG
            is wrong, the ATO has a{' '}
            <a
              href="https://www.ato.gov.au/calculators-and-tools/employer-superannuation-guarantee-calculator/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Superannuation Guarantee Calculator
            </a>{' '}
            you can use to check.
          </p>
        </section>

        <section className="prose-content">
          <h2>What to check each pay</h2>
          <p>A quick 30-second check that catches most payroll errors:</p>
          <ol>
            <li>Net pay matches your bank deposit (within a day or two)</li>
            <li>Gross pay is what you expect for the hours you worked</li>
            <li>Hourly rate is correct (watch for pay rise anniversaries)</li>
            <li>Super is 12% of OTE (not gross, if your employer uses OTE)</li>
            <li>PAYG seems reasonable (within 10% of what the ATO formula gives)</li>
            <li>HECS box is ticked (if you have a debt)</li>
            <li>Medicare is 2% of taxable gross (or 0% if you're a foreign resident)</li>
            <li>YTD figures are climbing at the expected rate</li>
          </ol>
        </section>

        <section className="prose-content">
          <h2>End-of-year payment summary (previously group certificate)</h2>
          <p>
            At the end of the financial year (or shortly after you leave a
            job), your employer issues a payment summary showing your total
            earnings and tax withheld for the year. It is pre-filled into
            your tax return. The YTD figures on your payslips should add up
            to the totals on the payment summary.
          </p>
          <p>
            If you have reportable fringe benefits above the threshold
            (currently around $2,500 of reportable benefits like a car or
            low-interest loan), you will get a separate reportable fringe
            benefits amount on your payment summary. This does not change
            your income tax but can affect Medicare levy surcharge and
            HECS repayment income.
          </p>
        </section>

        <section className="prose-content">
          <h2>Frequently asked questions</h2>
        </section>

        <section className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.question} className="card group">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink-800">
                <span aria-hidden="true" className="mr-2 text-ledger-500 group-open:rotate-90 inline-block transition">›</span>
                {f.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{f.answer}</p>
            </details>
          ))}
        </section>

        <section className="prose-content mt-12">
          <h2>Related guides and tools</h2>
          <ul>
            <li><Link href="/guides/australian-income-tax">Australian income tax</Link>, how the brackets work.</li>
            <li><Link href="/guides/hecs-repayment">HECS-HELP repayment</Link>, the marginal system from 1 July 2025.</li>
            <li><Link href="/salary-packaging-calculator">Salary packaging calculator</Link>, see what packaging saves you.</li>
            <li><Link href="/methodology">Methodology</Link>, the formulas behind every figure on this site.</li>
          </ul>
        </section>

        <NewsletterForm
          accessKey={process.env.NEXT_PUBLIC_NEWSLETTER_KEY}
          source="guide-how-to-read-your-payslip"
          heading="Pay, tax, and award rate updates."
          description="Twice a week, plain-English briefs on changes to PAYG withholding, awards, and the ATO formulas behind your payslip."
        />
      </article>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: brand.url },
            { name: 'Guides', url: `${brand.url}/guides/` },
            { name: 'How to read your payslip', url: `${brand.url}/guides/how-to-read-your-payslip/` },
          ]),
          articleSchema({
            headline: 'How to read your Australian payslip',
            description: 'Every line on an Australian payslip explained, with a sample annotated payslip and what each number means for your tax.',
            url: `${brand.url}/guides/how-to-read-your-payslip/`,
            datePublished: '2026-08-23',
          }),
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
