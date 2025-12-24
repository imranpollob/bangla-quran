'use client';

import { useState } from 'react';
import ThemeToggle from '@/components/theme-toggle';

const navItems = [
  { href: '/', label: 'হোম' },
  { href: '/saved-ayahs', label: 'সংরক্ষিত আয়াত' }
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
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
