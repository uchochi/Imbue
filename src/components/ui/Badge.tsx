import type { ReactNode } from 'react';

interface Props {
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'purple';
  children: ReactNode;
  className?: string;
}

const colors = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  gray: 'bg-slate-100 text-slate-600 border-slate-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
};

export default function Badge({ variant = 'blue', children, className = '' }: Props) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[variant]} ${className}`}>
      {children}
    </span>
  );
}
