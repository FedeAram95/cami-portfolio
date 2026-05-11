'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Locale, getTranslations } from '@/i18n/translations';
import { categories } from '@/lib/data';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExpandableCategory from '@/components/ExpandableCategory';

export default function WorksPage() {
  const [locale, setLocale] = useState<Locale>('es');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { projects, loading } = useData();
  const t = getTranslations(locale);

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

      <main className="pt-20 lg:pt-24 min-h-screen bg-white">
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

          {/* Categories - Expandable */}
          <div className="flex gap-4 mb-20">
            {/* Left column */}
            <div className="flex-1 flex flex-col space-y-4">
              {categories
                .filter((_, i) => i % 2 === 0)
                .map((cat, stackIndex) => {
                  const catProjects = projects.filter((p) => p.category === cat.id);
                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: stackIndex * 0.1 }}
                    >
                      <ExpandableCategory
                        id={cat.id}
                        name={cat.name}
                        nameEn={cat.nameEn}
                        number={cat.number}
                        projects={catProjects}
                        isActive={activeCategory === cat.id}
                        onToggle={() =>
                          setActiveCategory(activeCategory === cat.id ? null : cat.id)
                        }
                        locale={locale}
                        isLeft={true}
                      />
                    </motion.div>
                  );
                })}
            </div>

            {/* Right column */}
            <div className="flex-1 flex flex-col space-y-4">
              {categories
                .filter((_, i) => i % 2 !== 0)
                .map((cat, stackIndex) => {
                  const catProjects = projects.filter((p) => p.category === cat.id);
                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (stackIndex + 1) * 0.1 }}
                    >
                      <ExpandableCategory
                        id={cat.id}
                        name={cat.name}
                        nameEn={cat.nameEn}
                        number={cat.number}
                        projects={catProjects}
                        isActive={activeCategory === cat.id}
                        onToggle={() =>
                          setActiveCategory(activeCategory === cat.id ? null : cat.id)
                        }
                        locale={locale}
                        isLeft={false}
                      />
                    </motion.div>
                  );
                })}
            </div>
          </div>

          {/* Info */}
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

      <Footer locale={locale} />
    </>
  );
}
