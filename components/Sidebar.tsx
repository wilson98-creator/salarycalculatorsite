'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from './AppShell';

interface SectionItem {
  href: string;
  label: string;
}

interface Section {
  index: string;
  title: string;
  items: SectionItem[];
}

const sections: Section[] = [
  {
    index: '01',
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
    index: '02',
    title: 'Reference',
    items: [
      { href: '/tax-rates', label: 'Tax rates' },
      { href: '/methodology', label: 'Methodology' },
    ],
  },
  {
    index: '03',
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
        className={`fixed inset-0 top-16 z-30 bg-ink-900/40 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Sidebar — borderless, monochrome, monospace labels */}
      <aside
        aria-label="Primary"
        className={`fixed top-16 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-r border-ink-200 bg-white transition-all duration-200 ease-in-out dark:border-ink-800 dark:bg-ink-950 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'lg:w-16' : 'lg:w-64'} w-64 lg:translate-x-0`}
      >
        {/* Collapse toggle (desktop only) — text-based, no icon */}
        <button
          type="button"
          onClick={() => setCollapsed(!isCollapsed)}
          className="absolute -right-2 top-4 z-50 hidden font-mono text-[10px] tracking-[0.15em] text-ink-400 transition hover:text-ink-900 dark:hover:text-ink-100 lg:inline"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '›' : '‹'}
        </button>

        <nav className="flex-1 overflow-y-auto py-8">
          {sections.map((section, i) => (
            <div key={section.title} className={i > 0 ? 'mt-8' : ''}>
              {!isCollapsed && (
                <div className="mb-3 px-6">
                  <p className="section-index">§ {section.index} · {section.title}</p>
                </div>
              )}
              <ul className="rule-line border-t border-ink-200 dark:border-ink-800">
                {section.items.map((item) => {
                  const active = isItemActive(pathname, item.href);
                  return (
                    <li key={item.href} className="rule-line border-b border-ink-200 dark:border-ink-800">
                      <Link
                        href={item.href}
                        onClick={close}
                        title={isCollapsed ? item.label : undefined}
                        aria-current={active ? 'page' : undefined}
                        className={`block py-3 text-sm transition ${
                          isCollapsed ? 'px-2 text-center' : 'px-6'
                        } ${
                          active
                            ? 'font-semibold text-ink-900 dark:text-ink-50'
                            : 'text-ink-700 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50'
                        }`}
                      >
                        {isCollapsed ? (
                          <span className="font-mono text-[11px] uppercase tracking-[0.15em]">
                            {item.label.replace(/[^A-Za-z]/g, '').slice(0, 2)}
                          </span>
                        ) : (
                          <span className="flex items-baseline gap-3">
                            {active && (
                              <span className="font-mono text-ledger-500">·</span>
                            )}
                            <span>{item.label}</span>
                          </span>
                        )}
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
          <div className="rule-line border-t border-ink-200 p-6 text-ink-500 dark:border-ink-800 dark:text-ink-500">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em]">FY 2026–27</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em]">
              ATO-sourced
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
