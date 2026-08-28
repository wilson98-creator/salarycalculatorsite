'use client';

import { useEffect } from 'react';

declare global {
  // Window.adsbygoogle is filled in by the script that the root layout
  // loads from googlesyndication.com. We just need to push a new entry
  // for each <ins> ad unit on the page.
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * In-article AdSense ad unit.
 *
 * Placement rules of thumb:
 *   - mid-article, after the 3rd or 4th H2 (the reader has scrolled
 *     past the intro and is still engaged);
 *   - never at the very top (hurts CTR and looks spammy);
 *   - only one per article (AdSense policy).
 *
 * The ad slot ID is shared across the site, so Google can rotate which
 * ad actually shows. Width auto-fits the container — the in-article
 * format is "fluid" by design.
 */
export function InArticleAd({ slot = '3151983303' }: { slot?: string }) {
  useEffect(() => {
    // Push this ad unit to the AdSense queue. The global script
    // (loaded once from the root layout) picks it up and fills the <ins>.
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense is best-effort; never break the page if the script is
      // blocked by an ad blocker or hasn't loaded yet.
    }
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className="not-prose my-10 max-w-3xl"
    >
      <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 dark:text-ink-600">
        Advertisement
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-3088783706802319"
        data-ad-slot={slot}
      />
    </aside>
  );
}
