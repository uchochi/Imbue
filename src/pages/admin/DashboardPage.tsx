import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Briefcase, CheckCircle, Clock, FileEdit } from 'lucide-react';
import { useJobs } from '../../hooks/useJobs';
import JobTable from '../../components/admin/JobTable';
import Button from '../../components/ui/Button';

export default function DashboardPage() {
  const { jobs, deleteJob, updateJob } = useJobs();
  const [filter, setFilter] = useState<'all' | 'open' | 'closed' | 'draft'>('all');

  const filtered = filter === 'all' ? jobs : jobs.filter((j) => j.status === filter);
  const counts = {
    total: jobs.length,
    open: jobs.filter((j) => j.status === 'open').length,
    draft: jobs.filter((j) => j.status === 'draft').length,
    closed: jobs.filter((j) => j.status === 'closed').length,
  };

  const toggleStatus = async (id: string, current: string) => {
    const next = current === 'open' ? 'closed' : current === 'closed' ? 'draft' : 'open';
    await updateJob(id, { status: next as 'open' | 'closed' | 'draft' });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your job postings</p>
        </div>
        <Link to="/admin/jobs/new" className="no-underline">
          <Button>
            <Plus size={18} />
            New Job
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Jobs', value: counts.total, icon: Briefcase, color: 'text-primary' },
          { label: 'Open', value: counts.open, icon: CheckCircle, color: 'text-green-600' },
          { label: 'Drafts', value: counts.draft, icon: FileEdit, color: 'text-yellow-600' },
          { label: 'Closed', value: counts.closed, icon: Clock, color: 'text-slate-400' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <s.icon size={20} className={s.color} />
              <div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-4 bg-slate-100 rounded-lg p-1 w-fit">
        {(['all', 'open', 'draft', 'closed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== 'all' && (
              <span className="ml-1.5 text-xs text-slate-400">{counts[f]}</span>
            )}
          </button>
        ))}
      </div>

      <JobTable jobs={filtered} onDelete={deleteJob} onToggleStatus={toggleStatus} />
    </div>
  );
}
