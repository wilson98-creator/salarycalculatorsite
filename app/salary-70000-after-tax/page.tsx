import type { Metadata } from 'next';
import { SalaryAfterTaxPage, type SalaryAfterTaxData } from '@/components/SalaryAfterTax';

export const metadata: Metadata = {
  title: '$70,000 After Tax Australia (FY 2026–27), Take-Home Pay',
  description:
    'On a $70,000 salary in Australia, your take-home pay is about $57,080 per year (~$2,195 per fortnight). See the full breakdown, effective tax rate, and live calculator.',
  alternates: { canonical: '/salary-70000-after-tax' },
};

const data: SalaryAfterTaxData = {
  gross: 70000,
  slug: '70000',
  tax: 11520,
  medicare: 1400,
  lito: 0,
  net: 57080,
  perWeek: 1098,
  perFortnight: 2195,
  perMonth: 4757,
  blurb:
    "On $70,000 a year you are fully inside the 30% bracket, the first $45,000 is taxed at 15% ($4,020) and the remaining $25,000 is taxed at 30% ($7,500), for a total of $11,520 in income tax. The Low Income Tax Offset has fully phased out by $66,667, so there is no LITO at $70,000. The Medicare levy adds 2% × $70,000 = $1,400. Net take-home is $57,080 per year, or $2,195 per fortnight before super. Employer super of $8,400 (12%) is paid on top of your salary.",
  faqs: [
    {
      question: 'How much tax do I pay on a $70,000 salary in Australia?',
      answer:
        'On $70,000 you pay $11,520 in income tax plus $1,400 Medicare levy, for a total of $12,920. The effective tax rate is 18.46%. The marginal rate at $70,000 is 30%.',
    },
    {
      question: 'What is $70,000 a year after tax per fortnight?',
      answer:
        '$70,000 a year after tax is approximately $2,195 per fortnight. That is the figure most people see in their bank account every two weeks, before super.',
    },
    {
      question: 'How much is $70,000 a year after tax per month?',
      answer:
        '$70,000 a year after tax is approximately $4,757 per month. Use the live calculator above to get an exact figure for your situation (including HECS, salary sacrifice, and tax-free threshold choices).',
    },
    {
      question: 'Is $70,000 a year a good salary in Australia?',
      answer:
        "$70,000 is comfortably above the Australian median individual income. For a single person in a capital city, $70,000 supports a reasonable lifestyle. For a family on a single income, it is workable in regional areas but tight in Sydney or Melbourne. Two earners at $70,000 each (combined household $140,000) is a comfortable middle-class income in most of Australia.",
    },
    {
      question: 'How does HECS affect a $70,000 salary?',
      answer:
        'On $70,000 with a HECS-HELP debt, the marginal repayment rate (FY 2026–27) kicks in above the threshold of around $69,528. At $70,000, only $472 of your income sits in the 15% HECS bracket, adding about $71 in compulsory repayment. The repayment scales up sharply above this threshold, see the HECS calculator for the exact figure.',
    },
  ],
};

export default function Page() {
  return <SalaryAfterTaxPage data={data} metadata={metadata} />;
}
