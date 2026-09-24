'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import ThemeToggle from '@/components/theme-toggle';

const HomeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
  </svg>
);

const navItems: { href: string; label: ReactNode; ariaLabel?: string }[] = [
  { href: '/', label: <HomeIcon />, ariaLabel: 'হোম' },
  { href: '/saved-ayahs', label: 'সংরক্ষিত আয়াত' }
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (!menuOpen) return;
      const target = event.target as Node | null;
      if (headerRef.current && target && headerRef.current.contains(target)) {
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [menuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <a className="site-brand" href="/">
        <span className="home-emblem" aria-hidden="true">
          <img src="/favicon.ico" alt="" />
        </span>
        <span className="site-brand-text">
          <span className="home-brand-title">বাংলা কোরআন</span>
          <span className="home-brand-sub">Arabic + Bangla with Audio</span>
        </span>
      </a>
      <div className="site-header-actions">
        <nav
          className={`site-nav ${menuOpen ? 'open' : ''}`}
          aria-label="Primary"
          id="site-nav"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              className="site-nav-link"
              href={item.href}
              aria-label={item.ariaLabel}
              title={item.ariaLabel}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
        <button
          type="button"
          className="site-nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
