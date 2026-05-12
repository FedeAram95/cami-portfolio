'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Locale } from '@/i18n/translations';
import { profile as staticProfile, tools as staticTools, experiences as staticExperiences, socialLinks as staticSocialLinks } from '@/lib/data';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const [locale, setLocale] = useState<Locale>('es');
  const { profile, loading, experiences: dbExperiences, tools: dbTools, socialLinks: dbSocialLinks } = useData();

  const displayProfile = profile || staticProfile;

  // Use DB data if available, fall back to static
  const experiences = dbExperiences.length > 0 ? dbExperiences : staticExperiences.map((e, i) => ({
    id: String(i),
    company: e.company,
    position: e.position,
    positionen: e.positionEn,
    period: e.period,
    current: e.current ?? false,
    sort_order: i,
  }));

  const tools = dbTools.length > 0 ? dbTools : staticTools.map((t, i) => ({
    id: String(i),
    name: t.name,
    category: t.category,
    sort_order: i,
  }));

  const socialLinks = dbSocialLinks.length > 0 ? dbSocialLinks : staticSocialLinks.map((s, i) => ({
    id: String(i),
    platform: s.platform,
    url: s.url,
    label: s.label,
    sort_order: i,
  }));

  const toolCategories = [...new Set(tools.map((t) => t.category))];

  if (loading) {
    return (
      <>
        <Navbar locale={locale} onLocaleChange={setLocale} />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <p className="font-mono text-xs tracking-widest text-gray-400">CARGANDO...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar locale={locale} onLocaleChange={setLocale} />

      <main className="min-h-screen bg-white pt-16">
        {/* Header */}
        <div className="px-6 lg:px-8 pt-8 pb-6 flex items-baseline gap-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-8xl font-serif"
          >
            {locale === 'es' ? 'Sobre' : 'About'}
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-6xl lg:text-8xl font-serif"
          >
            {locale === 'es' ? 'mí' : 'me'}
          </motion.span>
        </div>

        {/* Grid panels */}
        <div className="border-t border-gray-300">

          {/* Row 1: About + Experiences side by side */}
          <div className="flex border-b border-gray-300">
            {/* ABOUT panel */}
            <div className="w-1/3 border-r border-gray-300">
              <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-300">
                <div className="w-2 h-2 bg-gray-900" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500">
                  {locale === 'es' ? 'Sobre' : 'About'}
                </span>
              </div>
              <div className="p-6 lg:p-8">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  {locale === 'es'
                    ? (displayProfile as any).bio || staticProfile.bio
                    : (displayProfile as any).bioEn || staticProfile.bioEn}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Branding', 'UX / UI', 'Paid Media', 'Email Marketing'].map((spec) => (
                    <span key={spec} className="px-3 py-1 border border-[var(--accent)]/40 text-[var(--accent)] font-mono text-[10px] tracking-widest uppercase">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* EXPERIENCES panel */}
            <div className="flex-1">
              <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-300">
                <div className="w-2 h-2 bg-gray-900" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500">
                  {locale === 'es' ? 'Experiencias' : 'Experiences'}
                </span>
              </div>
              <div>
                <div className="flex px-6 py-3 border-b border-gray-200">
                  <span className="flex-1 font-mono text-[10px] tracking-[0.2em] uppercase text-gray-400">
                    {locale === 'es' ? 'Empresa' : 'Company'}
                  </span>
                  <span className="flex-1 font-mono text-[10px] tracking-[0.2em] uppercase text-gray-400">
                    {locale === 'es' ? 'Posición' : 'Position'}
                  </span>
                  <span className="w-32 font-mono text-[10px] tracking-[0.2em] uppercase text-gray-400 text-right">
                    {locale === 'es' ? 'Período' : 'Period'}
                  </span>
                </div>
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{exp.company}</p>
                      {exp.current && (
                        <span className="font-mono text-[9px] tracking-widest text-[var(--accent)] uppercase">
                          {locale === 'es' ? 'Actual' : 'Current'}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm">
                        {locale === 'es' ? exp.position : exp.positionen}
                      </p>
                    </div>
                    <div className="w-32 text-right">
                      <span className="font-mono text-xs text-gray-400">{exp.period}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Skillsets (accent background) + Profile */}
          <div className="flex border-b border-gray-300">
            {/* SKILLSETS panel */}
            <div className="w-1/3 border-r border-gray-300" style={{ backgroundColor: 'var(--accent)' }}>
              <div className="flex items-center gap-2 px-6 py-3 border-b border-white/20">
                <div className="w-2 h-2 bg-white" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/70">
                  {locale === 'es' ? 'Habilidades' : 'Skillsets'}
                </span>
              </div>
              <div className="p-6 lg:p-8">
                <h2 className="text-4xl lg:text-5xl font-serif text-white mb-6">
                  {locale === 'es' ? 'Habilidades' : 'Skillsets'}
                </h2>
                {toolCategories.map((cat) => (
                  <div key={cat} className="mb-4">
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/60 mb-2">{cat}</p>
                    <div className="flex flex-wrap gap-2">
                      {tools.filter((t) => t.category === cat).map((tool) => (
                        <span
                          key={tool.id}
                          className="px-2 py-1 bg-white/15 text-white font-mono text-[10px] tracking-wider"
                        >
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PROFILE panel */}
            <div className="flex-1">
              <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-300">
                <div className="w-2 h-2 bg-gray-900" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500">
                  Profile
                </span>
              </div>
              <div className="flex gap-8 p-6 lg:p-8">
                {/* Photo */}
                <div className="w-48 h-60 bg-gray-100 flex-shrink-0 overflow-hidden">
                  {(displayProfile as any).photoUrl ? (
                    <img
                      src={(displayProfile as any).photoUrl}
                      alt={(displayProfile as any).name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl text-[var(--accent)]">CP</span>
                        </div>
                        <p className="font-mono text-[9px] text-gray-400 tracking-wider">PHOTO</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="flex-1">
                  <h3 className="text-3xl font-serif mb-4">
                    {(displayProfile as any).name || staticProfile.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">
                    {locale === 'es'
                      ? (displayProfile as any).bio || staticProfile.bio
                      : (displayProfile as any).bioEn || staticProfile.bioEn}
                  </p>

                  {/* Social links */}
                  <div className="space-y-2">
                    {socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400 w-20">
                          {link.platform}
                        </span>
                        <span className="text-sm text-gray-700 group-hover:text-[var(--accent)] transition-colors">
                          {link.label}
                        </span>
                      </a>
                    ))}
                    {(displayProfile as any).email && !socialLinks.some((l) => l.platform.toLowerCase() === 'email') && (
                      <a
                        href={`mailto:${(displayProfile as any).email}`}
                        className="flex items-center gap-3 group"
                      >
                        <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400 w-20">Email</span>
                        <span className="text-sm text-gray-700 group-hover:text-[var(--accent)] transition-colors">
                          {(displayProfile as any).email}
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Details full width */}
          <div>
            <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-300">
              <div className="w-2 h-2 bg-gray-900" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500">
                {locale === 'es' ? 'Detalles' : 'Details'}
              </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
              {toolCategories.map((cat, i) => (
                <div key={cat} className={`p-6 lg:p-8 ${i < toolCategories.length - 1 ? 'border-r border-gray-200' : ''}`}>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent)] mb-4">{cat}</p>
                  <ul className="space-y-2">
                    {tools.filter((t) => t.category === cat).map((tool) => (
                      <li key={tool.id} className="text-sm text-gray-700 font-light">{tool.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
