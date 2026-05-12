'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminNav from '@/components/admin/AdminNav';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import { useData, Tool } from '@/context/DataContext';

const EMPTY_FORM: Omit<Tool, 'id'> = {
  name: '',
  category: '',
  sort_order: 0,
};

export default function AdminToolsPage() {
  const { tools, addTool, updateTool, deleteTool, loading } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Tool, 'id'>>(EMPTY_FORM);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const categories = [...new Set(tools.map((t) => t.category))].filter(Boolean);

  function openNew() {
    setEditingId(null);
    setFormData({ ...EMPTY_FORM, sort_order: tools.length });
    setShowForm(true);
  }

  function openEdit(tool: Tool) {
    setEditingId(tool.id);
    setFormData({ name: tool.name, category: tool.category, sort_order: tool.sort_order });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.category) {
      setError('Nombre y categoría son requeridos');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await updateTool(editingId, formData);
      } else {
        await addTool(formData);
      }
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta herramienta?')) return;
    try {
      await deleteTool(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
    }
  }

  return (
    <ProtectedAdminRoute>
      <div className="flex h-screen bg-gray-50">
        <AdminNav active="tools" />
        <main className="flex-1 overflow-auto p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-serif mb-2">
                  Herramientas<span className="text-[var(--accent)]">.</span>
                </h1>
                <p className="text-gray-600 font-mono text-sm">{tools.length} herramientas</p>
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
              <div className="space-y-6">
                {categories.map((cat) => (
                  <div key={cat} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                      <span className="font-mono text-xs tracking-widest uppercase text-gray-500">{cat}</span>
                    </div>
                    {tools
                      .filter((t) => t.category === cat)
                      .map((tool, i, arr) => (
                        <div
                          key={tool.id}
                          className={`flex items-center justify-between px-6 py-3 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                          <p className="font-medium text-gray-900">{tool.name}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEdit(tool)}
                              className="px-3 py-1.5 border border-gray-300 font-mono text-xs uppercase hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(tool.id)}
                              className="px-3 py-1.5 border border-red-300 text-red-500 font-mono text-xs uppercase hover:bg-red-50 transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
                {tools.length === 0 && (
                  <p className="text-center text-gray-400 font-mono py-8">Sin herramientas todavía</p>
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
                      {editingId ? 'Editar Herramienta' : 'Nueva Herramienta'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase mb-1">Nombre *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase mb-1">Categoría *</label>
                        <input
                          type="text"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="Design / AI / Marketing / Management"
                          list="cat-suggestions"
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                          required
                        />
                        <datalist id="cat-suggestions">
                          {categories.map((c) => <option key={c} value={c} />)}
                          <option value="Design" />
                          <option value="AI" />
                          <option value="Marketing" />
                          <option value="Management" />
                        </datalist>
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
