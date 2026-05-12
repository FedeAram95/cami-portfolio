'use client';

import { useState, use, useEffect, useRef } from 'react';
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
  const [imageCache, setImageCache] = useState<Record<string, string>>({});
  const fetchedRef = useRef<Set<string>>(new Set());
  const { projects, loading } = useData();

  const cat = categories.find((c) => c.id === category);
  const catProjects = projects.filter((p) => p.category === category);

  // Auto-fetch Behance images for projects without a stored image
  useEffect(() => {
    if (catProjects.length === 0) return;

    const toFetch = catProjects.filter(
      (p) => p.behanceurl && !p.image && !fetchedRef.current.has(p.id)
    );

    if (toFetch.length === 0) return;

    toFetch.forEach((project) => {
      fetchedRef.current.add(project.id);
      fetch(`/api/behance-image?url=${encodeURIComponent(project.behanceurl!)}`)
        .then((res) => res.ok ? res.json() : null)
        .then((data) => {
          if (data?.image) {
            setImageCache((prev) => ({ ...prev, [project.id]: data.image }));
          }
        })
        .catch(() => {/* silently ignore */});
    });
  }, [catProjects]);

  function getImage(project: Project): string | undefined {
    return project.image || imageCache[project.id];
  }

  if (loading) {
    return (
      <>
        <Navbar locale={locale} onLocaleChange={setLocale} />
        <main className="min-h-screen bg-[#edeae7] flex items-center justify-center">
          <p className="font-mono text-xs tracking-widest text-gray-400">CARGANDO...</p>
        </main>
      </>
    );
  }

  if (!cat) return null;

  const displayName = locale === 'es' ? cat.name : cat.nameEn;

  return (
    <>
      <Navbar locale={locale} onLocaleChange={setLocale} />

      <main className="min-h-screen bg-white">
        {/* Top white area */}
        <div className="h-16" />

        {/* Folder content area */}
        <div className="bg-[#edeae7] min-h-screen relative">
          {/* Folder tab shape */}
          <div
            className="bg-[#edeae7] absolute top-0 left-0 right-0 h-full"
            style={{ clipPath: 'polygon(0 2%, 22% 2%, 22% 0, 100% 0, 100% 100%, 0 100%)' }}
          />

          <div className="relative z-10 px-8 lg:px-16 pt-10 pb-20">
            {/* Back link */}
            <Link
              href="/works"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-gray-500 hover:text-gray-900 transition-colors mb-10"
            >
              ← {locale === 'es' ? 'Ver todos' : 'See all works'}
            </Link>

            {/* Category header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <p className="font-mono text-[11px] tracking-[0.25em] text-gray-500 mb-1">{cat.number}</p>
              <h1 className="text-7xl lg:text-9xl font-serif lowercase leading-none">
                {displayName}
              </h1>
            </motion.div>

            {/* Projects + Preview layout */}
            <div className="flex gap-12 items-start">
              {/* Left: Project list */}
              <div className="flex-1">
                {/* Table header */}
                <div className="flex justify-between pb-3 border-b border-gray-400 mb-1">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500">
                    {locale === 'es' ? 'Título del proyecto' : 'Project title'}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500 pr-2">
                    {locale === 'es' ? 'Año' : 'Year'}
                  </span>
                </div>

                {catProjects.length === 0 ? (
                  <p className="font-mono text-xs text-gray-400 py-10">
                    {locale === 'es' ? 'Sin proyectos todavía' : 'No projects yet'}
                  </p>
                ) : (
                  catProjects.map((project, index) => (
                    <motion.a
                      key={project.id}
                      href={project.behanceurl || '#'}
                      target={project.behanceurl ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      onMouseEnter={() => setHoveredProject(project)}
                      onMouseLeave={() => setHoveredProject(null)}
                      className="flex justify-between items-center py-5 border-b border-gray-300/60 group cursor-pointer"
                    >
                      <span className="text-2xl lg:text-3xl font-serif group-hover:translate-x-2 transition-transform duration-200">
                        {locale === 'es' ? project.title : project.titleen}
                      </span>
                      <span className="font-mono text-xs text-gray-400">{project.year}</span>
                    </motion.a>
                  ))
                )}
              </div>

              {/* Right: Preview */}
              <div className="hidden lg:block w-[380px] sticky top-24">
                <AnimatePresence mode="wait">
                  {hoveredProject && getImage(hoveredProject) ? (
                    <motion.img
                      key={hoveredProject.id}
                      src={getImage(hoveredProject)}
                      alt={hoveredProject.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-64 object-cover"
                    />
                  ) : hoveredProject && !getImage(hoveredProject) ? (
                    <motion.div
                      key={`loading-${hoveredProject.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full h-64 bg-gray-200/60 flex items-center justify-center"
                    >
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-400 animate-pulse">
                        Cargando...
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full h-64 bg-gray-200/60 flex items-end p-4"
                    >
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-400">
                        Preview
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
