import Link from 'next/link';
import { brand } from '@/lib/brand';

export function Footer() {
  return (
    <footer className="footer-black mt-32">
      <div className="rule-line absolute inset-x-0 top-0 border-white/10" aria-hidden="true" />
      <div className="container grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="font-serif text-2xl italic">
            {brand.name}<span className="not-italic font-mono text-[11px] tracking-[0.15em] text-ink-500">.au</span>
          </div>
          <p className="mt-3 text-sm text-ink-400">
            {brand.tagline}.
          </p>
          <p className="footer-meta mt-6">
            Last reviewed {brand.lastReviewed}
          </p>
        </div>
        <div>
          <h3 className="footer-meta">Calculators</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-300">
            <li><Link href="/" className="hover:text-white">Pay calculator</Link></li>
            <li><Link href="/salary-sacrifice-calculator" className="hover:text-white">Salary sacrifice</Link></li>
            <li><Link href="/hecs-calculator" className="hover:text-white">HECS-HELP</Link></li>
            <li><Link href="/casual-pay-calculator" className="hover:text-white">Casual pay</Link></li>
            <li><Link href="/mortgage-calculator" className="hover:text-white">Mortgage</Link></li>
            <li><Link href="/loan-payoff-calculator" className="hover:text-white">Loan payoff</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-meta">Reference</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-300">
            <li><Link href="/tax-rates" className="hover:text-white">Tax rates</Link></li>
            <li><Link href="/methodology" className="hover:text-white">Methodology</Link></li>
            <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-meta">Trust</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-300">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/.well-known/security.txt" className="hover:text-white">Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-start justify-between gap-3 py-6 text-xs sm:flex-row sm:items-center">
          <p className="footer-meta">Estimates only — not financial or tax advice. For your actual tax position, consult a registered tax agent.</p>
          <p className="footer-meta">Made in Australia · ATO-sourced · © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
