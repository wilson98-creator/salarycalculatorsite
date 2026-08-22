import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, faqSchema, articleSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Terms of service, SalaryCalc',
  description:
    'Terms governing your use of SalaryCalc. Free for personal, non-commercial use. Not financial or tax advice. Governed by NSW law.',
  alternates: { canonical: '/terms' },
  keywords: ['terms of service', 'terms of use', 'salarycalc terms'],
  openGraph: {
    title: 'Terms of service, SalaryCalc',
    description: 'Free for personal, non-commercial use. Not financial or tax advice.',
    url: `${brand.url}/terms`,
    type: 'article',
  },
};

const faqs = [
  {
    question: 'Is SalaryCalc really free?',
    answer:
      'Yes. The site is free to use, with no login required. The site is supported by unobtrusive display advertising, which is clearly labelled.',
  },
  {
    question: 'Can I use SalaryCalc for commercial purposes?',
    answer:
      'Personal, non-commercial use is free. For commercial use (e.g. embedding the calculator in a paid product, using the output in a financial product, scraping the site to republish), please contact us at hello@thesalarycalc.com.au to discuss licensing.',
  },
  {
    question: 'Can I copy the calculator code into my own project?',
    answer:
      'The source code is on GitHub at github.com/wilson98-creator/salarycalculatorsite. You are welcome to fork the project, learn from it, and propose improvements. Commercial redistribution of the code or the rate file requires our written permission.',
  },
  {
    question: 'What happens if the calculator gives me a wrong number?',
    answer:
      'Please email us with the figure and the ATO source you checked it against. We will investigate and correct it within 24 hours. Our full disclaimer explains the limits of the calculator and where it may differ from your payslip.',
  },
  {
    question: 'Which law governs these terms?',
    answer:
      'These terms are governed by the laws of New South Wales, Australia. Any dispute will be subject to the exclusive jurisdiction of the courts of New South Wales.',
  },
  {
    question: 'How do I report a violation of these terms?',
    answer:
      'Email hello@thesalarycalc.com.au with the details. We will investigate and respond within 5 business days.',
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: 'Terms of service, SalaryCalc',
            description: metadata.description as string,
            url: `${brand.url}/terms`,
            datePublished: '2026-01-15',
            dateModified: brand.lastReviewed,
          }),
          faqSchema(faqs),
        ]}
      />

      <article className="max-w-4xl">
        <header className="mb-10">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Terms' }]} />
          <h1 className="h-display mt-6 text-ink-900">
            Terms of service
          </h1>
          <p className="mt-4 max-w-3xl text-base text-ink-600 sm:text-lg">
            By using {brand.name} (the &quot;Service&quot;) you agree to the
            following terms. We have written them in plain English, please
            read them. If you have any questions,{' '}
            <Link href="/contact">get in touch</Link>.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">
              Last updated <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
            </span>
            <span className="kicker">Plain-English</span>
            <span className="kicker">Governed by NSW law</span>
          </div>
        </header>

        <section className="prose prose-slate prose-invert max-w-3xl">
          <h2>1. Use of the Service</h2>
          <p>
            The Service is provided free of charge for personal, non-commercial
            use. You agree not to use the Service for any unlawful purpose or
            in any way that could damage, disable, overburden, or impair the
            Service. Automated scraping at a rate that exceeds 1 request per
            second is not permitted without prior written agreement.
          </p>

          <h2>2. No professional advice</h2>
          <p>
            The Service provides general information and estimates. It is{' '}
            <strong>not</strong> a substitute for professional financial, tax,
            or legal advice tailored to your circumstances. See our{' '}
            <Link href="/disclaimer">full disclaimer</Link>. Nothing on the
            Service constitutes financial product advice within the meaning of
            the Corporations Act 2001 (Cth) or taxation advice within the
            meaning of the Tax Agent Services Act 2009 (Cth).
          </p>

          <h2>3. Intellectual property</h2>
          <p>
            All content on the Service (text, design, code, brand, layout) is
            owned by {brand.name} or its licensors and is protected by
            Australian and international copyright law. The rate file
            (lib/tax/brackets.ts) is published under a licence that permits
            non-commercial use with attribution; commercial use requires our
            written permission. You may quote brief excerpts from the guides
            and methodology for non-commercial purposes (e.g. a school essay or
            a personal blog post) with attribution to {brand.name}.
          </p>

          <h2>4. Third-party links and ads</h2>
          <p>
            The Service may contain links to third-party websites and display
            third-party advertising (currently Google AdSense). We are not
            responsible for the content or practices of those third parties.
            Their use of your data is governed by their own privacy policies,
            not by ours. The cookie banner lists the specific vendors in use
            at any given time.
          </p>

          <h2>5. Accuracy of the calculations</h2>
          <p>
            We make reasonable efforts to keep the rates and formulas on the
            Service current with the ATO. Rates are reviewed at the start of
            each financial year and whenever the federal budget is handed
            down. Despite our efforts, errors may occur. Verify any figure
            used for a binding decision against the ATO&apos;s own
            publications or a registered tax agent. If you spot an error,
            please email us and we will fix it within 24 hours and credit
            you in the changelog (if you would like).
          </p>

          <h2>6. Changes to the Service</h2>
          <p>
            We may update the Service from time to time, adding calculators,
            refining the methodology, fixing bugs, or removing underused
            features. We aim to give reasonable notice on the homepage for
            any change that affects the user experience materially.
          </p>

          <h2>7. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Material changes
            will be highlighted on the homepage for at least 30 days. The
            &quot;last updated&quot; date at the bottom of this page reflects
            the most recent version. Continued use of the Service after
            changes constitutes acceptance of the new terms. If you do not
            accept the new terms, please stop using the Service.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {brand.name} and its
            operators are not liable for any loss or damage arising out of
            or in connection with your use of the Service, including any
            decision made or action taken in reliance on the output of any
            calculator. See the full disclaimer for the complete statement.
          </p>

          <h2>9. Indemnity</h2>
          <p>
            You agree to indemnify {brand.name} and its operators against
            any claim arising from your breach of these terms or your
            unlawful use of the Service.
          </p>

          <h2>10. Governing law</h2>
          <p>
            These terms are governed by the laws of New South Wales,
            Australia. Any dispute will be subject to the exclusive
            jurisdiction of the courts of New South Wales.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about these terms? Email{' '}
            <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>{' '}
            or use the <Link href="/contact">contact page</Link>.
          </p>
          <p className="text-sm text-ink-600">
            Last updated: <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>
          </p>
        </section>

        <section aria-labelledby="terms-faq" className="mt-16 max-w-3xl">
          <h2 id="terms-faq" className="text-2xl font-bold text-ink-900">
            Common terms questions
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
            <TrustLink href="/privacy" title="Privacy policy" detail="What we collect (almost nothing) and why." />
            <TrustLink href="/disclaimer" title="Disclaimer" detail="The full legal disclaimer." />
            <TrustLink href="/about" title="About SalaryCalc" detail="Story, editorial standards, corrections policy." />
            <TrustLink href="/contact" title="Contact" detail="Email us about a terms question." />
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
