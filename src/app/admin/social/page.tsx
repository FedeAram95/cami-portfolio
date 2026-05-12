'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminNav from '@/components/admin/AdminNav';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import { useData, SocialLink } from '@/context/DataContext';

const EMPTY_FORM: Omit<SocialLink, 'id'> = {
  platform: '',
  url: '',
  label: '',
  sort_order: 0,
};

export default function AdminSocialPage() {
  const { socialLinks, addSocialLink, updateSocialLink, deleteSocialLink, loading } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<SocialLink, 'id'>>(EMPTY_FORM);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function openNew() {
    setEditingId(null);
    setFormData({ ...EMPTY_FORM, sort_order: socialLinks.length });
    setShowForm(true);
  }

  function openEdit(link: SocialLink) {
    setEditingId(link.id);
    setFormData({ platform: link.platform, url: link.url, label: link.label, sort_order: link.sort_order });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.platform || !formData.url) {
      setError('Plataforma y URL son requeridos');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await updateSocialLink(editingId, formData);
      } else {
        await addSocialLink(formData);
      }
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este link?')) return;
    try {
      await deleteSocialLink(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
    }
  }

  return (
    <ProtectedAdminRoute>
      <div className="flex h-screen bg-gray-50">
        <AdminNav active="social" />
        <main className="flex-1 overflow-auto p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-serif mb-2">
                  Links Sociales<span className="text-[var(--accent)]">.</span>
                </h1>
                <p className="text-gray-600 font-mono text-sm">{socialLinks.length} links</p>
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
                {socialLinks.length === 0 ? (
                  <p className="p-8 text-center text-gray-400 font-mono">Sin links todavía</p>
                ) : (
                  socialLinks.map((link, i) => (
                    <div
                      key={link.id}
                      className={`flex items-center justify-between px-6 py-4 ${i < socialLinks.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <div className="flex-1">
                        <p className="font-mono text-xs tracking-widest uppercase text-[var(--accent)] mb-0.5">
                          {link.platform}
                        </p>
                        <p className="font-medium text-gray-900">{link.label}</p>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-400 hover:text-[var(--accent)] font-mono"
                        >
                          {link.url}
                        </a>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => openEdit(link)}
                          className="px-3 py-1.5 border border-gray-300 font-mono text-xs uppercase hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(link.id)}
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
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-lg p-8 z-50"
                  >
                    <h2 className="text-2xl font-serif mb-6">
                      {editingId ? 'Editar Link' : 'Nuevo Link Social'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase mb-1">Plataforma *</label>
                        <input
                          type="text"
                          value={formData.platform}
                          onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                          placeholder="Behance / LinkedIn / Instagram"
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase mb-1">URL *</label>
                        <input
                          type="url"
                          value={formData.url}
                          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase mb-1">Etiqueta</label>
                        <input
                          type="text"
                          value={formData.label}
                          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                          placeholder="behance.net/camipiana"
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
