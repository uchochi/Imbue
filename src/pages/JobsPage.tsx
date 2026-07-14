import { useState, useEffect } from 'react';
import { getOpenJobs } from '../services/jobService';
import JobList from '../components/jobs/JobList';
import JobFilter from '../components/jobs/JobFilter';
import Spinner from '../components/ui/Spinner';
import type { Job } from '../types';

export default function JobsPage() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [type, setType] = useState('All');
  const [location, setLocation] = useState('All');

  useEffect(() => {
    getOpenJobs().then((j) => { setAllJobs(j); setLoading(false); });
  }, []);

  const filtered = allJobs.filter((job) => {
    const matchSearch = !search || job.title.toLowerCase().includes(search.toLowerCase()) || job.description.toLowerCase().includes(search.toLowerCase());
    const matchDept = department === 'All' || job.department === department;
    const matchType = type === 'All' || job.type === type.toLowerCase();
    const matchLoc = location === 'All' || job.location === location;
    return matchSearch && matchDept && matchType && matchLoc;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Open Positions</h1>
        <p className="mt-2 text-slate-500">Find your next opportunity at Loseyourip</p>
      </div>
      {loading ? <Spinner /> : (
        <>
          <JobFilter
            search={search} onSearchChange={setSearch}
            department={department} onDepartmentChange={setDepartment}
            type={type} onTypeChange={setType}
            location={location} onLocationChange={setLocation}
            resultCount={filtered.length}
          />
          <div className="mt-6">
            <JobList jobs={filtered} />
          </div>
        </>
      )}
    </div>
  );
}
