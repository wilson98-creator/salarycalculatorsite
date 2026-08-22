import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Breadcrumb } from '@/components/Breadcrumb';
import { NewsletterForm } from '@/components/NewsletterForm';
import { JsonLd, faqSchema, articleSchema, howToSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Salary sacrifice: how to lower your tax bill the legal way (FY 2026-27)',
  description:
    'How pre-tax super contributions actually save you money, the concessional cap, Division 293 for high earners, and the novated lease alternative. ATO-sourced.',
  alternates: { canonical: '/guides/salary-sacrifice' },
  keywords: [
    'salary sacrifice',
    'salary sacrifice into super',
    'concessional contributions cap',
    'novated lease',
    'division 293',
    'salary packaging',
  ],
  openGraph: {
    title: 'Salary sacrifice: how to lower your tax bill the legal way',
    description: 'How pre-tax super contributions actually save you money, the cap, and Division 293.',
    url: `${brand.url}/guides/salary-sacrifice`,
    type: 'article',
  },
};

const howToSteps = [
  {
    name: 'Decide how much to sacrifice',
    text: 'Use the SalaryCalc calculator to model the impact on your take-home pay. The sweet spot for most people is sacrificing up to the concessional cap ($30,000 in FY 2025-26) but only as much as they can afford to lose from take-home.',
  },
  {
    name: 'Tell your employer or payroll',
    text: 'Most employers have a simple form. Submit it before the start of the next pay period so the sacrifice is taken from gross before tax is calculated.',
  },
  {
    name: 'Watch the cap',
    text: 'Concessional contributions (your sacrifice + employer SG) are capped at $30,000 per year. Going over the cap means the excess is added to your assessable income and taxed at your marginal rate, defeating the purpose.',
  },
  {
    name: 'Check your super fund accepts the contributions',
    text: 'Most funds do, but it is worth confirming. The contribution shows up on your super statement within a few weeks of the pay period.',
  },
  {
    name: 'Review annually',
    text: 'As your income grows, the marginal tax saving grows too. Re-run the calculator each year and adjust your sacrifice when your situation changes (e.g. you switch to part-time, take unpaid leave, or have a child).',
  },
];

const faqs = [
  {
    question: 'What is salary sacrifice?',
    answer:
      'Salary sacrifice is an arrangement between you and your employer to redirect part of your pre-tax salary into superannuation, a novated lease, or other benefits. Because the sacrificed amount is taken out before income tax is calculated, your taxable income drops. The super fund then pays 15% tax on the contribution instead of your marginal rate (typically 30% or 37%).',
  },
  {
    question: 'When does salary sacrifice actually save money?',
    answer:
      'When your marginal tax rate is higher than 15% (the super tax rate). For most Australian employees that means anyone earning above $45,000 a year, which is most of us. The higher your marginal rate, the bigger the saving. A 37% earner saves 22 cents on every sacrificed dollar; a 30% earner saves 15 cents. Below $45,000 the saving is small enough that the lost take-home pay usually is not worth it.',
  },
  {
    question: 'How much can I salary sacrifice?',
    answer:
      'Concessional (before-tax) contributions are capped at $30,000 per year for FY 2025-26, including the Superannuation Guarantee paid by your employer. So if your employer pays 12% SG on $80,000 ($9,600), you can salary sacrifice up to a further $20,400 before triggering additional tax. The cap is indexed to wages in subsequent years.',
  },
  {
    question: 'Does salary sacrifice reduce my take-home pay?',
    answer:
      'Yes, but less than you might think. Sacrificing $10,000 into super on a $95,000 salary saves around $2,900 in tax, but your take-home pay only drops by about $7,100 (because the tax saving partly offsets the sacrificed amount). The sacrifice is pre-tax, so the net impact on your bank account is smaller than the gross sacrifice.',
  },
  {
    question: 'What happens if I go over the $30,000 cap?',
    answer:
      'The excess is included in your assessable income and taxed at your marginal rate, with a 15% tax offset. The effective rate is your marginal rate, so the contribution is treated the same as if you had taken it as cash. The cap is a hard ceiling on the tax-advantaged space. Going slightly over is rarely worth it unless you can move the excess into a different cap (e.g. the bring-forward rule).',
  },
  {
    question: 'What is Division 293 tax?',
    answer:
      'Division 293 is an extra 15% tax on concessional super contributions for high-income earners. It applies when your combined income (taxable income + reportable employer super contributions) exceeds $250,000. Even with Division 293, the effective tax rate inside super (15% + 15% = 30%) is still below the top marginal income tax rate. Salary sacrifice remains worthwhile for high earners, just less profitable.',
  },
  {
    question: 'What is a novated lease?',
    answer:
      'A novated lease is a specific type of salary sacrifice where you redirect pre-tax salary to pay for a car lease (and often its running costs). The tax mechanics are the same, the sacrificed amount reduces your taxable income, but novated leases have additional Fringe Benefits Tax (FBT) rules. The main trade-off is that the car is owned by the finance company, not you, until the lease ends.',
  },
  {
    question: 'Can I salary sacrifice into my spouse\'s super?',
    answer:
      'No. Salary sacrifice must go into your own super fund under your own name. To contribute to your spouse, you make an after-tax "spouse contribution" instead, which has a separate cap ($3,000 per year for a tax offset if your spouse earns under $40,000). The two are not interchangeable.',
  },
];

export default function SalarySacrificeGuide() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'Salary sacrifice: how to lower your tax bill the legal way (FY 2026-27)',
            description: metadata.description as string,
            url: `${brand.url}/guides/salary-sacrifice`,
            datePublished: '2026-01-15',
            dateModified: brand.lastReviewed,
          }),
          howToSchema({
            name: 'How to set up salary sacrifice into super',
            description: 'Step-by-step process for setting up and managing salary sacrifice with your employer.',
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
            { name: 'Salary sacrifice' },
          ]} />
          <h1 className="h-display mt-6 text-ink-900">
            Salary sacrifice: how to lower your tax bill the legal way
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 sm:text-lg">
            Salary sacrifice is an arrangement where you redirect part of
            your pre-tax salary into superannuation or other benefits. Because
            the sacrificed amount is taken out before income tax is
            calculated, your taxable income drops. This guide covers how it
            actually saves you money, the annual caps, and the situations
            where it does not make sense.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">
              Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
            </span>
            <span className="kicker">8 min read</span>
            <span className="kicker">FY 2026-27</span>
            <span className="kicker">$30K cap</span>
          </div>
        </header>

        {/* TL;DR */}
        <section aria-labelledby="ss-tldr" className="card not-prose mb-10">
          <h2 id="ss-tldr" className="text-base font-semibold text-ink-900">
            The 60-second version
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                Salary sacrifice moves pre-tax salary into super. The super tax rate is <strong>15%</strong> vs your marginal rate of 30-45%.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                Concessional cap: <strong>$30,000/year</strong> including your employer&apos;s SG.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                Sweet spot: <strong>$45,000-$135,000</strong> earners (30% marginal rate) save 15c per dollar sacrificed.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                Division 293 adds 15% extra on contributions if combined income exceeds $250,000.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                Use the <Link href="/salary-sacrifice-calculator">SalaryCalc calculator</Link> to model the impact on your take-home.
              </span>
            </li>
          </ul>
        </section>

        <section className="prose prose-slate prose-invert max-w-3xl">
          <h2>1. The basic idea</h2>
          <p>
            Without salary sacrifice, your marginal tax rate is 30%, 37%, or
            45% on the top portion of your income. With salary sacrifice,
            that top portion goes into your super fund instead, where it is
            taxed at 15%, the super funds&apos; flat tax rate on
            concessional contributions.
          </p>
          <p>
            For a $5,000 salary sacrifice at a 37% marginal rate, you save
            $5,000 × (37% − 15%) = $1,100 in tax. Your take-home pay drops
            by less than $5,000 because the sacrifice is pre-tax, not
            post-tax. Your super balance grows by $5,000 minus the 15% super
            tax = $4,250. Net effect: $1,100 tax saved and $4,250 more in
            super.
          </p>

          <h2>2. The concessional contributions cap</h2>
          <p>
            Concessional (before-tax) contributions are capped at $30,000
            per year for FY 2025-26, indexed to wages in subsequent years.
            The cap includes the Superannuation Guarantee paid by your
            employer, so if your employer pays 12% SG on your $80,000
            salary ($9,600), you can salary sacrifice up to a further
            $20,400 before triggering the cap.
          </p>
          <p>
            Going over the cap has consequences: the excess is included in
            your assessable income and taxed at your marginal rate, with a
            15% tax offset. In effect, the excess is taxed the same as if
            you had never salary sacrificed it. So the cap is the cliff.
          </p>

          <h2>3. Division 293, the surcharge for high earners</h2>
          <p>
            If your combined income and concessional super contributions
            exceed $250,000, an additional 15% Division 293 tax applies to
            the lower of your concessional contributions or the amount above
            the threshold. For most people earning below $250,000, Division
            293 does not apply.
          </p>
          <p>
            Even with Division 293, the effective tax rate inside super
            (15% + 15% = 30%) is still below the top marginal income tax
            rate. Salary sacrifice remains worthwhile for high earners, just
            less profitable.
          </p>

          <h2>4. Novated leases, a different kind of sacrifice</h2>
          <p>
            A novated lease is a three-way agreement between you, your
            employer, and a finance company. Your employer pays for the
            lease and running costs of a car from your pre-tax salary, and
            you make repayments out of your pay before tax. The running
            costs (fuel, insurance, registration, maintenance) can also be
            packaged.
          </p>
          <p>
            The tax saving on a typical $15,000-per-year novated lease is
            around $4,500-$5,000 for a 37% marginal rate earner. The catch:
            you do not own the car (the finance company does), and there
            are FBT implications. The ATO has detailed rules about the FBT
            treatment of novated leases, including the &quot;statutory
            formula&quot; method and the &quot;operating cost&quot; method.
          </p>
          <p>
            Novated leases are not right for everyone. They suit people who
            would otherwise buy a car with after-tax money, can commit to
            the lease term, and whose employer is willing to administer the
            arrangement. Most large employers, government agencies, and
            not-for-profit organisations offer novated leases as a standard
            benefit.
          </p>

          <h2>5. Salary packaging for not-for-profit and public sector workers</h2>
          <p>
            Employees of public hospitals, charities, and some government
            bodies are eligible for &quot;salary packaging&quot; under FBT
            concessions, which can let you sacrifice a much larger portion
            of your salary, up to the FBT-exempt cap (currently $30,000 +
            grossed-up amount under certain arrangements). Common items:
            mortgage repayments, rent, credit card debt, child care, school
            fees.
          </p>
          <p>
            These arrangements are managed by salary packaging providers
            (Maxxia, SmartSalary, Paywise, etc.). If you are eligible, they
            are usually well worth setting up.
          </p>

          <h2>6. Practical steps</h2>
          <ol>
            <li>
              Decide how much to sacrifice. Use the{' '}
              <Link href="/salary-sacrifice-calculator">salary sacrifice calculator</Link>{' '}
              to model the impact on your take-home pay.
            </li>
            <li>Tell your employer or payroll. Most have a simple form.</li>
            <li>
              Watch the cap. Your payroll system should track your YTD
              concessional contributions and warn you before you exceed it.
            </li>
            <li>
              Check your super fund accepts the contributions (it should , 
              most do).
            </li>
            <li>
              Review annually. As your income grows, the marginal tax saving
              grows too.
            </li>
          </ol>

          <h2>7. When salary sacrifice does not make sense</h2>
          <ul>
            <li>
              <strong>You cannot afford the reduced take-home pay.</strong>{' '}
              Salary sacrifice reduces your weekly cash flow. If you are
              living pay-to-pay, the tax saving is not worth the cash
              crunch.
            </li>
            <li>
              <strong>You are about to access your super.</strong> If you
              are over 60 and planning to withdraw super, salary
              sacrificing into it now is the same as just investing it
              normally, minus the extra layer of fees.
            </li>
            <li>
              <strong>You have a partner with a lower income.</strong>{' '}
              Spousal contributions can sometimes be a more tax-effective
              use of the money.
            </li>
            <li>
              <strong>You are a very low earner.</strong> The 0% and 15%
              brackets are already very low. The tax saving is minimal and
              the lost cash flow is more painful.
            </li>
          </ul>

          <h2>8. Where the rules come from</h2>
          <p>
            Salary sacrifice rules come from the Income Tax Assessment Act
            1997 (Cth), the Superannuation Industry (Supervision) Act 1993,
            and the Fringe Benefits Tax Assessment Act 1986. The ATO&apos;s{' '}
            <a
              href="https://www.ato.gov.au/individuals-and-families/super-for-me-individuals/growing-your-super/salary-sacrificing-super"
              target="_blank"
              rel="noopener noreferrer"
            >
              salary sacrificing into super
            </a>{' '}
            page is the most accessible starting point.
          </p>
        </section>

        <section aria-labelledby="ss-faq" className="mt-16 max-w-3xl">
          <h2 id="ss-faq" className="text-2xl font-bold text-ink-900">
            Common questions about salary sacrifice
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

        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-ink-900">Related guides and tools</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrustLink href="/salary-sacrifice-calculator" title="Salary sacrifice calculator" detail="See the tax saving and take-home impact instantly." />
            <TrustLink href="/hecs-calculator" title="HECS-HELP calculator" detail="Sacrifice reduces your repayment income, see how." />
            <TrustLink href="/guides/superannuation" title="Superannuation guide" detail="How the SG, the 15% super tax, and preservation work." />
            <TrustLink href="/guides/stage-3-tax-cuts" title="Stage 3 tax cuts" detail="What changed and what is still to come." />
            <TrustLink href="/methodology" title="Methodology" detail="How every number is calculated, with citations." />
            <TrustLink href="/about" title="About SalaryCalc" detail="Story, editorial standards, corrections policy." />
          </ul>
        </section>
      
        <NewsletterForm
          accessKey={process.env.NEXT_PUBLIC_NEWSLETTER_KEY}
          source="guide-sacrifice"
          heading="More guides like this, in your inbox."
          description="We publish new long-form Australian finance guides every few weeks. Get notified when one drops, no spam, unsubscribe anytime."
        />
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
