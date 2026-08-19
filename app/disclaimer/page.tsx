import type { Metadata } from 'next';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: `${brand.name} provides estimates only and does not provide financial or tax advice.`,
  alternates: { canonical: '/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-3xl">
      <h1>Disclaimer</h1>
      <p>
        The information and calculators on {brand.name} (the "Service") are
        provided for general informational purposes only. Nothing on the Service
        constitutes financial advice, tax advice, legal advice, or any other
        form of professional advice.
      </p>
      <h2>No reliance</h2>
      <p>
        You should not rely on the output of any calculator on this Service as a
        substitute for professional advice. Pay and tax outcomes depend on
        individual circumstances that this Service does not, and cannot, take
        into account — including but not limited to your full employment
        contract, private health insurance arrangements, reportable fringe
        benefits, study debt indexation, child support obligations, and the
        specifics of any salary packaging arrangement.
      </p>
      <h2>Accuracy</h2>
      <p>
        We make reasonable efforts to keep the rates and formulas on this
        Service current with the Australian Taxation Office. Rates are
        reviewed at the start of each financial year and whenever the federal
        budget is handed down. Despite our efforts, errors may occur. Verify
        any figure used for a binding decision against the ATO's own
        publications or a registered tax agent.
      </p>
      <h2>No professional relationship</h2>
      <p>
        Use of this Service does not create a professional relationship
        between you and {brand.name}, its operators, its contributors, or any
        reviewer named on the site. {brand.name} is not a registered tax agent
        and does not provide taxation services within the meaning of the
        Tax Agent Services Act 2009 (Cth).
      </p>
      <h2>No warranty</h2>
      <p>
        The Service is provided "as is" and "as available" without warranty of
        any kind, express or implied, including but not limited to warranties
        of merchantability, fitness for a particular purpose, or
        non-infringement. {brand.name} does not warrant that the Service will
        be uninterrupted, error-free, or free of harmful components.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {brand.name} and its operators
        are not liable for any loss or damage arising out of or in connection
        with your use of the Service, including any decision made or action
        taken in reliance on the output of any calculator.
      </p>
      <p className="text-sm text-ink-500">Last updated: {brand.lastReviewed}</p>
    </article>
  );
}
