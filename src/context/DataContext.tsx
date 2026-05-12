'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Project {
  id: string;
  title: string;
  titleen: string;
  category: string;
  image: string;
  description: string;
  descriptionen: string;
  behanceurl?: string;
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
  titleen: string;
  yearsOfExperience: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  positionen: string;
  period: string;
  current: boolean;
  sort_order: number;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  sort_order: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  label: string;
  sort_order: number;
}

interface DataContextType {
  projects: Project[];
  profile: Profile | null;
  experiences: Experience[];
  tools: Tool[];
  socialLinks: SocialLink[];
  loading: boolean;
  error: string | null;
  addProject: (data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  addExperience: (data: Omit<Experience, 'id'>) => Promise<void>;
  updateExperience: (id: string, data: Partial<Experience>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  addTool: (data: Omit<Tool, 'id'>) => Promise<void>;
  updateTool: (id: string, data: Partial<Tool>) => Promise<void>;
  deleteTool: (id: string) => Promise<void>;
  addSocialLink: (data: Omit<SocialLink, 'id'>) => Promise<void>;
  updateSocialLink: (id: string, data: Partial<SocialLink>) => Promise<void>;
  deleteSocialLink: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
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

      const [
        { data: projectsData, error: projectsError },
        { data: profileData, error: profileError },
        { data: experiencesData, error: experiencesError },
        { data: toolsData, error: toolsError },
        { data: socialData, error: socialError },
      ] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('profile').select('*').limit(1),
        supabase.from('experiences').select('*').order('sort_order', { ascending: true }),
        supabase.from('tools').select('*').order('sort_order', { ascending: true }),
        supabase.from('social_links').select('*').order('sort_order', { ascending: true }),
      ]);

      if (projectsError) throw projectsError;
      if (profileError) throw profileError;

      setProjects(projectsData || []);
      setProfile(profileData && profileData.length > 0 ? profileData[0] : null);
      setExperiences(experiencesData || []);
      setTools(toolsData || []);
      setSocialLinks(socialData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading data');
    } finally {
      setLoading(false);
    }
  }

  function subscribeToChanges() {
    const tables = ['projects', 'profile', 'experiences', 'tools', 'social_links'];
    const subs = tables.map((table) =>
      supabase
        .channel(`${table}-changes`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, (payload: any) => {
          loadData();
        })
        .subscribe()
    );
    return () => { subs.forEach((s) => s.unsubscribe()); };
  }

  // Projects
  async function addProject(data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const { error } = await supabase.from('projects').insert([data]);
    if (error) throw error;
    await loadData();
  }

  async function updateProject(id: string, data: Partial<Project>) {
    const { error } = await supabase.from('projects').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
    await loadData();
  }

  async function deleteProject(id: string) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    await loadData();
  }

  // Profile
  async function updateProfile(data: Partial<Profile>) {
    if (!profile) {
      const { error } = await supabase.from('profile').insert([data]);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('profile').update(data).eq('id', profile.id);
      if (error) throw error;
    }
    await loadData();
  }

  // Experiences
  async function addExperience(data: Omit<Experience, 'id'>) {
    const { error } = await supabase.from('experiences').insert([data]);
    if (error) throw error;
    await loadData();
  }

  async function updateExperience(id: string, data: Partial<Experience>) {
    const { error } = await supabase.from('experiences').update(data).eq('id', id);
    if (error) throw error;
    await loadData();
  }

  async function deleteExperience(id: string) {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) throw error;
    await loadData();
  }

  // Tools
  async function addTool(data: Omit<Tool, 'id'>) {
    const { error } = await supabase.from('tools').insert([data]);
    if (error) throw error;
    await loadData();
  }

  async function updateTool(id: string, data: Partial<Tool>) {
    const { error } = await supabase.from('tools').update(data).eq('id', id);
    if (error) throw error;
    await loadData();
  }

  async function deleteTool(id: string) {
    const { error } = await supabase.from('tools').delete().eq('id', id);
    if (error) throw error;
    await loadData();
  }

  // Social Links
  async function addSocialLink(data: Omit<SocialLink, 'id'>) {
    const { error } = await supabase.from('social_links').insert([data]);
    if (error) throw error;
    await loadData();
  }

  async function updateSocialLink(id: string, data: Partial<SocialLink>) {
    const { error } = await supabase.from('social_links').update(data).eq('id', id);
    if (error) throw error;
    await loadData();
  }

  async function deleteSocialLink(id: string) {
    const { error } = await supabase.from('social_links').delete().eq('id', id);
    if (error) throw error;
    await loadData();
  }

  return (
    <DataContext.Provider value={{
      projects, profile, experiences, tools, socialLinks,
      loading, error,
      addProject, updateProject, deleteProject, updateProfile,
      addExperience, updateExperience, deleteExperience,
      addTool, updateTool, deleteTool,
      addSocialLink, updateSocialLink, deleteSocialLink,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within DataProvider');
  return context;
}
