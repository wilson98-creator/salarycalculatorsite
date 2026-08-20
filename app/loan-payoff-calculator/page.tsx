import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { LoanPayoffCalculator } from '@/components/LoanPayoffCalculator';
import { JsonLd, faqSchema, softwareApplicationSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Loan Payoff Calculator (Australia) — Debt Repayment Planner',
  description:
    'Free Australian loan payoff calculator. See when your loan will be paid off, how much interest you’ll pay, and the savings from extra repayments. Models credit cards, personal loans, and a one-off lump sum (e.g. redundancy).',
  alternates: { canonical: '/loan-payoff-calculator' },
};

const faqs = [
  {
    question: 'How does the loan payoff calculator work?',
    answer:
      'It runs a month-by-month amortization schedule. Each month it calculates interest on the remaining balance, subtracts it from your payment, applies the rest to principal, and updates the balance for the next month. It stops when the balance reaches zero, then totals the interest paid and the payoff time. If you add extra monthly payments or a lump sum, it does the same with the higher payment or lower starting balance.',
  },
  {
    question: 'What if my payment is less than the monthly interest?',
    answer:
      'You will be paying interest on interest — the balance will grow, not shrink. This is the classic credit card trap. The minimum repayment on most credit cards is 2-3% of the balance, which is roughly equal to the monthly interest on a 20% card, so the balance only just keeps up. To pay it off, you need a payment materially above the monthly interest charge. The calculator flags this with a red warning when it sees it.',
  },
  {
    question: 'What’s the best strategy for paying off debt?',
    answer:
      'Two main approaches. The <strong>avalanche</strong> method pays minimums on everything and puts every spare dollar into the debt with the highest interest rate (mathematically optimal). The <strong>snowball</strong> method puts spare dollars into the smallest balance first (psychologically easier — quick wins). For most people, the avalanche method saves more in interest, but the snowball method is better if motivation is the bottleneck. The choice is mostly a personality question.',
  },
  {
    question: 'Can I use my redundancy payout to clear a loan?',
    answer:
      'Yes. A redundancy payout (or any lump sum — inheritance, bonus, tax refund) goes directly against the loan principal, which means future interest is calculated on a smaller balance. The bigger the lump sum and the earlier you apply it, the more interest you save. Use the calculator’s "lump sum" field to model this. Most redundancy payouts in Australia are tax-free up to a limit (the ATO’s "genuine redundancy" exemption), so the full amount is usually available to apply to debt.',
  },
  {
    question: 'Should I refinance a personal loan?',
    answer:
      'If your credit score has improved or rates have moved, refinancing can save real money. The break-even point is usually short (1-2 years) for personal loans. For credit cards, balance transfers to a 0% intro rate can buy you 6-18 months of interest-free repayment, but watch for the revert rate and balance transfer fees (typically 1-3% of the balance). The calculator’s output is the same regardless of how the rate is achieved — what matters is the rate you end up paying.',
  },
  {
    question: 'Why is my minimum payment so low?',
    answer:
      'Credit card minimums are usually 2-3% of the balance or a flat dollar amount (whichever is higher). On a $10,000 balance at 20% interest, the monthly interest is around $167, and the minimum is around $250-300 — so most of your payment is interest, and only a small amount pays down the principal. This is by design: lenders make money on the interest. To get ahead, pay significantly more than the minimum — even $50 a month extra makes a big difference over a few years.',
  },
  {
    question: 'Is it better to pay off the loan or invest the spare cash?',
    answer:
      'Mathematically: invest if the after-tax investment return is higher than the loan interest rate. Practically: pay off the loan first if the loan is causing stress, if you have no emergency fund, or if you cannot tolerate investment risk. A guaranteed 11% return from clearing an 11% personal loan is hard to beat, even if a balanced investment portfolio might return more on average. Sleep quality counts too.',
  },
];

export default function LoanPayoffCalculatorPage() {
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
            Loan payoff calculator
          </h1>
          <p className="mt-4 text-base text-ink-600 dark:text-ink-400 sm:text-lg">
            Work out when your loan will be paid off, how much interest you will pay, and the savings from making extra repayments or applying a lump sum. Built for credit cards, personal loans, and any other amortising debt.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-600 dark:text-ink-400">
            <span className="chip">Month-by-month schedule</span>
            <span className="chip">Extra repayments</span>
            <span className="chip">Lump sum (e.g. redundancy)</span>
            <span>Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></span>
          </div>
        </header>

        <LoanPayoffCalculator />

        <section className="prose prose-slate dark:prose-invert mt-14">
          <h2>How loan payoff math works</h2>
          <p>
            Most personal loans and credit cards amortise: each month, interest is calculated on the remaining balance, and your payment is split into interest and principal. The principal portion shrinks the balance; the interest portion is the lender’s cut.
          </p>
          <p>
            Early in the loan, the balance is high, so most of each payment is interest. As the balance shrinks, the interest component falls and the principal component grows. This is why the first 5 years of a personal loan feel like you are barely making progress — and why paying even a small amount extra in the early years can shave years off the loan.
          </p>

          <h2>Avalanche vs snowball: which debt strategy?</h2>
          <p>
            The <strong>avalanche method</strong> is mathematically optimal: pay the minimum on every debt, and put every spare dollar into the debt with the highest interest rate. Once that is paid off, roll the payment into the next-highest-rate debt. This minimises total interest paid.
          </p>
          <p>
            The <strong>snowball method</strong> is psychologically easier: pay the minimum on every debt, and put spare dollars into the smallest balance first. The quick win of clearing a small debt gives you momentum. The total interest is slightly higher, but if it is the difference between staying the course and giving up, it is the better strategy.
          </p>
          <p>
            For most people, the avalanche method is the right default — but the calculator works either way. Pick the one you will actually stick to.
          </p>

          <h2>Using a redundancy payout or other lump sum</h2>
          <p>
            A one-off payment — a redundancy payout, an inheritance, a tax refund, a bonus, an inheritance — goes directly against the principal. The next month’s interest is calculated on the smaller balance, and the loan is paid off faster. If you have just received a redundancy payout and want to know what it does to your loan balance, the calculator doubles as a <strong>redundancy calculator</strong> — enter the payout in the lump sum field, and the schedule re-runs from month zero with the smaller starting balance.
          </p>
          <p>
            In Australia, "genuine redundancy" payments up to a limit (the ATO’s ETP cap, currently around $11,500 for people under preservation age, more for older workers) are tax-free. The rest is taxed at a concessional rate. So the full payout is usually available to apply to debt, even though you might pay some tax on the larger amount.
          </p>
          <p>
            The general rule: if the loan interest rate is higher than the after-tax return you would get from investing the lump sum, pay off the loan. For most personal loans and credit cards (12-22% interest), the answer is almost always pay off the loan.
          </p>

          <h2>When refinancing beats extra payments</h2>
          <p>
            If your loan is at 18% and you can refinance to 9%, you have effectively given yourself a 9% guaranteed return on whatever balance you refinance. That is almost always better than any extra repayment you could make.
          </p>
          <p>
            For credit cards, a balance transfer to a 0% introductory card can buy you 6-18 months of interest-free repayment. The savings depend on the balance transfer fee (typically 1-3%) and how aggressively you pay it down during the intro period. If you can pay off the full balance before the intro ends, the effective interest rate is just the transfer fee.
          </p>

          <h2>Common mistakes</h2>
          <ul>
            <li><strong>Only paying the minimum</strong> on a credit card. The balance will take 10+ years to clear and cost more in interest than the original purchases.</li>
            <li><strong>Paying off the smallest balance first when you should be paying off the highest-rate one.</strong> The quick win of a small balance can cost thousands in extra interest over the life of the loan.</li>
            <li><strong>Keeping the loan because the rate is "low".</strong> If the rate is 5% and you have cash earning 4% in a savings account, the loan is still costing you 1% per year. Pay it off.</li>
            <li><strong>Forgetting about monthly interest on credit cards.</strong> A $5,000 balance at 20% costs $83 a month just in interest. If your minimum is $100, you are barely paying off any principal.</li>
            <li><strong>Not setting a payoff date.</strong> Loans without a target end date tend to last forever. Pick a date, model the payment needed to hit it, and set up an automatic direct debit.</li>
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
              <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300" dangerouslySetInnerHTML={{ __html: f.answer }} />
            </details>
          ))}
        </section>

        <section className="prose prose-slate dark:prose-invert mt-12 max-w-none">
          <h2>Related tools</h2>
          <ul>
            <li><Link href="/">Pay calculator</Link> — see what you can afford to put toward debt each month.</li>
            <li><Link href="/mortgage-calculator">Mortgage calculator</Link> — for home loans, which have lower rates and longer terms.</li>
            <li><Link href="/hecs-calculator">HECS-HELP calculator</Link> — student debt is its own thing (income-contingent, not amortising the same way).</li>
            <li><Link href="/methodology">Methodology</Link> — the math behind the numbers.</li>
          </ul>
        </section>
      </article>
    </>
  );
}
