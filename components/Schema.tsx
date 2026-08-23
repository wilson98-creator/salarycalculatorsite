import { brand } from '@/lib/brand';
import { sources } from '@/lib/tax/sources';

type JsonLd = Record<string, unknown> | Record<string, unknown>[];

/** Inject JSON-LD structured data into the page. */
export function JsonLd({ data }: { data: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      // The data is constructed server-side from typed sources; safe to dangerouslySetInnerHTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${brand.url}/#organization`,
    name: brand.name,
    url: brand.url,
    description: brand.shortDescription,
    foundingDate: brand.foundingDate,
    email: brand.contactEmail,
    areaServed: { '@type': 'Country', name: 'Australia' },
    inLanguage: brand.language,
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${brand.url}/#website`,
    url: brand.url,
    name: brand.name,
    description: brand.shortDescription,
    inLanguage: brand.language,
    publisher: { '@id': `${brand.url}/#organization` },
  };
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${brand.name} – Pay Calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any (web browser)',
    url: brand.url,
    description:
      'Free Australian take-home pay calculator. Applies ATO resident and non-resident income tax brackets, Medicare levy, LITO, and HECS-HELP repayment for the selected financial year.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
    featureList: [
      'PAYG income tax by ATO brackets',
      'Medicare levy (with low-income shade-in)',
      'Low Income Tax Offset (LITO)',
      'HECS-HELP / VSL / SFSS repayment estimate',
      'Superannuation guarantee shown separately',
      'Hourly, daily, weekly, fortnightly, monthly and annual pay periods',
      'Resident, non-resident and working holiday maker scenarios',
      'Methodology and source citations published',
    ],
    isAccessibleForFree: true,
    publisher: { '@id': `${brand.url}/#organization` },
    dateModified: brand.lastReviewed,
  };
}

export function faqSchema(qa: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** HowTo schema for guides that walk the user through a process
 *  (e.g. "How to calculate your Australian tax"). Powers rich results. */
export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** Article schema for long-form guides. */
export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  /** Optional per-page image URL. Falls back to the brand logo. */
  image?: string;
}) {
  // Google requires an `image` array for Article rich results. The image
  // should be at least 1200px wide for max-display. We default to the
  // brand logo; pages with a hero image should pass their own.
  const imageUrl = opts.image ?? `${brand.url}/icons/salarycalc-logo.png`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    url: opts.url,
    image: [imageUrl],
    author: { '@id': `${brand.url}/#organization` },
    publisher: {
      '@id': `${brand.url}/#organization`,
      name: brand.name,
      logo: {
        '@type': 'ImageObject',
        url: `${brand.url}/icons/salarycalc-logo.png`,
      },
    },
    datePublished: opts.datePublished ?? '2025-01-01',
    dateModified: opts.dateModified ?? brand.lastReviewed,
    inLanguage: brand.language,
    isPartOf: { '@id': `${brand.url}/#website` },
  };
}

/** WebSite schema with SearchAction, powers Google sitelinks search box. */
export function websiteWithSearchActionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${brand.url}/#website`,
    url: brand.url,
    name: brand.name,
    description: brand.shortDescription,
    inLanguage: brand.language,
    publisher: { '@id': `${brand.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${brand.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export const allSourceLinks = sources;
