'use client';

import { Locale } from '@/i18n/translations';

interface LanguageToggleProps {
  locale: Locale;
  onToggle: (locale: Locale) => void;
  isDark?: boolean;
}

export default function LanguageToggle({ locale, onToggle, isDark = false }: LanguageToggleProps) {
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const inactiveColor = isDark ? 'text-gray-500' : 'text-gray-400';

  return (
    <div className="flex items-center gap-1 text-sm font-mono tracking-wider">
      <button
        onClick={() => onToggle('es')}
        className={`transition-colors duration-300 hover:text-[var(--accent)] ${
          locale === 'es' ? textColor : inactiveColor
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
      <span className={inactiveColor}>/</span>
      <button
        onClick={() => onToggle('en')}
        className={`transition-colors duration-300 hover:text-[var(--accent)] ${
          locale === 'en' ? textColor : inactiveColor
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
