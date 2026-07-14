import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import type { Job } from '../../types';
import { formatDate } from '../../utils/helpers';
import { linkify } from '../../utils/linkify';

interface Props {
  job: Job;
}

export default function JobDetail({ job }: Props) {
  return (
    <div className="w-full">
      <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-6 no-underline transition-colors">
        <ArrowLeft size={16} />
        All positions
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><MapPin size={14} />{job.location}</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><Clock size={14} />Posted {formatDate(job.createdAt)}</span>
          </div>
        </div>
        <Badge variant={job.status === 'open' ? 'green' : job.status === 'draft' ? 'yellow' : 'red'}>
          {job.status}
        </Badge>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="blue">{job.department}</Badge>
        <Badge variant="purple">{job.type.replace('-', ' ')}</Badge>
        {job.salaryRange && <Badge variant="green">{job.salaryRange}</Badge>}
      </div>

      <div className="mt-10 space-y-10">
        <Section title="About the Role">
          <p className="text-slate-600 leading-relaxed text-base">{job.description}</p>
        </Section>

        {job.responsibilities.length > 0 && (
          <Section title="Responsibilities">
            <ul className="space-y-2.5">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {r}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {job.requirements.length > 0 && (
          <Section title="Requirements">
            <ul className="space-y-2.5">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="How to Apply">
          <p className="text-slate-600 leading-relaxed">{linkify(job.howToApply)}</p>
        </Section>
      </div>

      <div className="mt-10 pt-8 border-t border-slate-200 flex gap-3">
        <a
          href={job.applyLink || `mailto:careers@loseyourip.com?subject=Application: ${job.title}`}
          target={job.applyLink ? '_blank' : undefined}
          rel={job.applyLink ? 'noopener noreferrer' : undefined}
          className="no-underline"
        >
          <Button size="lg">
            <ExternalLink size={16} />
            Apply Now
          </Button>
        </a>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}
