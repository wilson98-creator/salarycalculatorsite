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

export const allSourceLinks = sources;
