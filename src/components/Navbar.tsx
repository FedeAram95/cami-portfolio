'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/i18n/translations';

interface NavbarProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  isDark?: boolean;
}

export default function Navbar({ locale, onLocaleChange, isDark = false }: NavbarProps) {
  const pathname = usePathname();
  const textColor = isDark ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900';
  const activeColor = isDark ? 'text-white' : 'text-gray-900';

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-8 py-5 flex items-center justify-between ${isDark ? 'bg-transparent' : 'bg-white/80 backdrop-blur-sm'}`}>
      <Link
        href="/"
        className={`font-mono text-[11px] tracking-[0.25em] uppercase transition-colors ${isActive('/') && pathname === '/' ? activeColor : textColor}`}
      >
        HOME
      </Link>

      <div className="flex items-center gap-12">
        <Link
          href="/works"
          className={`font-mono text-[11px] tracking-[0.25em] uppercase transition-colors ${isActive('/works') ? activeColor : textColor}`}
        >
          WORKS
        </Link>
        <Link
          href="/about"
          className={`font-mono text-[11px] tracking-[0.25em] uppercase transition-colors ${isActive('/about') ? activeColor : textColor}`}
        >
          ABOUT
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <Link
          href="/#contact"
          className={`font-mono text-[11px] tracking-[0.25em] uppercase transition-colors ${textColor}`}
        >
          CONTACT
        </Link>
        <button
          onClick={() => onLocaleChange(locale === 'es' ? 'en' : 'es')}
          className={`font-mono text-[11px] tracking-[0.25em] uppercase transition-colors ${textColor}`}
        >
          {locale === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </nav>
  );
}
