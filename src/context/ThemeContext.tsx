'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface ThemeSettings {
  id: string;
  primarycolor: string;
  secondarycolor: string;
  backgroundcolor: string;
  textcolor: string;
  sansfont: string;
  seriffont: string;
  monofont: string;
}

interface ThemeContextType {
  theme: ThemeSettings | null;
  loading: boolean;
  updateTheme: (data: Partial<ThemeSettings>) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DEFAULT_THEME_DATA = {
  primarycolor: '#d946a8',
  secondarycolor: '#a21caf',
  backgroundcolor: '#ffffff',
  textcolor: '#171717',
  sansfont: 'Geist',
  seriffont: 'Geist',
  monofont: 'Geist Mono',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTheme();
    subscribeToThemeChanges();
  }, []);

  useEffect(() => {
    if (theme) applyTheme(theme);
  }, [theme]);

  async function loadTheme() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('theme_settings').select('*').limit(1);
      if (error) throw error;

      if (data && data.length > 0) {
        setTheme(data[0]);
      } else {
        const { data: newTheme, error: insertError } = await supabase
          .from('theme_settings')
          .insert([DEFAULT_THEME_DATA])
          .select()
          .single();
        if (insertError) throw insertError;
        if (newTheme) setTheme(newTheme);
      }
    } catch (err) {
      console.error('Error loading theme:', err);
    } finally {
      setLoading(false);
    }
  }

  function subscribeToThemeChanges() {
    const subscription = supabase
      .channel('theme-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'theme_settings' }, (payload: any) => {
        setTheme((payload.new as ThemeSettings) || null);
      })
      .subscribe();
    return () => { subscription.unsubscribe(); };
  }

  function applyTheme(t: ThemeSettings) {
    const root = document.documentElement;
    root.style.setProperty('--accent', t.primarycolor);
    root.style.setProperty('--accent-dark', t.secondarycolor);
    root.style.setProperty('--background', t.backgroundcolor);
    root.style.setProperty('--foreground', t.textcolor);
    root.style.setProperty('--font-geist-sans', t.sansfont);
    root.style.setProperty('--font-geist-mono', t.monofont);
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
  if (context === undefined) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
