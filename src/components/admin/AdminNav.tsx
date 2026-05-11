'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

interface AdminNavProps {
  active: string;
}

export default function AdminNav({ active }: AdminNavProps) {
  const router = useRouter();
  const { logout } = useAdminAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard' },
    { id: 'projects', label: 'Proyectos', href: '/admin/projects' },
    { id: 'profile', label: 'Perfil', href: '/admin/profile' },
    { id: 'theme', label: 'Tema', href: '/admin/theme' },
  ];

  function handleLogout() {
    logout();
    router.push('/admin');
  }

  return (
    <nav className="bg-gray-900 text-white w-64 min-h-screen p-6 flex flex-col">
      {/* Logo */}
      <Link href="/admin/dashboard" className="text-2xl font-serif mb-12">
        CP<span className="text-[var(--accent)]">.</span>
      </Link>

      {/* Menu Items */}
      <div className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`block px-4 py-3 rounded font-mono text-sm tracking-wider uppercase transition-colors ${
              active === item.id
                ? 'bg-[var(--accent)] text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        className="w-full px-4 py-3 bg-red-500/20 text-red-400 rounded font-mono text-sm tracking-wider uppercase hover:bg-red-500/30 transition-colors"
      >
        Salir
      </motion.button>
    </nav>
  );
}
