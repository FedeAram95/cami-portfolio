'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Project {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  image: string;
  description: string;
  descriptionEn: string;
  behanceUrl?: string;
  year: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  name: string;
  bio: string;
  bioEn: string;
  email: string;
  photoUrl?: string;
  title: string;
  titleEn: string;
  yearsOfExperience: number;
}

interface DataContextType {
  projects: Project[];
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  addProject: (data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    subscribeToChanges();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      // Load projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;
      setProjects(projectsData || []);

      // Load profile (first row)
      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('*')
        .single();

      if (profileError && profileError.code !== 'PGRST116') throw profileError;
      setProfile(profileData || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading data');
    } finally {
      setLoading(false);
    }
  }

  function subscribeToChanges() {
    const projectsSubscription = supabase
      .from('projects')
      .on('*', (payload) => {
        loadData();
      })
      .subscribe();

    const profileSubscription = supabase
      .from('profile')
      .on('*', (payload) => {
        loadData();
      })
      .subscribe();

    return () => {
      projectsSubscription.unsubscribe();
      profileSubscription.unsubscribe();
    };
  }

  async function updateProject(id: string, data: Partial<Project>) {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating project');
      throw err;
    }
  }

  async function addProject(data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { error } = await supabase
        .from('projects')
        .insert([data]);

      if (error) throw error;
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding project');
      throw err;
    }
  }

  async function deleteProject(id: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting project');
      throw err;
    }
  }

  async function updateProfile(data: Partial<Profile>) {
    try {
      if (!profile) {
        // Create new profile
        const { error } = await supabase
          .from('profile')
          .insert([data]);
        if (error) throw error;
      } else {
        // Update existing profile
        const { error } = await supabase
          .from('profile')
          .update(data)
          .eq('id', profile.id);
        if (error) throw error;
      }
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating profile');
      throw err;
    }
  }

  return (
    <DataContext.Provider
      value={{
        projects,
        profile,
        loading,
        error,
        updateProject,
        addProject,
        deleteProject,
        updateProfile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
