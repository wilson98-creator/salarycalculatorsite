import Link from 'next/link';
import Image from 'next/image';
import { brand } from '@/lib/brand';
import { ThemeToggle } from './ThemeToggle';
import { useSidebar } from './AppShell';

export function Header() {
  const { toggle, isOpen, isCollapsed } = useSidebar();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/90 backdrop-blur dark:border-ink-800 dark:bg-ink-950/90">
      <div className="flex h-16 items-center justify-between gap-2 px-3 sm:gap-4 sm:px-4 lg:px-6">
        {/* Hamburger — always visible, opens drawer on mobile / toggles nothing on desktop (use the in-sidebar toggle there) */}
        <button
          type="button"
          onClick={toggle}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-ink-700 transition hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label={`${brand.name} home`}>
          {/* Light mode: the designed logo */}
          <Image
            src="/icons/salarycalc-logo.png"
            alt={`${brand.name} — Australian pay calculator`}
            width={220}
            height={60}
            priority
            className="h-9 w-auto sm:h-10 dark:hidden"
          />
          {/* Dark mode: styled text matches the brand colours without a white square */}
          <span className="hidden dark:flex items-baseline gap-0.5" aria-label={brand.name}>
            <span className="text-xl font-bold tracking-tight text-ink-50 sm:text-2xl">Salary</span>
            <span className="text-xl font-bold tracking-tight text-brand-300 sm:text-2xl">Calc</span>
            <span className="ml-1 text-xs font-normal text-ink-400">.au</span>
          </span>
        </Link>

        {/* Top nav: FAQ + About (only) */}
        <nav aria-label="Top" className="ml-auto flex items-center gap-2 text-sm sm:gap-4">
          <Link
            href="/faq"
            className="hidden text-ink-700 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50 sm:inline"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className="text-ink-700 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
