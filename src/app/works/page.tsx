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

          {/* Categories - Folder Tab Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mb-20 relative">
            {categories.map((cat, index) => {
              const isLeft = index % 2 === 0;
              const isAccent = index % 3 === 0 || index % 3 === 2;
              const count = projects.filter((p) => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className={`
                    relative group text-left transition-all duration-300 cursor-pointer
                    ${isLeft ? 'md:pr-4' : 'md:pl-4'}
                    ${index > 1 ? '-mt-2 md:-mt-3' : ''}
                  `}
                  style={{
                    transform: isLeft ? `translateX(${index * 2}px)` : `translateX(-${index * 2}px)`,
                  }}
                >
                  <div
                    className={`
                      relative p-6 lg:p-8 transition-all duration-300
                      ${isActive
                        ? 'bg-[var(--accent)] text-white shadow-lg'
                        : isAccent
                          ? 'bg-[var(--accent)]/15 hover:bg-[var(--accent)]/25'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }
                    `}
                    style={{
                      clipPath: isLeft
                        ? 'polygon(0 0, 95% 0, 100% 100%, 0 100%)'
                        : 'polygon(5% 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                  >
                    <span className={`
                      font-mono text-xs block mb-2
                      ${isActive ? 'text-white/70' : 'text-[var(--accent)]'}
                    `}>
                      {cat.number}
                    </span>
                    <span className="text-3xl lg:text-5xl font-serif block">
                      {locale === 'es' ? cat.name : cat.nameEn}
                    </span>
                  </div>
                </button>
              );
            })}
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
