import Link from 'next/link';
import { brand } from '@/lib/brand';
import { useSidebar } from './AppShell';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const { toggle, isOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-50 bg-paper-0/90 backdrop-blur">
      <div className="rule-line absolute inset-x-0 bottom-0" aria-hidden="true" />
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        {/* Hamburger, minimal text, opens the sidebar drawer on mobile */}
        <button
          type="button"
          onClick={toggle}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-600 transition hover:text-ink-800"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>

        {/* Wordmark, sans bold, like a fintech product */}
        <Link
          href="/"
          className="font-sans text-xl font-extrabold tracking-tight text-ink-800 hover:text-ledger-500 sm:text-2xl"
          aria-label={`${brand.name} home`}
        >
          {brand.name}<span className="ml-1 font-mono text-[11px] font-normal tracking-[0.2em] text-ink-600">.au</span>
        </Link>

        {/* Right cluster, top nav + theme toggle */}
        <nav aria-label="Top" className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            href="/faq"
            className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-ink-600 hover:text-ink-800 sm:inline"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-600 hover:text-ink-800"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
