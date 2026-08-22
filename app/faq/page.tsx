import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { JsonLd, faqSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Common questions about Australian pay, tax, superannuation, HECS-HELP, Medicare and more. Clear, sourced answers — no financial jargon.',
  alternates: { canonical: '/faq' },
};

const faqs = [
  // Basics
  {
    cat: 'Basics',
    q: 'How is Australian income tax calculated?',
    a: `Australia uses a progressive tax system — different rates apply to different portions of your income, not a single flat rate on the whole amount. For FY 2026–27 the resident brackets are 0% on the first $18,200, 15% on $18,201 to $45,000, 30% on $45,001 to $135,000, 37% on $135,001 to $190,000, and 45% on income above $190,000. The 2% Medicare levy is calculated on top. Source: ATO "Tax rates – Australian residents".`,
  },
  {
    cat: 'Basics',
    q: 'What is the tax-free threshold?',
    a: 'The first $18,200 of your taxable income each year is not taxed. This is called the tax-free threshold. If you claim it on your Tax File Number declaration, your employer withholds less tax from each pay. If you have more than one job, you generally claim the threshold from the highest-paying employer only.',
  },
  {
    cat: 'Basics',
    q: 'What is the difference between gross and net pay?',
    a: 'Gross pay is what you earn before any deductions. Net pay (also called take-home pay) is what lands in your bank account after PAYG income tax, the Medicare levy, any HECS-HELP repayment, and any post-tax deductions (union fees, salary-packaged items) are taken out. Superannuation is paid on top of your gross pay by your employer — it is not deducted from your take-home.',
  },
  {
    cat: 'Basics',
    q: 'What is PAYG withholding?',
    a: 'PAYG stands for Pay As You Go. It is the system your employer uses to withhold income tax from each pay and send it to the ATO on your behalf, so you do not have a massive tax bill at the end of the year. Employers use ATO formulas (Schedule 1, NAT 1004) to figure out how much to withhold. The formulas are slightly different from the actual annual tax brackets, which is why your payslip number can differ from a "what tax will I owe" calculation. The difference is reconciled when you lodge your tax return.',
  },
  {
    cat: 'Basics',
    q: 'What is a pay period?',
    a: 'A pay period is how often you get paid. In Australia the most common pay periods are weekly (52 pays/year), fortnightly (26 pays/year) and monthly (12 pays/year). The calculator on this site handles all of them — enter what you are actually paid and we convert the annual tax to the period you chose.',
  },
  {
    cat: 'Basics',
    q: 'How often do you update the rates?',
    a: 'We re-check our rates against the ATO at the start of every financial year (1 July) and whenever the federal budget is handed down. Every rate and threshold used in the calculator has a source link to its ATO publication on the methodology page, and a "last reviewed" date appears in the footer of every page. The current rates are for FY 2026–27.',
  },
  {
    cat: 'Basics',
    q: 'How accurate is the SalaryCalc calculator?',
    a: 'For most employees the result is within a few dollars of what your employer withholds. The calculator uses the actual annual tax brackets (the most accurate method) rather than the weekly-equivalent PAYG formula, so the per-period number can differ slightly from your payslip — that is normal and gets reconciled at tax time. The calculator does not model every situation (Medicare Levy Surcharge, child support, garnishees, certain salary-packaging arrangements). See the methodology page for the full list of what is and is not modelled.',
  },
  {
    cat: 'Basics',
    q: 'Can I use SalaryCalc to do my tax return?',
    a: 'No. SalaryCalc is an estimator, not a tax agent. The numbers will not be accepted by the ATO, and they do not capture every item that affects your final tax position (deductions, offsets, carried-forward losses, private health rebate, etc.). For your actual tax return use myTax on the ATO website, or a registered tax agent. See our disclaimer for the full statement.',
  },

  // Tax brackets
  {
    cat: 'Tax brackets',
    q: 'What are the income tax brackets for the current financial year?',
    a: 'FY 2026–27 resident brackets: $0 – $18,200 taxed at 0%; $18,201 – $45,000 at 15%; $45,001 – $135,000 at 30%; $135,001 – $190,000 at 37%; $190,001+ at 45%. Medicare levy of 2% is added on top. These exclude the Low Income Tax Offset (LITO), which can reduce tax by up to $700 for lower incomes. Source: ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents.',
  },
  {
    cat: 'Tax brackets',
    q: 'What are the previous financial year tax brackets (FY 2024–25 and FY 2025–26)?',
    a: 'FY 2024–25 and FY 2025–26 had the same resident brackets: 0% up to $18,200, 16% from $18,201 to $45,000, 30% from $45,001 to $135,000, 37% from $135,001 to $190,000, 45% above $190,000. The second bracket dropped to 15% from 1 July 2026 under the Treasury Laws Amendment (More Cost of Living Relief) Act 2025, and a further reduction to 14% is legislated for 1 July 2027.',
  },
  {
    cat: 'Tax brackets',
    q: 'How much tax will I pay on $80,000?',
    a: 'For FY 2026–27, on a $80,000 annual salary: 0% on the first $18,200 = $0; 15% on $18,201 – $45,000 = $4,020; 30% on $45,001 – $80,000 = $10,500. Total income tax = $14,520. Plus 2% Medicare levy = $1,600. Net take-home (before HECS or deductions) = $80,000 − $14,520 − $1,600 = $63,880 per year, or about $2,457 per fortnight. Use the calculator on the homepage for the exact figure for your situation.',
  },
  {
    cat: 'Tax brackets',
    q: 'How much tax will I pay on $100,000?',
    a: 'For FY 2026–27: $0 (first $18,200) + $4,020 (next $26,800 at 15%) + $16,500 (next $55,000 at 30%) = $20,520 in income tax. Plus $2,000 Medicare levy. Net take-home (before HECS) = $77,480 per year. At this income the Medicare Levy Surcharge may apply if you do not have private hospital cover, and any HECS debt would add the compulsory repayment.',
  },
  {
    cat: 'Tax brackets',
    q: 'What is LITO?',
    a: 'The Low Income Tax Offset (LITO) is a tax offset of up to $700 for Australian residents with low to middle incomes. It phases in fully at taxable income of $37,500, reduces by 5 cents per dollar from $37,500 to $45,000, and reduces further by 1.5 cents per dollar from $45,000 to $66,667, where it phases out completely. Non-residents are not eligible. Source: ato.gov.au.',
  },

  // Medicare
  {
    cat: 'Medicare',
    q: 'What is the Medicare levy?',
    a: 'The Medicare levy is a 2% tax on taxable income that funds Australia\'s public healthcare system. Most Australian residents pay it on top of income tax. There is a low-income threshold (around $28,011 for singles in FY 2025–26) below which no levy is payable, and a "shade-in" band above that where the levy is reduced. Foreign residents are generally not liable. Source: ato.gov.au/medicare-levy.',
  },
  {
    cat: 'Medicare',
    q: 'What is the Medicare Levy Surcharge (MLS)?',
    a: 'The Medicare Levy Surcharge is an additional 1% to 1.5% charged to higher-income earners who do not hold an appropriate private hospital cover policy. For FY 2026–27 it applies to singles earning above $105,000 and families above $210,000. It is on top of the standard 2% Medicare levy. The SalaryCalc pay calculator does not model MLS — it kicks in at tax time, not through PAYG withholding. Use a dedicated MLS calculator or a tax agent for that figure.',
  },
  {
    cat: 'Medicare',
    q: 'Do I pay Medicare levy as a foreign resident?',
    a: 'No. Foreign residents for tax purposes are generally not liable for the Medicare levy. The calculator handles this — select "Non-resident" in the residency field. If you are a permanent resident or an Australian citizen, you are liable.',
  },

  // HECS / HELP
  {
    cat: 'HECS-HELP',
    q: 'What is HECS-HELP?',
    a: 'HECS-HELP is the Australian government\'s income-contingent student loan scheme. It covers the cost of university degrees (HECS-HELP), vocational education (VET Student Loans / VSL), student startup loans (SSL), trade support loans (TSL), and the now-closed Student Financial Supplement Scheme (SFSS). You only start repaying once your repayment income exceeds the compulsory threshold for the year.',
  },
  {
    cat: 'HECS-HELP',
    q: 'When do I start repaying HECS?',
    a: 'You start making compulsory repayments once your repayment income exceeds the threshold for the financial year. For FY 2026–27 the threshold is approximately $69,528. For FY 2025–26 it was $54,435 under the new marginal system that took effect on 1 July 2025. Your employer withholds the repayment through PAYG if you tick the HECS-HELP box on your Tax File Number declaration.',
  },
  {
    cat: 'HECS-HELP',
    q: 'How is HECS-HELP calculated under the new system?',
    a: 'From 1 July 2025 HECS-HELP uses a marginal bracket system, similar to income tax. You only pay the higher rate on the income above each threshold, not on your whole income. For FY 2025–26: 15% on income between $54,435 and $125,000, then a higher rate above that. For FY 2026–27 the thresholds have shifted up again. The SalaryCalc HECS calculator applies the marginal method automatically based on the year you select.',
  },
  {
    cat: 'HECS-HELP',
    q: 'How is my HECS balance indexed?',
    a: 'On 1 June each year the ATO increases your HECS-HELP balance by the lower of the Consumer Price Index (CPI) and the Wage Price Index (WPI) for the previous 12 months. The WPI cap was introduced by the Universities Accord Act 2024 — previously the balance was indexed by CPI alone, which led to some years of very high indexation. Recent indexation rates: 7.1% (June 2023), 4.7% (June 2024), 3.2% (June 2025), 2.8% (June 2026).',
  },
  {
    cat: 'HECS-HELP',
    q: 'Can I make voluntary HECS repayments?',
    a: 'Yes. You can make voluntary repayments to the ATO at any time via BPAY using the reference on your ATO account (linked to your myGov). There is no minimum and no penalty for early repayment. Voluntary repayments reduce your balance, which means less interest compounds each year. The calculator does not model this directly, but the underlying HECS rate is the same.',
  },

  // Superannuation
  {
    cat: 'Super',
    q: 'What is the Superannuation Guarantee?',
    a: 'The Superannuation Guarantee (SG) is the minimum amount your employer must contribute to your superannuation fund on top of your salary. It is 12% of ordinary time earnings from 1 July 2025 onwards (up from 11.5% the year before). It is not deducted from your take-home pay — it is an additional employer cost. Most people also have the option to make extra personal contributions, including pre-tax salary sacrifice and after-tax contributions.',
  },
  {
    cat: 'Super',
    q: 'Is super included in my salary?',
    a: 'Generally no — the SG is paid on top of your gross salary. If your offer letter says "$80,000 plus super", your employer pays you $80,000 into your bank and $9,600 into your super fund. Some offers, particularly for senior roles, are quoted as a "Total Remuneration Package" (TRP) that bundles super into the headline figure. Tick "My gross includes super" in the calculator if that is your situation.',
  },
  {
    cat: 'Super',
    q: 'What is salary sacrifice?',
    a: 'Salary sacrifice is an arrangement where you agree with your employer to redirect part of your pre-tax salary into superannuation (or a novated lease, or other benefits). Because the sacrificed amount is taken out before income tax is calculated, your taxable income drops. Super contributions through salary sacrifice are taxed at 15% inside the fund, which is usually lower than your marginal tax rate. There is an annual concessional (before-tax) contributions cap — $30,000 for FY 2025–26, indexed to wages after that.',
  },
  {
    cat: 'Super',
    q: 'How much can I salary sacrifice?',
    a: 'Concessional (before-tax) contributions are capped at $30,000 per year for FY 2025–26, including the Superannuation Guarantee paid by your employer. So if your employer pays 12% SG on $80,000 ($9,600), you can salary sacrifice up to a further $20,400 before triggering additional tax. If you go over the cap the excess is included in your assessable income and taxed at your marginal rate (with a 15% tax offset). Use the salary sacrifice calculator to model the impact on your take-home pay.',
  },

  // Residency
  {
    cat: 'Residency',
    q: 'How is tax different for foreign residents?',
    a: 'Foreign residents for tax purposes are not eligible for the tax-free threshold, the Low Income Tax Offset (LITO), or the Medicare levy. They pay tax from the first dollar of Australian-sourced income, at different (usually higher) rates. For FY 2026–27 the non-resident brackets are 30% up to $135,000, 37% from $135,001 to $190,000, and 45% above $190,000. Working holiday makers (subclass 417/462) have a different rate again — see the next question. Source: ATO "Tax rates – Foreign residents".',
  },
  {
    cat: 'Residency',
    q: 'How is tax different for working holiday makers?',
    a: 'Working holiday makers (subclass 417 and 462 visa holders) are taxed as foreign residents but at a different schedule. From 1 July 2024 the first $45,000 of taxable income is taxed at 15%, after which the standard foreign resident rates apply (30%, 37%, 45%). They are also not liable for the Medicare levy. The calculator has a "Working holiday maker" option in the residency field.',
  },
  {
    cat: 'Residency',
    q: 'I have two jobs — how does that affect my tax?',
    a: 'Generally you claim the tax-free threshold from your highest-paying employer only. If both employers apply the threshold, you will be under-withheld through the year and end up with a tax bill at tax time. You can ask one employer not to apply the threshold, or use the ATO\'s Medicare levy variation declaration / Tax File Number declaration to fine-tune. The calculator assumes the threshold is fully applied to the one job you are entering.',
  },

  // Pay scenarios
  {
    cat: 'Pay scenarios',
    q: 'How is a bonus taxed?',
    a: 'A bonus is just additional ordinary income, so it is taxed at your marginal rate. The reason bonuses can feel more painful on the payslip is that employers often withhold at a flat higher rate (e.g. around 32% from 1 July 2024) for bonus payments under the "Schedule 5" method. The over- or under-withholding is reconciled at tax time. The bonus tax calculator on this site shows the marginal-tax treatment, which is the correct answer for the year as a whole.',
  },
  {
    cat: 'Pay scenarios',
    q: 'What are penalty rates?',
    a: 'Penalty rates are higher pay rates payable for working unsociable hours — evenings, weekends, public holidays, and overtime. They are set by the Modern Award that covers your job. Common examples: 125% for Saturday, 150% for Sunday, 225% (or 250%) for public holidays. Casual employees also receive a 25% casual loading on top. Use the penalty rate calculator to model a roster.',
  },
  {
    cat: 'Pay scenarios',
    q: 'What is casual loading?',
    a: 'Casual employees receive a loading — usually 25% — on top of the equivalent permanent hourly rate, in compensation for not receiving paid leave (annual leave, personal leave, etc.). The loading is added before tax and is paid at the same rate as ordinary time earnings. From 1 July 2025 the national minimum wage is $24.10 per hour, so the minimum casual rate is $30.13 per hour including the 25% loading.',
  },
  {
    cat: 'Pay scenarios',
    q: 'How is overtime calculated?',
    a: 'Overtime is time worked beyond your ordinary hours. The rate depends on your Modern Award or employment contract — common multipliers are 150% (time and a half) for the first 2-3 hours, and 200% (double time) after that. Casual employees receive the casual loading on top of the overtime rate. Overtime is taxed as ordinary income (no special rate), so the extra pay just pushes you into your marginal bracket.',
  },
  {
    cat: 'Pay scenarios',
    q: 'How do I read my payslip?',
    a: 'Your payslip must show (under the Fair Work Act): employer ABN, your name and start date, the pay period, gross earnings, any allowances, deductions (tax, super, other), net pay, and the superannuation contribution. If you think the gross or net is wrong, check the ordinary hours worked against your contract. If the tax seems high, check whether the tax-free threshold is being applied (TFN declaration) and whether the year-to-date figures look right.',
  },

  // Practical
  {
    cat: 'Practical',
    q: 'Is this site free?',
    a: 'Yes. The calculator is free to use, with no login, no account, and no tracking of your salary. The site is supported by unobtrusive advertising (only displayed below the calculator result) and may, in future, recommend financial products that pay a small referral fee — when we do, those recommendations are clearly labelled. We do not sell your data.',
  },
  {
    cat: 'Practical',
    q: 'Where do you get the numbers from?',
    a: 'Every rate, threshold, and coefficient used in the calculator is sourced from a published ATO or government source. Each source is listed on the methodology page with a direct link. If you find a number that does not match the ATO, please email us at hello@salarycalc.example.com.au.',
  },
  {
    cat: 'Practical',
    q: 'Can I use SalaryCalc for my business?',
    a: 'The calculator is built for individual employees, not for payroll processing. If you run a business and need payroll software that handles PAYG withholding, super, and reporting, look at established products like Xero, MYOB, Employment Hero, or KeyPay. For complex pay situations (novated leases, salary packaging) talk to a registered tax agent or salary packaging provider.',
  },
  {
    cat: 'Practical',
    q: 'I found a bug. How do I report it?',
    a: 'Email hello@salarycalc.example.com.au with what you typed, what you expected, and what happened. A screenshot helps. We aim to fix calculation bugs within 24 hours.',
  },
  {
    cat: 'Practical',
    q: 'What about tax offsets besides LITO?',
    a: 'There are several other offsets the ATO applies: the Low and Middle Income Tax Offset (LMITO) was a temporary offset that ended on 30 June 2022, the Senior Australians and Pensioners Tax Offset (SAPTO), the Private Health Insurance Rebate, and various zone rebates. The SalaryCalc calculator models LITO. For the others, factor them in manually or talk to a tax agent at lodgement time.',
  },
];

const byCategory = faqs.reduce<Record<string, typeof faqs>>((acc, f) => {
  (acc[f.cat] ??= []).push(f);
  return acc;
}, {});

const categories = Object.keys(byCategory);

export default function FaqPage() {
  return (
    <article className="max-w-3xl">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">Frequently asked questions</h1>
        <p className="mt-4 text-base text-ink-600 sm:text-lg">
          Plain-English answers to common questions about Australian pay, tax, super and HECS-HELP. Every answer is sourced from the ATO — see the <Link href="/methodology" className="text-brand-600 underline-offset-2 hover:underline">methodology page</Link> for the full list of sources.
        </p>
      </header>

      {categories.map((cat) => (
        <section key={cat} className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-ink-900">{cat}</h2>
          <div className="space-y-2">
            {byCategory[cat].map((f) => (
              <details key={f.q} className="group rounded-xl border border-ink-200 bg-white p-4 open:shadow-sm">
                <summary className="cursor-pointer list-none text-base font-semibold text-ink-900">
                  <span aria-hidden="true" className="mr-2 text-brand-500 group-open:rotate-90 inline-block transition">›</span>
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}

      <aside className="mt-12">
        <p className="font-semibold text-ink-900">Didn\'t find your answer?</p>
        <p className="mt-2">
          Email <a href={`mailto:${brand.contactEmail}`} className="text-brand-600 underline-offset-2 hover:underline">{brand.contactEmail}</a> or use the <Link href="/contact" className="text-brand-600 underline-offset-2 hover:underline">contact page</Link>. For anything affecting your actual tax position, talk to a registered tax agent.
        </p>
      </aside>

      <JsonLd data={faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
    </article>
  );
}
