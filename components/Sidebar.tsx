'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from './AppShell';

interface SectionItem {
  href: string;
  label: string;
}

interface Section {
  title: string;
  items: SectionItem[];
}

const sections: Section[] = [
  {
    title: 'Calculators',
    items: [
      { href: '/', label: 'Pay calculator' },
      { href: '/salary-sacrifice-calculator', label: 'Salary sacrifice' },
      { href: '/hecs-calculator', label: 'HECS-HELP' },
      { href: '/casual-pay-calculator', label: 'Casual pay' },
      { href: '/mortgage-calculator', label: 'Mortgage' },
      { href: '/loan-payoff-calculator', label: 'Loan payoff' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { href: '/tax-rates', label: 'Tax rates' },
      { href: '/methodology', label: 'Methodology' },
    ],
  },
  {
    title: 'Learn',
    items: [
      { href: '/guides', label: 'All guides' },
      { href: '/guides/australian-income-tax', label: 'Income tax' },
      { href: '/guides/hecs-repayment', label: 'HECS repayment' },
      { href: '/guides/medicare-levy-surcharge', label: 'MLS' },
      { href: '/guides/salary-sacrifice', label: 'Salary sacrifice' },
      { href: '/guides/superannuation', label: 'Superannuation' },
      { href: '/guides/stage-3-tax-cuts', label: 'Stage 3 cuts' },
    ],
  },
];

function isItemActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export function Sidebar() {
  const { isOpen, isCollapsed, close, setCollapsed } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 top-16 z-30 bg-ink-900/60 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        aria-label="Primary"
        className={`fixed top-16 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-r border-ink-200 bg-white transition-all duration-200 ease-in-out dark:border-ink-800 dark:bg-ink-950 ${
          isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        } ${isCollapsed ? 'lg:w-16' : 'lg:w-64'} w-64 lg:translate-x-0`}
      >
        {/* Collapse toggle (desktop only) */}
        <button
          type="button"
          onClick={() => setCollapsed(!isCollapsed)}
          className="absolute -right-3 top-3 z-50 hidden h-6 w-6 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-500 shadow-sm transition hover:bg-ink-100 hover:text-ink-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-200 lg:flex"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
            {isCollapsed ? (
              <path d="M9 18l6-6-6-6" />
            ) : (
              <path d="M15 18l-6-6 6-6" />
            )}
          </svg>
        </button>

        <nav className="flex-1 overflow-y-auto p-3">
          {sections.map((section, i) => (
            <div key={section.title} className={i > 0 ? 'mt-6' : ''}>
              {!isCollapsed && (
                <h3 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isItemActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        title={isCollapsed ? item.label : undefined}
                        aria-current={active ? 'page' : undefined}
                        className={`group flex items-center rounded-lg py-2 text-sm transition ${
                          isCollapsed ? 'justify-center px-2' : 'gap-3 px-3'
                        } ${
                          active
                            ? 'bg-brand-50 font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-200'
                            : 'text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-900'
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded text-[11px] font-bold uppercase ${
                            active
                              ? 'bg-brand-500 text-white'
                              : 'bg-ink-200 text-ink-600 group-hover:bg-ink-300 dark:bg-ink-800 dark:text-ink-400 dark:group-hover:bg-ink-700'
                          }`}
                        >
                          {item.label.replace(/[^A-Za-z]/g, '').slice(0, 2)}
                        </span>
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer note in sidebar (desktop only) */}
        {!isCollapsed && (
          <div className="border-t border-ink-200 p-4 text-xs text-ink-500 dark:border-ink-800 dark:text-ink-500">
            <p>Estimates only — not financial or tax advice.</p>
            <p className="mt-1">FY 2026–27 rates · last reviewed {new Date().toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}</p>
          </div>
        )}
      </aside>
    </>
  );
}
