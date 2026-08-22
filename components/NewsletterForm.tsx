import { brand } from '@/lib/brand';

interface NewsletterFormProps {
  /** Where the form posts. Defaults to Web3Forms. */
  action?: string;
  /** Web3Forms access key. Get one (free) at https://web3forms.com — just enter your email. */
  accessKey?: string;
  /** Source label, appears in the email subject so you can tell where subs came from. */
  source?: string;
  /** Override the default heading. */
  heading?: string;
  /** Override the default description. */
  description?: string;
  /** Layout variant. */
  variant?: 'card' | 'inline' | 'sidebar';
}

/**
 * Newsletter capture form — posts to Web3Forms.
 *
 * Setup (one-time, ~2 minutes):
 *   1. Go to https://web3forms.com
 *   2. Enter your email (hello@thesalarycalc.com.au or whatever you want
 *      subscribers sent to). Click "Get Access Key".
 *   3. Check your email, copy the access key.
 *   4. In Cloudflare Pages, go to salarycalc-au > Settings > Environment variables.
 *      Add: NEXT_PUBLIC_NEWSLETTER_KEY = <your access key>
 *   5. Redeploy (or wait for the next deploy). Subscribers will start arriving
 *      in your inbox with subject "New newsletter subscriber".
 *
 * The form is styled to match SalaryCalc (dark/light mode aware), accessible
 * (labels, focus rings, honeypot for spam), and works as a static form (no
 * server required). It submits via standard HTML form POST.
 */
export function NewsletterForm({
  action = 'https://api.web3forms.com/submit',
  accessKey,
  source = 'salarycalc',
  heading = 'Get Money Briefs in your inbox.',
  description = 'Every Tuesday and Friday we send the week\'s biggest Australian financial news, explained in plain English. Free, no spam, unsubscribe with one click.',
  variant = 'card',
}: NewsletterFormProps) {
  // Fallback so the form still renders if the key isn't set yet — the form
  // will just show a "not configured" message instead of submitting.
  const configured = !!accessKey;

  if (variant === 'inline') {
    return (
      <form
        action={action}
        method="POST"
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <input type="hidden" name="access_key" value={accessKey ?? ''} />
        <input type="hidden" name="subject" value={`[${brand.name}] New Money Briefs subscriber`} />
        <input type="hidden" name="from_name" value={`${brand.name} Newsletter`} />
        <input type="hidden" name="source" value={source} />
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

        <div className="flex-1">
          <label htmlFor={`nl-email-${source}`} className="label">Email address</label>
          <input
            id={`nl-email-${source}`}
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            disabled={!configured}
            className="input"
          />
        </div>
        <button
          type="submit"
          disabled={!configured}
          className="btn rounded-md border border-ledger-500 bg-ledger-500 px-5 py-3 text-sm font-bold text-ink-900 transition hover:bg-ledger-600 hover:border-ledger-600 disabled:opacity-50 sm:py-2"
        >
          Subscribe
        </button>
      </form>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="surface-elevated p-5">
        <p className="kicker">Newsletter</p>
        <p className="mt-2 text-base font-semibold text-ink-800">{heading}</p>
        <p className="mt-2 text-sm text-ink-600">{description}</p>
        <form action={action} method="POST" className="mt-4 flex flex-col gap-2">
          <input type="hidden" name="access_key" value={accessKey ?? ''} />
          <input type="hidden" name="subject" value={`[${brand.name}] New Money Briefs subscriber`} />
          <input type="hidden" name="from_name" value={`${brand.name} Newsletter`} />
          <input type="hidden" name="source" value={source} />
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
          <label htmlFor={`nl-email-${source}`} className="sr-only">Email address</label>
          <input
            id={`nl-email-${source}`}
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            disabled={!configured}
            className="input rounded-md border border-ink-300 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={!configured}
            className="btn rounded-md border border-ledger-500 bg-ledger-500 px-3 py-2 text-sm font-bold text-ink-900 transition hover:bg-ledger-600 disabled:opacity-50"
          >
            {configured ? 'Subscribe' : 'Setup required'}
          </button>
        </form>
      </div>
    );
  }

  // card variant (default)
  return (
    <section
      aria-labelledby={`nl-heading-${source}`}
      className="surface-elevated p-6 sm:p-10"
    >
      <p className="kicker">Newsletter</p>
      <h3
        id={`nl-heading-${source}`}
        className="mt-3 text-2xl font-bold text-ink-800 sm:text-3xl"
      >
        {heading}
      </h3>
      <p className="mt-3 max-w-2xl text-base text-ink-700 sm:text-lg">
        {description}
      </p>
      <form
        action={action}
        method="POST"
        className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4"
      >
        <input type="hidden" name="access_key" value={accessKey ?? ''} />
        <input type="hidden" name="subject" value={`[${brand.name}] New Money Briefs subscriber`} />
        <input type="hidden" name="from_name" value={`${brand.name} Newsletter`} />
        <input type="hidden" name="source" value={source} />
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

        <div className="flex-1">
          <label htmlFor={`nl-email-${source}`} className="label">Email address</label>
          <input
            id={`nl-email-${source}`}
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            disabled={!configured}
            autoComplete="email"
            className="input"
          />
        </div>
        <button
          type="submit"
          disabled={!configured}
          className="btn rounded-md border border-ledger-500 bg-ledger-500 px-6 py-3 text-base font-bold text-ink-900 transition hover:bg-ledger-600 hover:border-ledger-600 disabled:opacity-50 sm:py-2"
        >
          {configured ? 'Subscribe →' : 'Setup required'}
        </button>
      </form>
      <p className="mt-3 text-xs text-ink-500">
        Free, twice a week, unsubscribe with one click. We never share your email.
        {!configured && (
          <>
            {' '}Form is not configured yet — see README for the 2-minute setup.
          </>
        )}
      </p>
    </section>
  );
}
