import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, articleSchema, howToSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'HECS-HELP repayment: a practical guide for graduates (FY 2026-27)',
  description:
    'How the new marginal HECS repayment system works, when indexation hurts, voluntary repayment strategies, and how to project when you will be debt-free. ATO-sourced.',
  alternates: { canonical: '/guides/hecs-repayment' },
  keywords: [
    'hecs help',
    'hecs repayment',
    'australian study debt',
    'hecs indexation',
    'voluntary hecs repayment',
    'help debt',
  ],
  openGraph: {
    title: 'HECS-HELP repayment: a practical guide for graduates',
    description: 'How the new marginal HECS repayment system works, and when indexation hurts.',
    url: `${brand.url}/guides/hecs-repayment`,
    type: 'article',
  },
};

const howToSteps = [
  {
    name: 'Check your repayment income',
    text: 'Repayment income is taxable income plus reportable fringe benefits, reportable employer super contributions (including salary sacrifice), net investment loss, and exempt foreign employment income. For most employees on a single salary with no rental losses, it is close to taxable income.',
  },
  {
    name: 'Find the FY 2026-27 threshold',
    text: 'For FY 2026-27 the lower threshold is around $69,528. Income below the threshold: no repayment. Income above: marginal repayment, similar to income tax.',
  },
  {
    name: 'Apply the marginal rate',
    text: 'You only pay the higher rate on the income above each threshold, not on your whole income. The schedule starts at 1% and rises to 10% of total repayment income above $200,000.',
  },
  {
    name: 'Compare to voluntary repayment',
    text: 'If you have spare cash, compare the indexation rate (lower of CPI and WPI) to the return you would earn elsewhere. If indexation is running high, voluntary repayment can be a no-brainer.',
  },
  {
    name: 'Plan for indexation on 1 June each year',
    text: 'On 1 June each year the ATO indexes your balance by the lower of CPI and WPI. Recent rates: 7.1% (2023), 4.7% (2024), 3.2% (2025), 2.8% (2026). A $30,000 debt at 7.1% grows by $2,130 in a single year.',
  },
  {
    name: 'Tick the HELP box on your TFN declaration',
    text: 'If you ticked the HELP box when you started your job, your employer withholds the repayment through PAYG. If you did not, you will get the full bill at tax time. Check the TFN declaration you lodged.',
  },
];

const faqs = [
  {
    question: 'How is HECS-HELP repayment calculated under the new system?',
    answer:
      'From 1 July 2025 HECS-HELP uses a marginal bracket system, similar to income tax. You only pay the higher rate on the income above each threshold, not on your whole repayment income. The schedule starts at 1% above the lower threshold and rises to 10% of total repayment income above $200,000.',
  },
  {
    question: 'When do I start repaying HECS?',
    answer:
      'You start making compulsory repayments once your repayment income exceeds the threshold for the financial year. For FY 2026-27 the threshold is approximately $69,528. For FY 2025-26 it was $54,435. Your employer withholds the repayment through PAYG if you ticked the HECS-HELP box on your Tax File Number declaration.',
  },
  {
    question: 'What is "repayment income" and why does it differ from my salary?',
    answer:
      'Repayment income is your taxable income plus reportable fringe benefits, reportable employer super contributions (including any salary sacrifice into super), total net investment loss, and exempt foreign employment income. For most employees on a single salary with no rental losses, repayment income is close to taxable income. For people with salary sacrifice or negative gearing, it can be higher.',
  },
  {
    question: 'How is my HECS balance indexed?',
    answer:
      'On 1 June each year the ATO increases your HECS-HELP balance by the lower of the Consumer Price Index (CPI) and the Wage Price Index (WPI) for the previous 12 months. The WPI cap was introduced by the Universities Accord Act 2024 — previously the balance was indexed by CPI alone. Recent indexation rates: 7.1% (June 2023), 4.7% (June 2024), 3.2% (June 2025), 2.8% (June 2026).',
  },
  {
    question: 'Can I make voluntary HECS repayments?',
    answer:
      'Yes. You can make voluntary repayments to the ATO at any time via BPAY using the reference on your ATO account (linked to your myGov). There is no minimum and no penalty for early repayment. Voluntary repayments reduce your balance, which means less interest compounds each year. Whether to make voluntary repayments depends on the indexation rate versus what your money would earn (or save on interest) elsewhere.',
  },
  {
    question: 'What if my employer withholds the wrong HECS amount?',
    answer:
      'If you ticked the HECS box on your TFN declaration and your employer is using the right HELP code, the PAYG withholding should be correct. If you think it is wrong, check your income and the threshold, and consider using the ATO voluntary repayment calculator. Any over- or under-withholding is reconciled at tax time.',
  },
  {
    question: 'What happens to my HECS debt if I move overseas?',
    answer:
      'Your HELP debt remains and continues to be indexed on 1 June each year while you are overseas. You are still required to make compulsory repayments if your worldwide repayment income exceeds the threshold. The ATO has a process for making voluntary overseas repayments, and you can update your contact details via myGov. After 6 months overseas, the indexation on your balance is calculated differently — see the ATO overseas repayment page for details.',
  },
  {
    question: 'How long does it take to pay off HECS?',
    answer:
      'For most graduates on a typical career trajectory, the balance is repaid within 8-15 years. The exact timeline depends on your starting balance, your income growth, the future indexation rate, and whether you make voluntary repayments. The SalaryCalc HECS calculator includes a years-to-payoff estimate that accounts for indexation.',
  },
];

export default function HecsGuide() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'HECS-HELP repayment: a practical guide for graduates (FY 2026-27)',
            description: metadata.description as string,
            url: `${brand.url}/guides/hecs-repayment`,
            datePublished: '2026-01-15',
            dateModified: brand.lastReviewed,
          }),
          howToSchema({
            name: 'How to manage your HECS-HELP repayment',
            description: 'Step-by-step process for understanding and managing your HELP debt under the new marginal system.',
            steps: howToSteps,
          }),
          faqSchema(faqs),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-10">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Guides', href: '/guides' },
            { name: 'HECS-HELP repayment' },
          ]} />
          <h1 className="h-display mt-6 text-ink-900 dark:text-ink-50">
            HECS-HELP repayment: a practical guide
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            HECS-HELP is Australia&apos;s income-contingent student loan
            scheme. You only repay when you earn above a threshold, repayments
            are withheld by your employer, and the balance is indexed each
            year. This guide covers the new marginal repayment system that
            took effect on 1 July 2025, when indexation hurts the most, and
            strategies for paying the debt down faster.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600 dark:text-ink-400">
            <span className="kicker">
              Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
            </span>
            <span className="kicker">9 min read</span>
            <span className="kicker">FY 2026-27</span>
            <span className="kicker">New marginal system</span>
          </div>
        </header>

        {/* TL;DR */}
        <section aria-labelledby="hecs-tldr" className="card not-prose mb-10">
          <h2 id="hecs-tldr" className="text-base font-semibold text-ink-900 dark:text-ink-50">
            The 60-second version
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">→</span>
              <span className="text-ink-700 dark:text-ink-300">
                From 1 July 2025 HECS uses a <strong>marginal bracket</strong> system, like income tax.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">→</span>
              <span className="text-ink-700 dark:text-ink-300">
                FY 2026-27 lower threshold: <strong>~$69,528</strong>. Income above this: marginal repayment from 1% to 10% of total repayment income.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">→</span>
              <span className="text-ink-700 dark:text-ink-300">
                Your balance is indexed on 1 June each year by the <strong>lower of CPI and WPI</strong>. Recent rates: 7.1%, 4.7%, 3.2%, 2.8%.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">→</span>
              <span className="text-ink-700 dark:text-ink-300">
                Tick the HELP box on your TFN declaration so your employer withholds the repayment. Use the{' '}
                <Link href="/hecs-calculator">HECS calculator</Link> to see your actual repayment.
              </span>
            </li>
          </ul>
        </section>

        <section className="prose prose-slate dark:prose-invert max-w-3xl">
          <h2>1. What HECS-HELP is</h2>
          <p>
            HECS-HELP is the loan the Australian government provides to cover
            the cost of Commonwealth-supported university places. Related
            schemes include VET Student Loans (VSL), Trade Support Loans (TSL),
            Student Start-up Loans (SSL), and the now-closed Student Financial
            Supplement Scheme (SFSS). They all use the same repayment machinery
            through the ATO.
          </p>
          <p>
            You do not make repayments while you are a student. Your loan is
            repaid through the tax system once your repayment income exceeds
            the threshold for the financial year.
          </p>

          <h2>2. The new marginal system (from 1 July 2025)</h2>
          <p>
            Before 1 July 2025, HECS repayments used a flat-rate system: once
            your income crossed a threshold, you paid a flat percentage of
            your entire repayment income. That created &quot;cliff
            edges&quot; where a small pay rise could cost you more than it
            earned.
          </p>
          <p>
            From 1 July 2025 the system is marginal — like income tax, you
            only pay the higher rate on the income above each threshold, not
            on your whole income. For FY 2025-26 the schedule was:
          </p>
          <table>
            <thead>
              <tr>
                <th>Repayment income</th>
                <th>Repayment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Below $54,435</td>
                <td>Nil</td>
              </tr>
              <tr>
                <td>$54,435 – $125,000</td>
                <td>15c per $1 above $54,435</td>
              </tr>
              <tr>
                <td>$125,001 – $159,664</td>
                <td>$10,585 + 17c per $1 above $125,000</td>
              </tr>
              <tr>
                <td>$159,665 and over</td>
                <td>10% of total repayment income</td>
              </tr>
            </tbody>
          </table>
          <p>
            For FY 2026-27 the thresholds have shifted up — the lower
            threshold is now around $69,528. The SalaryCalc{' '}
            <Link href="/hecs-calculator">HECS calculator</Link> applies the
            marginal method automatically.
          </p>

          <h2>3. What &quot;repayment income&quot; actually is</h2>
          <p>
            Repayment income is not the same as your taxable income. It is
            your taxable income plus:
          </p>
          <ul>
            <li>Reportable fringe benefits</li>
            <li>Total net investment loss (e.g. rental property losses)</li>
            <li>Reportable employer super contributions (including any salary sacrifice)</li>
            <li>Exempt foreign employment income</li>
          </ul>
          <p>
            For most employees on a single salary with no rental losses,
            repayment income is close to taxable income. For people with
            negative gearing, large salary sacrifice, or reportable fringe
            benefits, repayment income can be significantly higher.
          </p>

          <h2>4. Indexation — when it hurts and when it doesn&apos;t</h2>
          <p>
            On 1 June each year the ATO increases your HECS balance by the
            lower of CPI and the Wage Price Index (WPI) for the previous 12
            months. The WPI cap was introduced by the Universities Accord Act
            2024 after several years of high CPI-only indexation that caused
            widespread alarm.
          </p>
          <p>Recent indexation rates:</p>
          <ul>
            <li>June 2023: 7.1%</li>
            <li>June 2024: 4.7%</li>
            <li>June 2025: 3.2%</li>
            <li>June 2026: 2.8%</li>
          </ul>
          <p>
            A $30,000 debt at 7.1% grows by $2,130 in a single year. For
            people who earn below the repayment threshold, the debt can grow
            for years before repayments start reducing it.
          </p>

          <h2>5. Should you make voluntary repayments?</h2>
          <p>
            The calculus depends on the indexation rate versus what your
            money would earn (or cost you) elsewhere. If indexation is
            running at 4% and you can earn 5% in a high-interest savings
            account, keeping the cash makes sense. If you have a mortgage at
            6% and indexation is 3%, the comparison is closer — and the
            psychological benefit of clearing the debt matters too.
          </p>
          <p>
            The ATO has an{' '}
            <a
              href="https://www.ato.gov.au/individuals-and-families/education-and-study/managing-your-study-loan/repaying-your-study-loan/making-voluntary-repayments"
              target="_blank"
              rel="noopener noreferrer"
            >
              official voluntary repayment calculator
            </a>
            . Voluntary repayments are made via BPAY to the ATO using the
            reference on your ATO account (linked to your myGov). There is
            no minimum, no penalty, and the payment is credited to your HELP
            balance within a few business days.
          </p>

          <h2>6. Indexation credits and the 20% reduction</h2>
          <p>
            As part of the same 2024 reforms, the government announced a 20%
            reduction in the outstanding HELP debt for everyone who had a
            balance on 1 June 2024. The reduction was applied automatically;
            no action was required from borrowers. It is the largest single
            change to HELP balances in the scheme&apos;s history.
          </p>

          <h2>7. How long until you&apos;re debt-free?</h2>
          <p>
            For most graduates on a typical career trajectory, the balance is
            repaid within 8-15 years. The exact timeline depends on your
            starting balance, your income growth, the future indexation rate,
            and whether you make voluntary repayments.
          </p>
          <p>
            The SalaryCalc HECS calculator includes a debt balance and
            years-to-payoff estimate that accounts for indexation. The default
            indexation assumption is around 3% per year — adjust if you
            expect a higher or lower long-term rate.
          </p>

          <h2>8. Common mistakes</h2>
          <ul>
            <li>
              <strong>Not ticking the HECS box on your TFN declaration.</strong>{' '}
              If you do not tick the box, your employer will not withhold any
              HECS repayment, and the ATO will calculate the full amount at
              tax time — which can be a nasty surprise.
            </li>
            <li>
              <strong>Ignoring indexation while earning below the threshold.</strong>{' '}
              If you are earning below the repayment threshold, your debt is
              still growing each June. Plan for it.
            </li>
            <li>
              <strong>Not realising salary sacrifice increases repayment income.</strong>{' '}
              Salary sacrifice into super is a reportable employer super
              contribution, which adds to your repayment income. This is
              usually a small effect, but worth knowing.
            </li>
            <li>
              <strong>Forgetting about VSL/TSL/SSL/SFSS.</strong> If you took
              out any of the related loans, they are all repaid through the
              same machinery, and they all count toward your repayment income
              threshold.
            </li>
          </ul>

          <h2>9. Where the rules come from</h2>
          <p>
            Source:{' '}
            <a href={sources.hecsRepayment.url} target="_blank" rel="noopener noreferrer">
              {sources.hecsRepayment.label}
            </a>
            , plus the Universities Accord Act 2024 (which introduced the WPI
            indexation cap and the 20% debt reduction).
          </p>
        </section>

        <section aria-labelledby="hecs-faq" className="mt-16 max-w-3xl">
          <h2 id="hecs-faq" className="text-2xl font-bold text-ink-900 dark:text-ink-50">
            Common questions about HECS-HELP
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
            <TrustLink href="/hecs-calculator" title="HECS-HELP calculator" detail="Repayment under the new 2025-26 marginal system." />
            <TrustLink href="/salary-sacrifice-calculator" title="Salary sacrifice calculator" detail="See how sacrifice reduces your repayment income." />
            <TrustLink href="/" title="Pay calculator" detail="Live take-home pay with HECS toggle." />
            <TrustLink href="/guides/australian-income-tax" title="Australian income tax guide" detail="How the income tax system works end-to-end." />
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
        className="block transition hover:border-brand-300 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-700"
      >
        <p className="text-sm font-semibold text-ink-900 hover:text-brand-700 dark:text-ink-100 dark:hover:text-brand-300">
          {title} →
        </p>
        <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">{detail}</p>
      </Link>
    </li>
  );
}
