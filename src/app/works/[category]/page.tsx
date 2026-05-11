'use client';

import { useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Locale } from '@/i18n/translations';
import { categories } from '@/lib/data';
import { useData, Project } from '@/context/DataContext';
import Navbar from '@/components/Navbar';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const [locale, setLocale] = useState<Locale>('es');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const { projects, loading } = useData();

  const cat = categories.find((c) => c.id === category);
  const catProjects = projects.filter((p) => p.category === category);

  if (loading) {
    return (
      <>
        <Navbar locale={locale} onLocaleChange={setLocale} />
        <main className="min-h-screen bg-[#f0eeeb] flex items-center justify-center">
          <p className="text-gray-400 font-mono">Cargando...</p>
        </main>
      </>
    );
  }

  if (!cat) {
    return (
      <>
        <Navbar locale={locale} onLocaleChange={setLocale} />
        <main className="min-h-screen bg-[#f0eeeb] flex items-center justify-center">
          <p className="text-gray-400 font-mono">Categoría no encontrada</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar locale={locale} onLocaleChange={setLocale} />

      <main className="min-h-screen bg-[#f0eeeb]">
        {/* Header */}
        <div className="pt-32 pb-8 px-8 lg:px-16">
          <div className="flex items-start justify-between">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-sm text-gray-500 mb-2">{cat.number}</p>
              <h1 className="text-7xl lg:text-9xl font-serif lowercase tracking-tight">
                {locale === 'es' ? cat.name : cat.nameEn}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <Link
                href="/works"
                className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                ← {locale === 'es' ? 'Volver' : 'Back'}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="px-8 lg:px-16 pb-20">
          <div className="flex gap-8">
            {/* Left: Project list */}
            <div className="flex-1">
              {/* Table header */}
              <div className="flex justify-between py-3 border-b border-gray-400 mb-2">
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500">
                  {locale === 'es' ? 'Título del proyecto' : 'Project title'}
                </span>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500">
                  {locale === 'es' ? 'Año' : 'Year'}
                </span>
              </div>

              {catProjects.length === 0 ? (
                <p className="text-gray-400 font-mono text-sm py-8">
                  {locale === 'es' ? 'No hay proyectos todavía' : 'No projects yet'}
                </p>
              ) : (
                catProjects.map((project, index) => (
                  <motion.a
                    key={project.id}
                    href={project.behanceurl || '#'}
                    target={project.behanceurl ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    onMouseEnter={() => setHoveredProject(project)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="flex justify-between items-center py-5 border-b border-gray-300 group cursor-pointer hover:border-gray-600 transition-colors"
                  >
                    <span className="text-2xl lg:text-3xl font-serif group-hover:text-[var(--accent)] transition-colors">
                      {locale === 'es' ? project.title : project.titleen}
                    </span>
                    <span className="font-mono text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                      {project.year}
                    </span>
                  </motion.a>
                ))
              )}
            </div>

            {/* Right: Preview image */}
            <div className="hidden lg:block w-96 sticky top-32 self-start h-72">
              <AnimatePresence mode="wait">
                {hoveredProject && hoveredProject.image ? (
                  <motion.div
                    key={hoveredProject.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                  >
                    <img
                      src={hoveredProject.image}
                      alt={hoveredProject.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full bg-gray-200 flex items-center justify-center"
                  >
                    <span className="font-mono text-xs text-gray-400 tracking-wider uppercase">
                      Preview
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
