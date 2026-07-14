export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type JobStatus = 'open' | 'closed' | 'draft';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  salaryRange: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  howToApply: string;
  applyLink: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}
