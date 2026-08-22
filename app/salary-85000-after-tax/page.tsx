import type { Metadata } from 'next';
import { SalaryAfterTaxPage, type SalaryAfterTaxData } from '@/components/SalaryAfterTax';

export const metadata: Metadata = {
  title: '$85,000 After Tax Australia (FY 2026–27), Take-Home Pay',
  description:
    'On an $85,000 salary in Australia, your take-home pay is about $67,280 per year (~$2,588 per fortnight). See the full breakdown, effective tax rate, and live calculator.',
  alternates: { canonical: '/salary-85000-after-tax' },
};

const data: SalaryAfterTaxData = {
  gross: 85000,
  slug: '85000',
  tax: 16020,
  medicare: 1700,
  lito: 0,
  net: 67280,
  perWeek: 1294,
  perFortnight: 2588,
  perMonth: 5607,
  blurb:
    "On $85,000 a year the first $18,200 is tax-free, the next $26,800 ($18,201–$45,000) is taxed at 15% ($4,020), and the remaining $40,000 is taxed at 30% ($12,000), for a total of $16,020 in income tax. LITO has fully phased out at this income. The Medicare levy adds 2% × $85,000 = $1,700. Net take-home is $67,280 per year, or $2,588 per fortnight before super. Employer super of $10,200 (12%) is paid on top of your salary.",
  faqs: [
    {
      question: 'How much tax do I pay on an $85,000 salary in Australia?',
      answer:
        'On $85,000 you pay $16,020 in income tax plus $1,700 Medicare levy, for a total of $17,720. The effective tax rate is 20.85%. The marginal rate at $85,000 is 30%.',
    },
    {
      question: 'What is $85,000 a year after tax per fortnight?',
      answer:
        '$85,000 a year after tax is approximately $2,588 per fortnight. That is the figure most people see in their bank account every two weeks, before super.',
    },
    {
      question: 'How much is $85,000 a year after tax per month?',
      answer:
        '$85,000 a year after tax is approximately $5,607 per month. Use the live calculator above to get an exact figure for your situation (including HECS, salary sacrifice, and tax-free threshold choices).',
    },
    {
      question: 'Is $85,000 a year a good salary in Australia?',
      answer:
        '$85,000 is solidly above the Australian median individual income. For a single person in Sydney or Melbourne, it supports a comfortable middle-class lifestyle. For a family with two earners, it is a strong household income in most of Australia. The take-home of $2,588 per fortnight is enough to cover a mortgage or rent in most metro areas, plus transport, food, and discretionary spending.',
    },
    {
      question: 'How does HECS affect an $85,000 salary?',
      answer:
        'On $85,000 with a HECS-HELP debt, the marginal repayment applies above the FY 2026–27 threshold of around $69,528. The repayment is 15% of the income above the threshold, which at $85,000 works out to 15% × $15,472 = $2,321 in HECS for the year. This drops your take-home to about $64,959 per year. See the HECS calculator for the exact figure based on your debt balance and projection.',
    },
  ],
};

export default function Page() {
  return <SalaryAfterTaxPage data={data} metadata={metadata} />;
}
