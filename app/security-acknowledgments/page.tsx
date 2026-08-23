import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Breadcrumb } from '@/components/Breadcrumb';
import { NewsletterForm } from '@/components/NewsletterForm';
import { JsonLd, articleSchema, breadcrumbSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Acknowledgements, credits, and security thanks',
  description: `${brand.name} thanks the open source projects, data sources, and security researchers that make the site possible.`,
  alternates: { canonical: '/security-acknowledgments/' },
  openGraph: {
    title: 'Acknowledgements, credits, and security thanks',
    description: `${brand.name} thanks the open source projects, data sources, and security researchers that make the site possible.`,
    url: `${brand.url}/security-acknowledgments/`,
    type: 'article',
  },
};

interface Acknowledgement {
  name: string;
  date?: string;
  contribution: string;
  link?: { label: string; href: string };
}

const securityAcknowledgements: Acknowledgement[] = [
  // Will be populated as researchers report in-scope issues.
  // Format: { name, date, contribution, link? }
];

const openSource: Acknowledgement[] = [
  {
    name: 'Next.js',
    contribution:
      'The React framework that powers SalaryCalc. Static export, app router, and image optimisation out of the box.',
    link: { label: 'nextjs.org', href: 'https://nextjs.org/' },
  },
  {
    name: 'React',
    contribution:
      'The UI library that renders every page and calculator on the site.',
    link: { label: 'react.dev', href: 'https://react.dev/' },
  },
  {
    name: 'Tailwind CSS',
    contribution:
      'The utility-first CSS framework behind the Premium Dark design system on this site.',
    link: { label: 'tailwindcss.com', href: 'https://tailwindcss.com/' },
  },
  {
    name: '@tailwindcss/typography',
    contribution:
      'The prose styles for long-form articles (guides, methodology, policy pages).',
    link: {
      label: 'github.com',
      href: 'https://github.com/tailwindlabs/tailwindcss-typography',
    },
  },
  {
    name: 'fast-xml-parser (and Node.js XML built-ins)',
    contribution:
      'Used by the Money Briefs RSS ingestion pipeline to parse feeds from the RBA, SMH, The Age, and The Guardian Australia.',
  },
];

const dataSources: Acknowledgement[] = [
  {
    name: 'Australian Taxation Office (ATO)',
    contribution:
      'Tax brackets, Medicare levy, Low Income Tax Offset (LITO), HECS-HELP repayment schedule, Stage 3 tax cuts, and every other rate in our calculator.',
    link: { label: 'ato.gov.au', href: 'https://www.ato.gov.au/' },
  },
  {
    name: 'Reserve Bank of Australia (RBA)',
    contribution:
      'Cash rate decisions, monetary policy statements, and the source of the rate that drives Australian mortgage and savings pricing.',
    link: { label: 'rba.gov.au', href: 'https://www.rba.gov.au/' },
  },
  {
    name: 'Australian Bureau of Statistics (ABS)',
    contribution:
      'Wage Price Index, Consumer Price Index (CPI), labour force survey, and other official economic statistics that we cite in the Money Briefs.',
    link: { label: 'abs.gov.au', href: 'https://www.abs.gov.au/' },
  },
  {
    name: 'Fair Work Commission',
    contribution:
      'Modern Award rates, the national minimum wage, and the penalty rates that determine casual and weekend pay.',
    link: { label: 'fwc.gov.au', href: 'https://www.fwc.gov.au/' },
  },
  {
    name: 'Fair Work Ombudsman',
    contribution:
      'The Pay and Conditions Tool (PACT) for verifying award entitlements and penalty rate calculations.',
    link: { label: 'fairwork.gov.au', href: 'https://www.fairwork.gov.au/' },
  },
  {
    name: 'Department of Social Services',
    contribution:
      'Medicare levy surcharge thresholds, family assistance, and the Low Income Health Care Card rules.',
    link: { label: 'dss.gov.au', href: 'https://www.dss.gov.au/' },
  },
];

const toolsAndServices: Acknowledgement[] = [
  {
    name: 'Cloudflare Pages',
    contribution:
      'Hosting, global edge caching, HTTP/3, Brotli compression, automatic HTTPS, and Bot Fight Mode.',
    link: { label: 'pages.cloudflare.com', href: 'https://pages.cloudflare.com/' },
  },
  {
    name: 'Cloudflare',
    contribution:
      'DNS, security headers (HSTS, X-Content-Type-Options, X-Frame-Options), and DDoS protection.',
    link: { label: 'cloudflare.com', href: 'https://www.cloudflare.com/' },
  },
  {
    name: 'GitHub',
    contribution:
      'Source control, GitHub Actions (the cron that auto-publishes the Money Briefs every Tuesday and Friday), and issue tracking.',
    link: { label: 'github.com', href: 'https://github.com/' },
  },
  {
    name: 'Groq',
    contribution:
      'LPU inference for the Money Briefs auto-generation pipeline. Llama 3.3 70B powers the plain-English explanations.',
    link: { label: 'groq.com', href: 'https://groq.com/' },
  },
  {
    name: 'Web3Forms',
    contribution:
      'The form-submission service behind the newsletter signup. Submissions arrive directly in the editor inbox.',
    link: { label: 'web3forms.com', href: 'https://web3forms.com/' },
  },
  {
    name: 'Google AdSense',
    contribution: 'The ad serving on the calculators and guides that funds the site.',
    link: { label: 'adsense.google.com', href: 'https://www.google.com/adsense/' },
  },
];

const designInspiration: Acknowledgement[] = [
  {
    name: 'Bankrate',
    contribution:
      'The original "calculator with explainer" pattern. Heavy data, lots of supporting context, no fluff.',
    link: { label: 'bankrate.com', href: 'https://www.bankrate.com/' },
  },
  {
    name: 'SmartAsset',
    contribution:
      'The financial-dashboard information density and the side-by-side comparison UI.',
    link: { label: 'smartasset.com', href: 'https://smartasset.com/' },
  },
  {
    name: 'Which?',
    contribution:
      'The editorial-ledger clarity, the trust-link pattern, and the methodology-first tone.',
    link: { label: 'which.co.uk', href: 'https://www.which.co.uk/' },
  },
  {
    name: 'Ratehub',
    contribution:
      'The "side-by-side inputs and outputs" calculator layout and the "what this means for you" callouts.',
    link: { label: 'ratehub.ca', href: 'https://www.ratehub.ca/' },
  },
  {
    name: 'Calculator.net',
    contribution:
      'The long-tail SEO play: thousands of niche calculators covering every variant of a financial question.',
    link: { label: 'calculator.net', href: 'https://www.calculator.net/' },
  },
];

const moneyBriefSources: Acknowledgement[] = [
  {
    name: 'Reserve Bank of Australia',
    contribution: 'Media releases on the cash rate and monetary policy decisions.',
    link: { label: 'rba.gov.au/media-releases', href: 'https://www.rba.gov.au/media-releases/' },
  },
  {
    name: 'Sydney Morning Herald',
    contribution: 'Business, markets, and property coverage.',
    link: { label: 'smh.com.au/business', href: 'https://www.smh.com.au/business' },
  },
  {
    name: 'The Age',
    contribution: 'Business, economics, and personal finance coverage.',
    link: { label: 'theage.com.au/business', href: 'https://www.theage.com.au/business' },
  },
  {
    name: 'The Guardian Australia',
    contribution: 'Business, wages, super, and household economics coverage.',
    link: { label: 'theguardian.com/au', href: 'https://www.theguardian.com/au/business' },
  },
];

function AckList({ items }: { items: Acknowledgement[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-ink-300 bg-ink-100 p-4 text-sm text-ink-600">
        No acknowledgements in this category yet.
      </p>
    );
  }
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.name} className="rounded-lg border border-ink-300 bg-ink-100 p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h3 className="text-lg font-semibold text-ink-800">{item.name}</h3>
            {item.link && (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.15em] text-ink-600 underline decoration-1 underline-offset-4 hover:text-ledger-500"
              >
                {item.link.label} ↗
              </a>
            )}
            {item.date && (
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-500">
                {item.date}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-ink-700 sm:text-base">{item.contribution}</p>
        </li>
      ))}
    </ul>
  );
}

export default function SecurityAcknowledgementsPage() {
  const updated = '2026-08-23';

  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Trust', href: '/about/' },
          { name: 'Acknowledgements' },
        ]}
      />

      <article className="max-w-3xl">
        <header className="mb-10">
          <p className="mt-3 text-sm text-ink-600">Trust · Acknowledgements</p>
          <h1 className="h-display mt-3 text-ink-800">
            Acknowledgements.
          </h1>
          <p className="mt-4 text-base text-ink-700 sm:text-lg">
            {brand.name} is built on the work of many. This page thanks the
            security researchers, open source projects, data sources, and
            services that make the site possible. Last updated{' '}
            <time dateTime={updated}>{updated}</time>.
          </p>
        </header>

        {/* Security researchers */}
        <section className="prose-content">
          <h2>Security researchers</h2>
          <p>
            We are grateful to the security researchers who have helped us
            find and fix issues in {brand.name}. If you would like to report
            a vulnerability, see our{' '}
            <Link href="/security-policy/">Security Policy</Link> for how to
            do it. Valid reports are credited here once a fix is deployed,
            unless the researcher prefers to stay anonymous.
          </p>
          <AckList items={securityAcknowledgements} />
          {securityAcknowledgements.length === 0 && (
            <p className="mt-4 text-sm text-ink-600">
              No responsible disclosures to date. This section will be
              updated as the first one is received and fixed.
            </p>
          )}
        </section>

        {/* Open source */}
        <section className="prose-content">
          <h2>Open source</h2>
          <p>
            {brand.name} is built on the work of the open source community.
            Thank you to the maintainers and contributors of every project
            below.
          </p>
          <AckList items={openSource} />
        </section>

        {/* Data sources */}
        <section className="prose-content">
          <h2>Data sources</h2>
          <p>
            Every rate, threshold, and coefficient in our calculators comes
            from a public Australian government or regulatory source. We
            cite the source on every result row in the calculator and on
            the <Link href="/methodology/">Methodology</Link> page.
          </p>
          <AckList items={dataSources} />
        </section>

        {/* Tools and services */}
        <section className="prose-content">
          <h2>Tools and services</h2>
          <p>
            The infrastructure and services that host, build, and distribute
            the site.
          </p>
          <AckList items={toolsAndServices} />
        </section>

        {/* Money Briefs sources */}
        <section className="prose-content">
          <h2>Money Briefs sources</h2>
          <p>
            The Tuesday and Friday Money Briefs are summarised from these
            trusted Australian financial news outlets. Each brief links
            back to the original article and credits the source.
          </p>
          <AckList items={moneyBriefSources} />
        </section>

        {/* Design inspiration */}
        <section className="prose-content">
          <h2>Design inspiration</h2>
          <p>
            The Premium Dark design system draws inspiration from, but does
            not copy, several established calculator and finance sites
            whose UX patterns we admire.
          </p>
          <AckList items={designInspiration} />
        </section>

        {/* Team */}
        <section className="prose-content">
          <h2>The team</h2>
          <p>
            {brand.name} is designed, built, and maintained by a single
            Australian founder. All editorial decisions, rate updates, and
            content are produced in-house. See the{' '}
            <Link href="/about/">About page</Link> for the full story.
          </p>
        </section>

        <NewsletterForm
          accessKey={process.env.NEXT_PUBLIC_NEWSLETTER_KEY}
          source="security-acknowledgments"
          heading="Be the first to know about updates."
          description="When we add a new acknowledgement (a security researcher, a new data source, a new tool), we will mention it in a Money Brief."
        />
      </article>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: brand.url },
            { name: 'Acknowledgements', url: `${brand.url}/security-acknowledgments/` },
          ]),
          articleSchema({
            headline: 'Acknowledgements',
            description: `${brand.name} thanks the open source projects, data sources, and security researchers that make the site possible.`,
            url: `${brand.url}/security-acknowledgments/`,
            datePublished: '2026-08-23',
          }),
        ]}
      />
    </>
  );
}
