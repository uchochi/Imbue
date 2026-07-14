import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import Badge from '../ui/Badge';
import type { Job } from '../../types';
import { formatDate } from '../../utils/helpers';

interface Props {
  jobs: Job[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, current: string) => void;
}

const statusBadge: Record<string, 'green' | 'yellow' | 'red'> = {
  open: 'green',
  draft: 'yellow',
  closed: 'red',
};

export default function JobTable({ jobs, onDelete, onToggleStatus }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 font-medium text-slate-600">Title</th>
            <th className="px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Department</th>
            <th className="px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Location</th>
            <th className="px-4 py-3 font-medium text-slate-600">Status</th>
            <th className="px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Created</th>
            <th className="px-4 py-3 font-medium text-slate-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-4 py-3">
                <Link to={`/jobs/${job.id}`} className="font-medium text-slate-900 hover:text-primary no-underline">
                  {job.title}
                </Link>
                <p className="text-xs text-slate-500 md:hidden">{job.department}</p>
              </td>
              <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{job.department}</td>
              <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">{job.location}</td>
              <td className="px-4 py-3">
                <Badge variant={statusBadge[job.status]}>{job.status}</Badge>
              </td>
              <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{formatDate(job.createdAt)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link to={`/jobs/${job.id}`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors" title="View">
                    <Eye size={16} />
                  </Link>
                  <Link to={`/admin/jobs/${job.id}/edit`} className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Edit">
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => onToggleStatus(job.id, job.status)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-yellow-50 hover:text-yellow-600 transition-colors cursor-pointer"
                    title="Toggle status"
                  >
                    {job.status === 'open' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                  </button>
                  <button
                    onClick={() => { if (confirm(`Delete "${job.title}"? This cannot be undone.`)) onDelete(job.id); }}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
