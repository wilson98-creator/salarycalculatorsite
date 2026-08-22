import Link from 'next/link';
import { brand } from '@/lib/brand';

export type Crumb = { name: string; href?: string };

/** Visual breadcrumb + matching schema. Pass the canonical chain for
 *  both UI rendering and JSON-LD. The last item is the current page
 *  and is rendered as non-link text. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.href ? { item: `${brand.url}${it.href}` } : {}),
    })),
  };
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-xs text-ink-600">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((it, i) => (
            <li key={`${it.name}-${i}`} className="flex items-center gap-1.5">
              {it.href ? (
                <Link href={it.href} className="hover:text-brand-600">
                  {it.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink-700">{it.name}</span>
              )}
              {i < items.length - 1 && <span aria-hidden="true" className="text-ink-600">/</span>}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
