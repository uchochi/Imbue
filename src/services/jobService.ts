import type { Job } from '../types';

const API = '/api/jobs';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function getAllJobs(): Promise<Job[]> {
  return request<Job[]>(API);
}

export function getJobById(id: string): Promise<Job | undefined> {
  return request<Job[]>(API).then((jobs) => jobs.find((j) => j.id === id));
}

export function getOpenJobs(): Promise<Job[]> {
  return request<Job[]>(API).then((jobs) => jobs.filter((j) => j.status === 'open'));
}

export function createJob(data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<Job> {
  return request<Job>(API, { method: 'POST', body: JSON.stringify(data) });
}

export function updateJob(id: string, updates: Partial<Omit<Job, 'id' | 'createdAt'>>): Promise<Job> {
  return request<Job>(`${API}/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
}

export function deleteJob(id: string): Promise<boolean> {
  return request<{ ok: boolean }>(`${API}/${id}`, { method: 'DELETE' }).then(() => true);
}

// Auth (unchanged — session-based)
const ADMIN_USER_KEY = 'loseyourip_admin';
const defaultAdmin = { username: 'admin', password: 'loseyourip2026' };

export function adminLogin(username: string, password: string): boolean {
  if (username === defaultAdmin.username && password === defaultAdmin.password) {
    sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify({ username }));
    return true;
  }
  return false;
}

export function adminLogout(): void {
  sessionStorage.removeItem(ADMIN_USER_KEY);
}

export function isAdminLoggedIn(): boolean {
  return !!sessionStorage.getItem(ADMIN_USER_KEY);
}
