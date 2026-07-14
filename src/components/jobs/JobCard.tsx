import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import Badge from '../ui/Badge';
import type { Job } from '../../types';
import { timeAgo } from '../../utils/helpers';

const typeBadge: Record<string, 'blue' | 'green' | 'purple' | 'yellow'> = {
  'full-time': 'blue',
  'part-time': 'green',
  contract: 'purple',
  internship: 'yellow',
};

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30 no-underline"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <Briefcase size={14} />
              {job.department}
            </span>
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <MapPin size={14} />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <Clock size={14} />
              {timeAgo(job.createdAt)}
            </span>
          </div>
        </div>
        <Badge variant={typeBadge[job.type] || 'blue'}>
          {job.type.replace('-', ' ')}
        </Badge>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-slate-600 leading-relaxed">{job.description}</p>
      {job.salaryRange && (
        <p className="mt-3 text-sm font-medium text-primary">{job.salaryRange}</p>
      )}
    </Link>
  );
}
