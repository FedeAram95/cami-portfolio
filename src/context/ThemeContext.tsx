'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface ThemeSettings {
  id: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  sansFont: string;
  serifFont: string;
  monoFont: string;
}

interface ThemeContextType {
  theme: ThemeSettings | null;
  loading: boolean;
  updateTheme: (data: Partial<ThemeSettings>) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DEFAULT_THEME: ThemeSettings = {
  id: 'default',
  primaryColor: '#d946a8',
  secondaryColor: '#a21caf',
  backgroundColor: '#ffffff',
  textColor: '#171717',
  sansFont: 'Geist',
  serifFont: 'Geist',
  monoFont: 'Geist Mono',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTheme();
    subscribeToThemeChanges();
  }, []);

  useEffect(() => {
    if (theme) {
      applyTheme(theme);
    }
  }, [theme]);

  async function loadTheme() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('theme_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setTheme(data || DEFAULT_THEME);
    } catch (err) {
      console.error('Error loading theme:', err);
      setTheme(DEFAULT_THEME);
    } finally {
      setLoading(false);
    }
  }

  function subscribeToThemeChanges() {
    const subscription = supabase
      .channel('theme-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'theme_settings' }, (payload) => {
        setTheme(payload.new || DEFAULT_THEME);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  function applyTheme(themeData: ThemeSettings) {
    const root = document.documentElement;
    root.style.setProperty('--accent', themeData.primaryColor);
    root.style.setProperty('--accent-dark', themeData.secondaryColor);
    root.style.setProperty('--background', themeData.backgroundColor);
    root.style.setProperty('--foreground', themeData.textColor);
    root.style.setProperty('--font-geist-sans', themeData.sansFont);
    root.style.setProperty('--font-geist-mono', themeData.monoFont);
  }

  async function updateTheme(data: Partial<ThemeSettings>) {
    try {
      if (!theme) {
        const { error } = await supabase.from('theme_settings').insert([data]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('theme_settings')
          .update(data)
          .eq('id', theme.id);
        if (error) throw error;
      }
      await loadTheme();
    } catch (err) {
      console.error('Error updating theme:', err);
      throw err;
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, loading, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
