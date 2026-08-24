import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { Breadcrumb } from '@/components/Breadcrumb';
import { NewsletterForm } from '@/components/NewsletterForm';
import { JsonLd, articleSchema, breadcrumbSchema } from '@/components/Schema';

export const metadata: Metadata = {
  title: 'Security Policy, How to report a vulnerability',
  description: `How to report a security issue to ${brand.name}, what is in scope, what is not, our safe-harbour statement, and how we coordinate disclosure.`,
  alternates: { canonical: '/security-policy/' },
  openGraph: {
    title: 'Security Policy, How to report a vulnerability',
    description: `How to report a security issue to ${brand.name}, what is in scope, what is not, our safe-harbour statement, and how we coordinate disclosure.`,
    url: `${brand.url}/security-policy/`,
    type: 'article',
  },
};

export default function SecurityPolicyPage() {
  const updated = '2026-08-23';
  const contactEmail = 'hello@thesalarycalc.com.au';

  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Trust', href: '/about/' },
          { name: 'Security policy' },
        ]}
      />

      <article className="max-w-3xl">
        <header className="mb-10">
          <p className="mt-3 text-sm text-ink-600">Trust · Policy</p>
          <h1 className="h-display mt-3 text-ink-800">
            Security policy.
          </h1>
          <p className="mt-4 text-base text-ink-700 sm:text-lg">
            How to report a security issue to us, what we will do about it,
            what is in scope, what is not, and the legal protection we
            offer good-faith researchers. Last updated{' '}
            <time dateTime={updated}>{updated}</time>.
          </p>
        </header>

        <section className="prose-content">
          <h2>Our commitment</h2>
          <p>
            {brand.name} is a free web application for Australian take-home pay,
            tax, and super calculations. We take the security of the site and
            the data that flows through it seriously. This page explains how
            to report a security issue to us, what we will do about it, and
            the legal protection we offer researchers who act in good faith.
          </p>
        </section>

        <section className="prose-content">
          <h2>What is in scope</h2>
          <p>
            The following are within scope for security reports:
          </p>
          <ul>
            <li>{brand.url.replace('https://', '')} and all its subdomains</li>
            <li>The web application (Next.js client, Cloudflare Pages edge)</li>
            <li>The Money Briefs auto-generation pipeline (GitHub Actions)</li>
            <li>Our public RSS sources (RBA, SMH, The Age, The Guardian Australia)</li>
            <li>Cross-site scripting (XSS), cross-site request forgery (CSRF), and other web app vulnerabilities</li>
            <li>Authentication and session handling (if added in future)</li>
            <li>Calculator input handling and output escaping</li>
            <li>Subresource integrity and third-party script loading</li>
            <li>Information disclosure (leaked keys, debug info, etc.)</li>
            <li>Server-side request forgery (SSRF) in any future backend</li>
          </ul>
        </section>

        <section className="prose-content">
          <h2>What is out of scope</h2>
          <p>
            The following are not in scope, and we ask researchers not to spend
            time investigating them:
          </p>
          <ul>
            <li>Third-party services we link to (ato.gov.au, rba.gov.au, abs.gov.au, etc.)</li>
            <li>The Cloudflare Pages platform itself (report to Cloudflare)</li>
            <li>The Groq LLM API and its outputs (report to Groq)</li>
            <li>Web3Forms' submission service (report to Web3Forms)</li>
            <li>Social engineering of our team</li>
            <li>Denial-of-service attacks (the edge absorbs these)</li>
            <li>Spam or content injection through the newsletter form (already rate-limited)</li>
            <li>Rate-limit or quota-limit discoveries</li>
            <li>Clickjacking on pages with no authenticated state (the calculator is anonymous)</li>
            <li>Missing security headers on third-party resources we embed (Google AdSense, etc.)</li>
            <li>Theoretical vulnerabilities without a working proof of concept</li>
            <li>Automated scanner output without manual verification</li>
            <li>Recent CVEs without a demonstrated impact on SalaryCalc</li>
          </ul>
        </section>

        <section className="prose-content">
          <h2>How to report</h2>
          <p>
            Send a detailed report to{' '}
            <code className="rounded bg-ink-200 px-1.5 py-0.5 font-mono text-sm text-ink-800">{contactEmail}</code>{' '}
            or via the <Link href="/contact">contact page</Link>.
          </p>
          <p>Your report should include:</p>
          <ul>
            <li>A clear description of the vulnerability and its impact</li>
            <li>Step-by-step reproduction instructions (URLs, inputs, expected vs actual)</li>
            <li>A proof of concept (screenshots, code, or a short video)</li>
            <li>Your name and how you would like to be credited, or "anonymous"</li>
            <li>Whether the issue is currently being exploited in the wild</li>
          </ul>
          <p>Please do <em>not</em>:</p>
          <ul>
            <li>File a public issue on our GitHub repository</li>
            <li>Post on social media, blogs, or anywhere public</li>
            <li>Disclose the issue to anyone other than our security team</li>
            <li>Exfiltrate, modify, or destroy any user data</li>
            <li>Use the vulnerability to access data beyond what is needed to prove the issue</li>
            <li>Attempt phishing or social engineering against our team or users</li>
          </ul>
        </section>

        <section className="prose-content">
          <h2>What to expect from us</h2>
          <ul>
            <li>Acknowledgement of your report within 2 business days</li>
            <li>An initial assessment within 5 business days</li>
            <li>Status updates as we investigate, develop, and deploy a fix</li>
            <li>A coordinated disclosure timeline agreed with you</li>
            <li>Public credit on our{' '}
              <Link href="/security-acknowledgments/">Security Acknowledgements</Link>{' '}
              page, unless you prefer to stay anonymous
            </li>
          </ul>
        </section>

        <section className="prose-content">
          <h2>Safe harbour</h2>
          <p>
            We will not pursue legal action against security researchers who,
            in good faith:
          </p>
          <ul>
            <li>Make a good-faith effort to avoid privacy violations, data destruction, or service disruption</li>
            <li>Only interact with accounts they own or have explicit permission to access</li>
            <li>Stop testing immediately if they encounter user data and report it to us</li>
            <li>Do not exploit a vulnerability beyond what is necessary to demonstrate it</li>
            <li>Give us a reasonable amount of time to fix the issue before public disclosure (typically 90 days, negotiable)</li>
          </ul>
          <p>
            We will work with the legal system in your jurisdiction if a third
            party (such as a law-enforcement agency) attempts to take action
            against you for activity that we have authorised under this policy.
          </p>
        </section>

        <section className="prose-content">
          <h2>No paid bounty program</h2>
          <p>
            {brand.name} is a small, free service run by a single founder.
            We do not currently operate a paid bug bounty program.
            Researchers who report valid issues receive public credit on our
            acknowledgements page. If you would like to be paid for your
            work, please do not test without prior arrangement.
          </p>
        </section>

        <section className="prose-content">
          <h2>Out-of-band reports</h2>
          <p>
            If email is not appropriate (for example, you need to encrypt a
            large proof-of-concept file),{' '}
            <Link href="/contact">contact us</Link> first to
            arrange an alternative channel. We can publish a PGP public key
            on request.
          </p>
        </section>

        <section className="prose-content">
          <h2>Recognition</h2>
          <p>
            Researchers who report valid, in-scope issues are credited on
            our{' '}
            <Link href="/security-acknowledgments/">Security Acknowledgements</Link>{' '}
            page once a fix is deployed, unless they prefer to stay
            anonymous. Hall of fame entries include a link to the
            researcher's preferred profile (personal site, blog, Mastodon,
            LinkedIn) where appropriate.
          </p>
        </section>

        <section className="prose-content">
          <h2>Thank you</h2>
          <p>
            Thank you for helping keep {brand.name} and its users safe.
            Every responsible disclosure makes the site better for the
            millions of Australians who use a pay calculator each year.
          </p>
        </section>

        <section className="mt-12 rounded-lg border border-ink-300 bg-ink-100 p-5 text-sm text-ink-700">
          <p className="kicker">Quick reference</p>
          <p className="mt-2">
            Email security reports to{' '}
            <code className="rounded bg-ink-200 px-1.5 py-0.5 font-mono text-sm text-ink-800">{contactEmail}</code>. Do not file
            public issues. We will credit you on the{' '}
            <Link href="/security-acknowledgments/">Acknowledgements</Link>{' '}
            page unless you ask to stay anonymous.
          </p>
        </section>

        <NewsletterForm
          accessKey={process.env.NEXT_PUBLIC_NEWSLETTER_KEY}
          source="security-policy"
          heading="Stay in the loop on security updates."
          description="If we make a material change to this policy or to the security posture of the site, we will mention it in a Money Brief."
        />
      </article>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: brand.url },
            { name: 'Security policy', url: `${brand.url}/security-policy/` },
          ]),
          articleSchema({
            headline: 'Security policy',
            description: `How to report a security issue to ${brand.name}, what is in scope, what is not, our safe-harbour statement, and how we coordinate disclosure.`,
            url: `${brand.url}/security-policy/`,
            datePublished: '2026-08-23',
          }),
        ]}
      />
    </>
  );
}
