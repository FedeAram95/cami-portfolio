'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminNav from '@/components/admin/AdminNav';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import { useData, Project } from '@/context/DataContext';
import { categories } from '@/lib/data';

export default function AdminProjectsPage() {
  const { projects, addProject, updateProject, deleteProject, loading } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    titleEn: '',
    category: categories[0].id,
    image: '',
    description: '',
    descriptionEn: '',
    behanceUrl: '',
    year: new Date().getFullYear().toString(),
  });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      if (!formData.title || !formData.titleEn || !formData.category) {
        setError('Completa todos los campos requeridos');
        return;
      }

      if (editingId) {
        await updateProject(editingId, formData);
      } else {
        await addProject(formData as Omit<Project, 'id' | 'created_at' | 'updated_at'>);
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: '',
        titleEn: '',
        category: categories[0].id,
        image: '',
        description: '',
        descriptionEn: '',
        behanceUrl: '',
        year: new Date().getFullYear().toString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el proyecto');
    }
  }

  function startEdit(project: Project) {
    setEditingId(project.id);
    setFormData(project);
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (confirm('¿Eliminar este proyecto?')) {
      try {
        await deleteProject(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al eliminar');
      }
    }
  }

  return (
    <ProtectedAdminRoute>
      <div className="flex h-screen bg-gray-50">
        <AdminNav active="projects" />

        <main className="flex-1 overflow-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-serif mb-2">
                  Proyectos<span className="text-[var(--accent)]">.</span>
                </h1>
                <p className="text-gray-600 font-mono text-sm">
                  Total: {projects.length} proyectos
                </p>
              </div>

              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingId(null);
                  setFormData({
                    title: '',
                    titleEn: '',
                    category: categories[0].id,
                    image: '',
                    description: '',
                    descriptionEn: '',
                    behanceUrl: '',
                    year: new Date().getFullYear().toString(),
                  });
                }}
                className="px-6 py-3 bg-[var(--accent)] text-white font-mono text-sm uppercase hover:bg-[var(--accent-dark)] transition-colors"
              >
                + Agregar Proyecto
              </button>
            </div>

            {/* Projects Grid */}
            {loading ? (
              <p className="text-gray-400 font-mono">Cargando...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[var(--accent)] transition-colors group"
                  >
                    {/* Image */}
                    <div className="aspect-video bg-gray-100 rounded mb-4 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-mono text-xs">
                          No imagen
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="font-medium mb-1 line-clamp-2">{project.title}</h3>
                    <p className="text-xs text-gray-600 font-mono mb-4">
                      {categories.find((c) => c.id === project.category)?.name || 'Sin categoría'}
                      {' • '}
                      {project.year}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(project)}
                        className="flex-1 px-3 py-2 border border-gray-300 font-mono text-xs uppercase hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="flex-1 px-3 py-2 border border-red-300 text-red-500 font-mono text-xs uppercase hover:bg-red-50 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {projects.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-400 font-mono mb-6">
                  No hay proyectos todavía
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-[var(--accent)] text-white font-mono text-sm uppercase"
                >
                  Crear primer proyecto
                </button>
              </div>
            )}

            {/* Form Modal */}
            <AnimatePresence>
              {showForm && (
                <>
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowForm(false)}
                    className="fixed inset-0 bg-black/50 z-40"
                  />

                  {/* Form */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 z-50 overflow-y-auto max-h-[90vh]"
                  >
                    <h2 className="text-2xl font-serif mb-6">
                      {editingId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Title ES */}
                      <div>
                        <label className="block text-sm font-mono uppercase mb-2">
                          Título (ES) *
                        </label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                          required
                        />
                      </div>

                      {/* Title EN */}
                      <div>
                        <label className="block text-sm font-mono uppercase mb-2">
                          Título (EN) *
                        </label>
                        <input
                          type="text"
                          value={formData.titleEn || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, titleEn: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                          required
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-sm font-mono uppercase mb-2">
                          Categoría *
                        </label>
                        <select
                          value={formData.category || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                          required
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Description ES */}
                      <div>
                        <label className="block text-sm font-mono uppercase mb-2">
                          Descripción (ES)
                        </label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)] h-20"
                        />
                      </div>

                      {/* Description EN */}
                      <div>
                        <label className="block text-sm font-mono uppercase mb-2">
                          Descripción (EN)
                        </label>
                        <textarea
                          value={formData.descriptionEn || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, descriptionEn: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)] h-20"
                        />
                      </div>

                      {/* Image URL */}
                      <div>
                        <label className="block text-sm font-mono uppercase mb-2">
                          URL Imagen
                        </label>
                        <input
                          type="url"
                          value={formData.image || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, image: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>

                      {/* Behance URL */}
                      <div>
                        <label className="block text-sm font-mono uppercase mb-2">
                          URL Behance
                        </label>
                        <input
                          type="url"
                          value={formData.behanceUrl || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, behanceUrl: e.target.value })
                          }
                          placeholder="https://behance.net/..."
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>

                      {/* Year */}
                      <div>
                        <label className="block text-sm font-mono uppercase mb-2">
                          Año
                        </label>
                        <input
                          type="text"
                          value={formData.year || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, year: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>

                      {/* Error */}
                      {error && (
                        <p className="text-red-500 text-sm font-mono">{error}</p>
                      )}

                      {/* Actions */}
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="flex-1 px-4 py-3 border border-gray-300 font-mono uppercase hover:bg-gray-50"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-4 py-3 bg-[var(--accent)] text-white font-mono uppercase hover:bg-[var(--accent-dark)]"
                        >
                          {editingId ? 'Actualizar' : 'Crear'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </ProtectedAdminRoute>
  );
}
