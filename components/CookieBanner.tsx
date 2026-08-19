'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'salarycalc_cookie_consent';

type Consent = 'accepted' | 'rejected' | null;

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY)) as Consent;
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored);
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  const decide = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 max-w-3xl rounded-2xl border border-ink-200 bg-white p-4 shadow-lg dark:border-ink-700 dark:bg-ink-900 sm:bottom-4 sm:left-4 sm:right-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-ink-700 dark:text-ink-300">
          <p className="font-semibold text-ink-900 dark:text-ink-50">We use cookies</p>
          <p>
            SalaryCalc uses cookies for analytics and to show advertising that supports the site. You can accept all or reject non-essential cookies.{' '}
            <a href="/privacy" className="text-brand-600 underline-offset-2 hover:underline dark:text-brand-300">Privacy policy</a>
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            className="btn-ghost"
            onClick={() => decide('rejected')}
          >
            Reject
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => decide('accepted')}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
