'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Locale, getTranslations } from '@/i18n/translations';
import { experiences, tools, socialLinks } from '@/lib/data';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TabsNav from '@/components/TabsNav';

const TABS = ['about', 'details', 'experiences', 'profile'];

export default function AboutPage() {
  const [locale, setLocale] = useState<Locale>('es');
  const [activeTab, setActiveTab] = useState('about');
  const { profile, loading } = useData();
  const t = getTranslations(locale);

  const toolCategories = [...new Set(tools.map((t) => t.category))];

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

  const tabConfig = [
    { id: 'about', label: locale === 'es' ? 'Sobre' : 'About' },
    { id: 'details', label: locale === 'es' ? 'Detalles' : 'Details' },
    { id: 'experiences', label: locale === 'es' ? 'Experiencia' : 'Experience' },
    { id: 'profile', label: locale === 'es' ? 'Perfil' : 'Profile' },
  ];

  return (
    <>
      <Navbar locale={locale} onLocaleChange={setLocale} />

      <main className="pt-20 lg:pt-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 lg:py-16 mb-12"
          >
            <h1 className="text-5xl lg:text-7xl font-serif">
              {t.about.title}
              <span className="text-[var(--accent)]"> {t.about.titleAccent}</span>
              <span className="text-[var(--accent)]">.</span>
            </h1>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-20">
            {/* Left: Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-32 h-fit"
            >
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

              {/* Name */}
              <h2 className="text-2xl font-serif mb-6">{profile?.name || 'Camila Piana'}</h2>

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
                    <span className="text-sm font-light group-hover:text-[var(--accent)] transition-colors">
                      {link.platform}
                    </span>
                    <span className="text-xs text-gray-400 font-mono group-hover:text-[var(--accent)] transition-colors">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right: Tabs Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Tabs Navigation */}
              <TabsNav
                tabs={tabConfig}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab Content */}
              <div className="py-12">
                <AnimatePresence mode="wait">
                  {/* About Tab */}
                  {activeTab === 'about' && (
                    <motion.div
                      key="about"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {locale === 'es' ? profile?.bio : profile?.bioEn}
                        </p>
                        <div className="pt-4">
                          <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                            {locale === 'es' ? 'Especialidades' : 'Specialties'}
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {/* Placeholder specialties - vender de Supabase después */}
                            {['Branding', 'UX / UI', 'Paid Media', 'Email Marketing'].map((spec) => (
                              <span
                                key={spec}
                                className="px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs tracking-wider"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Details Tab (Tools) */}
                  {activeTab === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
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
                                  className="px-4 py-2 border border-gray-200 font-mono text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                                >
                                  {tool.name}
                                </span>
                              ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Experiences Tab */}
                  {activeTab === 'experiences' && (
                    <motion.div
                      key="experiences"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {experiences.map((exp, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-6 border border-gray-100 hover:border-[var(--accent)]/30 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
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
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Profile Tab (Social + Extended) */}
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div>
                        <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                          {locale === 'es' ? 'Contacto' : 'Contact'}
                        </h3>
                        <div className="space-y-3">
                          {socialLinks.map((link) => (
                            <a
                              key={link.platform}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between group p-3 border border-gray-100 hover:border-[var(--accent)]/30 transition-colors"
                            >
                              <span className="font-mono text-sm">{link.platform}</span>
                              <span className="text-xs text-gray-400 group-hover:text-[var(--accent)] transition-colors">
                                {link.label}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                          {locale === 'es' ? 'Ubicación' : 'Location'}
                        </h3>
                        <p className="text-lg">{profile?.title || 'Argentina'}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="py-20 text-center border-t border-gray-200 mt-20"
          >
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">
              {locale === 'es' ? '¿Trabajamos juntos?' : 'Shall we work together?'}
            </p>
            <h3 className="text-4xl lg:text-5xl font-serif mb-8">
              {locale === 'es' ? 'Hablemos' : "Let's talk"}
              <span className="text-[var(--accent)]">.</span>
            </h3>
            <a
              href={`mailto:${profile?.email || 'camipiana24@gmail.com'}`}
              className="inline-block px-10 py-4 bg-[var(--accent)] text-white font-mono text-sm tracking-wider uppercase hover:bg-[var(--accent-dark)] transition-colors"
            >
              {profile?.email || 'camipiana24@gmail.com'}
            </a>
          </motion.div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
