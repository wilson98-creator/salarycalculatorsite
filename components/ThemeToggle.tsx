'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'salarycalc_theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  // Always start as 'light' for SSR consistency; the effect below reconciles
  // to the user's stored preference or system setting on mount.
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  // React to system preference changes when the user hasn't explicitly chosen
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== 'light' && stored !== 'dark') {
        const next: Theme = e.matches ? 'dark' : 'light';
        setTheme(next);
        applyTheme(next);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  // Avoid hydration mismatch — render a placeholder until mounted.
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-700 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
      >
        —
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-700 transition hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
