'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n/translations';
import { categories } from '@/lib/data';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FOLDER_ROTATIONS = [-12, -4, 4, 12, 20];

export default function WorksPage() {
  const [locale, setLocale] = useState<Locale>('es');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { projects, loading } = useData();
  const router = useRouter();

  function getCategoryImages(categoryId: string) {
    return projects
      .filter((p) => p.category === categoryId && p.image)
      .slice(0, 5)
      .map((p) => p.image);
  }

  if (loading) {
    return (
      <>
        <Navbar locale={locale} onLocaleChange={setLocale} />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-400 font-mono text-xs tracking-widest">
            {locale === 'es' ? 'CARGANDO...' : 'LOADING...'}
          </p>
        </main>
      </>
    );
  }

  const leftCategories = categories.filter((_, i) => i % 2 === 0);
  const rightCategories = categories.filter((_, i) => i % 2 !== 0);

  return (
    <>
      <Navbar locale={locale} onLocaleChange={setLocale} />

      <main className="min-h-screen bg-white pt-16">
        {/* Header */}
        <div className="px-6 lg:px-8 pt-8 pb-4 flex items-baseline gap-16">
          <h1 className="text-6xl lg:text-8xl font-serif">
            {locale === 'es' ? 'Trabajos' : 'Works'}
          </h1>
          <span className="text-4xl lg:text-6xl font-serif text-gray-300">Archive</span>
        </div>

        {/* Categories grid */}
        <div className="flex gap-0">
          {/* Left column */}
          <div className="flex-1 flex flex-col">
            {leftCategories.map((cat) => {
              const images = getCategoryImages(cat.id);
              const isHovered = hoveredCategory === cat.id;
              const isOtherHovered = hoveredCategory !== null && !isHovered;

              return (
                <motion.button
                  key={cat.id}
                  onClick={() => router.push(`/works/${cat.id}`)}
                  onHoverStart={() => setHoveredCategory(cat.id)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  animate={{ opacity: isOtherHovered ? 0.25 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full text-left focus:outline-none overflow-visible"
                  style={{ height: '160px' }}
                >
                  {/* Folder shape */}
                  <div
                    className="absolute inset-0 transition-colors duration-300"
                    style={{
                      backgroundColor: isHovered ? 'var(--accent)' : '#f5e6f0',
                      clipPath: 'polygon(0 0, 28% 0, 28% 12%, 100% 12%, 100% 100%, 0 100%)',
                    }}
                  />

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-8 pb-5 z-10">
                    <span className={`font-mono text-[10px] tracking-[0.25em] block mb-1 ${isHovered ? 'text-white/60' : 'text-[var(--accent)]'}`}>
                      {cat.number}
                    </span>
                    <span className={`text-3xl lg:text-5xl font-serif lowercase ${isHovered ? 'text-white' : 'text-gray-900'}`}>
                      {locale === 'es' ? cat.name : cat.nameEn}
                    </span>
                  </div>

                  {/* Flying photos on hover */}
                  <AnimatePresence>
                    {isHovered && images.length > 0 && (
                      <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
                        {images.map((img, i) => (
                          <motion.img
                            key={i}
                            src={img}
                            alt=""
                            initial={{ opacity: 0, y: 60, rotate: 0, scale: 0.6 }}
                            animate={{
                              opacity: 1,
                              y: -80 - i * 20,
                              x: (i - Math.floor(images.length / 2)) * 50,
                              rotate: FOLDER_ROTATIONS[i] || 0,
                              scale: 0.85,
                            }}
                            exit={{ opacity: 0, y: 60, scale: 0.6 }}
                            transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
                            className="absolute w-36 h-28 object-cover shadow-xl"
                            style={{ left: '20%', bottom: 0 }}
                          />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Right column */}
          <div className="flex-1 flex flex-col">
            {rightCategories.map((cat) => {
              const images = getCategoryImages(cat.id);
              const isHovered = hoveredCategory === cat.id;
              const isOtherHovered = hoveredCategory !== null && !isHovered;

              return (
                <motion.button
                  key={cat.id}
                  onClick={() => router.push(`/works/${cat.id}`)}
                  onHoverStart={() => setHoveredCategory(cat.id)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  animate={{ opacity: isOtherHovered ? 0.25 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full text-left focus:outline-none overflow-visible"
                  style={{ height: '160px' }}
                >
                  {/* Folder shape - tab on the right */}
                  <div
                    className="absolute inset-0 transition-colors duration-300"
                    style={{
                      backgroundColor: isHovered ? 'var(--accent)' : '#ede8eb',
                      clipPath: 'polygon(0 12%, 72% 12%, 72% 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                  />

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-8 pb-5 z-10">
                    <span className={`font-mono text-[10px] tracking-[0.25em] block mb-1 ${isHovered ? 'text-white/60' : 'text-[var(--accent)]'}`}>
                      {cat.number}
                    </span>
                    <span className={`text-3xl lg:text-5xl font-serif lowercase ${isHovered ? 'text-white' : 'text-gray-900'}`}>
                      {locale === 'es' ? cat.name : cat.nameEn}
                    </span>
                  </div>

                  {/* Flying photos on hover */}
                  <AnimatePresence>
                    {isHovered && images.length > 0 && (
                      <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
                        {images.map((img, i) => (
                          <motion.img
                            key={i}
                            src={img}
                            alt=""
                            initial={{ opacity: 0, y: 60, rotate: 0, scale: 0.6 }}
                            animate={{
                              opacity: 1,
                              y: -80 - i * 20,
                              x: (i - Math.floor(images.length / 2)) * 50,
                              rotate: FOLDER_ROTATIONS[i] || 0,
                              scale: 0.85,
                            }}
                            exit={{ opacity: 0, y: 60, scale: 0.6 }}
                            transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
                            className="absolute w-36 h-28 object-cover shadow-xl"
                            style={{ left: '20%', bottom: 0 }}
                          />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Footer count */}
        <div className="px-6 lg:px-8 py-8">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-400">
            {projects.length} {locale === 'es' ? 'proyectos en total' : 'total projects'}
          </p>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
