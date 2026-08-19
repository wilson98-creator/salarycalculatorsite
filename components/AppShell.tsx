'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface SidebarContextValue {
  /** Mobile: drawer is open. Desktop: ignored. */
  isOpen: boolean;
  /** Desktop: sidebar is collapsed to icon-only. */
  isCollapsed: boolean;
  toggle: () => void;
  close: () => void;
  setCollapsed: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within AppShell');
  return ctx;
}

const COLLAPSED_KEY = 'salarycalc_sidebar_collapsed';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const pathname = usePathname();

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const stored = window.localStorage.getItem(COLLAPSED_KEY);
    if (stored === 'true') setIsCollapsed(true);
    setHydrated(true);
  }, []);

  // Persist collapsed state
  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(COLLAPSED_KEY, String(isCollapsed));
    }
  }, [isCollapsed, hydrated]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  const value: SidebarContextValue = {
    isOpen,
    isCollapsed,
    toggle: () => setIsOpen((v) => !v),
    close: () => setIsOpen(false),
    setCollapsed: setIsCollapsed,
  };

  return (
    <SidebarContext.Provider value={value}>
      <Header />
      <Sidebar />
      <div
        className={`min-h-[calc(100vh-4rem)] transition-[margin] duration-200 ease-in-out ${
          isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}
      >
        {children}
        <Footer />
      </div>
    </SidebarContext.Provider>
  );
}
