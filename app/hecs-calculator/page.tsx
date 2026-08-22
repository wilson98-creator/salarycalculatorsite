import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { HecsCalculator } from '@/components/HecsCalculator';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { NewsletterForm } from '@/components/NewsletterForm';
import { sources } from '@/lib/tax/sources';

export const metadata: Metadata = {
  title: 'HECS-HELP Repayment Calculator (FY 2026–27)',
  description:
    'Free HECS-HELP repayment calculator using the new marginal system (from 1 July 2025). See your compulsory repayment, per-period withholding, and years to pay off. ATO-sourced.',
  alternates: { canonical: '/hecs-calculator' },
};

const faqs = [
  {
    question: 'How is HECS-HELP repayment calculated under the new system?',
    answer: 'From 1 July 2025 HECS-HELP uses a marginal bracket system, similar to income tax. You only pay the higher rate on the income above each threshold, not on your whole income. For FY 2025–26 the threshold is $54,435 with a 15% rate on income between $54,435 and $125,000. For FY 2026–27 the lower threshold is around $69,528. The calculator applies the marginal method automatically based on the year you select.',
  },
  {
    question: 'When do I start repaying HECS?',
    answer: 'You start making compulsory repayments once your repayment income exceeds the threshold for the financial year. For FY 2026–27 the threshold is approximately $69,528. For FY 2025–26 it was $54,435. Your employer withholds the repayment through PAYG if you tick the HECS-HELP box on your Tax File Number declaration.',
  },
  {
    question: 'What is "repayment income" and why does it differ from my salary?',
    answer: 'Repayment income is your taxable income plus reportable fringe benefits, reportable employer super contributions (including any salary sacrifice into super), total net investment loss, and exempt foreign employment income. For most employees on a single salary with no rental losses, repayment income is close to taxable income. For people with salary sacrifice or negative gearing, it can be higher.',
  },
  {
    question: 'How is my HECS balance indexed?',
    answer: 'On 1 June each year the ATO increases your HECS-HELP balance by the lower of the Consumer Price Index (CPI) and the Wage Price Index (WPI) for the previous 12 months. The WPI cap was introduced by the Universities Accord Act 2024, previously the balance was indexed by CPI alone. Recent indexation rates: 7.1% (June 2023), 4.7% (June 2024), 3.2% (June 2025), 2.8% (June 2026).',
  },
  {
    question: 'Can I make voluntary HECS repayments?',
    answer: 'Yes. You can make voluntary repayments to the ATO at any time via BPAY using the reference on your ATO account (linked to your myGov). There is no minimum and no penalty for early repayment. Voluntary repayments reduce your balance, which means less interest compounds each year. Whether to make voluntary repayments depends on the indexation rate versus what your money would earn (or save on interest) elsewhere.',
  },
  {
    question: 'What if my employer withholds the wrong HECS amount?',
    answer: 'If you ticked the HECS box on your TFN declaration and your employer is using the right HELP code, the PAYG withholding should be correct. If you think it is wrong, check your income and the threshold, and consider using the ATO\'s voluntary repayment calculator. Any over- or under-withholding is reconciled at tax time.',
  },
  {
    question: 'What happens to my HECS debt if I move overseas?',
    answer: 'Your HELP debt remains and continues to be indexed on 1 June each year while you are overseas. You are still required to make compulsory repayments if your worldwide repayment income exceeds the threshold. The ATO has a process for making voluntary overseas repayments, and you can update your contact details via myGov. After 6 months overseas, the indexation on your balance is calculated differently, see the ATO\'s overseas repayment page for details.',
  },
];

export default function HecsCalculatorPage() {
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema(),
        faqSchema(faqs),
        articleSchema({
          headline: 'HECS-HELP repayment calculator (Australia 2026–27)',
          description: 'Work out your compulsory HECS-HELP, VSL, TSL, SSL or SFSS repayment using the new marginal system.',
          url: `${brand.url}/hecs-calculator`,
        }),
      ]} />

      <article className="max-w-3xl">
        <header className="mb-10">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Calculators', href: '/#calculators' },
            { name: 'HECS-HELP' },
          ]} />
          <p className="mt-3 text-sm text-brand-600">Calculator · FY 2026–27</p>
          <h1 className="h-display mt-6 text-ink-900">
            HECS-HELP repayment calculator
          </h1>
          <p className="mt-4 text-base text-ink-600 sm:text-lg">
            Work out your compulsory HECS-HELP, VSL, TSL, SSL or SFSS repayment for the
            current financial year, plus how long until your debt is paid off. Uses the
            new marginal system that took effect on 1 July 2025.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">New marginal system</span>
            <span className="kicker">FY 2026–27 rates</span>
            <span className="kicker">Years-to-payoff projection</span>
            <span>Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></span>
          </div>
        </header>

        <HecsCalculator />

        <section className="prose prose-slate prose-invert mt-14">
          <h2>How the new HECS system works</h2>
          <p>
            From 1 July 2025, HECS-HELP repayments are calculated using a marginal
            bracket system, the same way income tax is. The change replaced the old
            flat-rate system, where crossing a threshold meant a flat percentage of
            your entire repayment income, which created situations where a small pay
            rise could cost more than it earned.
          </p>
          <p>
            Under the marginal system, you only pay the higher rate on the income
            above each threshold. For FY 2026–27 the threshold is approximately
            $69,528 with a 15% rate on income between the threshold and $125,000.
            Higher bands apply above that, capping at 10% of total repayment income
            for very high earners.
          </p>

          <h2>Repayment income vs taxable income</h2>
          <p>
            Your repayment income is not the same as your taxable income. It is your
            taxable income <em>plus</em>:
          </p>
          <ul>
            <li>Reportable fringe benefits</li>
            <li>Reportable employer super contributions (including any pre-tax salary sacrifice)</li>
            <li>Total net investment loss (e.g. rental property losses)</li>
            <li>Exempt foreign employment income</li>
          </ul>
          <p>
            For most employees on a single salary with no investment losses, the
            difference is small. For people with large salary-sacrifice
            contributions or negatively geared property, repayment income can be
            significantly higher than taxable income.
          </p>

          <h2>Voluntary repayments and the indexation question</h2>
          <p>
            On 1 June each year, the ATO indexes your HELP balance by the lower of
            CPI and the Wage Price Index (WPI). This means the balance grows even
            if you are not making repayments (e.g. if you are earning below the
            threshold). Whether to make voluntary repayments depends on the
            indexation rate versus what your money could earn elsewhere.
          </p>
          <p>
            As a rough rule: if indexation is around 3% and you can earn 5%+ in a
            high-interest savings account, keeping the cash makes sense. If
            indexation is 4% and your money is sitting in a 4% mortgage offset or
            earning 0.1% in a transaction account, paying down HECS is the better
            move. The ATO&apos;s{' '}
            <a
              href="https://www.ato.gov.au/individuals-and-families/education-and-study/managing-your-study-loan/repaying-your-study-loan/making-voluntary-repayments"
              target="_blank"
              rel="noopener noreferrer"
            >
              voluntary repayment calculator
            </a>{' '}
            lets you model the impact.
          </p>

          <h2>Frequently asked questions</h2>
        </section>

        <section className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.question} className="card group">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink-900">
                <span aria-hidden="true" className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition">›</span>
                {f.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{f.answer}</p>
            </details>
          ))}
        </section>

        <section className="prose prose-slate prose-invert mt-12 max-w-none">
          <h2>HECS as a debt repayment problem</h2>
          <p>
            HECS-HELP is unusual among Australian debts in that it is not amortising in the traditional sense. There is no fixed monthly bill, no term, and no penalty for missing a payment, your employer withholds the right amount (or the ATO assesses it at tax time) and the balance grows by indexation every June. For most people, this makes it the most favourable debt they will ever have, and they should not rush to pay it off ahead of higher-rate debts like credit cards or personal loans.
          </p>
          <p>
            If you are building a general debt repayment plan, a <strong>debt repayment calculator</strong> is the right starting point. The conventional advice is to use the <strong>avalanche method</strong>: pay the minimum on every debt, and direct every spare dollar to the debt with the highest interest rate. For most Australians, that means credit cards (18-22%) and personal loans (9-14%) come first, then HECS last, because HECS behaves more like a slowly-indexing savings plan than a typical loan. Use our <Link href="/loan-payoff-calculator">loan payoff calculator</Link> to model credit card and personal loan scenarios, and our <Link href="/loan-payoff-calculator">debt payoff calculator</Link> to see how long different payoff strategies actually take on a real balance.
          </p>
          <p>
            Where this changes: if you are on the marginal repayment system, the repayment rate increases as your income grows. A 1.5% indexation combined with a 2% effective repayment rate means you are slowly gaining ground even without voluntary payments. If you are on the old flat-rate system (pre-July 2025 debts), the analysis is different, talk to a financial counsellor before making voluntary payments.
          </p>
        </section>

        <section className="prose prose-slate prose-invert mt-12 max-w-none">
          <h2>Sources and methodology</h2>
          <p>
            Repayment thresholds and rates are sourced from the{' '}
            <a href={sources.hecsRepayment.url} target="_blank" rel="noopener noreferrer">
              ATO&apos;s Repaying your study loan page
            </a>. The marginal calculation uses the schedule published by the ATO for
            each financial year.
          </p>
          <p>
            The years-to-payoff projection assumes a flat repayment income and a
            constant annual indexation rate. In reality, income tends to grow year
            on year (which shortens payoff) and indexation varies with the
            CPI/WPI relationship. Use the projection as a guide, not a guarantee.
          </p>
          <p>
            See the <Link href="/guides/hecs-repayment">HECS-HELP repayment guide</Link>{' '}
            for the full explainer, including the history of indexation and the 20%
            debt reduction that was applied automatically in 2024.
          </p>
        </section>
      
        <section className="mt-16">
          <NewsletterForm
            accessKey={process.env.NEXT_PUBLIC_NEWSLETTER_KEY}
            source="hecs-calculator"
            heading="HECS-HELP rate changes, in your inbox."
            description="From 1 July 2025 the HECS repayment system is marginal. We send a short note when the thresholds or repayment rates change, so you can update your budget."
          />
        </section>
      </article>
    </>
  );
}
