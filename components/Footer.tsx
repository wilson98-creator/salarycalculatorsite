import Link from 'next/link';
import { brand } from '@/lib/brand';

export function Footer() {
  return (
    <footer className="mt-16 bg-footer-900 text-ink-100 dark:bg-footer-900">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="font-semibold text-white">{brand.name}</div>
          <p className="mt-2 text-sm text-ink-300">{brand.tagline}.</p>
          <p className="mt-3 text-xs text-ink-400">
            Methodology last reviewed <time dateTime={brand.lastReviewed}>{brand.lastReviewed}</time>.
          </p>
          <p className="mt-1 text-xs text-ink-400">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Calculators</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-300">
            <li><Link href="/" className="hover:text-white">Pay calculator</Link></li>
            <li><Link href="/salary-sacrifice-calculator" className="hover:text-white">Salary sacrifice calculator</Link></li>
            <li><Link href="/hecs-calculator" className="hover:text-white">HECS-HELP calculator</Link></li>
            <li><Link href="/casual-pay-calculator" className="hover:text-white">Casual pay calculator</Link></li>
            <li><Link href="/mortgage-calculator" className="hover:text-white">Mortgage calculator</Link></li>
            <li><Link href="/loan-payoff-calculator" className="hover:text-white">Loan payoff calculator</Link></li>
            <li><Link href="/tax-rates" className="hover:text-white">Tax rates</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Learn</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-300">
            <li><Link href="/guides" className="hover:text-white">All guides</Link></li>
            <li><Link href="/guides/australian-income-tax" className="hover:text-white">Income tax</Link></li>
            <li><Link href="/guides/hecs-repayment" className="hover:text-white">HECS repayment</Link></li>
            <li><Link href="/guides/salary-sacrifice" className="hover:text-white">Salary sacrifice</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Trust &amp; legal</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-300">
            <li><Link href="/methodology" className="hover:text-white">Methodology</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-start justify-between gap-2 py-4 text-xs text-ink-400 sm:flex-row sm:items-center">
          <p>Estimates only — not financial or tax advice. For your actual tax position, consult a registered tax agent.</p>
          <p>Made in Australia. Sources: ATO.</p>
        </div>
      </div>
    </footer>
  );
}
