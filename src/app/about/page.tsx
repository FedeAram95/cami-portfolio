'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale, getTranslations } from '@/i18n/translations';
import { profile, experiences, tools, specialties, socialLinks } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const [locale, setLocale] = useState<Locale>('es');
  const t = getTranslations(locale);

  const toolCategories = [...new Set(tools.map((t) => t.category))];

  return (
    <>
      <Navbar locale={locale} onLocaleChange={setLocale} />

      <main className="pt-20 lg:pt-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="py-12 lg:py-20">
            <h1 className="text-5xl lg:text-7xl font-serif">
              {t.about.title}{' '}
              <span className="text-[var(--accent)]">{t.about.titleAccent}</span>
              <span className="text-[var(--accent)]">.</span>
            </h1>
          </div>

          {/* Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 pb-20 border-b border-gray-200">
            {/* Left: Photo + Contact */}
            <div>
              {/* Photo placeholder */}
              <div className="aspect-square bg-gray-100 mb-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[var(--accent)]/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-3xl text-[var(--accent)]">CP</span>
                  </div>
                  <p className="font-mono text-xs text-gray-400">
                    {locale === 'es' ? 'Foto' : 'Photo'}
                  </p>
                </div>
              </div>

              {/* Contact links */}
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group"
                  >
                    <span className="text-lg font-light group-hover:text-[var(--accent)] transition-colors">
                      {link.platform.toLowerCase()}
                    </span>
                    <span className="text-sm text-gray-400 font-mono group-hover:text-[var(--accent)] transition-colors">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Bio */}
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">
                {t.about.profile}
              </p>
              <h2 className="text-3xl lg:text-4xl font-serif mb-8">
                {profile.name}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {locale === 'es' ? profile.bio : profile.bioEn}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-3">
                {specialties.map((spec) => (
                  <span
                    key={spec.name}
                    className="px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs tracking-wider"
                  >
                    {locale === 'es' ? spec.name : spec.nameEn}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="py-20 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
                  {t.about.experience}
                </p>
                <h3 className="text-3xl font-serif">
                  {locale === 'es' ? 'Experiencia' : 'Experience'}
                  <span className="text-[var(--accent)]">.</span>
                </h3>
              </div>

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-gray-100 hover:border-[var(--accent)]/30 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-lg">{exp.company}</h4>
                      <p className="text-gray-500 font-mono text-sm">
                        {locale === 'es' ? exp.position : exp.positionEn}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-400">{exp.period}</span>
                      {exp.current && (
                        <span className="px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-[10px] tracking-wider uppercase">
                          {locale === 'es' ? 'Actual' : 'Current'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tools Section */}
          <div className="py-20 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
                  {t.about.skills}
                </p>
                <h3 className="text-3xl font-serif">
                  {locale === 'es' ? 'Herramientas' : 'Tools'}
                  <span className="text-[var(--accent)]">.</span>
                </h3>
              </div>

              <div className="space-y-8">
                {toolCategories.map((category) => (
                  <div key={category}>
                    <p className="font-mono text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {tools
                        .filter((t) => t.category === category)
                        .map((tool) => (
                          <span
                            key={tool.name}
                            className="px-4 py-2 border border-gray-200 font-mono text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-default"
                          >
                            {tool.name}
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="py-20 text-center">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">
              {locale === 'es' ? '¿Trabajamos juntos?' : 'Shall we work together?'}
            </p>
            <h3 className="text-4xl lg:text-5xl font-serif mb-8">
              {locale === 'es' ? 'Hablemos' : "Let's talk"}
              <span className="text-[var(--accent)]">.</span>
            </h3>
            <a
              href={`mailto:${profile.email}`}
              className="inline-block px-10 py-4 bg-[var(--accent)] text-white font-mono text-sm tracking-wider uppercase hover:bg-[var(--accent-dark)] transition-colors"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
