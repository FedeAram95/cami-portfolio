'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/translations';
import LanguageToggle from './LanguageToggle';

interface NavbarProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  isDark?: boolean;
}

export default function Navbar({ locale, onLocaleChange, isDark = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: '/', label: locale === 'es' ? 'Inicio' : 'Home' },
    { href: '/works', label: locale === 'es' ? 'Trabajos' : 'Works' },
    { href: '/about', label: locale === 'es' ? 'Sobre Mí' : 'About' },
    { href: '#contact', label: locale === 'es' ? 'Contacto' : 'Contact' },
  ];

  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const bgColor = isDark ? 'bg-black/90' : 'bg-white/90';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${bgColor} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`font-mono text-lg tracking-widest ${textColor} hover:text-[var(--accent)] transition-colors`}
          >
            CP.
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link font-mono text-xs tracking-[0.2em] uppercase ${textColor} hover:text-[var(--accent)] transition-colors`}
              >
                {link.label}
              </Link>
            ))}
            <LanguageToggle locale={locale} onToggle={onLocaleChange} isDark={isDark} />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${textColor} z-50`}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black/95 transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-white font-mono text-2xl tracking-widest uppercase hover:text-[var(--accent)] transition-colors`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4">
            <LanguageToggle locale={locale} onToggle={onLocaleChange} isDark />
          </div>
        </div>
      </div>
    </nav>
  );
}
