export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship'
export type JobStatus = 'open' | 'closed' | 'draft'

export interface Job {
  id: string
  title: string
  department: string
  location: string
  type: JobType
  salaryRange: string
  description: string
  requirements: string[]
  responsibilities: string[]
  howToApply: string
  applyLink: string
  status: JobStatus
  createdAt: string
  updatedAt: string
}

export interface ForumTopic {
  id: string
  title: string
  content: string
  author_id: string
  is_pinned: boolean
  is_archived: boolean
  is_locked: boolean
  tags: string[]
  created_at: string
  updated_at: string
  user?: {
    name: string
    avatar_url: string
  }
}

export interface ForumPost {
  id: string
  topic_id: string
  author_id: string
  content: string
  parent_id: string | null
  created_at: string
  updated_at: string
  user?: {
    name: string
    avatar_url: string
  }
}

export interface AuthState {
  isAuthenticated: boolean
  user: UserInfo | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export interface UserInfo {
  id: string
  email: string
  name: string
  role: string
  avatarUrl: string
}
