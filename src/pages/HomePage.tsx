import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Zap, Sparkles } from 'lucide-react';
import { getOpenJobs } from '../services/jobService';
import JobCard from '../components/jobs/JobCard';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import type { Job } from '../types';

export default function HomePage() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOpenJobs().then((j) => { setFeaturedJobs(j.slice(0, 3)); setLoading(false); });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Sparkles size={14} />
            We're hiring
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Build the future of
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Artificial Intelligence</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-500 leading-relaxed">
            Join Loseyourip and work with world-class researchers and engineers to push the boundaries of what AI can do.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/jobs">
              <Button size="lg">
                View Open Positions
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, value: '50+', label: 'Team Members' },
            { icon: Zap, value: '12', label: 'AI Models Shipped' },
            { icon: Sparkles, value: '3', label: 'Global Offices' },
            { icon: Sparkles, value: '$45M', label: 'Series A Funded' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-2">
              <s.icon size={20} className="text-primary" />
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Open Positions</h2>
            <p className="mt-1 text-sm text-slate-500">Find your next role at Loseyourip</p>
          </div>
          <Link to="/jobs" className="text-sm font-medium text-primary hover:text-primary-dark no-underline hidden sm:block">
            View all &rarr;
          </Link>
        </div>
        {loading ? <Spinner /> : (
          <>
            {featuredJobs.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {featuredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </>
        )}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/jobs">
            <Button variant="secondary">View all positions</Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-10 md:p-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold">Don't see your role?</h2>
          <p className="mt-3 text-white/80 max-w-md mx-auto">
            We're always looking for exceptional people. Send us your resume and tell us how you'd contribute.
          </p>
          <a href="mailto:careers@loseyourip.com" className="no-underline">
            <Button variant="secondary" size="lg" className="mt-6 bg-white text-primary hover:bg-white/90">
              Get in Touch
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
