'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// NOTA: Esto es solo para prototipado. En producción, usar un sistema de auth real.
const ADMIN_PASSWORD_HASH = '5f4dcc3b5aa765d61d8327deb882cf99'; // MD5 of 'password123'

function hashPassword(password: string): string {
  // Simple hash for demo. Use bcrypt in production.
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  function checkAuth() {
    try {
      const token = localStorage.getItem('admin_token');
      setIsAuthenticated(!!token);
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  function login(password: string): boolean {
    // Para demo, aceptar cualquier contraseña. Cambiar a validación real después.
    // En producción: enviar a un endpoint seguro para validar contra la BD
    if (password === 'cami2025') {
      const token = btoa(JSON.stringify({ authenticated: true, timestamp: Date.now() }));
      localStorage.setItem('admin_token', token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AuthProvider');
  }
  return context;
}
