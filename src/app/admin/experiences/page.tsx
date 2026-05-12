'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminNav from '@/components/admin/AdminNav';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import { useData, Experience } from '@/context/DataContext';

const EMPTY_FORM: Omit<Experience, 'id'> = {
  company: '',
  position: '',
  positionen: '',
  period: '',
  current: false,
  sort_order: 0,
};

export default function AdminExperiencesPage() {
  const { experiences, addExperience, updateExperience, deleteExperience, loading } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>(EMPTY_FORM);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function openNew() {
    setEditingId(null);
    setFormData({ ...EMPTY_FORM, sort_order: experiences.length });
    setShowForm(true);
  }

  function openEdit(exp: Experience) {
    setEditingId(exp.id);
    setFormData({
      company: exp.company,
      position: exp.position,
      positionen: exp.positionen,
      period: exp.period,
      current: exp.current,
      sort_order: exp.sort_order,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.company || !formData.position) {
      setError('Empresa y posición son requeridos');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await updateExperience(editingId, formData);
      } else {
        await addExperience(formData);
      }
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta experiencia?')) return;
    try {
      await deleteExperience(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
    }
  }

  return (
    <ProtectedAdminRoute>
      <div className="flex h-screen bg-gray-50">
        <AdminNav active="experiences" />
        <main className="flex-1 overflow-auto p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-serif mb-2">
                  Experiencias<span className="text-[var(--accent)]">.</span>
                </h1>
                <p className="text-gray-600 font-mono text-sm">{experiences.length} entradas</p>
              </div>
              <button
                onClick={openNew}
                className="px-6 py-3 bg-[var(--accent)] text-white font-mono text-sm uppercase hover:bg-[var(--accent-dark)] transition-colors"
              >
                + Agregar
              </button>
            </div>

            {loading ? (
              <p className="text-gray-400 font-mono">Cargando...</p>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {experiences.length === 0 ? (
                  <p className="p-8 text-center text-gray-400 font-mono">Sin experiencias todavía</p>
                ) : (
                  experiences.map((exp, i) => (
                    <div
                      key={exp.id}
                      className={`flex items-center justify-between px-6 py-4 ${i < experiences.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{exp.company}</p>
                        <p className="text-sm text-gray-600">{exp.position}</p>
                        <p className="text-xs text-gray-400 font-mono">{exp.period}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {exp.current && (
                          <span className="px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-[9px] tracking-widest uppercase">
                            Actual
                          </span>
                        )}
                        <button
                          onClick={() => openEdit(exp)}
                          className="px-3 py-1.5 border border-gray-300 font-mono text-xs uppercase hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(exp.id)}
                          className="px-3 py-1.5 border border-red-300 text-red-500 font-mono text-xs uppercase hover:bg-red-50 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {error && <p className="mt-4 text-red-500 text-sm font-mono">{error}</p>}

            {/* Form Modal */}
            <AnimatePresence>
              {showForm && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowForm(false)}
                    className="fixed inset-0 bg-black/50 z-40"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-lg shadow-lg p-8 z-50"
                  >
                    <h2 className="text-2xl font-serif mb-6">
                      {editingId ? 'Editar Experiencia' : 'Nueva Experiencia'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase mb-1">Empresa *</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase mb-1">Posición (ES) *</label>
                        <input
                          type="text"
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase mb-1">Posición (EN)</label>
                        <input
                          type="text"
                          value={formData.positionen}
                          onChange={(e) => setFormData({ ...formData, positionen: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase mb-1">Período</label>
                        <input
                          type="text"
                          value={formData.period}
                          onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                          placeholder="2023 - Presente"
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase mb-1">Orden</label>
                        <input
                          type="number"
                          value={formData.sort_order}
                          onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.current}
                          onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                          className="w-4 h-4 accent-[var(--accent)]"
                        />
                        <span className="font-mono text-sm">Trabajo actual</span>
                      </label>
                      {error && <p className="text-red-500 text-sm font-mono">{error}</p>}
                      <div className="flex gap-4 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="flex-1 px-4 py-3 border border-gray-300 font-mono uppercase hover:bg-gray-50"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="flex-1 px-4 py-3 bg-[var(--accent)] text-white font-mono uppercase hover:bg-[var(--accent-dark)] disabled:opacity-50"
                        >
                          {saving ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
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
