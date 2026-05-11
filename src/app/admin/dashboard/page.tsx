'use client';

import { motion } from 'framer-motion';
import AdminNav from '@/components/admin/AdminNav';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import { useData } from '@/context/DataContext';
import Link from 'next/link';

export default function AdminDashboard() {
  const { projects, profile } = useData();

  const stats = [
    { label: 'Proyectos', value: projects.length },
    { label: 'Categorías', value: 5 },
    { label: 'Tools', value: 12 },
  ];

  return (
    <ProtectedAdminRoute>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <AdminNav active="dashboard" />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-serif mb-2">
                Dashboard<span className="text-[var(--accent)]">.</span>
              </h1>
              <p className="text-gray-600 font-mono text-sm">
                Bienvenido al panel de administración
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-gray-600 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-serif">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-200"
            >
              <h2 className="text-xl font-serif mb-6">
                Acciones Rápidas
                <span className="text-[var(--accent)]">.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/admin/projects"
                  className="p-4 border border-gray-200 hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors group"
                >
                  <h3 className="font-medium group-hover:text-[var(--accent)] transition-colors">
                    Gestionar Proyectos
                  </h3>
                  <p className="text-sm text-gray-600 font-mono mt-1">
                    Ver, editar o eliminar proyectos
                  </p>
                </Link>

                <Link
                  href="/admin/profile"
                  className="p-4 border border-gray-200 hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors group"
                >
                  <h3 className="font-medium group-hover:text-[var(--accent)] transition-colors">
                    Editar Perfil
                  </h3>
                  <p className="text-sm text-gray-600 font-mono mt-1">
                    Actualizar información personal
                  </p>
                </Link>

                <Link
                  href="/admin/theme"
                  className="p-4 border border-gray-200 hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors group"
                >
                  <h3 className="font-medium group-hover:text-[var(--accent)] transition-colors">
                    Personalizar Tema
                  </h3>
                  <p className="text-sm text-gray-600 font-mono mt-1">
                    Cambiar colores y tipografías
                  </p>
                </Link>

                <Link
                  href="/"
                  className="p-4 border border-gray-200 hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors group"
                >
                  <h3 className="font-medium group-hover:text-[var(--accent)] transition-colors">
                    Ver Portfolio
                  </h3>
                  <p className="text-sm text-gray-600 font-mono mt-1">
                    Abrir el portfolio público
                  </p>
                </Link>
              </div>
            </motion.div>

            {/* Setup Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <h3 className="font-medium text-blue-900 mb-2">
                💡 Próximos Pasos
              </h3>
              <ul className="text-sm text-blue-800 font-mono space-y-1">
                <li>✓ Admin panel creado</li>
                <li>⚙️ Configura Supabase con la guía en SUPABASE_SETUP.md</li>
                <li>📸 Carga tus proyectos en "Gestionar Proyectos"</li>
                <li>🎨 Personaliza los colores en "Personalizar Tema"</li>
              </ul>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </ProtectedAdminRoute>
  );
}
