import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Disclaimer — SalaryCalc',
  description:
    'SalaryCalc provides estimates only and does not provide financial or tax advice. Read the full disclaimer before relying on any calculator output.',
  alternates: { canonical: '/disclaimer' },
  keywords: ['disclaimer', 'no advice', 'estimates only', 'salarycalc'],
  openGraph: {
    title: 'Disclaimer — SalaryCalc',
    description: 'SalaryCalc provides estimates only and does not provide financial or tax advice.',
    url: `${brand.url}/disclaimer`,
    type: 'article',
  },
};

const faqs = [
  {
    question: 'Is SalaryCalc a registered tax agent?',
    answer:
      'No. SalaryCalc is a calculator, not a tax agent. We do not provide taxation services within the meaning of the Tax Agent Services Act 2009 (Cth), and use of the site does not create a professional relationship. For binding tax advice, consult a registered tax agent.',
  },
  {
    question: 'Can I rely on the calculator for my tax return?',
    answer:
      'No. Use the ATO\'s myTax, a registered tax agent, or tax-preparation software for your actual return. The calculator is for everyday estimates — "roughly what tax will I pay on $X" — not for filing.',
  },
  {
    question: 'Why might the calculator disagree with my payslip?',
    answer:
      'Employers use the ATO Schedule 1 (NAT 1004) PAYG withholding formulas, which use weekly-equivalent earnings and small rounding coefficients. The calculator uses the actual annual tax-bracket method. The two figures can differ by a few dollars per pay. The difference is reconciled at tax time.',
  },
  {
    question: 'Does the calculator model every tax scenario?',
    answer:
      'No. We document the limits in the methodology page. We do not currently model the Medicare Levy Surcharge, private health insurance rebate, reportable fringe benefits, child support, garnishee orders, or several other scenarios. If any of these apply to you, talk to a registered tax agent.',
  },
  {
    question: 'What if I make a financial decision based on the calculator?',
    answer:
      'You do so at your own risk. The disclaimer applies to any decision, whether large (taking a job, signing a salary sacrifice agreement) or small (budgeting for the month). Verify any binding decision against the ATO\'s own publications or a registered tax agent.',
  },
  {
    question: 'Is SalaryCalc covered by Professional Indemnity insurance?',
    answer:
      'No. The site is a free tool, not a professional service. The disclaimer is the entire scope of our liability. We do not carry PI insurance because we do not hold ourselves out as professionals.',
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'Disclaimer — SalaryCalc',
            description: metadata.description as string,
            url: `${brand.url}/disclaimer`,
            datePublished: '2026-01-15',
            dateModified: brand.lastReviewed,
          }),
          faqSchema(faqs),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-10">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Disclaimer' }]} />
          <h1 className="h-display mt-6 text-ink-900">
            Disclaimer
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 sm:text-lg">
            SalaryCalc provides estimates only. The information and calculators
            on this site are general information — not financial, tax, or
            legal advice. Read this page in full before relying on any
            calculator output.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">
              Last updated <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
            </span>
            <span className="kicker">Not a tax agent</span>
            <span className="kicker">No PI insurance</span>
            <span className="kicker">Use at your own risk</span>
          </div>
        </header>

        {/* TL;DR — the 30-second version */}
        <section aria-labelledby="disclaimer-summary" className="card not-prose mb-12 border-warning-200 bg-warning-50">
          <h2 id="disclaimer-summary" className="text-base font-semibold text-ink-900">
            The 30-second version
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-warning-700">1.</span>
              <span className="text-ink-700">
                <strong>Estimates only.</strong> The calculator gives you a rough figure based on ATO rates.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-warning-700">2.</span>
              <span className="text-ink-700">
                <strong>Not a tax agent.</strong> We are not registered, do not provide tax agent services, and have no PI insurance.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-warning-700">3.</span>
              <span className="text-ink-700">
                <strong>Binding decisions need a professional.</strong> For your tax return, a job offer, a salary sacrifice agreement — talk to a registered tax agent.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-warning-700">4.</span>
              <span className="text-ink-700">
                <strong>Your payslip may differ.</strong> Employers use a separate formula (PAYG Schedule 1) with weekly rounding. Small differences are normal and reconcile at tax time.
              </span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="font-mono font-semibold text-warning-700">5.</span>
              <span className="text-ink-700">
                <strong>Errors happen.</strong> We fix them within 24 hours when reported, but we are not liable for any decision you make in the meantime.
              </span>
            </li>
          </ul>
        </section>

        <section className="prose prose-slate prose-invert max-w-3xl">
          <h2>1. No reliance</h2>
          <p>
            The information and calculators on {brand.name} (the
            &quot;Service&quot;) are provided for general informational
            purposes only. Nothing on the Service constitutes financial
            advice, tax advice, legal advice, or any other form of
            professional advice. You should not rely on the output of any
            calculator on this Service as a substitute for professional
            advice.
          </p>
          <p>
            Pay and tax outcomes depend on individual circumstances that this
            Service does not, and cannot, take into account — including but
            not limited to your full employment contract, private health
            insurance arrangements, reportable fringe benefits, study debt
            indexation, child support obligations, and the specifics of any
            salary packaging arrangement. The full list of what we do and do
            not model is in the <Link href="/methodology">methodology</Link>.
          </p>

          <h2>2. Accuracy</h2>
          <p>
            We make reasonable efforts to keep the rates and formulas on this
            Service current with the Australian Taxation Office. Rates are
            reviewed at the start of each financial year (1 July) and
            whenever the federal budget is handed down. Despite our efforts,
            errors may occur. Verify any figure used for a binding decision
            against the ATO&apos;s own publications or a registered tax
            agent.
          </p>
          <p>
            Our corrections process: if you report an error, we will
            investigate within 24 hours, fix it in the code if confirmed,
            update the &quot;last reviewed&quot; date on the affected page,
            and credit you in the changelog if you would like.
          </p>

          <h2>3. No professional relationship</h2>
          <p>
            Use of this Service does not create a professional relationship
            between you and {brand.name}, its operators, its contributors,
            or any reviewer named on the site. {brand.name} is not a
            registered tax agent and does not provide taxation services
            within the meaning of the Tax Agent Services Act 2009 (Cth).
            {brand.name} is not a financial services provider and does not
            provide financial product advice within the meaning of the
            Corporations Act 2001 (Cth).
          </p>

          <h2>4. No warranty</h2>
          <p>
            The Service is provided &quot;as is&quot; and &quot;as
            available&quot; without warranty of any kind, express or
            implied, including but not limited to warranties of
            merchantability, fitness for a particular purpose, or
            non-infringement. {brand.name} does not warrant that the
            Service will be uninterrupted, error-free, or free of harmful
            components.
          </p>

          <h2>5. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {brand.name} and its
            operators are not liable for any loss or damage arising out of
            or in connection with your use of the Service, including any
            decision made or action taken in reliance on the output of any
            calculator. This includes but is not limited to direct,
            indirect, incidental, special, consequential, or punitive
            damages, including loss of profits, revenue, data, or
            opportunity.
          </p>

          <h2>6. Jurisdictional note (international visitors)</h2>
          <p>
            SalaryCalc is designed for and tested against Australian tax
            law. If you are accessing the site from outside Australia, the
            calculations will not reflect your local tax rules. Use the
            site only for understanding the ATO&apos;s rates, not for
            filing in another jurisdiction.
          </p>

          <h2>7. Changes to this disclaimer</h2>
          <p>
            We may update this disclaimer from time to time. Material
            changes will be highlighted on the homepage for at least 30
            days. The &quot;last updated&quot; date below reflects the most
            recent version.
          </p>
          <p className="text-sm text-ink-600">
            Last updated: <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
          </p>
        </section>

        <section aria-labelledby="disclaimer-faq" className="mt-16 max-w-3xl">
          <h2 id="disclaimer-faq" className="text-2xl font-bold text-ink-900">
            Common disclaimer questions
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
          <h2 className="text-2xl font-bold text-ink-900">Related legal pages</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrustLink href="/terms" title="Terms of service" detail="Using the site, and what we will not do." />
            <TrustLink href="/privacy" title="Privacy policy" detail="What we collect (almost nothing) and why." />
            <TrustLink href="/about" title="About SalaryCalc" detail="Story, editorial standards, corrections policy." />
            <TrustLink href="/contact" title="Contact" detail="Email us about a disclaimer question." />
            <TrustLink href="/methodology" title="Methodology" detail="How every number is calculated, with citations." />
            <TrustLink href="/.well-known/security.txt" title="Security disclosure" detail="Report a vulnerability responsibly." />
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
