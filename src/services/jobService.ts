import { supabase } from '../lib/supabase';
import type { Job } from '../types';

function parseJob(row: Record<string, unknown>): Job {
  return {
    id: row.id as string,
    title: row.title as string,
    department: row.department as string,
    location: row.location as string,
    type: row.type as Job['type'],
    salaryRange: row.salary_range as string,
    description: row.description as string,
    requirements: row.requirements as string[],
    responsibilities: row.responsibilities as string[],
    howToApply: row.how_to_apply as string,
    applyLink: row.apply_link as string,
    status: row.status as Job['status'],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export async function getAllJobs(): Promise<Job[]> {
  const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map(parseJob);
}

export async function getJobById(id: string): Promise<Job | undefined> {
  const { data, error } = await supabase.from('jobs').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? parseJob(data) : undefined;
}

export async function getOpenJobs(): Promise<Job[]> {
  const { data, error } = await supabase.from('jobs').select('*').eq('status', 'open').order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map(parseJob);
}

export async function createJob(data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<Job> {
  const row = {
    title: data.title,
    department: data.department,
    location: data.location,
    type: data.type,
    salary_range: data.salaryRange,
    description: data.description,
    requirements: data.requirements,
    responsibilities: data.responsibilities,
    how_to_apply: data.howToApply,
    apply_link: data.applyLink,
    status: data.status,
  };
  const { data: result, error } = await supabase.from('jobs').insert(row).select().single();
  if (error) throw error;
  return parseJob(result);
}

export async function updateJob(id: string, updates: Partial<Omit<Job, 'id' | 'createdAt'>>): Promise<Job> {
  const row: Record<string, unknown> = {};
  if (updates.title !== undefined) row.title = updates.title;
  if (updates.department !== undefined) row.department = updates.department;
  if (updates.location !== undefined) row.location = updates.location;
  if (updates.type !== undefined) row.type = updates.type;
  if (updates.salaryRange !== undefined) row.salary_range = updates.salaryRange;
  if (updates.description !== undefined) row.description = updates.description;
  if (updates.requirements !== undefined) row.requirements = updates.requirements;
  if (updates.responsibilities !== undefined) row.responsibilities = updates.responsibilities;
  if (updates.howToApply !== undefined) row.how_to_apply = updates.howToApply;
  if (updates.applyLink !== undefined) row.apply_link = updates.applyLink;
  if (updates.status !== undefined) row.status = updates.status;
  row.updated_at = new Date().toISOString();

  const { data: result, error } = await supabase.from('jobs').update(row).eq('id', id).select().single();
  if (error) throw error;
  return parseJob(result);
}

export async function deleteJob(id: string): Promise<boolean> {
  const { error } = await supabase.from('jobs').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// Auth (now tied to Supabase — keep this file for legacy admin context bridge)
export function isAdminLoggedIn(): boolean {
  return !!sessionStorage.getItem('loseyourip_admin');
}

export function adminLogout(): void {
  sessionStorage.removeItem('loseyourip_admin');
}
