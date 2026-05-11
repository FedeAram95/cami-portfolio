'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Locale, getTranslations } from '@/i18n/translations';
import { categories } from '@/lib/data';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function WorksPage() {
  const [locale, setLocale] = useState<Locale>('es');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { projects, loading } = useData();
  const router = useRouter();
  const t = getTranslations(locale);

  function handleMouseMove(e: React.MouseEvent) {
    setMousePos({ x: e.clientX, y: e.clientY });
  }

  function getPreviewImage(categoryId: string) {
    const catProjects = projects.filter((p) => p.category === categoryId);
    const withImage = catProjects.find((p) => p.image);
    return withImage?.image || null;
  }

  if (loading) {
    return (
      <>
        <Navbar locale={locale} onLocaleChange={setLocale} />
        <main className="pt-20 lg:pt-24 min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-400 font-mono">{locale === 'es' ? 'Cargando...' : 'Loading...'}</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar locale={locale} onLocaleChange={setLocale} />

      <main className="pt-20 lg:pt-24 min-h-screen bg-white" onMouseMove={handleMouseMove}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 lg:py-16"
          >
            <div className="flex items-baseline gap-8">
              <h1 className="text-5xl lg:text-7xl font-serif">
                {t.works.title}
                <span className="text-[var(--accent)]">.</span>
              </h1>
              <span className="text-3xl lg:text-5xl font-serif text-gray-300">
                {t.works.archive}
              </span>
            </div>
          </motion.div>

          {/* Categories Grid */}
          <div className="flex gap-4 mb-20">
            {/* Left column */}
            <div className="flex-1 flex flex-col space-y-4">
              {categories
                .filter((_, i) => i % 2 === 0)
                .map((cat, stackIndex) => {
                  const count = projects.filter((p) => p.category === cat.id).length;
                  const isHovered = hoveredCategory === cat.id;
                  const clipPath = 'polygon(0 0, 30% 0, 30% 15%, 100% 15%, 100% 100%, 0 100%)';

                  return (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: stackIndex * 0.1 }}
                      onClick={() => router.push(`/works/${cat.id}?lang=${locale}`)}
                      onMouseEnter={() => setHoveredCategory(cat.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className="w-full text-left focus:outline-none relative"
                      style={{ minHeight: '160px' }}
                    >
                      <motion.div
                        className="w-full h-full relative"
                        style={{ clipPath, minHeight: '160px' }}
                        animate={{
                          backgroundColor: isHovered ? 'var(--accent)' : 'rgba(217, 70, 168, 0.12)',
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-8 pb-5 lg:pb-6">
                          <span className={`font-mono text-xs block mb-1 ${isHovered ? 'text-white/70' : 'text-[var(--accent)]'}`}>
                            {cat.number}
                          </span>
                          <div className="flex items-baseline justify-between pr-4">
                            <span className={`text-2xl lg:text-4xl font-serif block ${isHovered ? 'text-white' : ''}`}>
                              {locale === 'es' ? cat.name : cat.nameEn}
                            </span>
                            <span className={`font-mono text-xs ${isHovered ? 'text-white/60' : 'text-gray-400'}`}>
                              {count} {locale === 'es' ? 'proyectos' : 'projects'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.button>
                  );
                })}
            </div>

            {/* Right column */}
            <div className="flex-1 flex flex-col space-y-4">
              {categories
                .filter((_, i) => i % 2 !== 0)
                .map((cat, stackIndex) => {
                  const count = projects.filter((p) => p.category === cat.id).length;
                  const isHovered = hoveredCategory === cat.id;
                  const clipPath = 'polygon(0 15%, 70% 15%, 70% 0, 100% 0, 100% 100%, 0 100%)';

                  return (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (stackIndex + 1) * 0.1 }}
                      onClick={() => router.push(`/works/${cat.id}?lang=${locale}`)}
                      onMouseEnter={() => setHoveredCategory(cat.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className="w-full text-left focus:outline-none relative"
                      style={{ minHeight: '160px' }}
                    >
                      <motion.div
                        className="w-full h-full relative"
                        style={{ clipPath, minHeight: '160px' }}
                        animate={{
                          backgroundColor: isHovered ? 'var(--accent)' : 'rgba(217, 70, 168, 0.12)',
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-8 pb-5 lg:pb-6">
                          <span className={`font-mono text-xs block mb-1 ${isHovered ? 'text-white/70' : 'text-[var(--accent)]'}`}>
                            {cat.number}
                          </span>
                          <div className="flex items-baseline justify-between pr-4">
                            <span className={`text-2xl lg:text-4xl font-serif block ${isHovered ? 'text-white' : ''}`}>
                              {locale === 'es' ? cat.name : cat.nameEn}
                            </span>
                            <span className={`font-mono text-xs ${isHovered ? 'text-white/60' : 'text-gray-400'}`}>
                              {count} {locale === 'es' ? 'proyectos' : 'projects'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.button>
                  );
                })}
            </div>
          </div>

          {/* Total */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center py-12"
          >
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500">
              {locale === 'es' ? 'Total de proyectos' : 'Total projects'}: {projects.length}
            </p>
          </motion.div>
        </div>
      </main>

      {/* Floating hover preview */}
      <AnimatePresence>
        {hoveredCategory && getPreviewImage(hoveredCategory) && (
          <motion.div
            key={hoveredCategory}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed pointer-events-none z-50 w-64 h-48 shadow-2xl overflow-hidden"
            style={{
              left: mousePos.x + 24,
              top: mousePos.y - 80,
            }}
          >
            <img
              src={getPreviewImage(hoveredCategory)!}
              alt="preview"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer locale={locale} />
    </>
  );
}
