import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Salary sacrifice: how to lower your tax bill the legal way',
  description:
    'How pre-tax super contributions actually save you money, the concessional cap, Division 293 for high earners, and the novated lease alternative.',
  alternates: { canonical: '/guides/salary-sacrifice' },
};

export default function SalarySacrificeGuide() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <p className="not-prose text-sm text-ink-500">Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></p>
      <h1>Salary sacrifice: how to lower your tax bill the legal way</h1>
      <p className="lead">
        Salary sacrifice is an arrangement where you redirect part of your pre-tax salary into superannuation or other benefits. Because the sacrificed amount is taken out before income tax is calculated, your taxable income drops. This guide covers how it actually saves you money, the annual caps, and the situations where it does not make sense.
      </p>

      <h2>1. The basic idea</h2>
      <p>
        Without salary sacrifice, your marginal tax rate is 30%, 37%, or 45% on the top portion of your income. With salary sacrifice, that top portion goes into your super fund instead, where it is taxed at 15% — the super funds' flat tax rate on concessional contributions.
      </p>
      <p>
        For a $5,000 salary sacrifice at a 37% marginal rate, you save $5,000 × (37% − 15%) = $1,100 in tax. Your take-home pay drops by less than $5,000 because the sacrifice is pre-tax, not post-tax. Your super balance grows by $5,000 minus the 15% super tax = $4,250. Net effect: $1,100 tax saved and $4,250 more in super.
      </p>

      <h2>2. The concessional contributions cap</h2>
      <p>
        Concessional (before-tax) contributions are capped at $30,000 per year for FY 2025–26, indexed to wages in subsequent years. The cap includes the Superannuation Guarantee paid by your employer, so if your employer pays 12% SG on your $80,000 salary ($9,600), you can salary sacrifice up to a further $20,400 before triggering the cap.
      </p>
      <p>
        Going over the cap has consequences: the excess is included in your assessable income and taxed at your marginal rate, with a 15% tax offset. In effect, the excess is taxed the same as if you had never salary sacrificed it. So the cap is the cliff.
      </p>

      <h2>3. Division 293 — the surcharge for high earners</h2>
      <p>
        If your combined income and concessional super contributions exceed $250,000, an additional 15% Division 293 tax applies to the lower of your concessional contributions or the amount above the threshold. For most people earning below $250,000, Division 293 does not apply.
      </p>
      <p>
        Even with Division 293, the effective tax rate inside super (15% + 15% = 30%) is still below the top marginal income tax rate. Salary sacrifice remains worthwhile for high earners, just less profitable.
      </p>

      <h2>4. Novated leases — a different kind of sacrifice</h2>
      <p>
        A novated lease is a three-way agreement between you, your employer, and a finance company. Your employer pays for the lease and running costs of a car from your pre-tax salary, and you make repayments out of your pay before tax. The running costs (fuel, insurance, registration, maintenance) can also be packaged.
      </p>
      <p>
        The tax saving on a typical $15,000-per-year novated lease is around $4,500–$5,000 for a 37% marginal rate earner. The catch: you do not own the car (the finance company does), and there are FBT implications. The ATO has detailed rules about the FBT treatment of novated leases, including the "statutory formula" method and the "operating cost" method.
      </p>
      <p>
        Novated leases are not right for everyone. They suit people who would otherwise buy a car with after-tax money, can commit to the lease term, and whose employer is willing to administer the arrangement. Most large employers, government agencies, and not-for-profit organisations offer novated leases as a standard benefit.
      </p>

      <h2>5. Salary packaging for not-for-profit and public sector workers</h2>
      <p>
        Employees of public hospitals, charities, and some government bodies are eligible for "salary packaging" under FBT concessions, which can let you sacrifice a much larger portion of your salary — up to the FBT-exempt cap (currently $30,000 + grossed-up amount under certain arrangements). Common items: mortgage repayments, rent, credit card debt, child care, school fees.
      </p>
      <p>
        These arrangements are managed by salary packaging providers (Maxxia, SmartSalary, Paywise, etc.). If you are eligible, they are usually well worth setting up.
      </p>

      <h2>6. Practical steps</h2>
      <ol>
        <li>Decide how much to sacrifice. Use the <Link href="/">calculator</Link> on the homepage to model the impact on your take-home pay.</li>
        <li>Tell your employer or payroll. Most have a simple form.</li>
        <li>Watch the cap. Your payroll system should track your YTD concessional contributions and warn you before you exceed it.</li>
        <li>Check your super fund accepts the contributions (it should — most do).</li>
        <li>Review annually. As your income grows, the marginal tax saving grows too.</li>
      </ol>

      <h2>7. When salary sacrifice does not make sense</h2>
      <ul>
        <li><strong>You cannot afford the reduced take-home pay.</strong> Salary sacrifice reduces your weekly cash flow. If you are living pay-to-pay, the tax saving is not worth the cash crunch.</li>
        <li><strong>You are about to access your super.</strong> If you are over 60 and planning to withdraw super, salary sacrificing into it now is the same as just investing it normally — minus the extra layer of fees.</li>
        <li><strong>You have a partner with a lower income.</strong> Spousal contributions can sometimes be a more tax-effective use of the money.</li>
        <li><strong>You are a very low earner.</strong> The 0% and 15% brackets are already very low. The tax saving is minimal and the lost cash flow is more painful.</li>
      </ul>

      <h2>8. Where the rules come from</h2>
      <p>
        Salary sacrifice rules come from the Income Tax Assessment Act 1997 (Cth), the Superannuation Industry (Supervision) Act 1993, and the Fringe Benefits Tax Assessment Act 1986. The ATO\'s <a href="https://www.ato.gov.au/individuals-and-families/super-for-me-individuals/growing-your-super/salary-sacrificing-super" target="_blank" rel="noopener noreferrer">salary sacrificing into super</a> page is the most accessible starting point.
      </p>
    </article>
  );
}
