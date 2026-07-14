import { useState, useEffect, useCallback } from 'react';
import { getAllJobs, createJob as svcCreate, updateJob as svcUpdate, deleteJob as svcDelete } from '../services/jobService';
import type { Job } from '../types';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await getAllJobs();
    setJobs(data);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const createJob = useCallback(
    async (data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
      const job = await svcCreate(data);
      await refresh();
      return job;
    },
    [refresh],
  );

  const updateJob = useCallback(
    async (id: string, updates: Partial<Omit<Job, 'id' | 'createdAt'>>) => {
      const job = await svcUpdate(id, updates);
      await refresh();
      return job;
    },
    [refresh],
  );

  const deleteJob = useCallback(
    async (id: string) => {
      await svcDelete(id);
      await refresh();
    },
    [refresh],
  );

  return { jobs, loading, createJob, updateJob, deleteJob, refresh };
}
