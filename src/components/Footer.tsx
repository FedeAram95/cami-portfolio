'use client';

import { Locale, getTranslations } from '@/i18n/translations';
import { socialLinks, profile } from '@/lib/data';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = getTranslations(locale);

  return (
    <footer id="contact" className="dark-section py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Contact Header */}
        <div className="mb-16">
          <h2 className="text-5xl lg:text-7xl font-serif mb-4">
            {t.contact.title}
            <span className="text-[var(--accent)]">.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-lg font-mono">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Email */}
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
              {t.contact.email}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="text-xl lg:text-2xl text-white hover:text-[var(--accent)] transition-colors font-light"
            >
              {profile.email}
            </a>
          </div>

          {/* Social */}
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
              {t.contact.social}
            </p>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-white hover:text-[var(--accent)] transition-colors font-light"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
              {locale === 'es' ? 'Ubicación' : 'Location'}
            </p>
            <p className="text-xl text-white font-light">{t.contact.location}</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 font-mono text-xs tracking-wider">
            &copy; {new Date().getFullYear()} {profile.name}. {t.footer.rights}.
          </p>
          <p className="text-gray-500 font-mono text-xs tracking-wider">
            {t.footer.madeWith} &#9829; in Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
