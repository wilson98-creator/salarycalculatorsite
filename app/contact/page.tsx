import type { Metadata } from 'next';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Contact',
  description: `How to get in touch with the ${brand.name} team.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <h1>Contact {brand.name}</h1>
      <p>The fastest way to reach us is email:</p>
      <p>
        <a href={`mailto:${brand.contactEmail}`} className="text-brand-600 font-semibold">
          {brand.contactEmail}
        </a>
      </p>

      <h2>What to contact us about</h2>
      <ul>
        <li><strong>Found a wrong number?</strong> Please include the figure, the ATO source you checked it against, and the date. We fix these within 24 hours.</li>
        <li><strong>Bug report</strong> — describe what you typed, what you expected, and what happened. A screenshot helps.</li>
        <li><strong>Feature request</strong> — what calculator, what it should compute, who would use it.</li>
        <li><strong>Press / partnership / sponsorship</strong> — please use the same email with a clear subject line.</li>
      </ul>

      <h2>What we don't reply to</h2>
      <ul>
        <li>Personal tax advice — talk to a registered tax agent. We're a calculator, not a tax agent.</li>
        <li>"What's my refund?" — we don't have access to your ATO data and we don't store your inputs.</li>
      </ul>
    </article>
  );
}
