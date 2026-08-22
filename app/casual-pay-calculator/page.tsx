import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { CasualPayCalculator } from '@/components/CasualPayCalculator';
import { JsonLd, faqSchema, softwareApplicationSchema, articleSchema } from '@/components/Schema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Casual Pay Calculator Australia (FY 2026–27), With Loading & Tax',
  description:
    'Free Australian casual pay calculator. Enter your hourly rate, casual loading, and hours, see the loaded rate, weekly/fortnightly/annual pay, tax, HECS, and super.',
  alternates: { canonical: '/casual-pay-calculator' },
};

const faqs = [
  {
    question: 'What is casual loading?',
    answer: 'Casual loading is an extra percentage (usually 25%) added to the ordinary base hourly rate for casual employees. It compensates casuals for not receiving paid leave entitlements like annual leave, personal leave, and redundancy pay. The loading is paid at the same tax rate as ordinary earnings, it is not a special tax rate. From 1 July 2025 the national minimum wage is $24.10/hour, so the minimum casual rate is $30.13/hour including the 25% loading.',
  },
  {
    question: 'How much is casual loading?',
    answer: 'The standard casual loading under most Modern Awards is 25%. Some awards or enterprise agreements specify a different rate (20% is also common, and a few are 22.5% or 23%). Your employer is required to pay the higher of the award rate and the National Employment Standards. Check your award or your contract, the calculator defaults to 25%.',
  },
  {
    question: 'Are penalty rates extra to casual loading?',
    answer: 'Yes. Penalty rates (e.g. 150% for Saturday, 200% for Sunday and public holidays) are calculated on top of the loaded casual rate. The method depends on the award, some apply the penalty first, then add the loading; others apply the loading first, then the penalty. The calculator models the base loaded rate only. For an exact penalty calculation, use the ATO Fair Work PACT tool or your award\'s specific rules.',
  },
  {
    question: 'Do casual employees get superannuation?',
    answer: 'Yes, if you earn $450 or more (before tax) in a calendar month from a single employer. The Superannuation Guarantee is 12% of your ordinary time earnings, paid on top of your gross pay. The calculator shows the SG separately from your take-home pay, since it does not come out of your hourly rate.',
  },
  {
    question: 'How is casual pay taxed?',
    answer: 'Casual pay is taxed the same as permanent pay, your employer withholds PAYG income tax from each pay based on the ATO formulas. There is no special "casual tax rate". If you tick the tax-free threshold on your TFN declaration and HECS box (if applicable), the withholding will be correct. Any over- or under-withholding is reconciled at tax time.',
  },
  {
    question: 'Can my casual loading be less than 25%?',
    answer: 'In some industries and under some enterprise agreements, yes. Some awards specify 20% or 22.5%. The calculator lets you adjust the loading percentage to match your actual arrangement. The award you select sets the default.',
  },
  {
    question: 'What if I work for multiple employers as a casual?',
    answer: 'Each employer withholds tax separately. If the combined income across employers exceeds the tax-free threshold ($18,200), you may end up with a tax bill at tax time. The cleanest fix: claim the tax-free threshold from your highest-paying employer only, and ask the others not to apply it. The ATO has a Tax File Number declaration form for this.',
  },
  {
    question: 'Is casual work counted differently for HECS?',
    answer: 'No. HECS repayment is based on your total repayment income across all jobs. If your combined casual income exceeds the HECS threshold for the year, you will have a repayment liability. Some employers withhold it automatically if you tick the HECS box on your TFN declaration; others do not, in which case the full amount is assessed at tax time.',
  },
];

export default function CasualPayCalculatorPage() {
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema(),
        faqSchema(faqs),
        articleSchema({
          headline: 'Casual pay calculator (Australia 2026–27)',
          description: 'Work out your loaded casual hourly rate and what lands in your bank after tax, with sensible defaults for the most common Modern Awards.',
          url: `${brand.url}/casual-pay-calculator`,
        }),
      ]} />

      <article className="max-w-3xl">
        <header className="mb-10">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Calculators', href: '/#calculators' },
            { name: 'Casual pay' },
          ]} />
          <p className="mt-3 text-sm text-brand-600">Calculator · FY 2026–27</p>
          <h1 className="h-display mt-6 text-ink-900">
            Casual pay calculator
          </h1>
          <p className="mt-4 text-base text-ink-600 sm:text-lg">
            Work out your loaded casual hourly rate and what lands in your bank after
            tax. Built for the 1 in 4 Australians paid as casuals, with sensible
            defaults for the most common Modern Awards.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-600">
            <span className="kicker">25% casual loading default</span>
            <span className="kicker">9 common awards</span>
            <span className="kicker">HECS-aware</span>
            <span>Last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time></span>
          </div>
        </header>

        <CasualPayCalculator />

        <section className="prose prose-slate prose-invert mt-14">
          <h2>How casual pay works</h2>
          <p>
            A casual employee is someone who works on a non-regular, as-needed basis
            with no guaranteed hours. In return for that flexibility, casual
            employees receive a loading on top of the ordinary base rate, the
            standard is 25% under most Modern Awards.
          </p>
          <p>
            The loading compensates casuals for missing out on paid leave
            entitlements (4 weeks annual leave, 10 days personal leave, redundancy
            pay). On a base rate of $24.10/hour, the loaded rate is $30.13/hour.
          </p>
          <p>
            The calculator shows the loaded rate and the resulting take-home pay
            after PAYG income tax, the Medicare levy, and any HECS-HELP repayment.
            Superannuation is shown as a separate line because it is an employer
            cost paid on top of your gross pay, not a deduction from your
            hourly rate.
          </p>

          <h2>What this calculator does not do</h2>
          <p>
            Casual pay is more nuanced than the base + loading + tax calculation
            the calculator performs. It does not model:
          </p>
          <ul>
            <li>Penalty rates for evenings, weekends, or public holidays (which are calculated on top of the loaded rate)</li>
            <li>Overtime rates</li>
            <li>Shift allowances</li>
            <li>Higher classifications within an award (use the override field to set your actual base rate)</li>
            <li>Allowances (laundry, uniform, etc.)</li>
          </ul>
          <p>
            For the exact pay rules for your award, use the Fair Work
            Ombudsman&apos;s <a href="https://www.fairwork.gov.au/pay-and-conditions-tools/calculators/penalty-rates-calculator" target="_blank" rel="noopener noreferrer">Pay and Conditions Tool</a>{' '}
            (PACT), it is the authority for award rates, penalty rates, and
            allowances.
          </p>

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
          <h2>How this fits into a broader pay plan</h2>
          <p>
            If you earn income from multiple casual jobs, the calculator handles each one separately, but the ATO adds them up at tax time. Your combined casual income across all employers is what determines your tax bracket, your Medicare levy, and any HECS repayment liability. If your total casual income pushes you into a higher tax bracket, it may be worth sacrificing into super to reduce your repayment income, see our <Link href="/salary-sacrifice-calculator">salary sacrifice calculator</Link>.
          </p>
          <p>
            For most casual workers, the hourly rate they see in the job ad is the base rate before the 25% casual loading. The effective rate (loaded rate) is what they are actually paid per hour. The <strong>hourly wage calculator</strong> side of this tool is designed for that: enter the base rate from the ad, set loading to 25%, and the loaded rate is what you compare offers against.
          </p>
          <p>
            On <strong>holiday entitlement</strong>: casuals do not get paid annual leave, personal leave, or public holidays (with rare exceptions). Instead, the 25% casual loading is meant to compensate for that lost entitlement. The math: paid leave at 4 weeks annual + 2 weeks personal + 10 days personal/carer = about 7.6 weeks. 7.6/52 ≈ 14.6%, which is well below the 25% loading. So in theory, casuals are over-compensated for their lost leave. In practice, the loading is also meant to cover the lack of job security, sick days without pay, and the irregularity of hours, which is why the 25% is the floor, not the ceiling. If you are weighing a casual role against a permanent one, a <strong>holiday entitlement calculator</strong> helps you put a dollar value on the leave you would be giving up, load in your hourly rate, your expected hours, and the number of weeks of paid leave a permanent role would offer, and the difference is the implicit value of the 25% loading.
          </p>
        </section>

        <section className="prose prose-slate prose-invert mt-12 max-w-none">
          <h2>Other tools you might need</h2>
          <ul>
            <li><Link href="/">Main pay calculator</Link>, for permanent roles, salary packaging, and detailed scenarios.</li>
            <li><Link href="/hecs-calculator">HECS-HELP calculator</Link>, see your student debt repayment in isolation.</li>
            <li><Link href="/tax-rates">Tax rates</Link>, current brackets, Medicare thresholds, HECS schedules.</li>
            <li><Link href="/methodology">Methodology</Link>, exactly how every number is calculated.</li>
          </ul>
        </section>
      
        <section className="mt-16">
          <NewsletterForm
            accessKey={process.env.NEXT_PUBLIC_NEWSLETTER_KEY}
            source="casual-pay-calculator"
            heading="Casual pay updates, in your inbox."
            description="When the national minimum wage or Modern Award rates change, we send a short note so you know what to negotiate at your next shift."
          />
        </section>
      </article>
    </>
  );
}
