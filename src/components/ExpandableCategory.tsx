'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Project } from '@/context/DataContext';

interface ExpandableCategoryProps {
  id: string;
  name: string;
  nameEn: string;
  number: string;
  projects: Project[];
  isActive: boolean;
  onToggle: () => void;
  locale: 'es' | 'en';
  isLeft: boolean;
}

export default function ExpandableCategory({
  id,
  name,
  nameEn,
  number,
  projects,
  isActive,
  onToggle,
  locale,
  isLeft,
}: ExpandableCategoryProps) {
  const displayName = locale === 'es' ? name : nameEn;
  const clipPath = isLeft
    ? 'polygon(0 0, 30% 0, 30% 15%, 100% 15%, 100% 100%, 0 100%)'
    : 'polygon(0 15%, 70% 15%, 70% 0, 100% 0, 100% 100%, 0 100%)';

  return (
    <div className="relative">
      {/* Category Header - Always visible */}
      <motion.button
        onClick={onToggle}
        className={`w-full text-left cursor-pointer group focus:outline-none relative transition-all duration-300 ${
          isActive
            ? 'bg-[var(--accent)] shadow-lg'
            : 'bg-[var(--accent)]/15 hover:bg-[var(--accent)]/25'
        }`}
        style={{
          clipPath: clipPath,
          minHeight: '160px',
        }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-8 pb-5 lg:pb-6">
          <span
            className={`font-mono text-xs block mb-1 ${
              isActive ? 'text-white/70' : 'text-[var(--accent)]'
            }`}
          >
            {number}
          </span>
          <span
            className={`text-2xl lg:text-4xl font-serif block ${isActive ? 'text-white' : ''}`}
          >
            {displayName}
          </span>
        </div>
      </motion.button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isActive && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden bg-white border-l-4 border-[var(--accent)]"
          >
            <div className="p-6 lg:p-8 space-y-6">
              {projects.map((project, index) => (
                <motion.a
                  key={project.id}
                  href={project.behanceurl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block group"
                >
                  <div className="border-b border-gray-100 pb-6 hover:border-[var(--accent)]/30 transition-colors">
                    <h3 className="text-xl font-medium mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {locale === 'es' ? project.title : project.titleen}
                    </h3>
                    <p className="text-gray-600 text-sm font-mono mb-3">
                      {locale === 'es' ? project.description : project.descriptionen}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-mono">{project.year}</span>
                      <span className="text-sm text-[var(--accent)] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        View →
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {isActive && projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white p-6 lg:p-8 text-gray-500 text-sm font-mono border-l-4 border-[var(--accent)]"
        >
          {locale === 'es' ? 'No hay proyectos en esta categoría' : 'No projects in this category'}
        </motion.div>
      )}
    </div>
  );
}
