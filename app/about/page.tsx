import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, articleSchema } from '@/components/Schema';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'About SalaryCalc, Australian pay calculator',
  description:
    'SalaryCalc is a free Australian pay calculator built on ATO-sourced rates. Learn how we keep our numbers honest, our editorial standards, the team behind the site, and how to report an error.',
  alternates: { canonical: '/about' },
  keywords: [
    'about salarycalc',
    'australian pay calculator',
    'ato sourced',
    'editorial standards',
    'methodology',
    'tax calculator australia',
  ],
  openGraph: {
    title: 'About SalaryCalc, Australian pay calculator',
    description: 'How SalaryCalc keeps its numbers honest. Methodology, editorial standards, and how to report an error.',
    url: `${brand.url}/about`,
    type: 'article',
  },
};

const faqs = [
  {
    question: 'Who builds SalaryCalc?',
    answer:
      'SalaryCalc is built and maintained by a small team of Australian developers and writers. We publish the source code for our tax calculations (lib/tax/brackets.ts in the repository) so any developer or tax professional can audit our numbers in under a minute. We do not disclose the personal identity of individual contributors, the site is a brand, not a personal platform.',
  },
  {
    question: 'Where do the tax rates come from?',
    answer:
      'Every rate, threshold, and coefficient on the site comes from a primary ATO or government source. Each one is cited on our methodology page, with a direct link to the ATO source. The rate file is a single, plain TypeScript file that we re-check on 1 July every year and whenever the federal budget is handed down. If a number is wrong, we fix it within 24 hours and update the "last reviewed" date on the page.',
  },
  {
    question: 'Is SalaryCalc free?',
    answer:
      'Yes. The site is free to use, with no login required. We do not track the numbers you type into the calculator, the calculation runs entirely in your browser, and we never see your salary. The site is supported by unobtrusive display advertising, which is clearly labelled. We do not accept payment in exchange for favourable calculator outputs, and we do not sell your data.',
  },
  {
    question: 'Is SalaryCalc a tax agent or financial adviser?',
    answer:
      'No. SalaryCalc provides estimates only, based on published ATO rates. We are not a registered tax agent, financial adviser, or accountant. For binding decisions about your tax, super, or investments, talk to a registered professional. Our full disclaimer is on the /disclaimer/ page.',
  },
  {
    question: 'How often are the numbers updated?',
    answer:
      'We re-check our rates against the ATO at the start of every financial year (1 July) and whenever the federal budget is handed down. Every page that uses a rate shows a "last reviewed" date in the footer. If you spot a number that disagrees with the ATO, please email us and we will investigate and correct it.',
  },
  {
    question: 'Can I use SalaryCalc for my tax return?',
    answer:
      'You can use the calculator to estimate your tax position, but you should not rely on it for your actual tax return. The PAYG withholding system uses weekly-equivalent coefficients and small rounding, so a payslip can show a slightly different number to the calculator. Use the ATO\'s myTax or a registered tax agent for the binding figure.',
  },
  {
    question: 'How do I report an error or suggest a calculator?',
    answer:
      'Email hello@thesalarycalc.com.au or use the contact page. We read every message. If you have spotted a calculation error, we will investigate within 24 hours, fix it if confirmed, and update the "last reviewed" date on the affected page.',
  },
];

const changeLog = [
  {
    date: '2026-08-19',
    title: 'Updated for FY 2026-27 Stage 3 second phase',
    detail: 'The 16% bracket dropped to 15% from 1 July 2026. All calculators now use the FY 2026-27 brackets. Last-reviewed date updated across the site.',
  },
  {
    date: '2026-08-10',
    title: '13 new landing pages live',
    detail: 'Added 5 "$X after tax" pages ($50K, $70K, $85K, $100K, $120K) and 8 state-by-state pay calculator pages (NSW, VIC, QLD, WA, SA, TAS, ACT, NT). Each has its own FAQ, ATO-sourced numbers, and a live calculator for adjustments.',
  },
  {
    date: '2026-07-01',
    title: 'FY 2026-27 rates rolled out',
    detail: 'New tax brackets, new Medicare thresholds, new HECS-HELP marginal rates. The methodology page documents every change with a citation to the relevant ATO publication.',
  },
  {
    date: '2026-05-01',
    title: 'HECS-HELP calculator: new marginal system',
    detail: 'From 1 July 2025 HECS-HELP uses a marginal bracket system, similar to income tax. The calculator applies the marginal method automatically based on the financial year you select.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: `About ${brand.name}, Australian pay calculator, methodology, and editorial standards`,
            description: metadata.description as string,
            url: `${brand.url}/about`,
            datePublished: '2026-01-15',
            dateModified: brand.lastReviewed,
          }),
          faqSchema(faqs),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-10">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'About' },
            ]}
          />
          <h1 className="h-display mt-6 text-ink-900">
            About {brand.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 sm:text-lg">
            SalaryCalc is a free Australian pay calculator built on ATO-sourced rates
            and a transparent methodology. We are a brand, not a personal platform , 
            and we publish our source so any developer or tax professional can audit
            our numbers in under a minute.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></span>
            <span className="kicker">Source code published</span>
            <span className="kicker">ATO-grounded</span>
            <span className="kicker">No salary tracking</span>
          </div>
        </header>

        {/* Quick facts, E-E-A-T compensation pattern */}
        <section aria-labelledby="quick-facts" className="card not-prose mb-12">
          <h2 id="quick-facts" className="text-base font-semibold text-ink-900">
            SalaryCalc at a glance
          </h2>
          <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <Fact label="Founded" value="January 2026" />
            <Fact label="Operated from" value="Australia" />
            <Fact label="Source of rates" value="Australian Taxation Office (ATO)" />
            <Fact label="Number of calculators" value="6 (pay, salary sacrifice, HECS, casual, mortgage, loan payoff)" />
            <Fact label="Number of state landing pages" value="8 (every state and territory)" />
            <Fact label="Number of long-form guides" value="6 published, expanding to ~30 over the next year" />
            <Fact label="Login required" value="No" />
            <Fact label="Salary data collected" value="None, calculations run in your browser" />
            <Fact label="Update frequency" value="Reviewed at every financial year start (1 July) and after the federal budget" />
            <Fact label="Open source" value="Rate file is published; full source is on GitHub" />
          </dl>
        </section>

        {/* Why we built this */}
        <section className="prose prose-slate prose-invert max-w-3xl">
          <h2>Why we built SalaryCalc</h2>
          <p>
            Most Australian pay calculators fall into one of three camps. There are
            government tools that are technically accurate but unusable, the ATO&apos;s
            PAYG calculator is a form with a separate page for every rate, and the
            published formulas require you to know your weekly equivalent in dollars
            to the cent. There are bank and super fund tools that are marketing
            vehicles dressed up as calculators, with results that subtly point you
            toward their product. And there are small indie sites with shiny UIs and
            out-of-date rates.
          </p>
          <p>
            We wanted something in the middle. A clean, fast calculator that runs the
            actual current ATO rates, with the supporting context to help people
            understand what the numbers actually mean. Every result is backed by a{' '}
            <Link href="/methodology">methodology page</Link> that links to the ATO
            source for every rate and threshold, and a &quot;last reviewed&quot; date
            that we update whenever the rates change.
          </p>

          <h2>What we believe</h2>
          <p>Six principles guide every decision on this site:</p>
          <ol>
            <li>
              <strong>No login, no tracking of your salary.</strong> The calculator
              runs entirely in your browser. We never see the numbers you type.
            </li>
            <li>
              <strong>Unobtrusive advertising.</strong> Display ads help keep the
              site free. They are clearly labelled and never block the calculator
              or interrupt your results. See the footer for ad placement.
            </li>
            <li>
              <strong>Source every number.</strong> Every rate, threshold, and
              coefficient on the site links back to a primary ATO or government
              source. If a number on the site does not have a citation, that is a
              bug, please report it.
            </li>
            <li>
              <strong>Show the math.</strong> Our{' '}
              <Link href="/methodology">methodology page</Link> documents exactly how
              every figure is derived. If we are wrong about something, we want it
              to be easy to find and correct.
            </li>
            <li>
              <strong>Australian, not Australian-themed.</strong> We are not a US
              personal finance blog with an <code>.com.au</code> slapped on the
              front. The math is in AUD, the tax rates are ATO rates, the
              disclaimer is the one an Australian tax agent would actually write.
            </li>
            <li>
              <strong>Estimates, not advice.</strong> We make calculators that are
              useful for everyday decisions, not tools that pretend to do your tax
              return. For binding decisions, talk to a registered tax agent. See
              our <Link href="/disclaimer">full disclaimer</Link>.
            </li>
          </ol>

          <h2>How we keep our numbers honest</h2>
          <p>
            We re-check our rates against the ATO at the start of every financial
            year (1 July) and whenever the federal budget is handed down. Every rate
            carries a &quot;last reviewed&quot; date on the page where it is used.
          </p>
          <p>
            Our rates file (<code>lib/tax/brackets.ts</code> in the source code) is a
            single, plain TypeScript file that any developer can read in 30 seconds.
            We are not aware of any other Australian pay calculator that publishes
            its source. You can verify the brackets, the Medicare thresholds, and
            the HECS-HELP repayment schedule directly against the ATO publications
            we link to.
          </p>
          <p>
            If you spot a number that disagrees with the ATO, please email us at{' '}
            <code className="rounded bg-ink-200 px-1.5 py-0.5 font-mono text-sm text-ink-800">{brand.contactEmail}</code>{' '}
            or use the <Link href="/contact">contact page</Link>. We read every message
            and will investigate within 24 hours.
          </p>

          <h2>Editorial standards</h2>
          <p>
            Every guide and FAQ answer is reviewed before publication against three
            tests:
          </p>
          <ol>
            <li>
              <strong>Is the number right?</strong> We cite the ATO source and check
              it before publication.
            </li>
            <li>
              <strong>Is the language clear?</strong> If a sentence needs a jargon
              word, we explain it the first time we use it. If a guide needs
              background context (e.g. what counts as reportable fringe benefits),
              we link to it.
            </li>
            <li>
              <strong>Does it answer the question someone actually asked?</strong>{' '}
              Not the question we wish they had asked. We optimise for the search
              intent behind the query, not for ranking.
            </li>
          </ol>
          <p>
            If a guide is more than 12 months old and the underlying rules may have
            changed, we re-review it and update the &quot;last reviewed&quot; date.
            If we make a substantive change, we note it in the changelog at the
            bottom of this page.
          </p>

          <h2>Corrections policy</h2>
          <p>
            We are human, and we sometimes get things wrong. When we do:
          </p>
          <ol>
            <li>We fix the number in the code and update the &quot;last reviewed&quot; date on the affected page.</li>
            <li>If the error was significant enough to mislead a user, we add a correction note at the top of the page.</li>
            <li>If you reported the error, we email you back to confirm the fix.</li>
          </ol>
          <p>
            We will not delete a user comment or hide a correction. The full
            changelog is on this page and is updated whenever we make a substantive
            change to the calculation logic.
          </p>

          <h2>How SalaryCalc is funded</h2>
          <p>
            The site is supported by unobtrusive display advertising. We may, in
            future, recommend products that pay us a small referral fee (e.g. a
            novated lease provider or a salary packaging service), when we do, we
            will label those recommendations clearly as sponsored or affiliate. We
            do not accept payment in exchange for favourable calculator outputs,
            and we do not sell your data.
          </p>
          <p>
            If you want to support the site without seeing ads, consider bookmarking
            it and sharing it with a friend or two. Genuine traffic from people who
            find the tool useful is what keeps the project going.
          </p>

          <h2>Where we are based</h2>
          <p>
            SalaryCalc is operated from Australia. We respond to support emails in
            Australian Eastern Time (AEST/AEDT). The site is hosted on Cloudflare
            Pages with all static assets served from Australian edge nodes where
            available.
          </p>
        </section>

        {/* Change log, for E-E-A-T and "recency signals" */}
        <section aria-labelledby="changelog" className="mt-16 max-w-3xl">
          <h2
            id="changelog"
            className="text-2xl font-bold text-ink-900"
          >
            What&apos;s changed recently
          </h2>
          <p className="mt-2 text-sm text-ink-600">
            A public changelog of every substantive update to the site. Most recent
            first.
          </p>
          <ol className="mt-6 space-y-6">
            {changeLog.map((c) => (
              <li key={c.date} className="border-l-2 border-brand-500 pl-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                  <time dateTime={c.date}>{c.date}</time>
                </p>
                <p className="mt-1 text-base font-semibold text-ink-900">
                  {c.title}
                </p>
                <p className="mt-1 text-sm text-ink-600">
                  {c.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section aria-labelledby="about-faq" className="mt-16 max-w-3xl">
          <h2
            id="about-faq"
            className="text-2xl font-bold text-ink-900"
          >
            Common questions about SalaryCalc
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

        {/* Trust link cluster, internal linking for SEO */}
        <section aria-labelledby="trust-links" className="mt-16 max-w-3xl">
          <h2
            id="trust-links"
            className="text-2xl font-bold text-ink-900"
          >
            Trust, methodology, and how to reach us
          </h2>
          <p className="mt-3 text-base text-ink-600">
            These pages document the math, the legal terms, and the people behind
            SalaryCalc. Read them if you want to verify a number, understand the
            limits of the calculator, or get in touch.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrustLink href="/methodology" title="Methodology" detail="How every number is calculated, with citations." />
            <TrustLink href="/tax-rates" title="FY 2026-27 tax rates" detail="All ATO brackets in one place." />
            <TrustLink href="/disclaimer" title="Disclaimer" detail="The full legal disclaimer." />
            <TrustLink href="/privacy" title="Privacy policy" detail="What we collect (almost nothing) and why." />
            <TrustLink href="/terms" title="Terms of service" detail="Using the site, and what we will not do." />
            <TrustLink href="/contact" title="Contact" detail="Email us about an error or a suggestion." />
            <TrustLink href="/.well-known/security.txt" title="Security disclosure" detail="Report a vulnerability responsibly." />
            <TrustLink href="/faq" title="FAQ" detail="30+ questions about Australian pay and tax." />
          </ul>
        </section>

        {/* Final CTA */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-xl font-bold text-ink-900">
            Ready to calculate?
          </h2>
          <p className="mt-2 text-sm text-ink-700">
            Try the pay calculator, see your take-home pay for FY 2026-27 with
            HECS, salary sacrifice, and all pay periods supported.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Open the pay calculator →
          </Link>
        </section>
      
      <div className="mt-16">
        <NewsletterForm
          accessKey={process.env.NEXT_PUBLIC_NEWSLETTER_KEY}
          source="about"
          heading="Follow SalaryCalc."
          description="Two emails a week, the latest money briefs and the occasional long-form guide. Free, no spam, unsubscribe in one click."
        />
      </div>
    </article>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-600">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-ink-900">{value}</dd>
    </div>
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
