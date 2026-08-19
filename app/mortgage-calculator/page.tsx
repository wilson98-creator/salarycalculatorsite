import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { MortgageCalculator } from '@/components/MortgageCalculator';
import { JsonLd, faqSchema, softwareApplicationSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Mortgage Calculator With Extra Payments (Australia)',
  description:
    'Free Australian mortgage calculator with extra payments. See your monthly repayment, total interest, and how much time and money you save by paying extra. Default rate updated for FY 2026–27.',
  alternates: { canonical: '/mortgage-calculator' },
};

const faqs = [
  {
    question: 'How does the mortgage calculator work?',
    answer:
      'The calculator uses the standard amortization formula: monthly payment = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1], where P is the loan amount, r is the monthly interest rate (annual ÷ 12), and n is the total number of monthly payments. It then runs an amortization schedule — month by month — to compute the total interest and payoff time, with or without extra payments.',
  },
  {
    question: 'What does "extra repayments" actually save?',
    answer:
      'Every extra dollar you pay above the minimum goes entirely to principal, which means the next month\u2019s interest is calculated on a smaller balance. On a typical $650,000 mortgage at 6.25% over 30 years, adding $200 per month to your repayment cuts about 4 years off the loan and saves around $80,000 in interest. The exact number depends on your rate, balance, and how early you start making the extras.',
  },
  {
    question: 'Should I make extra repayments or put the money in an offset account?',
    answer:
      'If you have an offset account, parking your spare cash there is usually better than making extra repayments — the offset reduces the interest you pay daily (no extra cost when you withdraw) while an extra repayment locks the money into the loan. An offset is the equivalent of an extra repayment that you can undo. Use an offset for your emergency fund and short-term savings. Use a fixed extra repayment for amounts you\u2019re certain you won\u2019t need.',
  },
  {
    question: 'What about an offset account vs redraw?',
    answer:
      'Both reduce the interest you pay (because they lower the effective loan balance), but they work differently. An offset is a separate transaction account: the loan balance is reduced for interest-calculation purposes, but you can withdraw anytime. Redraw lets you pull back extra repayments you\u2019ve already made — usually without notice, but the loan balance goes back up. Offset is more flexible; redraw is more common on fixed-rate loans where offset isn\u2019t available.',
  },
  {
    question: 'How often should I recalculate my mortgage?',
    answer:
      'Re-run the numbers whenever your rate changes (most variable loans re-price every 3-12 months), when you make a lump-sum payment, or once a year as a sanity check. The biggest savings almost always come from the rate you negotiate, not the extra payment timing, so prioritise rate shopping first.',
  },
  {
    question: 'Is this calculator right for an investment property?',
    answer:
      'The math is the same — the loan amortizes the same way. The difference for an investment property is the interest is tax-deductible (the loan itself is usually structured as interest-only rather than principal-and-interest, which the calculator doesn\u2019t model). Talk to your tax agent about the deductibility and structure. The calculator is fine for working out the raw repayment on an investment loan.',
  },
  {
    question: 'What if my rate is variable and changes mid-year?',
    answer:
      'The calculator assumes a fixed rate for the life of the loan. Variable rates change, and so do your minimum repayments if your lender recalculates them (most do annually on the anniversary). For a rough worst-case projection, set the rate to the highest rate you\u2019ve seen in the last 12 months. For a best-case, use the lender\u2019s standard variable rate. The real answer is somewhere in between and the actual outcome will track the cash rate.',
  },
];

export default function MortgageCalculatorPage() {
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema(),
        faqSchema(faqs),
      ]} />

      <article className="max-w-3xl">
        <header className="mb-10">
          <p className="text-sm text-brand-600 dark:text-brand-300">Calculator</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl">
            Mortgage calculator with extra payments
          </h1>
          <p className="mt-4 text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            Work out your monthly repayment, total interest, and exactly how much time and money you save by paying extra. Built for owner-occupier and investment loans, with the same amortization logic the banks use.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-600 dark:text-ink-400">
            <span className="chip">Standard amortization</span>
            <span className="chip">Extra payments</span>
            <span className="chip">Interest + time saved</span>
            <span>Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></span>
          </div>
        </header>

        <MortgageCalculator />

        <section className="prose prose-slate dark:prose-invert mt-14">
          <h2>How a mortgage amortizes</h2>
          <p>
            A principal-and-interest mortgage is a standard amortizing loan. Each month, your repayment is split into two parts: interest on the remaining balance, and a small amount of principal. Early in the loan, most of the repayment is interest; by the end, most of it is principal. This is why the total interest you pay over 30 years on a typical Australian mortgage is often close to the original loan amount.
          </p>
          <p>
            The minimum monthly repayment is calculated so the loan is fully paid off at the end of the term, assuming the rate never changes. That means the first 5–10 years of a 30-year mortgage are mostly interest — typically 70–80% of each repayment in year one.
          </p>

          <h2>Why extra payments work so well</h2>
          <p>
            Because interest is calculated on the remaining balance every month, every dollar of principal you pay off early is a dollar that stops accruing interest for the rest of the loan. Even small extras add up: <strong>$200 a month extra on a $650,000 loan at 6.25% over 30 years cuts about 4 years off the loan and saves around $80,000 in interest.</strong>
          </p>
          <p>
            The math is most powerful in the early years of the loan, when the balance is largest. A $200 extra payment in year one saves more than the same $200 payment in year fifteen, because the interest saved compounds. If you can only afford extras occasionally, do them early.
          </p>

          <h2>Offset accounts vs extra repayments</h2>
          <p>
            Many Australian mortgages come with a 100% offset account. Parking spare cash in the offset is functionally identical to making an extra repayment — both reduce the interest you pay — but the offset is more flexible because you can withdraw the money anytime. The trade-off is that money in an offset is "available" and you might spend it, while an extra repayment is locked into the loan.
          </p>
          <p>
            The usual strategy: use the offset for your emergency fund and short-term savings, and use a fixed extra repayment for amounts you are sure you will not need. If you have neither, the extra repayment is the better default — it is guaranteed to reduce the loan, while money sitting in a transaction account earns nothing.
          </p>

          <h2>Refinancing vs paying extra</h2>
          <p>
            A lower interest rate is almost always worth more than any extra repayment. On a $650,000 loan over 30 years, dropping the rate from 6.25% to 5.75% saves around $50,000 in interest, regardless of any extra repayments. If you have spare cash and a high rate, the priority order is usually: <strong>(1) refinance</strong> → <strong>(2) use the offset</strong> → <strong>(3) make extra repayments</strong>.
          </p>
          <p>
            The exception: if you are locked into a fixed-rate loan with break fees, do the math on whether the break fee outweighs the savings before refinancing. A mortgage broker can model this for you in about ten minutes.
          </p>

          <h2>Common mistakes</h2>
          <ul>
            <li><strong>Paying extra into a loan that has no offset or redraw.</strong> You cannot get the money back without refinancing. Check the loan features first.</li>
            <li><strong>Choosing a longer term to lower the minimum, then never paying extra.</strong> You will pay vastly more interest. Pick the shortest term you can comfortably afford.</li>
            <li><strong>Ignoring the rate in favour of the extras.</strong> A 0.25% rate reduction beats $200 a month extra every time. Always shop the rate first.</li>
            <li><strong>Not telling the lender to recalculate the minimum after a lump sum.</strong> If you make a $20,000 lump sum and the lender keeps the minimum at the original amount, the loan pays off years early — but most people do not realise it. Either recalculate yourself or ask the lender to re-amortise.</li>
          </ul>

          <h2>Frequently asked questions</h2>
        </section>

        <section className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.question} className="card group">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink-900 dark:text-ink-50">
                <span aria-hidden="true" className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition dark:text-brand-300">›</span>
                {f.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{f.answer}</p>
            </details>
          ))}
        </section>

        <section className="prose prose-slate dark:prose-invert mt-12 max-w-none">
          <h2>Related tools</h2>
          <ul>
            <li><Link href="/">Pay calculator</Link> — what you can actually afford to put toward a mortgage each month.</li>
            <li><Link href="/salary-sacrifice-calculator">Salary sacrifice calculator</Link> — see if sacrificing into super or a novated lease changes what you can borrow.</li>
            <li><Link href="/loan-payoff-calculator">Loan payoff calculator</Link> — for personal loans and credit cards rather than mortgages.</li>
            <li><Link href="/methodology">Methodology</Link> — exactly how every figure on this site is calculated.</li>
          </ul>
        </section>
      </article>
    </>
  );
}
