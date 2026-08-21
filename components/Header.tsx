import Link from 'next/link';
import { brand } from '@/lib/brand';
import { ThemeToggle } from './ThemeToggle';
import { useSidebar } from './AppShell';

export function Header() {
  const { toggle, isOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur dark:bg-ink-950/90">
      <div className="rule-line absolute inset-x-0 bottom-0" aria-hidden="true" />
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        {/* Hamburger — minimal text, opens the sidebar drawer on mobile */}
        <button
          type="button"
          onClick={toggle}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-700 transition hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>

        {/* Wordmark — serif italic, like a publication masthead */}
        <Link
          href="/"
          className="font-serif text-xl italic text-ink-900 hover:text-ink-700 dark:text-ink-50 dark:hover:text-ink-200 sm:text-2xl"
          aria-label={`${brand.name} home`}
        >
          {brand.name}<span className="not-italic font-mono text-[11px] tracking-[0.15em] text-ink-500">.au</span>
        </Link>

        {/* Right cluster — top nav + theme toggle, all monospace */}
        <nav aria-label="Top" className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            href="/faq"
            className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-ink-700 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50 sm:inline"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-700 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
