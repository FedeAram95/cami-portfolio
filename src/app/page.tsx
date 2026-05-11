'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale, getTranslations } from '@/i18n/translations';
import { profile, categories, projects, specialties } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const [locale, setLocale] = useState<Locale>('es');
  const t = getTranslations(locale);

  const featuredProjects = projects.slice(0, 4);

  return (
    <>
      <Navbar locale={locale} onLocaleChange={setLocale} isDark />

      {/* ===== HERO SECTION ===== */}
      <section className="dark-section min-h-screen flex items-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[var(--accent-dark)]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-6 animate-fade-in">
                {t.home.greeting}
              </p>
              <h1 className="text-6xl lg:text-8xl font-serif text-white mb-4 animate-fade-in-up">
                {t.home.name}
                <span className="text-[var(--accent)]">.</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 font-light mb-4 animate-fade-in-up delay-100">
                {t.home.title}
              </p>
              <p className="text-gray-500 font-mono text-sm mb-10 animate-fade-in-up delay-200 max-w-lg">
                {t.home.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
                <Link
                  href="/works"
                  className="px-8 py-3 bg-[var(--accent)] text-white font-mono text-sm tracking-wider uppercase hover:bg-[var(--accent-dark)] transition-colors"
                >
                  {t.home.cta}
                </Link>
                <a
                  href="#contact"
                  className="px-8 py-3 border border-gray-600 text-white font-mono text-sm tracking-wider uppercase hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  {t.home.ctaContact}
                </a>
              </div>
            </div>

            {/* Right: Specialties list */}
            <div className="hidden lg:flex flex-col items-end gap-3 animate-fade-in delay-400">
              {specialties.map((spec, index) => (
                <div
                  key={spec.name}
                  className="flex items-center gap-4 group"
                >
                  <span className="font-mono text-xs text-gray-600 group-hover:text-[var(--accent)] transition-colors">
                    0{index + 1}
                  </span>
                  <span className="text-2xl text-gray-400 font-light group-hover:text-white transition-colors">
                    {locale === 'es' ? spec.name : spec.nameEn}
                  </span>
                  <div className="w-8 h-[1px] bg-gray-700 group-hover:bg-[var(--accent)] group-hover:w-16 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-500">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-600">
              {t.home.scrollDown}
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--accent)] to-transparent" />
          </div>
        </div>
      </section>

      {/* ===== FEATURED WORKS SECTION ===== */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
                Portfolio
              </p>
              <h2 className="text-4xl lg:text-6xl font-serif">
                {t.works.title}
                <span className="text-[var(--accent)]">.</span>
              </h2>
            </div>
            <Link
              href="/works"
              className="hidden md:flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-gray-600 hover:text-[var(--accent)] transition-colors"
            >
              {locale === 'es' ? 'Ver todos' : 'View all'}
              <span className="text-lg">&rarr;</span>
            </Link>
          </div>

          {/* Categories - File Folder Style */}
          <div className="flex gap-4 mb-16">
            {/* Left column */}
            <div className="flex-1 flex flex-col">
              {categories
                .filter((_, i) => i % 2 === 0)
                .map((cat, stackIndex) => {
                  const isAccent = stackIndex % 2 === 0;
                  return (
                    <Link
                      key={cat.id}
                      href={`/works?category=${cat.id}`}
                      className="relative group focus:outline-none"
                      style={{
                        marginTop: stackIndex > 0 ? '-24px' : '0',
                        zIndex: stackIndex + 1,
                      }}
                    >
                      <div
                        className={`h-36 lg:h-44 relative transition-all duration-300 ${
                          isAccent
                            ? 'bg-[var(--accent)]/15 group-hover:bg-[var(--accent)]/25'
                            : 'bg-gray-200 group-hover:bg-gray-300'
                        }`}
                        style={{
                          clipPath: 'polygon(0 0, 30% 0, 30% 15%, 100% 15%, 100% 100%, 0 100%)',
                        }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-8 pb-5 lg:pb-6">
                          <span className="font-mono text-xs text-[var(--accent)] block mb-1">
                            {cat.number}
                          </span>
                          <span className="text-xl lg:text-3xl font-serif block">
                            {locale === 'es' ? cat.name : cat.nameEn}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>

            {/* Right column */}
            <div className="flex-1 flex flex-col">
              {categories
                .filter((_, i) => i % 2 !== 0)
                .map((cat, stackIndex) => {
                  const isAccent = stackIndex % 2 !== 0;
                  return (
                    <Link
                      key={cat.id}
                      href={`/works?category=${cat.id}`}
                      className="relative group focus:outline-none"
                      style={{
                        marginTop: stackIndex > 0 ? '-24px' : '0',
                        zIndex: stackIndex + 1,
                      }}
                    >
                      <div
                        className={`h-36 lg:h-44 relative transition-all duration-300 ${
                          isAccent
                            ? 'bg-[var(--accent)]/15 group-hover:bg-[var(--accent)]/25'
                            : 'bg-gray-200 group-hover:bg-gray-300'
                        }`}
                        style={{
                          clipPath: 'polygon(0 15%, 70% 15%, 70% 0, 100% 0, 100% 100%, 0 100%)',
                        }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-8 pb-5 lg:pb-6">
                          <span className="font-mono text-xs text-[var(--accent)] block mb-1">
                            {cat.number}
                          </span>
                          <span className="text-xl lg:text-3xl font-serif block">
                            {locale === 'es' ? cat.name : cat.nameEn}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* Featured Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="project-card group cursor-pointer">
                <div className="aspect-[4/3] bg-gray-200 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="font-mono text-sm text-gray-400 tracking-wider">
                      {locale === 'es' ? project.title : project.titleen}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      {locale === 'es' ? project.title : project.titleen}
                    </h3>
                    <p className="text-gray-500 text-sm font-mono">
                      {locale === 'es' ? project.description : project.descriptionen}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-gray-400">{project.year}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: View all link */}
          <div className="mt-10 text-center md:hidden">
            <Link
              href="/works"
              className="font-mono text-sm tracking-wider uppercase text-[var(--accent)] hover:underline"
            >
              {locale === 'es' ? 'Ver todos los trabajos' : 'View all works'} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW SECTION ===== */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Photo placeholder */}
            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-[var(--accent)]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-[var(--accent)]">CP</span>
                </div>
                <p className="font-mono text-xs text-gray-400 tracking-wider">
                  {locale === 'es' ? 'Foto de perfil' : 'Profile photo'}
                </p>
              </div>
            </div>

            {/* Right: About text */}
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
                {t.about.profile}
              </p>
              <h2 className="text-4xl lg:text-5xl font-serif mb-6">
                {profile.nickname}
                <span className="text-[var(--accent)]">.</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {locale === 'es' ? profile.bio : profile.bioEn}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {specialties.slice(0, 4).map((spec) => (
                  <span
                    key={spec.name}
                    className="px-4 py-2 border border-[var(--accent)]/30 text-[var(--accent)] font-mono text-xs tracking-wider"
                  >
                    {locale === 'es' ? spec.name : spec.nameEn}
                  </span>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-mono text-sm tracking-wider uppercase text-gray-900 hover:text-[var(--accent)] transition-colors"
              >
                {locale === 'es' ? 'Más sobre mí' : 'More about me'}
                <span className="text-lg">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER / CONTACT ===== */}
      <Footer locale={locale} />
    </>
  );
}
