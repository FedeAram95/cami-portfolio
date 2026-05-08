'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale, getTranslations } from '@/i18n/translations';
import { categories, projects } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function WorksPage() {
  const [locale, setLocale] = useState<Locale>('es');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const t = getTranslations(locale);

  const filteredProjects = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  return (
    <>
      <Navbar locale={locale} onLocaleChange={setLocale} />

      <main className="pt-20 lg:pt-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="py-12 lg:py-16">
            <div className="flex items-baseline gap-8">
              <h1 className="text-5xl lg:text-7xl font-serif">
                {t.works.title}
                <span className="text-[var(--accent)]">.</span>
              </h1>
              <span className="text-3xl lg:text-5xl font-serif text-gray-300">
                {t.works.archive}
              </span>
            </div>
          </div>

          {/* Categories - File Folder Style */}
          <div className="flex gap-4 mb-20">
            {/* Left column */}
            <div className="flex-1 flex flex-col">
              {categories
                .filter((_, i) => i % 2 === 0)
                .map((cat, stackIndex) => {
                  const isActive = activeCategory === cat.id;
                  const isAccent = stackIndex % 2 === 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                      className="relative text-left cursor-pointer group focus:outline-none"
                      style={{
                        marginTop: stackIndex > 0 ? '-24px' : '0',
                        zIndex: stackIndex + 1,
                      }}
                    >
                      <div
                        className={`h-40 lg:h-48 relative transition-all duration-300 ${
                          isActive
                            ? 'bg-[var(--accent)] shadow-lg'
                            : isAccent
                            ? 'bg-[var(--accent)]/15 group-hover:bg-[var(--accent)]/25'
                            : 'bg-gray-200 group-hover:bg-gray-300'
                        }`}
                        style={{
                          clipPath: 'polygon(0 0, 30% 0, 30% 15%, 100% 15%, 100% 100%, 0 100%)',
                        }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-8 pb-6 lg:pb-7">
                          <span className={`font-mono text-xs block mb-1 ${
                            isActive ? 'text-white/70' : 'text-[var(--accent)]'
                          }`}>
                            {cat.number}
                          </span>
                          <span className={`text-2xl lg:text-4xl font-serif block ${
                            isActive ? 'text-white' : ''
                          }`}>
                            {locale === 'es' ? cat.name : cat.nameEn}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>

            {/* Right column */}
            <div className="flex-1 flex flex-col">
              {categories
                .filter((_, i) => i % 2 !== 0)
                .map((cat, stackIndex) => {
                  const isActive = activeCategory === cat.id;
                  const isAccent = stackIndex % 2 !== 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                      className="relative text-left cursor-pointer group focus:outline-none"
                      style={{
                        marginTop: stackIndex > 0 ? '-24px' : '0',
                        zIndex: stackIndex + 1,
                      }}
                    >
                      <div
                        className={`h-40 lg:h-48 relative transition-all duration-300 ${
                          isActive
                            ? 'bg-[var(--accent)] shadow-lg'
                            : isAccent
                            ? 'bg-[var(--accent)]/15 group-hover:bg-[var(--accent)]/25'
                            : 'bg-gray-200 group-hover:bg-gray-300'
                        }`}
                        style={{
                          clipPath: 'polygon(0 15%, 70% 15%, 70% 0, 100% 0, 100% 100%, 0 100%)',
                        }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-8 pb-6 lg:pb-7">
                          <span className={`font-mono text-xs block mb-1 ${
                            isActive ? 'text-white/70' : 'text-[var(--accent)]'
                          }`}>
                            {cat.number}
                          </span>
                          <span className={`text-2xl lg:text-4xl font-serif block ${
                            isActive ? 'text-white' : ''
                          }`}>
                            {locale === 'es' ? cat.name : cat.nameEn}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="pb-20">
            <div className="flex items-center justify-between mb-8">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500">
                {activeCategory
                  ? categories.find(c => c.id === activeCategory)?.[locale === 'es' ? 'name' : 'nameEn']
                  : locale === 'es' ? 'Todos los proyectos' : 'All projects'
                }
                {' — '}
                {filteredProjects.length} {locale === 'es'
                  ? `proyecto${filteredProjects.length !== 1 ? 's' : ''}`
                  : `project${filteredProjects.length !== 1 ? 's' : ''}`}
              </p>
              {activeCategory && (
                <button
                  onClick={() => setActiveCategory(null)}
                  className="font-mono text-xs tracking-wider uppercase text-[var(--accent)] hover:underline"
                >
                  {locale === 'es' ? '← Ver todos' : '← View all'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.behanceUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card group"
                >
                  <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <span className="font-mono text-sm text-gray-400 tracking-wider">
                        {locale === 'es' ? project.title : project.titleEn}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium mb-1 group-hover:text-[var(--accent)] transition-colors">
                        {locale === 'es' ? project.title : project.titleEn}
                      </h3>
                      <p className="text-gray-500 text-sm font-mono">
                        {locale === 'es' ? project.description : project.descriptionEn}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-gray-400">{project.year}</span>
                  </div>
                </a>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 font-mono">
                  {locale === 'es'
                    ? 'No hay proyectos en esta categoría todavía.'
                    : 'No projects in this category yet.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
