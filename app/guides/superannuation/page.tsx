import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Superannuation basics for employees',
  description:
    'The Superannuation Guarantee, how your balance grows, when you can access it, and the four levers that move your retirement outcome the most.',
  alternates: { canonical: '/guides/superannuation' },
};

export default function SuperGuide() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <p className="not-prose text-sm text-ink-500">Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></p>
      <h1>Superannuation basics for employees</h1>
      <p className="lead">
        Superannuation is Australia's mandatory private retirement savings system. Your employer pays at least 12% of your salary into a super fund on your behalf, the money is invested, and you can access it from age 60 (preservation age). This guide covers how the system works and the four levers that have the biggest impact on your retirement outcome.
      </p>

      <h2>1. The Superannuation Guarantee</h2>
      <p>
        The Superannuation Guarantee (SG) is the minimum amount your employer must pay into your super fund on top of your salary. The current rate is 12% of ordinary time earnings, effective from 1 July 2025. The rate has stepped up gradually from 9% in 2013.
      </p>
      <p>
        For an $80,000 salary, the SG contribution is $9,600 per year. Your employer pays this in addition to your take-home pay — it is not deducted from your gross salary.
      </p>
      <p>
        SG contributions are paid at least quarterly, and most employers pay them monthly with each pay run. Check your payslip: the super line shows the amount paid and the fund it went to.
      </p>

      <h2>2. The four levers that matter</h2>
      <p>
        Whatever the SG rate, your retirement outcome depends on four factors:
      </p>
      <ol>
        <li><strong>How much goes in.</strong> SG + any salary sacrifice + any after-tax contributions. The concessional (pre-tax) cap is $30,000 per year for FY 2025–26.</li>
        <li><strong>How long it is invested.</strong> Time in the market is the single biggest driver. Starting at 25 versus starting at 35 can mean a 2-3x difference in final balance.</li>
        <li><strong>What return you earn.</strong> Diversified growth options have historically returned 7-9% per year over 20+ year periods, but with significant short-term volatility.</li>
        <li><strong>What fees you pay.</strong> A 1% difference in annual fees compounds to a meaningful difference over 30+ years. Compare fund fees, admin fees, and investment option fees.</li>
      </ol>

      <h2>3. Choosing a fund</h2>
      <p>
        You can choose your own super fund, or accept the "MySuper" default fund your employer nominates. Most large employers use industry funds (AustralianSuper, Hostplus, REST, Cbus) or retail funds (Australian Retirement Trust, BT, Colonial First State).
      </p>
      <p>
        When comparing funds, look at:
      </p>
      <ul>
        <li>Total annual fees (admin + investment + advice)</li>
        <li>Investment option performance over 5, 10, and 20 years (not 1 year)</li>
        <li>Insurance offered (default death and TPD cover can be useful but is not free)</li>
        <li>Customer service reputation</li>
        <li>Whether the fund has any ethical or sustainability investment options that interest you</li>
      </ul>
      <p>
        The ATO\'s <a href="https://www.ato.gov.au/individuals-and-families/super-for-me-individuals/choosing-and-managing-your-super" target="_blank" rel="noopener noreferrer">YourSuper comparison tool</a> is a good neutral starting point.
      </p>

      <h2>4. Investment options</h2>
      <p>
        Most funds offer a menu of investment options ranging from "Conservative" (mostly cash and bonds) to "High Growth" (mostly shares and property). The default is usually a "Balanced" option around 60-70% growth assets.
      </p>
      <p>
        Younger people with longer time horizons can usually afford more growth assets, accepting the short-term volatility for higher long-term returns. As you approach retirement, gradually shifting to more conservative options reduces the risk of a market downturn eating into your savings just as you need them.
      </p>

      <h2>5. When you can access it</h2>
      <p>
        Super is "preserved" — you cannot withdraw it until you reach preservation age and meet a condition of release. Preservation age is 60 for everyone born after 1 July 1964. From age 60 you can access your super even if you are still working, subject to the relevant release rules.
      </p>
      <p>
        Earlier access is possible in limited circumstances: severe financial hardship, compassionate grounds (medical expenses, mortgage arrears), terminal illness, or permanent incapacity. You cannot normally access super just because you want the money, even if you have left Australia permanently.
      </p>

      <h2>6. How super is taxed</h2>
      <p>
        Super has its own tax system. Contributions are taxed at 15% on the way in (concessional), and investment earnings are taxed at 15% inside the fund. Withdrawals after age 60 are tax-free. Before age 60, withdrawals are taxed at your marginal rate with a 15% offset (so effectively taxed at your marginal rate minus 15%).
      </p>
      <p>
        The 15% super tax rate is much lower than most people\'s marginal income tax rate, which is why salary sacrificing into super is so tax-effective. See the <Link href="/guides/salary-sacrifice">salary sacrifice guide</Link> for the numbers.
      </p>

      <h2>7. Insurance inside super</h2>
      <p>
        Most super funds offer default insurance cover: death and total & permanent disability (TPD) and often income protection. The premiums are deducted from your super balance. The cover is often automatic when you start a new job, and you may need to opt out if you do not want it.
      </p>
      <p>
        The insurance offered through super is usually cheaper than equivalent cover bought directly, but the trade-off is that premiums come out of your retirement balance. For a 25-year-old with no dependents, the insurance may not be worth the erosion. For a 40-year-old with a family, it usually is.
      </p>

      <h2>8. Common mistakes</h2>
      <ul>
        <li><strong>Having multiple super accounts.</strong> If you have changed jobs and not consolidated, you could be paying multiple sets of fees. Consolidate into one fund — use the ATO\'s "lost super" search.</li>
        <li><strong>Choosing the wrong investment option.</strong> Many people stay in the default balanced option their whole career, which is often too conservative for a 25-year-old and too aggressive for a 60-year-old.</li>
        <li><strong>Ignoring fees.</strong> A 1% difference in fees on a $500,000 balance over 20 years is around $150,000 in returns foregone.</li>
        <li><strong>Not salary sacrificing when it would help.</strong> If you earn above $45,000 and can afford the reduced take-home, salary sacrifice into super is one of the best financial moves available to most Australians.</li>
        <li><strong>Withdrawing super early to pay debt.</strong> The long-term cost of taking $30,000 out of super at 35 vastly exceeds the benefit of clearing $30,000 of credit card debt. The compounding is hard to reverse.</li>
      </ul>

      <h2>9. Where the rules come from</h2>
      <p>
        Super rules are in the <em>Superannuation Industry (Supervision) Act 1993</em>, the <em>Income Tax Assessment Act 1997</em>, and the <em>Superannuation Guarantee (Administration) Act 1992</em>. The ATO\'s <a href="https://www.ato.gov.au/individuals-and-families/super-for-me-individuals" target="_blank" rel="noopener noreferrer">super for individuals</a> page is the most useful starting point.
      </p>
    </article>
  );
}
