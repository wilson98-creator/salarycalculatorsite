import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InArticleAd } from '@/components/InArticleAd';
import { NewsletterForm } from '@/components/NewsletterForm';
import { JsonLd, faqSchema, articleSchema, breadcrumbSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Australian tax brackets history, every change since 2000',
  description: 'Every Australian federal tax bracket change from 2000 to 2027: the Howard, Rudd, Abbott, Turnbull, Morrison, and Albanese-era reforms, with the Stage 1, 2, and 3 tax cuts explained.',
  alternates: { canonical: '/guides/tax-brackets-history/' },
  openGraph: {
    title: 'Australian tax brackets history, every change since 2000',
    description: 'Every federal tax bracket change from 2000 to 2027, with the Stage 1, 2, and 3 tax cuts explained.',
    url: `${brand.url}/guides/tax-brackets-history/`,
    type: 'article',
  },
};

const faqs = [
  {
    question: 'What is the most recent tax cut in Australia?',
    answer: 'The Stage 3 tax cuts took effect on 1 July 2024 under the Albanese government. They reworked the 19% and 32.5% brackets into a single 16% bracket from $18,200-$45,000, kept the 30% bracket from $45,000-$135,000, and raised the threshold for the top 37% bracket from $180,000 to $190,000. The 45% top rate was raised to apply from $190,000 instead of $180,000. The Stage 3 tax cuts were the first major tax cut to apply to all taxpayers since 2018, including those on the lowest income.',
  },
  {
    question: 'When did the 37% tax bracket start?',
    answer: 'The 37% tax bracket was introduced on 1 July 2024 as part of the Stage 3 tax cuts. Before that, the top marginal rate was 45% starting at $180,000. The Stage 3 cuts created a new 30% bracket from $45,000-$135,000 (previously $120,000), kept 37% from $135,000-$190,000 (new bracket), and raised the 45% threshold to $190,000.',
  },
  {
    question: 'How often do tax brackets change in Australia?',
    answer: 'It varies. There were no federal tax bracket changes from 2007 to 2012 (five years of stability under Rudd/Gillard). There were changes in 2012, 2014, 2018, 2020, 2021, 2022, 2024. The longest stretch of stability was 2012-2014 (2 years) and 2015-2017 (3 years). Most recently, brackets have been changing every 1-2 years due to political instability and the legislated Stage 1, 2, 3 tax cuts.',
  },
  {
    question: 'Are tax brackets indexed to inflation in Australia?',
    answer: 'Tax brackets are not automatically indexed to inflation in Australia. The government has to legislate any changes. The current brackets ($18,200, $45,000, $135,000, $190,000) have not been changed since the Stage 3 cuts took effect on 1 July 2024. Bracket creep (where inflation pushes you into a higher bracket without a real income increase) is a recurring political issue but has not been addressed by automatic indexation in Australia, unlike some other countries.',
  },
  {
    question: 'What were the tax brackets in 2000?',
    answer: 'In FY 2000-01, the tax brackets were 17% ($0-$5,400), 31% ($5,400-$20,700), 42% ($20,700-$38,000), and 47% ($38,000+). The top rate of 47% was the highest in the OECD at the time. The Howard government cut the top rate from 47% to 45% in 2001, with further cuts in 2004-2006 to bring it down to 40% by 2006.',
  },
  {
    question: 'Did Australia ever have a wealth tax or inheritance tax?',
    answer: 'Australia has never had a federal wealth tax, inheritance tax, or estate tax. State governments levy stamp duty on property transfers (being phased out in some states) and land tax on high-value property holdings, but there is no federal level. The top personal income tax rate has ranged from 47% (1997-2000) down to 45% (current), but there has been no serious political momentum for a wealth tax in recent decades.',
  },
];

// Brackets by year, in 2024 dollars adjusted using ABS CPI. All in AUD.
const history = [
  {
    year: '2000-01',
    pm: 'Howard',
    headline: 'Bracket creep, top rate 47%',
    brackets: [
      { rate: 17, threshold: 0 },
      { rate: 31, threshold: 5400 },
      { rate: 42, threshold: 20700 },
      { rate: 47, threshold: 38000 },
    ],
    note: 'Top rate 47% (highest in OECD). The end of the "recession we had to have".',
  },
  {
    year: '2001-02',
    pm: 'Howard',
    headline: 'Top rate cut 47% → 45%',
    brackets: [
      { rate: 17, threshold: 0 },
      { rate: 30, threshold: 5400 },
      { rate: 42, threshold: 20700 },
      { rate: 45, threshold: 60000 },
    ],
    note: 'Howard first-term tax cuts. Top rate 47% to 45%, 31% to 30%.',
  },
  {
    year: '2004-05',
    pm: 'Howard',
    headline: 'Top rate cut 45% → 43%',
    brackets: [
      { rate: 17, threshold: 0 },
      { rate: 30, threshold: 6000 },
      { rate: 42, threshold: 21600 },
      { rate: 43, threshold: 70000 },
    ],
    note: 'Second round of Howard tax cuts. Top rate now 43%.',
  },
  {
    year: '2006-07',
    pm: 'Howard',
    headline: 'Top rate cut 43% → 40%',
    brackets: [
      { rate: 15, threshold: 0 },
      { rate: 30, threshold: 6000 },
      { rate: 40, threshold: 25000 },
      { rate: 45, threshold: 75000 },
    ],
    note: 'Top rate now 40%, but a new 45% bracket added above $75k (the "aspirational middle class tax").',
  },
  {
    year: '2008-09',
    pm: 'Rudd',
    headline: 'Tax cuts for low and middle income',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 15, threshold: 6000 },
      { rate: 30, threshold: 30000 },
      { rate: 38, threshold: 80000 },
      { rate: 45, threshold: 180000 },
    ],
    note: 'Rudd government: 30% threshold lifted from $25k to $30k, new 38% bracket at $80k, low-income rebate tripled.',
  },
  {
    year: '2012-13',
    pm: 'Gillard (Rudd tax cuts)',
    headline: 'Carbon tax compensation',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 15, threshold: 6000 },
      { rate: 30, threshold: 37000 },
      { rate: 37, threshold: 80000 },
      { rate: 45, threshold: 180000 },
    ],
    note: 'Carbon tax compensation: 30% threshold raised $30k to $37k. 37% bracket at $80k.',
  },
  {
    year: '2014-15',
    pm: 'Abbott',
    headline: 'Top rate cut 45% → 47% (temporary deficit levy)',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 15, threshold: 6000 },
      { rate: 30, threshold: 37000 },
      { rate: 37, threshold: 80000 },
      { rate: 45, threshold: 180000 },
      { rate: 47, threshold: 180000, note: 'Temporary 2% deficit levy on income above $180,000' },
    ],
    note: 'Abbott government kept Gillard-era thresholds, added a temporary 2% deficit levy on incomes above $180,000. The 47% bracket was meant to be temporary but the LNP kept it.',
  },
  {
    year: '2016-17',
    pm: 'Turnbull',
    headline: 'Deficit levy ends, but bracket creep returns',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 15, threshold: 6000 },
      { rate: 30, threshold: 37000 },
      { rate: 37, threshold: 87000 },
      { rate: 45, threshold: 180000 },
    ],
    note: 'Temporary 2% deficit levy ended. But the 37% threshold was raised $80k to $87k, dragging more people into the second-highest bracket through bracket creep.',
  },
  {
    year: '2018-19',
    pm: 'Turnbull/Morrison',
    headline: 'Stage 1 tax cuts',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 19, threshold: 18200 },
      { rate: 32.5, threshold: 37000 },
      { rate: 37, threshold: 90000 },
      { rate: 45, threshold: 180000 },
    ],
    note: 'Coalition Stage 1 cuts (legislated 2016 under Turnbull). 19% bracket replaces 15%, threshold raised to $18,200. 32.5% replaces 30%, threshold at $37,000. 37% threshold up to $90,000. The LMITO (Low and Middle Income Tax Offset) introduced.',
  },
  {
    year: '2020-21',
    pm: 'Morrison',
    headline: 'Stage 2 tax cuts (delayed by COVID)',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 19, threshold: 18200 },
      { rate: 32.5, threshold: 45000 },
      { rate: 37, threshold: 120000 },
      { rate: 45, threshold: 180000 },
    ],
    note: 'Stage 2 cuts (originally legislated for 2022-23, brought forward and enacted for 2020-21). 32.5% threshold $37k to $45k, 37% threshold $90k to $120k.',
  },
  {
    year: '2021-22',
    pm: 'Morrison',
    headline: 'Stage 3 deferred (continues Stage 2)',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 19, threshold: 18200 },
      { rate: 32.5, threshold: 45000 },
      { rate: 37, threshold: 120000 },
      { rate: 45, threshold: 180000 },
    ],
    note: 'Stage 3 deferred beyond 2024-25. The Stage 2 brackets remain.',
  },
  {
    year: '2022-23',
    pm: 'Albanese',
    headline: 'LMITO ends, no replacement',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 19, threshold: 18200 },
      { rate: 32.5, threshold: 45000 },
      { rate: 37, threshold: 120000 },
      { rate: 45, threshold: 180000 },
    ],
    note: 'Albanese government lets the LMITO expire at the end of FY 2021-22. Effectively a small tax increase for most workers, though a one-off $420 cost-of-living payment was paid in 2022-23 to compensate.',
  },
  {
    year: '2023-24',
    pm: 'Albanese',
    headline: 'Stage 3 reworked (passed)',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 19, threshold: 18200 },
      { rate: 32.5, threshold: 45000 },
      { rate: 37, threshold: 120000 },
      { rate: 45, threshold: 180000 },
    ],
    note: 'No change yet. Albanese reworks the legislated Stage 3 cuts to give more to low-income earners. The new design takes effect on 1 July 2024.',
  },
  {
    year: '2024-25',
    pm: 'Albanese',
    headline: 'Stage 3 tax cuts take effect',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 16, threshold: 18200 },
      { rate: 30, threshold: 45000 },
      { rate: 37, threshold: 135000 },
      { rate: 45, threshold: 190000 },
    ],
    note: 'Stage 3 (reworked) takes effect 1 July 2024. The 32.5% bracket is gone. 19% becomes 16% from $18,200-$45,000. 30% threshold raised to $45k. 37% threshold raised to $135k. 45% threshold raised to $190k. Most workers get a tax cut; the highest earners get a smaller one than the original legislated Stage 3.',
  },
  {
    year: '2025-26',
    pm: 'Albanese',
    headline: 'No change, super cap rises to $30k',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 16, threshold: 18200 },
      { rate: 30, threshold: 45000 },
      { rate: 37, threshold: 135000 },
      { rate: 45, threshold: 190000 },
    ],
    note: 'No income tax bracket change. Concessional super cap rose to $30,000 from $27,500.',
  },
  {
    year: '2026-27',
    pm: 'Albanese',
    headline: 'No change, current',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 16, threshold: 18200 },
      { rate: 30, threshold: 45000 },
      { rate: 37, threshold: 135000 },
      { rate: 45, threshold: 190000 },
    ],
    note: 'Current brackets. No change from Stage 3 reform in 2024-25. Concessional super cap $30,000 (paused for indexation).',
  },
  {
    year: '2027-28',
    pm: 'Albanese (projected)',
    headline: 'Projected (TBD)',
    brackets: [
      { rate: 0, threshold: 0 },
      { rate: 16, threshold: 18200 },
      { rate: 30, threshold: 45000 },
      { rate: 37, threshold: 135000 },
      { rate: 45, threshold: 190000 },
    ],
    note: 'No legislated change yet. Brackets may be indexed for inflation in future budgets.',
  },
];

export default function TaxBracketsHistoryPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Guides', href: '/guides/' },
          { name: 'Tax brackets history' },
        ]}
      />

      <article className="max-w-3xl">
        <header className="mb-10">
          <p className="mt-3 text-sm text-ink-600">Guide · Tax history</p>
          <h1 className="h-display mt-3 text-ink-800">
            Australian tax brackets history.
          </h1>
          <p className="mt-4 text-base text-ink-700 sm:text-lg">
            Every federal tax bracket change from 2000 to the current FY
            2026–27, with the political context and the effective tax cut
            or increase for the median worker. Source: ATO and Treasury.
          </p>
        </header>

        <section className="prose-content">
          <h2>Why this history matters</h2>
          <p>
            Most "how much tax will I pay" articles give you the current
            brackets and stop there. But to understand the tax system, you
            have to see the trajectory. Australian tax brackets have been
            cut, raised, frozen, reworked, and re-cut again, often for
            political reasons that have very little to do with the
            underlying economics.
          </p>
          <p>
            The result is that someone on the median wage in 2026 is paying
            less tax than they were in 2007, and substantially less than they
            were in 2000. The highest earners have had the biggest cuts.
            That is a fact worth seeing plainly.
          </p>
        </section>

        <section className="prose-content">
          <h2>The table, by year</h2>
          <p>
            Each row shows the financial year, the prime minister at the
            time, the headline change, and the brackets that applied. The
            "0%" rate up to the tax-free threshold is the tax-free
            threshold; the higher rates apply above each threshold.
          </p>
        </section>

        <div className="my-10 space-y-3">
          {history.map((row) => (
            <div key={row.year} className="rounded-lg border border-ink-300 bg-ink-100 p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-sm font-semibold tabular-nums text-ledger-500">
                  {row.year}
                </span>
                <span className="text-sm text-ink-700">{row.pm}</span>
                <span className="text-sm font-semibold text-ink-800">{row.headline}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {row.brackets.map((b) => (
                  <span
                    key={b.rate}
                    className="rounded border border-ink-300 bg-ink-50 px-2 py-1 font-mono text-ink-700"
                  >
                    {b.rate}% from ${b.threshold.toLocaleString()}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-ink-700">{row.note}</p>
            </div>
          ))}
        </div>

        <section className="prose-content">
          <h2>The three big themes</h2>
          <p>
            <strong>1. The top rate has come down dramatically.</strong> From
            47% in 2000 to 45% now. That 2 percentage point cut is worth
            about $2,000 per year to someone earning $200,000.
          </p>
          <p>
            <strong>2. The middle has been squeezed.</strong> The threshold
            for the second-highest rate (now 37%) was $80,000 in 2012,
            $90,000 in 2018, $120,000 in 2020, and $135,000 in 2024. Real
            wages have grown about 25% over that period, so the bracket has
            not kept up. More people pay 37% on a bigger chunk of their
            income than a decade ago, even if the rate itself hasnt moved.
          </p>
          <p>
            <strong>3. The Stage 3 tax cuts were the first reform to give
            more to low-income earners than to high-income earners.</strong> All
            previous cuts (Howard 2001-2006, Turnbull 2018, Morrison 2020)
            gave the largest dollar cuts to the highest earners. The
            reworked Stage 3 (Albanese 2024) gives the largest percentage
            cut to the lowest earners, which is why the political debate
            was so fierce.
          </p>
          <InArticleAd />
        </section>

        <section className="prose-content">
          <h2>What bracket creep looks like</h2>
          <p>
            If you earned $80,000 in 2012, you were at the top of the 30%
            bracket. The next dollar was taxed at 37%. In 2026, you need
            to earn $135,000 before the 37% bracket kicks in. So in
            nominal terms, the 37% threshold has gone up 69%. But
            inflation over that period was about 50%. So in real terms,
            the 37% threshold has gone up only about 13%.
          </p>
          <p>
            This is "bracket creep": the nominal thresholds rise with
            inflation (or, in Australias case, only when parliament
            legislates), but real wages rise faster. The result is that
            more of your income gets taxed at higher rates without any
            real increase in your standard of living.
          </p>
          <p>
            Most OECD countries index tax brackets automatically. Australia
            does not. The Henry Tax Review (2010) recommended indexation.
            Multiple Parliamentary Budget Office reports have recommended
            indexation. As of 2026, the federal government has not acted
            on it.
          </p>
        </section>

        <section className="prose-content">
          <h2>How each reform affected the median worker</h2>
          <p>
            <strong>Howard 2001 (47% → 45%):</strong> the median wage
            earner got nothing. The top 1% got an average tax cut of
            $20,000/year.
          </p>
          <p>
            <strong>Howard 2004-06 (43% → 40%, then 40% with new 45%
            bracket):</strong> the median worker got a small tax cut. The
            top 1% got the largest dollar cut.
          </p>
          <p>
            <strong>Rudd 2008 (30% threshold lift, new 38% bracket):</strong>{' '}
            the median worker got a tax cut. The new 38% bracket caught
            more middle-income earners.
          </p>
          <p>
            <strong>Abbott/Turnbull 2018-20 (Stage 1 and 2):</strong> the
            median worker got a meaningful tax cut. The top 10% got
            larger dollar cuts.
          </p>
          <p>
            <strong>Albanese 2024 (Stage 3 reworked):</strong> the median
            worker got a tax cut. Importantly, the lowest 20% of
            earners got a real cut, not just a small slice of a big
            cut. This was the first reform to do that.
          </p>
        </section>

        <section className="prose-content">
          <h2>What to expect next</h2>
          <p>
            The current brackets have been in place since 1 July 2024.
            The most likely next change is indexation of the thresholds
            for inflation, which has been recommended by multiple
            independent reviews. Whether a government legislates it is a
            political question, not an economic one.
          </p>
          <p>
            For most workers, the practical answer is: the brackets
            wont change dramatically in the next few years. The
            political bandwidth is on cost-of-living and housing
            affordability, not on income tax. If you are planning around
            your marginal rate, the current brackets are a reasonable
            planning assumption for the next 3-5 years.
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
          <h2>Related guides</h2>
          <ul>
            <li><Link href="/guides/australian-income-tax">Australian income tax</Link>, how the current brackets work.</li>
            <li><Link href="/guides/stage-3-tax-cuts">Stage 3 tax cuts</Link>, the reworked Albanese version explained.</li>
            <li><Link href="/guides/medicare-levy-surcharge">Medicare levy surcharge</Link>, the 1-1.5% extra tax high earners pay without private cover.</li>
            <li><Link href="/tax-rates">Tax rates</Link>, the current FY 2026–27 brackets in one place.</li>
            <li><Link href="/methodology">Methodology</Link>, the formulas behind every number on this site.</li>
          </ul>
        </section>

        <NewsletterForm
          accessKey={process.env.NEXT_PUBLIC_NEWSLETTER_KEY}
          source="guide-tax-brackets-history"
          heading="Be the first to know when brackets change."
          description="When the federal government moves tax brackets or thresholds, we will mention it in a Money Brief within hours."
        />
      </article>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: brand.url },
            { name: 'Guides', url: `${brand.url}/guides/` },
            { name: 'Tax brackets history', url: `${brand.url}/guides/tax-brackets-history/` },
          ]),
          articleSchema({
            headline: 'Australian tax brackets history, every change since 2000',
            description: 'Every federal tax bracket change from 2000 to 2027, with the Stage 1, 2, and 3 tax cuts explained.',
            url: `${brand.url}/guides/tax-brackets-history/`,
            datePublished: '2026-08-23',
          }),
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
