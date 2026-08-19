import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'About — who builds Wagewise',
  description: 'The story behind Wagewise, what we believe, and how we keep our numbers honest.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <h1>About {brand.name}</h1>
      <p>
        Wagewise is a free Australian pay calculator built by a small team of
        developers and writers who were tired of seeing the same five finance
        sites rank above outdated, ad-laden tools with the wrong numbers. We
        started this project to make one good calculator that anyone in
        Australia can trust, then expand into the other everyday money
        questions people ask — tax returns, salary sacrifice, novated leases,
        study debt, award workers.
      </p>

      <h2>Why we built this</h2>
      <p>
        Most Australian pay calculators fall into one of three camps: government
        tools that are technically accurate but unusable (the ATO\'s PAYG
        calculator is a form with a separate page for every rate), bank and
        super fund tools that are marketing vehicles dressed up as calculators,
        or small indie sites with shiny UIs and out-of-date rates.
      </p>
      <p>
        We wanted something in the middle: a clean, fast calculator that runs
        the actual current ATO rates, with the supporting context to help
        people understand what the numbers actually mean. Every result is
        backed by a methodology page that links to the ATO source for every
        rate and threshold, and a "last reviewed" date that we update whenever
        the rates change.
      </p>

      <h2>What we believe</h2>
      <ul>
        <li><strong>No login, no tracking of your salary.</strong> The calculator runs entirely in your browser. We never see the numbers you type.</li>
        <li><strong>Unobtrusive advertising.</strong> Display ads help keep the site free. They are clearly labelled and never block the calculator or interrupt your results.</li>
        <li><strong>Source every number.</strong> Every rate, threshold, and coefficient on the site links back to a primary ATO or government source.</li>
        <li><strong>Show the math.</strong> Our methodology page documents exactly how every figure is derived. If we\'re wrong about something, we want it to be easy to find and correct.</li>
        <li><strong>Australian, not Australian-themed.</strong> We\'re not a US personal finance blog with an .com.au slapped on the front. The math is in AUD, the tax rates are ATO rates, the disclaimer is the one an Australian tax agent would actually write.</li>
        <li><strong>Estimates, not advice.</strong> We make calculators that are useful for everyday decisions, not tools that pretend to do your tax return. For binding decisions, talk to a registered tax agent.</li>
      </ul>

      <h2>How we keep our numbers honest</h2>
      <p>
        We re-check our rates against the ATO at the start of every financial year
        (1 July) and whenever the federal budget is handed down. Every rate carries
        a "last reviewed" date on the page where it is used. If a number is wrong,
        we want to know about it — see our <Link href="/contact">contact page</Link>.
      </p>
      <p>
        Our rates file (<code>lib/tax/brackets.ts</code> in the source code) is
        a single, plain TypeScript file that any developer can read in 30
        seconds. We are not aware of any other Australian pay calculator that
        publishes its source.
      </p>

      <h2>Where we make money</h2>
      <p>
        This site is supported by unobtrusive display advertising. We may, in
        future, recommend products that pay us a small referral fee (e.g. a
        novated lease provider or a salary packaging service) — when we do, we
        will label those recommendations clearly as sponsored or affiliate. We
        do not accept payment in exchange for favourable calculator outputs,
        and we do not sell your data.
      </p>
      <p>
        If you want to support the site without seeing ads, consider
        bookmarking it and sharing it with a friend or two. Genuine traffic
        from people who find the tool useful is what keeps the project going.
      </p>

      <h2>Editorial standards</h2>
      <p>
        Every guide and FAQ answer is reviewed before publication against three
        tests:
      </p>
      <ol>
        <li>Is the number right? We cite the ATO source and check it.</li>
        <li>Is the language clear? If a sentence needs a jargon word, we explain it the first time we use it.</li>
        <li>Does it answer the question someone actually asked? Not the question we wish they had asked.</li>
      </ol>
      <p>
        If a guide is more than 12 months old and the underlying rules may have
        changed, we re-review it and update the "last reviewed" date. If we
        make a substantive change, we note it at the top of the page.
      </p>

      <h2>Get in touch</h2>
      <p>
        Spot a bug? Found a number that doesn\'t match the ATO? Want to suggest
        a calculator? Email <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a> or use
        the <Link href="/contact">contact page</Link>.
      </p>
    </article>
  );
}
