export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url: string;
  department_id: string | null;
  knowledge_score: number;
  is_paused: boolean;
  pause_until: string | null;
  is_muted: boolean;
  mute_reason: string | null;
  created_at: string;
  updated_at: string;
}
