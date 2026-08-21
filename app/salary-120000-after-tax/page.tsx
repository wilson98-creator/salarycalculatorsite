import type { Metadata } from 'next';
import { SalaryAfterTaxPage, type SalaryAfterTaxData } from '@/components/SalaryAfterTax';

export const metadata: Metadata = {
  title: '$120,000 After Tax Australia (FY 2026–27) — Take-Home Pay',
  description:
    'On a $120,000 salary in Australia, your take-home pay is about $91,080 per year (~$3,503 per fortnight). See the full breakdown, effective tax rate, and live calculator.',
  alternates: { canonical: '/salary-120000-after-tax' },
};

const data: SalaryAfterTaxData = {
  gross: 120000,
  slug: '120000',
  tax: 26520,
  medicare: 2400,
  lito: 0,
  net: 91080,
  perWeek: 1752,
  perFortnight: 3503,
  perMonth: 7590,
  blurb:
    "On $120,000 a year the first $18,200 is tax-free, $26,800 is taxed at 15% ($4,020), and the remaining $75,000 is taxed at 30% ($22,500), for a total of $26,520 in income tax. LITO has fully phased out at this income. The Medicare levy adds 2% × $120,000 = $2,400. Net take-home is $91,080 per year, or $3,503 per fortnight before super. Employer super of $14,400 (12%) is paid on top of your salary. Note: salary sacrifice starts to look attractive in this bracket — see the calculator above to model it.",
  faqs: [
    {
      question: 'How much tax do I pay on a $120,000 salary in Australia?',
      answer:
        'On $120,000 you pay $26,520 in income tax plus $2,400 Medicare levy, for a total of $28,920. The effective tax rate is 24.10%. The marginal rate at $120,000 is 30% — you stay in this bracket until $135,000.',
    },
    {
      question: 'What is $120,000 a year after tax per fortnight?',
      answer:
        '$120,000 a year after tax is approximately $3,503 per fortnight. That is the figure most people see in their bank account every two weeks, before super.',
    },
    {
      question: 'How much is $120,000 a year after tax per month?',
      answer:
        '$120,000 a year after tax is approximately $7,590 per month. Use the live calculator above to get an exact figure for your situation (including HECS, salary sacrifice, and tax-free threshold choices).',
    },
    {
      question: 'Is $120,000 a year a good salary in Australia?',
      answer:
        '$120,000 is in the top 15% of Australian individual earners. It is a senior professional or mid-management salary in most industries. For a single person it is very comfortable in any city. For a family on a single income, it is upper-middle-class in most of Australia and supports a high quality of life, including mortgage payments in capital cities.',
    },
    {
      question: 'How does HECS affect a $120,000 salary?',
      answer:
        'On $120,000 with a HECS-HELP debt, the marginal repayment applies above the FY 2026–27 threshold of around $69,528. The repayment is 15% of the income above the threshold, which at $120,000 works out to 15% × $50,472 = $7,571 in HECS for the year. This drops your take-home to about $83,509 per year. See the HECS calculator for the exact figure.',
    },
    {
      question: 'Is salary sacrifice worth it on $120,000?',
      answer:
        'On $120,000 your marginal rate is 30% and the super tax rate is 15%, so every dollar sacrificed into super saves you 15 cents in tax (until you hit the $30,000 concessional cap including employer SG). Sacrificing $10,000 saves about $2,500 in tax but reduces take-home by about $7,500. Use the salary sacrifice calculator above to model the trade-off for your situation.',
    },
    {
      question: 'What about the Medicare Levy Surcharge on $120,000?',
      answer:
        'On $120,000 as a single person without private hospital cover, you would pay the Medicare Levy Surcharge of 1.25% (the surcharge rate for this income band), which is $1,500 per year. With private hospital cover, the surcharge is zero. Most people in this bracket take out basic hospital cover (often less than $1,500/year) to avoid the surcharge.',
    },
  ],
};

export default function Page() {
  return <SalaryAfterTaxPage data={data} metadata={metadata} />;
}
