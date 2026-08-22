'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'salarycalc_theme';

/**
 * Theme toggle — light / dark. Default is dark (the site's primary mode).
 * Persists choice in localStorage. Avoids hydration mismatch by rendering
 * a placeholder until mounted, then showing the real toggle.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // On mount, read the stored choice (or fall back to current DOM state).
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const initial = stored ?? current;
    setTheme(initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.style.colorScheme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  // Avoid hydration mismatch — render a placeholder until mounted.
  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="inline-block h-5 w-12 rounded-full border border-ink-400"
      />
    );
  }

  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative inline-flex h-6 w-11 items-center rounded-full border border-ink-400 transition hover:border-ledger-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-ledger-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-0"
    >
      <span
        aria-hidden="true"
        className={`inline-flex h-4 w-4 transform items-center justify-center rounded-full text-[10px] transition ${
          isDark
            ? 'translate-x-6 bg-ledger-500 text-ink-900'
            : 'translate-x-1 bg-paper-0 text-ink-700'
        }`}
      >
        {isDark ? '☾' : '☀'}
      </span>
    </button>
  );
}
