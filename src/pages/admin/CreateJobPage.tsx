import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import JobForm from '../../components/jobs/JobForm';
import type { Job } from '../../types';

export default function CreateJobPage() {
  const { createJob } = useJobs();
  const navigate = useNavigate();

  const handleSubmit = async (data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    await createJob(data);
    navigate('/admin');
  };

  return (
    <div className="w-full px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Create New Job</h1>
      <p className="text-sm text-slate-500 mb-8">Fill in the details to post a new position.</p>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <JobForm onSubmit={handleSubmit} onCancel={() => navigate('/admin')} submitLabel="Create Job" />
      </div>
    </div>
  );
}
