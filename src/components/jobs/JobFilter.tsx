import { Search, X } from 'lucide-react';

const departments = ['All', 'Engineering', 'Research', 'Product', 'Infrastructure', 'Content'];
const types = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];
const locations = ['All', 'Remote', 'San Francisco, CA', 'New York, NY', 'Austin, TX'];

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  department: string;
  onDepartmentChange: (v: string) => void;
  type: string;
  onTypeChange: (v: string) => void;
  location: string;
  onLocationChange: (v: string) => void;
  resultCount: number;
}

export default function JobFilter({
  search, onSearchChange,
  department, onDepartmentChange,
  type, onTypeChange,
  location, onLocationChange,
  resultCount,
}: Props) {
  const hasFilters = search || department !== 'All' || type !== 'All' || location !== 'All';

  const clearFilters = () => {
    onSearchChange('');
    onDepartmentChange('All');
    onTypeChange('All');
    onLocationChange('All');
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search positions..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <SelectFilter label="Department" value={department} onChange={onDepartmentChange} options={departments} />
        <SelectFilter label="Type" value={type} onChange={onTypeChange} options={types} />
        <SelectFilter label="Location" value={location} onChange={onLocationChange} options={locations} />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          <span className="font-medium text-slate-700">{resultCount}</span> position{resultCount !== 1 ? 's' : ''}
        </p>
        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors cursor-pointer">
            <X size={14} />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

function SelectFilter({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="flex items-center gap-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o === 'All' ? `All ${label}s` : o}</option>
        ))}
      </select>
    </div>
  );
}
