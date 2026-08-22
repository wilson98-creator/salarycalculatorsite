import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, articleSchema, howToSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Medicare Levy Surcharge: who pays it and how to avoid it (FY 2026-27)',
  description:
    'The 1%–1.5% Medicare Levy Surcharge for high earners without private hospital cover. Thresholds, exemptions, and what to do at tax time. ATO-sourced.',
  alternates: { canonical: '/guides/medicare-levy-surcharge' },
  keywords: [
    'medicare levy surcharge',
    'mls',
    'private hospital cover',
    'australian tax',
    'lifetime health cover',
  ],
  openGraph: {
    title: 'Medicare Levy Surcharge: who pays it and how to avoid it',
    description: 'The 1-1.5% MLS for high earners without private hospital cover. Thresholds and exemptions.',
    url: `${brand.url}/guides/medicare-levy-surcharge`,
    type: 'article',
  },
};

const howToSteps = [
  {
    name: 'Calculate your MLS income',
    text: 'MLS income is taxable income plus reportable fringe benefits, reportable employer super contributions, and net investment losses. For most employees on a single salary, it is close to taxable income.',
  },
  {
    name: 'Check your tier against the threshold',
    text: 'FY 2026-27 thresholds: no surcharge below $105,000 (singles) or $210,000 (families); Tier 1 (1.0%) from there; Tier 2 (1.5%) above $141,000 (singles) or $282,000 (families).',
  },
  {
    name: 'Decide whether to take out hospital cover',
    text: 'If you cross a threshold, basic hospital cover often costs less than the surcharge. A $1,200 policy can save $2,000+ in MLS for a higher-income earner. Always compare.',
  },
  {
    name: 'Take out ATO-compliant hospital cover',
    text: 'You need hospital cover that includes the ATO-compliant clinical categories. Extras-only (dental, optical) does not count. Your health insurer can confirm whether your policy qualifies.',
  },
  {
    name: 'Lodge a Medicare levy variation declaration if needed',
    text: 'If you take out hospital cover, lodge a variation declaration with your employer to stop the standard 2% Medicare levy being withheld (you still pay it at tax time based on your actual situation).',
  },
  {
    name: 'Reconcile at tax time',
    text: 'The MLS is paid at tax time, not through PAYG. It appears on your notice of assessment and is added to any tax payable or refunded. Use the ATO variation tool if your situation changed mid-year.',
  },
];

const faqs = [
  {
    question: 'What is the Medicare Levy Surcharge?',
    answer:
      'The Medicare Levy Surcharge (MLS) is an extra 1-1.5% charged to higher-income earners who do not hold appropriate private hospital cover. It is paid on top of the standard 2% Medicare levy at tax time. It was introduced in 1997 to encourage higher-income earners to take out private hospital cover and ease demand on the public system.',
  },
  {
    question: 'What are the MLS thresholds for FY 2026-27?',
    answer:
      'For FY 2026-27, the surcharge applies to singles earning above $105,000 and families above $210,000. Tier 1 (1.0%) applies to singles $105,000-$141,000 and families $210,000-$282,000. Tier 2 (1.5%) applies above those. Family thresholds increase by $1,500 for each dependent child after the first.',
  },
  {
    question: 'Is the MLS calculated on the whole income or just the excess?',
    answer:
      'On the whole of your MLS income, not just the portion above the threshold. A $150,000 single with no private hospital cover pays 1.5% on the whole $150,000 — $2,250 on top of the standard $3,000 Medicare levy. This surprises many people at tax time.',
  },
  {
    question: 'What counts as "appropriate" private hospital cover?',
    answer:
      '"Appropriate private patient hospital cover" is hospital cover that includes all of the clinical categories required by the ATO. It does not need to be the most expensive top-tier policy, and it does not need to include extras (dental, optical, etc.). Many basic hospital policies qualify. Your health insurer can confirm whether your existing policy qualifies.',
  },
  {
    question: 'Does taking out hospital cover partway through the year help?',
    answer:
      'Yes. If you take out a qualifying policy partway through the financial year, the surcharge is pro-rated based on the number of days you were covered. You can also lodge a Medicare levy variation declaration with your employer to stop the standard levy being withheld, and reconcile everything at tax time.',
  },
  {
    question: 'What is the Lifetime Health Cover loading?',
    answer:
      'Lifetime Health Cover (LHC) loading is an additional 2% per year over age 30 that applies if you take out private hospital cover for the first time after age 31, up to a maximum of 70%. It applies for 10 years of continuous cover. LHC is separate to the MLS. It can be a reason to take out cover earlier, even if you do not currently earn above the MLS threshold — you lock in no loading while you are young.',
  },
  {
    question: 'When is the MLS paid?',
    answer:
      'The MLS is calculated and paid at tax time, not through PAYG withholding. Your employer withholds the standard 2% Medicare levy from each pay. The MLS appears on your notice of assessment after you lodge your return, and is added to any tax payable or refunded.',
  },
  {
    question: 'Does the SalaryCalc calculator include the MLS?',
    answer:
      'No. The main pay calculator models only what your employer withholds through PAYG, which excludes the MLS. For an MLS-aware estimate, use the ATO MLS calculator, or talk to a registered tax agent at tax time. The methodology page documents this in the "What we don\'t model" section.',
  },
];

export default function MlsGuide() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'Medicare Levy Surcharge: who pays it and how to avoid it (FY 2026-27)',
            description: metadata.description as string,
            url: `${brand.url}/guides/medicare-levy-surcharge`,
            datePublished: '2026-01-15',
            dateModified: brand.lastReviewed,
          }),
          howToSchema({
            name: 'How to manage the Medicare Levy Surcharge',
            description: 'Step-by-step process for understanding and managing the MLS at tax time.',
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
            { name: 'Medicare Levy Surcharge' },
          ]} />
          <h1 className="h-display mt-6 text-ink-900">
            Medicare Levy Surcharge
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 sm:text-lg">
            The Medicare Levy Surcharge (MLS) is an additional 1% to 1.5%
            charged to higher-income earners who do not hold an appropriate
            level of private hospital cover. It is paid on top of the
            standard 2% Medicare levy. This guide explains the thresholds, how
            the surcharge is calculated, and the simplest ways to avoid it.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">
              Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
            </span>
            <span className="kicker">6 min read</span>
            <span className="kicker">FY 2026-27</span>
            <span className="kicker">ATO-sourced</span>
          </div>
        </header>

        {/* TL;DR */}
        <section aria-labelledby="mls-tldr" className="card not-prose mb-10">
          <h2 id="mls-tldr" className="text-base font-semibold text-ink-900">
            The 60-second version
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                Surcharge kicks in at <strong>$105,000 single / $210,000 family</strong> in FY 2026-27.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                Tier 1: <strong>1.0%</strong>. Tier 2: <strong>1.5%</strong> on the whole of your MLS income, not just the excess.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                Avoid it by taking out <strong>ATO-compliant hospital cover</strong>. Extras-only does not count.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-brand-600">→</span>
              <span className="text-ink-700">
                The MLS is paid at <strong>tax time</strong>, not through PAYG. Use the ATO MLS calculator for an estimate.
              </span>
            </li>
          </ul>
        </section>

        <section className="prose prose-slate prose-invert max-w-3xl">
          <h2>1. What the surcharge is for</h2>
          <p>
            The MLS is designed to encourage higher-income earners to take
            out private hospital cover, easing demand on the public hospital
            system. The surcharge was introduced in 1997 alongside the
            original Medicare levy private health insurance incentive.
          </p>

          <h2>2. The thresholds (FY 2026-27)</h2>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Income threshold</th>
                <th>Surcharge rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Singles, below $105,000</td>
                <td>No surcharge</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>Singles, $105,000 – $141,000</td>
                <td>Tier 1</td>
                <td>1.0%</td>
              </tr>
              <tr>
                <td>Singles, above $141,000</td>
                <td>Tier 2</td>
                <td>1.5%</td>
              </tr>
              <tr>
                <td>Families, below $210,000</td>
                <td>No surcharge</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>Families, $210,000 – $282,000</td>
                <td>Tier 1</td>
                <td>1.0%</td>
              </tr>
              <tr>
                <td>Families, above $282,000</td>
                <td>Tier 2</td>
                <td>1.5%</td>
              </tr>
            </tbody>
          </table>
          <p>
            Family thresholds increase by $1,500 for each dependent child
            after the first. The income used to determine the tier is your
            &quot;MLS income&quot; — taxable income plus reportable fringe
            benefits, reportable employer super contributions, and net
            investment losses.
          </p>

          <h2>3. How the surcharge is calculated</h2>
          <p>
            Once you cross the threshold, the surcharge rate is applied to
            the whole of your MLS income, not just the portion above the
            threshold. A single person earning $150,000 with no private
            hospital cover pays 1.5% on the whole $150,000 — $2,250 on top
            of the standard $3,000 Medicare levy. The total Medicare-related
            cost is $5,250.
          </p>
          <p>
            Compare that to a basic hospital cover policy, which might cost
            $1,500–$2,500 per year for a single person. For many
            higher-income earners, taking out even the cheapest compliant
            hospital cover is significantly cheaper than paying the
            surcharge.
          </p>

          <h2>4. The &quot;appropriate level&quot; of private cover</h2>
          <p>
            To avoid the surcharge, you need &quot;appropriate private
            patient hospital cover&quot; — that is, hospital cover that
            includes all of the clinical categories required by the ATO. It
            does not need to be the most expensive top-tier policy, and it
            does not need to include extras (dental, optical, etc.). Many
            basic hospital policies qualify.
          </p>
          <p>
            Your health insurer can confirm whether your existing policy
            qualifies. If you take out a qualifying policy partway through
            the financial year, the surcharge is pro-rated based on the
            number of days you were covered.
          </p>

          <h2>5. Lifetime Health Cover loading</h2>
          <p>
            If you take out private hospital cover for the first time after
            the age of 31, you will pay a Lifetime Health Cover (LHC) loading
            of 2% per year over the age of 30, up to a maximum of 70%. The
            loading applies for 10 years of continuous cover.
          </p>
          <p>
            LHC loading is a separate consideration to the MLS. It can be a
            reason to take out cover earlier, even if you do not currently
            earn above the MLS threshold — you lock in no loading while you
            are young, and you can always drop the policy later (though you
            will pay the loading again if you re-take it after a gap).
          </p>

          <h2>6. When the surcharge is paid</h2>
          <p>
            The MLS is calculated and paid at tax time, not through PAYG
            withholding. Your employer withholds the standard 2% Medicare
            levy from each pay. The MLS appears on your notice of assessment
            after you lodge your return, and is added to any tax payable or
            refunded.
          </p>
          <p>
            If you take out hospital cover partway through the year, you can
            use the ATO&apos;s private health insurance rebate and MLS
            variation tools to estimate the impact on your final tax.
          </p>

          <h2>7. Common mistakes</h2>
          <ul>
            <li>
              <strong>Thinking extras cover counts.</strong> Extras-only
              policies (dental, optical, physio) do not exempt you from the
              MLS. You need hospital cover with the ATO-compliant clinical
              categories.
            </li>
            <li>
              <strong>Forgetting about MLS income.</strong> The threshold
              test is on MLS income, not just taxable income. Reportable
              employer super contributions and reportable fringe benefits
              can push you over the line even when your salary alone would
              not.
            </li>
            <li>
              <strong>Not telling your employer about the variation.</strong>{' '}
              If you take out hospital cover, you can lodge a Medicare levy
              variation declaration with your employer to stop the standard
              levy being withheld. You still pay it at tax time based on
              your actual situation.
            </li>
            <li>
              <strong>Paying the surcharge when cheap cover would have been
              cheaper.</strong> Always compare. A $1,200 hospital policy can
              save $2,000+ in surcharge.
            </li>
          </ul>

          <h2>8. Where the rules come from</h2>
          <p>
            Source:{' '}
            <a href={sources.medicareLevy.url} target="_blank" rel="noopener noreferrer">
              {sources.medicareLevy.label}
            </a>{' '}
            and the ATO&apos;s &quot;Medicare levy surcharge&quot; page.
          </p>

          <h2>9. Try the calculator</h2>
          <p>
            The main pay calculator on the <Link href="/">homepage</Link>{' '}
            does not include the MLS — it models only what your employer
            withholds through PAYG. For an MLS-aware estimate, use the
            ATO&apos;s{' '}
            <a
              href="https://www.ato.gov.au/calculators-and-tools/medicare-levy-surcharge-calculator"
              target="_blank"
              rel="noopener noreferrer"
            >
              MLS calculator
            </a>
            , or talk to a registered tax agent at tax time.
          </p>
        </section>

        <section aria-labelledby="mls-faq" className="mt-16 max-w-3xl">
          <h2 id="mls-faq" className="text-2xl font-bold text-ink-900">
            Common questions about the Medicare Levy Surcharge
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
            <TrustLink href="/" title="Pay calculator" detail="Live take-home pay calculator with all FY 2026-27 rates." />
            <TrustLink href="/guides/australian-income-tax" title="Australian income tax guide" detail="How the tax system works end-to-end." />
            <TrustLink href="/guides/hecs-repayment" title="HECS-HELP guide" detail="The marginal HECS system, indexation, and voluntary repayment." />
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
