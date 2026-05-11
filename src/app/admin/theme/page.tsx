'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminNav from '@/components/admin/AdminNav';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import { useTheme, ThemeSettings } from '@/context/ThemeContext';

export default function AdminThemePage() {
  const { theme, updateTheme, loading } = useTheme();
  const [formData, setFormData] = useState<Partial<ThemeSettings>>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (theme) {
      setFormData(theme);
    }
  }, [theme]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await updateTheme(formData);
      setSuccess('Tema actualizado correctamente');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminNav active="theme" />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 font-mono">Cargando...</p>
        </main>
      </div>
    );
  }

  return (
    <ProtectedAdminRoute>
      <div className="flex h-screen bg-gray-50">
        <AdminNav active="theme" />

        <main className="flex-1 overflow-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-3xl">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-serif mb-2">
                  Personalizar Tema<span className="text-[var(--accent)]">.</span>
                </h1>
                <p className="text-gray-600 font-mono text-sm">
                  Cambia los colores y tipografías del portfolio
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Colors Section */}
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-serif mb-6">Colores</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Primary Color */}
                    <div>
                      <label className="block text-sm font-mono uppercase mb-3">
                        Color Principal (Fucsia)
                      </label>
                      <div className="flex gap-4 items-center">
                        <input
                          type="color"
                          value={formData.primaryColor || '#d946a8'}
                          onChange={(e) =>
                            setFormData({ ...formData, primaryColor: e.target.value })
                          }
                          className="w-20 h-20 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.primaryColor || '#d946a8'}
                          onChange={(e) =>
                            setFormData({ ...formData, primaryColor: e.target.value })
                          }
                          className="flex-1 px-4 py-2 border border-gray-300 font-mono text-sm focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>
                    </div>

                    {/* Secondary Color */}
                    <div>
                      <label className="block text-sm font-mono uppercase mb-3">
                        Color Secundario
                      </label>
                      <div className="flex gap-4 items-center">
                        <input
                          type="color"
                          value={formData.secondaryColor || '#a21caf'}
                          onChange={(e) =>
                            setFormData({ ...formData, secondaryColor: e.target.value })
                          }
                          className="w-20 h-20 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.secondaryColor || '#a21caf'}
                          onChange={(e) =>
                            setFormData({ ...formData, secondaryColor: e.target.value })
                          }
                          className="flex-1 px-4 py-2 border border-gray-300 font-mono text-sm focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>
                    </div>

                    {/* Background Color */}
                    <div>
                      <label className="block text-sm font-mono uppercase mb-3">
                        Color de Fondo
                      </label>
                      <div className="flex gap-4 items-center">
                        <input
                          type="color"
                          value={formData.backgroundColor || '#ffffff'}
                          onChange={(e) =>
                            setFormData({ ...formData, backgroundColor: e.target.value })
                          }
                          className="w-20 h-20 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.backgroundColor || '#ffffff'}
                          onChange={(e) =>
                            setFormData({ ...formData, backgroundColor: e.target.value })
                          }
                          className="flex-1 px-4 py-2 border border-gray-300 font-mono text-sm focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>
                    </div>

                    {/* Text Color */}
                    <div>
                      <label className="block text-sm font-mono uppercase mb-3">
                        Color de Texto
                      </label>
                      <div className="flex gap-4 items-center">
                        <input
                          type="color"
                          value={formData.textColor || '#171717'}
                          onChange={(e) =>
                            setFormData({ ...formData, textColor: e.target.value })
                          }
                          className="w-20 h-20 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.textColor || '#171717'}
                          onChange={(e) =>
                            setFormData({ ...formData, textColor: e.target.value })
                          }
                          className="flex-1 px-4 py-2 border border-gray-300 font-mono text-sm focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fonts Section */}
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-serif mb-6">Tipografías</h2>

                  <div className="space-y-6">
                    {/* Sans Font */}
                    <div>
                      <label className="block text-sm font-mono uppercase mb-2">
                        Tipografía Sans (Títulos y body)
                      </label>
                      <input
                        type="text"
                        value={formData.sansFont || 'Geist'}
                        onChange={(e) =>
                          setFormData({ ...formData, sansFont: e.target.value })
                        }
                        placeholder="Geist, Inter, etc."
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>

                    {/* Serif Font */}
                    <div>
                      <label className="block text-sm font-mono uppercase mb-2">
                        Tipografía Serif (Títulos grandes)
                      </label>
                      <input
                        type="text"
                        value={formData.serifFont || 'Geist'}
                        onChange={(e) =>
                          setFormData({ ...formData, serifFont: e.target.value })
                        }
                        placeholder="Geist, Playfair Display, etc."
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>

                    {/* Mono Font */}
                    <div>
                      <label className="block text-sm font-mono uppercase mb-2">
                        Tipografía Monoespaciada (Etiquetas)
                      </label>
                      <input
                        type="text"
                        value={formData.monoFont || 'Geist Mono'}
                        onChange={(e) =>
                          setFormData({ ...formData, monoFont: e.target.value })
                        }
                        placeholder="Geist Mono, Courier, etc."
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-serif mb-6">Vista Previa</h2>
                  <div className="p-6 border-2" style={{ borderColor: formData.primaryColor }}>
                    <h3
                      className="text-2xl font-serif mb-4"
                      style={{
                        color: formData.textColor,
                        fontFamily: formData.serifFont,
                      }}
                    >
                      Título Ejemplo
                    </h3>
                    <p
                      className="text-sm font-mono mb-4"
                      style={{
                        color: formData.primaryColor,
                        fontFamily: formData.monoFont,
                      }}
                    >
                      ETIQUETA DE EJEMPLO
                    </p>
                    <button
                      style={{
                        backgroundColor: formData.primaryColor,
                        color: 'white',
                      }}
                      className="px-6 py-2 font-mono text-sm uppercase"
                    >
                      Botón Ejemplo
                    </button>
                  </div>
                </div>

                {/* Messages */}
                {error && <p className="text-red-500 text-sm font-mono">{error}</p>}
                {success && <p className="text-green-500 text-sm font-mono">{success}</p>}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full px-4 py-3 bg-[var(--accent)] text-white font-mono uppercase hover:bg-[var(--accent-dark)] disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </form>
            </div>
          </motion.div>
        </main>
      </div>
    </ProtectedAdminRoute>
  );
}
