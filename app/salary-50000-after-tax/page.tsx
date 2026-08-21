import type { Metadata } from 'next';
import { SalaryAfterTaxPage, type SalaryAfterTaxData } from '@/components/SalaryAfterTax';

export const metadata: Metadata = {
  title: '$50,000 After Tax Australia (FY 2026–27) — Take-Home Pay',
  description:
    'On a $50,000 salary in Australia, your take-home pay is about $43,730 per year (~$1,682 per fortnight). See the full breakdown, effective tax rate, and live calculator.',
  alternates: { canonical: '/salary-50000-after-tax' },
};

const data: SalaryAfterTaxData = {
  gross: 50000,
  slug: '50000',
  tax: 5270,
  medicare: 1000,
  lito: 250,
  net: 43730,
  perWeek: 841,
  perFortnight: 1682,
  perMonth: 3644,
  blurb:
    "On $50,000 a year you are in the second tax bracket (15% on income between $18,201 and $45,000) with a small amount taxed at the 30% rate above that. The Low Income Tax Offset (LITO) gives you back most of the tax paid between $37,500 and $45,000, and continues to phase out above $45,000 at 1.5c per dollar until it reaches zero at $66,667. On a $50,000 salary LITO is worth $250, which brings the income tax to $5,270. Add the 2% Medicare levy ($1,000) and the net take-home is $43,730 per year — about $1,682 per fortnight before super. Employer super of $6,000 (12%) is paid on top of your salary and does not reduce your take-home.",
  faqs: [
    {
      question: 'How much tax do I pay on a $50,000 salary in Australia?',
      answer:
        "On a $50,000 annual salary you pay $5,270 in income tax (after the Low Income Tax Offset) plus $1,000 Medicare levy, for a total of $6,270 in tax. The effective tax rate is 12.54%. The marginal rate at $50,000 is 30% (income above $45,000), but the bulk of your income is taxed at 15% and 0%.",
    },
    {
      question: 'What is $50,000 a year after tax per fortnight?',
      answer:
        '$50,000 a year after tax is approximately $1,682 per fortnight. That is the figure most people see in their bank account every two weeks, before super.',
    },
    {
      question: 'How much is $50,000 a year after tax per month?',
      answer:
        '$50,000 a year after tax is approximately $3,644 per month. Use the live calculator above to get an exact figure for your situation (including HECS, salary sacrifice, and tax-free threshold choices).',
    },
    {
      question: 'Is $50,000 a year a good salary in Australia?',
      answer:
        '$50,000 is close to the Australian median full-time salary (which was around $92,000 in 2024 ABS data, but this includes many part-time workers below this figure). For a single person in a capital city, $50,000 is workable but tight; for a family it is challenging. The take-home of $43,730 means about $1,682 per fortnight to cover rent, transport, food, and bills.',
    },
  ],
};

export default function Page() {
  return <SalaryAfterTaxPage data={data} metadata={metadata} />;
}
