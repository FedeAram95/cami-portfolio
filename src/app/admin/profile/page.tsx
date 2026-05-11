'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminNav from '@/components/admin/AdminNav';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import { useData, Profile } from '@/context/DataContext';

export default function AdminProfilePage() {
  const { profile, updateProfile, loading } = useData();
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(formData);
      setSuccess('Perfil actualizado correctamente');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminNav active="profile" />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 font-mono">Cargando...</p>
        </main>
      </div>
    );
  }

  return (
    <ProtectedAdminRoute>
      <div className="flex h-screen bg-gray-50">
        <AdminNav active="profile" />

        <main className="flex-1 overflow-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-2xl">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-serif mb-2">
                  Perfil<span className="text-[var(--accent)]">.</span>
                </h1>
                <p className="text-gray-600 font-mono text-sm">
                  Actualiza tu información personal
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-mono uppercase mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                {/* Title ES */}
                <div>
                  <label className="block text-sm font-mono uppercase mb-2">
                    Título (ES)
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                {/* Title EN */}
                <div>
                  <label className="block text-sm font-mono uppercase mb-2">
                    Título (EN)
                  </label>
                  <input
                    type="text"
                    value={formData.titleEn || ''}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                {/* Bio ES */}
                <div>
                  <label className="block text-sm font-mono uppercase mb-2">
                    Bio (ES)
                  </label>
                  <textarea
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)] h-32"
                  />
                </div>

                {/* Bio EN */}
                <div>
                  <label className="block text-sm font-mono uppercase mb-2">
                    Bio (EN)
                  </label>
                  <textarea
                    value={formData.bioEn || ''}
                    onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)] h-32"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-mono uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-mono uppercase mb-2">
                    Años de Experiencia
                  </label>
                  <input
                    type="number"
                    value={formData.yearsOfExperience || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[var(--accent)]"
                  />
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
