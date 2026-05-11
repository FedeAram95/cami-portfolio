'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAdminAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    router.push('/admin/dashboard');
    return null;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (login(password)) {
        router.push('/admin/dashboard');
      } else {
        setError('Contraseña incorrecta');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--accent)]/10 to-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-2">
            CP
            <span className="text-[var(--accent)]">.</span>
          </h1>
          <p className="text-gray-600 font-mono text-xs tracking-wider">
            Admin Panel
          </p>
        </div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-mono tracking-wider uppercase text-gray-600 mb-3"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contraseña"
              className="w-full px-4 py-3 border border-gray-300 font-mono text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/50 transition-colors"
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-mono"
            >
              {error}
            </motion.p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--accent)] text-white font-mono text-sm tracking-wider uppercase hover:bg-[var(--accent-dark)] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Accediendo...' : 'Acceder'}
          </button>
        </motion.form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 font-mono text-xs mt-8"
        >
          Solo para administradores
        </motion.p>
      </motion.div>
    </div>
  );
}
