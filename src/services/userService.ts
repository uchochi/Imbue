import { supabase } from '../lib/supabase';
import type { UserRow } from '../types/supabase';

export async function getUserProfile(id: string): Promise<UserRow | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*, department:departments(name, slug)')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getMyTopics(authorId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('forum_topics')
    .select('*, forum_posts(count)')
    .eq('author_id', authorId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getMyPosts(authorId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('forum_posts')
    .select('*, forum_topics(id, title)')
    .eq('author_id', authorId)
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) throw error;
  return data || [];
}
