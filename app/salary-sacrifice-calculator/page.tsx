import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { SalarySacrificeCalculator } from '@/components/SalarySacrificeCalculator';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Salary Sacrifice Calculator (Australia 2026–27)',
  description:
    'Free Australian salary sacrifice calculator. See exactly how much tax you save by sacrificing into super, what your take-home pay change is, and whether the 15% super tax makes it worth it.',
  alternates: { canonical: '/salary-sacrifice-calculator' },
};

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
      'Concessional (before-tax) contributions are capped at $30,000 per year for FY 2025–26, including the Superannuation Guarantee paid by your employer. So if your employer pays 12% SG on $80,000 ($9,600), you can salary sacrifice up to a further $20,400 before triggering additional tax. The cap is indexed to wages in subsequent years.',
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
    question: 'Can I salary sacrifice into my spouse’s super?',
    answer:
      'No. Salary sacrifice must go into your own super fund under your own name. To contribute to your spouse, you make an after-tax "spouse contribution" instead, which has a separate cap ($3,000 per year for a tax offset if your spouse earns under $40,000). The two are not interchangeable.',
  },
  {
    question: 'Is salary sacrifice different from a novated lease?',
    answer:
      'A novated lease is a specific type of salary sacrifice where you redirect pre-tax salary to pay for a car lease (and often its running costs). The tax mechanics are the same, the sacrificed amount reduces your taxable income, but novated leases have additional Fringe Benefits Tax (FBT) rules. The main trade-off is that the car is owned by the finance company, not you, until the lease ends. Use the <Link href="/">main pay calculator</Link> to model the take-home difference, and talk to a salary packaging provider for the FBT-aware analysis.',
  },
];

export default function SalarySacrificeCalculatorPage() {
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema(),
        faqSchema(faqs),
        articleSchema({
          headline: 'Salary sacrifice calculator (Australia 2026–27)',
          description: 'See how much tax you save by sacrificing pre-tax salary into super, and the take-home impact.',
          url: `${brand.url}/salary-sacrifice-calculator`,
        }),
      ]} />

      <article className="max-w-3xl">
        <header className="mb-10">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Calculators', href: '/#calculators' },
            { name: 'Salary sacrifice' },
          ]} />
          <p className="mt-3 text-sm text-brand-600">Calculator · FY 2026–27</p>
          <h1 className="h-display mt-6 text-ink-900">
            Salary sacrifice calculator
          </h1>
          <p className="mt-4 text-base text-ink-600 sm:text-lg">
            See exactly how much tax you save by sacrificing pre-tax salary into super, what your take-home pay change is, and whether the 15% super tax makes it worth it for your situation. Uses the same ATO rates as our other calculators.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">ATO-sourced rates</span>
            <span className="kicker">$30K concessional cap</span>
            <span className="kicker">Tax + take-home + super</span>
            <span>Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></span>
          </div>
        </header>

        <SalarySacrificeCalculator />

        <section className="prose prose-slate prose-invert mt-14">
          <h2>How salary sacrifice actually works</h2>
          <p>
            Without salary sacrifice, every extra dollar you earn is taxed at your marginal rate. For most middle-income earners that is 30% or 37%. Salary sacrifice redirects part of your pre-tax salary into super, where it is taxed at 15% (the super funds’ concessional rate). The arithmetic is simple: if your marginal rate is higher than 15%, you save the difference on every sacrificed dollar.
          </p>
          <p>
            The catch is that the money is now in super, not your transaction account. You cannot spend it until you reach preservation age (60 for most people) and meet a condition of release. The trade-off is forced saving plus the tax saving, in exchange for the loss of liquidity.
          </p>

          <h2>When it works (and when it doesn’t)</h2>
          <p>
            Salary sacrifice works whenever your marginal rate is above 15% and you can afford the reduced take-home pay. For the FY 2026–27 brackets:
          </p>
          <ul>
            <li><strong>$0 – $18,200:</strong> marginal rate 0%, sacrificing just moves pre-tax money into super, with no immediate tax saving. Not usually worth it unless you are saving for the First Home Super Saver Scheme (FHSS).</li>
            <li><strong>$18,201 – $45,000:</strong> marginal rate 15%, no tax saving (the super tax matches your marginal rate). Skip unless your employer mandates it or you want the discipline.</li>
            <li><strong>$45,001 – $135,000:</strong> marginal rate 30%, save 15 cents on every sacrificed dollar. This is the sweet spot for most people.</li>
            <li><strong>$135,001 – $190,000:</strong> marginal rate 37%, save 22 cents on every dollar. Strong case for maximising the cap.</li>
            <li><strong>$190,001+:</strong> marginal rate 45%, save 30 cents on every dollar. Division 293 may apply (15% extra on concessional contributions above $250,000 of combined income), reducing the effective saving but still worth doing up to the cap.</li>
          </ul>

          <h2>The concessional cap and what happens at the edge</h2>
          <p>
            Concessional (before-tax) contributions are capped at $30,000 per year for FY 2025–26, indexed in subsequent years. The cap includes the Superannuation Guarantee your employer pays on your behalf. On a $100,000 salary with 12% SG ($12,000), you can sacrifice up to a further $18,000 before hitting the cap.
          </p>
          <p>
            Going over the cap is rarely worthwhile. The excess is added to your assessable income and taxed at your marginal rate, with a 15% offset. The effective tax rate is the same as your marginal rate, so the excess is treated as if you had taken it as cash. The only exception is the bring-forward rule, which lets you use future cap space in a single year (up to 3 years of $30K = $90K) if your super balance is under $500K.
          </p>

          <h2>How this affects your payroll tax withholding</h2>
          <p>
            Salary sacrifice reduces your taxable income, which reduces the PAYG income tax your employer withholds from each pay. It also slightly reduces the Medicare levy (since the levy is 2% of taxable income). For employees, the effect is automatic: your take-home pay rises compared to what it would be without the sacrifice, and your end-of-year tax position reconciles cleanly with the ATO because the sacrificed amount is reported on your payment summary.
          </p>
          <p>
            There is no separate "payroll tax" (that is a different state-based tax paid by employers on their total wage bill). What people usually mean by "payroll tax" in this context is the PAYG income tax withheld by the employer. Salary sacrifice reduces PAYG withholding, which is the entire point of doing it.
          </p>

          <h2>Salary sacrifice vs after-tax super contributions</h2>
          <p>
            You can also contribute to super from your after-tax pay. These are called "non-concessional" contributions and have a separate cap ($120,000 per year, or $360,000 under the bring-forward rule). They do not reduce your taxable income, so there is no immediate tax saving, but the investment earnings inside super are still taxed at 15% instead of your marginal rate, which compounds over decades.
          </p>
          <p>
            Use salary sacrifice for the tax saving now. Use after-tax contributions once you have maxed the concessional cap or once the bring-forward is exhausted.
          </p>

          <h2>Common mistakes</h2>
          <ul>
            <li><strong>Sacrificing more than the $30K cap</strong> and ending up with a tax bill instead of a saving. Track your YTD concessional contributions and stop before the cap.</li>
            <li><strong>Forgetting that the sacrificed money is locked in super</strong> until age 60. Do not sacrifice money you might need in the next 5-10 years.</li>
            <li><strong>Not telling the employer when your situation changes</strong> (e.g. you switch from full-time to part-time, or take unpaid leave). Update the sacrifice arrangement so the right amount is taken each pay.</li>
            <li><strong>Confusing salary sacrifice with the First Home Super Saver Scheme (FHSS)</strong>. FHSS uses the same $30K concessional cap but lets you withdraw the money (plus earnings) for a first home deposit. It is a subset of salary sacrifice, not a separate scheme.</li>
          </ul>

          <h2>Frequently asked questions</h2>
        </section>

        <section className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.question} className="card group">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink-900">
                <span aria-hidden="true" className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition">›</span>
                {f.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{f.answer}</p>
            </details>
          ))}
        </section>

        <section className="prose prose-slate prose-invert mt-12 max-w-none">
          <h2>Related tools</h2>
          <ul>
            <li><Link href="/">Pay calculator</Link>, your baseline take-home, before sacrifice.</li>
            <li><Link href="/hecs-calculator">HECS-HELP calculator</Link>, sacrifice lowers your repayment income, which can drop you into a lower HECS band.</li>
            <li><Link href="/guides/salary-sacrifice">Salary sacrifice guide</Link>, the long-form explainer with the worked numbers.</li>
            <li><Link href="/salary-packaging-calculator">Salary packaging calculator</Link>, broader packaging including novated lease cars and other pre-tax benefits.</li>
            <li><Link href="/methodology">Methodology</Link>, how every figure is derived.</li>
          </ul>
        </section>
      
        <section className="mt-16">
          <NewsletterForm
            accessKey={process.env.NEXT_PUBLIC_NEWSLETTER_KEY}
            source="salary-sacrifice-calculator"
            heading="Get more from your super."
            description="Tips on maximising pre-tax super contributions, twice a month. No spam, unsubscribe in one click."
          />
        </section>
      </article>
    </>
  );
}
