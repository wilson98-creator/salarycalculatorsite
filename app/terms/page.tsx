import type { Metadata } from 'next';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Terms of use',
  description: `Terms governing your use of ${brand.name}.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <h1>Terms of use</h1>
      <p>By using {brand.name} (the "Service") you agree to the following terms.</p>

      <h2>1. Use of the Service</h2>
      <p>
        The Service is provided free of charge for personal, non-commercial use.
        You agree not to use the Service for any unlawful purpose or in any way
        that could damage, disable, overburden, or impair the Service.
      </p>

      <h2>2. No professional advice</h2>
      <p>
        The Service provides general information and estimates. It is not a
        substitute for professional financial, tax, or legal advice tailored
        to your circumstances. See our <a href="/disclaimer">disclaimer</a>.
      </p>

      <h2>3. Intellectual property</h2>
      <p>
        All content on the Service (text, design, code, brand) is owned by
        {brand.name} or its licensors. You may not copy, republish, or
        commercially exploit the content without written permission.
      </p>

      <h2>4. Third-party links and ads</h2>
      <p>
        The Service may contain links to third-party websites and display
        third-party advertising. We are not responsible for the content or
        practices of those third parties.
      </p>

      <h2>5. Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the
        Service after changes constitutes acceptance of the new terms.
      </p>

      <h2>6. Governing law</h2>
      <p>
        These terms are governed by the laws of New South Wales, Australia.
        Any dispute will be subject to the exclusive jurisdiction of the
        courts of New South Wales.
      </p>

      <h2>7. Contact</h2>
      <p>Questions? Email <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>.</p>

      <p className="text-sm text-ink-500">Last updated: {brand.lastReviewed}</p>
    </article>
  );
}
