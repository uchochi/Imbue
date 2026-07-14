import { useState, type FormEvent } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import type { Job, JobType, JobStatus } from '../../types';

interface Props {
  initialData?: Partial<Job>;
  onSubmit: (data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => void | Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export default function JobForm({ initialData, onSubmit, onCancel, submitLabel = 'Save' }: Props) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [department, setDepartment] = useState(initialData?.department || 'Engineering');
  const [location, setLocation] = useState(initialData?.location || '');
  const [type, setType] = useState<JobType>(initialData?.type || 'full-time');
  const [salaryRange, setSalaryRange] = useState(initialData?.salaryRange || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [requirements, setRequirements] = useState(initialData?.requirements?.join('\n') || '');
  const [responsibilities, setResponsibilities] = useState(initialData?.responsibilities?.join('\n') || '');
  const [howToApply, setHowToApply] = useState(initialData?.howToApply || '');
  const [applyLink, setApplyLink] = useState(initialData?.applyLink || '');
  const [status, setStatus] = useState<JobStatus>(initialData?.status || 'open');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!location.trim()) errs.location = 'Location is required';
    if (!description.trim()) errs.description = 'Description is required';
    if (!howToApply.trim()) errs.howToApply = 'How to apply is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        department,
        location: location.trim(),
        type,
        salaryRange: salaryRange.trim(),
        description: description.trim(),
        requirements: requirements.split('\n').map((s) => s.trim()).filter(Boolean),
        responsibilities: responsibilities.split('\n').map((s) => s.trim()).filter(Boolean),
        howToApply: howToApply.trim(),
        applyLink: applyLink.trim(),
        status,
      });
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Input label="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} placeholder="e.g. Machine Learning Engineer" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Department</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer">
            {['Engineering', 'Research', 'Product', 'Infrastructure', 'Content'].map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} error={errors.location} placeholder="e.g. Remote, San Francisco" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Employment Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as JobType)} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer">
            {['full-time', 'part-time', 'contract', 'internship'].map((t) => <option key={t} value={t}>{t.replace('-', ' ')}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as JobStatus)} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer">
            {['open', 'draft', 'closed'].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <Input label="Salary Range" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} placeholder="e.g. $150k - $220k (optional)" />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y ${errors.description ? 'border-red-500' : 'border-slate-300'}`} placeholder="Describe the role..." />
        {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Requirements (one per line)</label>
        <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} rows={5} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y" placeholder="5+ years of experience&#10;Strong Python skills&#10;..." />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Responsibilities (one per line)</label>
        <textarea value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} rows={5} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y" placeholder="Design ML models&#10;Collaborate with team&#10;..." />
      </div>

      <Input label="Apply Link (optional)" value={applyLink} onChange={(e) => setApplyLink(e.target.value)} placeholder="https://..." />
      <p className="text-xs text-slate-400 -mt-4">Leave empty to default to email (careers@loseyourip.com)</p>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">How to Apply</label>
        <textarea value={howToApply} onChange={(e) => setHowToApply(e.target.value)} rows={3} className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y ${errors.howToApply ? 'border-red-500' : 'border-slate-300'}`} placeholder="Instructions for applicants..." />
        {errors.howToApply && <p className="text-xs text-red-500">{errors.howToApply}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </Button>
        <Button type="button" variant="secondary" size="lg" onClick={onCancel} disabled={submitting}>Cancel</Button>
      </div>
      {errors.submit && <p className="text-sm text-red-600 text-center">{errors.submit}</p>}
    </form>
  );
}
