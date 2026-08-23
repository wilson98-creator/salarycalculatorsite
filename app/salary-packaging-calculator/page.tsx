import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Breadcrumb } from '@/components/Breadcrumb';
import { NewsletterForm } from '@/components/NewsletterForm';
import { SalaryPackagingCalculator } from '@/components/SalaryPackagingCalculator';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Salary packaging and novated lease calculator',
  description: 'Calculate the tax saving from salary packaging in Australia, including novated lease cars, extra super, and other pre-tax benefits. With FBT notes and concessional cap warnings.',
  alternates: { canonical: '/salary-packaging-calculator' },
  openGraph: {
    title: 'Salary packaging and novated lease calculator',
    description: 'Calculate the tax saving from salary packaging in Australia, including novated lease cars, extra super, and other pre-tax benefits.',
    url: `${brand.url}/salary-packaging-calculator/`,
    type: 'website',
  },
};

const faqs = [
  {
    question: 'What is salary packaging?',
    answer: 'Salary packaging (also called salary sacrifice or total employment cost packaging) is an arrangement where part of your pre-tax salary is paid for specific benefits instead of cash. Common packaged items include novated lease cars, extra super contributions, portable electronic devices, childcare, and work-related fees. The tax saving comes from the fact that the packaged amount is deducted from your taxable income before income tax is calculated.',
  },
  {
    question: 'What is a novated lease?',
    answer: 'A novated lease is a three-way agreement between you, your employer, and a finance company, used to lease a car through your pre-tax salary. You nominate a car, a novated lease provider calculates the running costs (lease, fuel, insurance, registration, servicing, tyres), and your employer pays all of it out of your pre-tax pay. The car is yours to use, and any FBT is paid by the employer on your behalf. At the end of the lease, you can refinance the residual, pay it out, or hand the car back.',
  },
  {
    question: 'Is a novated lease worth it after the FBT exemption ended?',
    answer: 'From 1 April 2025, the FBT exemption for electric vehicles was removed under the Albanese government, so electric cars are now subject to FBT like any other car. The exact benefit depends on the cars taxable value (FBT is calculated on a cars deemed operating cost), the lease running costs, and your marginal tax rate. Run the calculator above for your situation, then get a quote from a novated lease provider for the exact figures.',
  },
  {
    question: 'How much can I salary sacrifice into super?',
    answer: 'From FY 2025-26 onwards, the concessional (pre-tax) super contributions cap is $30,000 per year for everyone, regardless of income. This includes the 12% Superannuation Guarantee paid by your employer. Excess concessional contributions are taxed at your top marginal rate plus a charge. If you earn more than $250,000, an extra 15% Division 293 tax applies to the concessional amount. The calculator above will warn you if you exceed the cap.',
  },
  {
    question: 'Are novated lease FBT costs tax-deductible?',
    answer: 'No, the FBT paid by your employer on a novated lease is not your deduction, it is the employers cost. From your perspective, the FBT effectively reduces how much of your pre-tax salary is available for the car and running costs. That is why a $20,000-per-year novated lease might cost you $15,000-$17,000 of take-home pay, depending on the cars FBT value.',
  },
  {
    question: 'What happens to my take-home pay if I package a novated lease?',
    answer: 'Your take-home pay goes down by the lease cost minus the tax saving. Example: $20,000 novated lease, you save roughly $5,500 in tax, so your take-home drops by about $14,500. But you get a car worth $20,000-worth of use, plus all running costs covered. Compare to paying for the car out of after-tax salary, where the same $20,000 would have cost you about $28,000 of gross pay after the 30% tax.',
  },
  {
    question: 'Is salary packaging the same as salary sacrifice?',
    answer: 'The terms are often used interchangeably but can mean slightly different things. Salary sacrifice usually means pre-tax super contributions. Salary packaging is broader and includes any pre-tax benefit (cars, phones, fees, super). This calculator handles both super and other packaging. For pre-tax super only, the salary sacrifice calculator on the home page is more focused.',
  },
  {
    question: 'Who is eligible for salary packaging?',
    answer: 'Salary packaging is most common in not-for-profit and public-sector workplaces (because of FBT concessions for some employers), but many private-sector employers offer at least super sacrifice. Ask your payroll or HR team what your employer offers. Some industries (health, education, charity, public service) get extra FBT-exempt packaging room.',
  },
];

export default function SalaryPackagingCalculatorPage() {
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema(),
        faqSchema(faqs),
        articleSchema({
          headline: 'Salary packaging and novated lease calculator',
          description: 'Calculate the tax saving from salary packaging in Australia, including novated lease cars, extra super contributions, and other pre-tax benefits.',
          url: `${brand.url}/salary-packaging-calculator/`,
        }),
      ]} />

      <article className="max-w-3xl">
        <header className="mb-10">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Calculators', href: '/#calculators' },
            { name: 'Salary packaging' },
          ]} />
          <p className="mt-3 text-sm text-ink-600">Calculator · FY 2026–27</p>
          <h1 className="h-display mt-3 text-ink-800">
            Salary packaging and novated lease calculator
          </h1>
          <p className="mt-4 text-base text-ink-700 sm:text-lg">
            Calculate the tax you save by packaging part of your salary pre-tax instead
            of post-tax. Covers novated lease cars, extra super, and other packaged
            benefits, with FBT notes and concessional cap warnings.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">FBT-aware</span>
            <span className="kicker">Cap warnings</span>
            <span className="kicker">AEST 2026–27 rates</span>
            <span>Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></span>
          </div>
        </header>

        <SalaryPackagingCalculator />

        <section className="prose-content mt-14">
          <h2>How salary packaging works</h2>
          <p>
            Salary packaging is an arrangement where part of your pre-tax salary is
            redirected to pay for specific benefits instead of being paid to you as
            cash. The benefit to you is straightforward: the packaged amount is
            deducted from your taxable income before income tax is calculated, so
            you save your marginal tax rate on every packaged dollar.
          </p>
          <p>
            For example, if you are on the 30% marginal rate (taxable income between
            $45,000 and $135,000 in FY 2026–27), every $1,000 you package saves you
            roughly $300 in income tax. The same $1,000 of take-home cash would have
            required $1,428 of gross pay at that tax rate.
          </p>

          <h2>Novated leases after the FBT exemption ended</h2>
          <p>
            A novated lease is the most common form of salary packaging. You lease a
            car through a salary packaging provider, your employer pays the lease and
            running costs out of your pre-tax pay, and the car is yours to use
            privately as well as for work.
          </p>
          <p>
            Until 31 March 2025, electric vehicles were exempt from Fringe Benefits Tax
            on novated leases. That exemption ended under the Albanese government.
            From 1 April 2025, electric cars are subject to FBT just like petrol and
            diesel cars. The exact FBT cost depends on the cars deemed operating
            cost (which scales with the cars value), the lease term, and the
            kilometres you expect to drive per year.
          </p>
          <p>
            The FBT itself is paid by the employer, but the economic cost is part of
            your total package. A practical rule of thumb: a $20,000-per-year
            novated lease with FBT might cost you $15,000-$17,000 of take-home pay,
            depending on the cars FBT value. Get a quote from a novated lease
            provider for the exact figure on the car you are considering.
          </p>

          <h2>Salary packaging into super</h2>
          <p>
            Extra pre-tax super contributions are the simplest form of salary
            packaging: no FBT, no paperwork, no provider. Your employer just
            deducts the sacrificed amount from your pay and pays it into your
            super fund instead.
          </p>
          <p>
            The catch is the concessional contributions cap: from FY 2025–26 onwards
            the cap is $30,000 per year for everyone, regardless of income. This
            cap is indexed to wages but the indexation was paused for several years
            and only resumed recently. The $30,000 cap includes the 12%
            Superannuation Guarantee paid by your employer, so if you earn over
            $250,000 you have already used the entire cap in SG alone. If you earn
            less, you have room to top up. The calculator above warns you if you
            exceed the cap.
          </p>
          <p>
            Excess concessional contributions are taxed at your top marginal rate plus
            a charge, which is usually worse than if you had just paid the tax
            yourself. Stay under the cap.
          </p>

          <h2>Other packaged benefits</h2>
          <p>
            Many employers also offer packaging for work-related items like laptops,
            phones, fees, and childcare. These are generally FBT-exempt if the item
            is primarily for work use and provided under a salary packaging
            arrangement. Not-for-profit and public-sector employers often have
            higher FBT exemption limits (the $17,000 FBT exemption cap for
            not-for-profits, and the public-benefit-exemption for public hospitals
            and charities).
          </p>
          <p>
            If you work for a not-for-profit hospital, charity, or public-sector
            employer, ask your payroll team about FBT-exempt packaging. It can be
            significantly more tax-effective than the same packaging at a
            for-profit employer.
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
          <h2>Related tools and guides</h2>
          <ul>
            <li><Link href="/salary-sacrifice-calculator">Salary sacrifice calculator</Link>, focused on pre-tax super contributions only.</li>
            <li><Link href="/hecs-calculator">HECS-HELP calculator</Link>, see your student debt repayment in isolation.</li>
            <li><Link href="/guides/superannuation">Superannuation guide</Link>, how the SG, the 15% super tax, and preservation work.</li>
            <li><Link href="/guides/salary-sacrifice">Salary sacrifice guide</Link>, the full explainer on pre-tax super.</li>
            <li><Link href="/methodology">Methodology</Link>, how every number is calculated, with citations.</li>
          </ul>
        </section>

        <NewsletterForm
          accessKey={process.env.NEXT_PUBLIC_NEWSLETTER_KEY}
          source="salary-packaging-calculator"
          heading="Get more from your package."
          description="Twice a week, plain-English briefs on tax and super changes that affect how you structure your salary package."
        />
      </article>
    </>
  );
}
