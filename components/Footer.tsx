import Link from 'next/link';
import { brand } from '@/lib/brand';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-950">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="font-semibold text-ink-900 dark:text-ink-50">{brand.name}</div>
          <p className="mt-2 text-sm text-ink-600 dark:text-ink-400">{brand.tagline}.</p>
          <p className="mt-3 text-xs text-ink-500 dark:text-ink-500">
            Methodology last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>.
          </p>
          <p className="mt-1 text-xs text-ink-500 dark:text-ink-500">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-100">Calculators</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-600 dark:text-ink-400">
            <li><Link href="/" className="hover:text-brand-600 dark:hover:text-brand-300">Pay calculator</Link></li>
            <li><Link href="/salary-sacrifice-calculator" className="hover:text-brand-600 dark:hover:text-brand-300">Salary sacrifice calculator</Link></li>
            <li><Link href="/hecs-calculator" className="hover:text-brand-600 dark:hover:text-brand-300">HECS-HELP calculator</Link></li>
            <li><Link href="/casual-pay-calculator" className="hover:text-brand-600 dark:hover:text-brand-300">Casual pay calculator</Link></li>
            <li><Link href="/mortgage-calculator" className="hover:text-brand-600 dark:hover:text-brand-300">Mortgage calculator</Link></li>
            <li><Link href="/loan-payoff-calculator" className="hover:text-brand-600 dark:hover:text-brand-300">Loan payoff calculator</Link></li>
            <li><Link href="/tax-rates" className="hover:text-brand-600 dark:hover:text-brand-300">Tax rates</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-100">Learn</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-600 dark:text-ink-400">
            <li><Link href="/guides" className="hover:text-brand-600 dark:hover:text-brand-300">All guides</Link></li>
            <li><Link href="/guides/australian-income-tax" className="hover:text-brand-600 dark:hover:text-brand-300">Income tax</Link></li>
            <li><Link href="/guides/hecs-repayment" className="hover:text-brand-600 dark:hover:text-brand-300">HECS repayment</Link></li>
            <li><Link href="/guides/salary-sacrifice" className="hover:text-brand-600 dark:hover:text-brand-300">Salary sacrifice</Link></li>
            <li><Link href="/faq" className="hover:text-brand-600 dark:hover:text-brand-300">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-100">Trust &amp; legal</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-600 dark:text-ink-400">
            <li><Link href="/methodology" className="hover:text-brand-600 dark:hover:text-brand-300">Methodology</Link></li>
            <li><Link href="/about" className="hover:text-brand-600 dark:hover:text-brand-300">About</Link></li>
            <li><Link href="/disclaimer" className="hover:text-brand-600 dark:hover:text-brand-300">Disclaimer</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-600 dark:hover:text-brand-300">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-brand-600 dark:hover:text-brand-300">Terms</Link></li>
            <li><Link href="/contact" className="hover:text-brand-600 dark:hover:text-brand-300">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-200 dark:border-ink-800">
        <div className="container flex flex-col items-start justify-between gap-2 py-4 text-xs text-ink-500 dark:text-ink-500 sm:flex-row sm:items-center">
          <p>Estimates only — not financial or tax advice. For your actual tax position, consult a registered tax agent.</p>
          <p>Made in Australia. Sources: ATO.</p>
        </div>
      </div>
    </footer>
  );
}
