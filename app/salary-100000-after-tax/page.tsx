import type { Metadata } from 'next';
import { SalaryAfterTaxPage, type SalaryAfterTaxData } from '@/components/SalaryAfterTax';

export const metadata: Metadata = {
  title: '$100,000 After Tax Australia (FY 2026–27), Take-Home Pay',
  description:
    'On a $100,000 salary in Australia, your take-home pay is about $77,480 per year (~$2,980 per fortnight). See the full breakdown, effective tax rate, and live calculator.',
  alternates: { canonical: '/salary-100000-after-tax' },
};

const data: SalaryAfterTaxData = {
  gross: 100000,
  slug: '100000',
  tax: 20520,
  medicare: 2000,
  lito: 0,
  net: 77480,
  perWeek: 1490,
  perFortnight: 2980,
  perMonth: 6457,
  blurb:
    "On $100,000 a year the first $18,200 is tax-free, $26,800 is taxed at 15% ($4,020), and the remaining $55,000 is taxed at 30% ($16,500), for a total of $20,520 in income tax. LITO has fully phased out at this income. The Medicare levy adds 2% × $100,000 = $2,000. Net take-home is $77,480 per year, or $2,980 per fortnight before super. Employer super of $12,000 (12%) is paid on top of your salary. Note: above ~$93,000, the Medicare Levy Surcharge applies if you do not have private hospital cover, see the methodology page for the threshold.",
  faqs: [
    {
      question: 'How much tax do I pay on a $100,000 salary in Australia?',
      answer:
        'On $100,000 you pay $20,520 in income tax plus $2,000 Medicare levy, for a total of $22,520. The effective tax rate is 22.52%. The marginal rate at $100,000 is 30%, you stay in this bracket until $135,000.',
    },
    {
      question: 'What is $100,000 a year after tax per fortnight?',
      answer:
        '$100,000 a year after tax is approximately $2,980 per fortnight. That is the figure most people see in their bank account every two weeks, before super.',
    },
    {
      question: 'How much is $100,000 a year after tax per month?',
      answer:
        '$100,000 a year after tax is approximately $6,457 per month. Use the live calculator above to get an exact figure for your situation (including HECS, salary sacrifice, and tax-free threshold choices).',
    },
    {
      question: 'Is $100,000 a year a good salary in Australia?',
      answer:
        '$100,000 is the symbolic "six-figure" mark and is comfortably in the top 20% of Australian individual earners. For a single person it is a strong salary in any city. For a family on a single income, it is comfortable in most of Australia. For a couple where both partners earn $100k, the combined household income is well into the top 10% nationally and supports a high quality of life.',
    },
    {
      question: 'How does HECS affect a $100,000 salary?',
      answer:
        'On $100,000 with a HECS-HELP debt, the marginal repayment applies above the FY 2026–27 threshold of around $69,528. The repayment is 15% of the income above the threshold, which at $100,000 works out to 15% × $30,472 = $4,571 in HECS for the year. This drops your take-home to about $72,909 per year. See the HECS calculator for the exact figure based on your debt balance.',
    },
    {
      question: 'What about the Medicare Levy Surcharge on $100,000?',
      answer:
        'On $100,000 as a single person without private hospital cover, the Medicare Levy Surcharge does NOT apply, it kicks in at $93,000+ for singles but only if you do not have appropriate private hospital cover. If you earn above $93,000 and do not have private cover, the surcharge adds 1-1.5% of your income. Most people in this bracket take out basic hospital cover (often less than $1,000/year) to avoid the surcharge. See the methodology page for the full thresholds.',
    },
  ],
};

export default function Page() {
  return <SalaryAfterTaxPage data={data} metadata={metadata} />;
}
