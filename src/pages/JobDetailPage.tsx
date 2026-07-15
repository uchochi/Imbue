import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getJobById } from '../services/jobService';
import JobDetail from '../components/jobs/JobDetail';
import Spinner from '../components/ui/Spinner';
import type { Job } from '../types';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    getJobById(id).then((j) => { setJob(j); setLoading(false); });
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;
  if (!job) return <Navigate to="/jobs" replace />;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <JobDetail job={job} />
    </div>
  );
}
