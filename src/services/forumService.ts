import { supabase } from '../lib/supabase';
import type { ForumTopic, ForumPost } from '../types';

// --- Forum Topics ---

export async function getTopics(tag?: string): Promise<ForumTopic[]> {
  let query = supabase
    .from('forum_topics')
    .select('*, user:users(name, avatar_url)')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (tag) {
    query = query.contains('tags', [tag]);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getTopic(id: string): Promise<ForumTopic | undefined> {
  const { data, error } = await supabase
    .from('forum_topics')
    .select('*, user:users(name, avatar_url)')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data || undefined;
}

export async function createTopic(topic: { title: string; content: string; tags?: string[] }): Promise<ForumTopic> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error('Not authenticated');

  const authorId = userData.user.id;

  const { data, error } = await supabase.from('forum_topics').insert({
    title: topic.title,
    content: topic.content,
    author_id: authorId,
    tags: topic.tags || [],
  }).select('*, user:users(name, avatar_url)').single();

  if (error) throw error;
  return data;
}

export async function updateTopic(id: string, updates: Partial<Pick<ForumTopic, 'title' | 'content' | 'tags' | 'is_pinned' | 'is_archived' | 'is_locked'>>): Promise<ForumTopic> {
  const row: Record<string, unknown> = { ...updates, updated_at: new Date().toISOString() };
  const { data, error } = await supabase.from('forum_topics').update(row).eq('id', id).select('*, user:users(name, avatar_url)').single();
  if (error) throw error;
  return data;
}

export async function deleteTopic(id: string): Promise<boolean> {
  const { error } = await supabase.from('forum_topics').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// --- Forum Posts ---

export async function getPosts(topicId: string): Promise<ForumPost[]> {
  const { data, error } = await supabase
    .from('forum_posts')
    .select('*, user:users(name, avatar_url)')
    .eq('topic_id', topicId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createPost(post: { topic_id: string; content: string; parent_id?: string | null }): Promise<ForumPost> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error('Not authenticated');

  const { data, error } = await supabase.from('forum_posts').insert({
    topic_id: post.topic_id,
    author_id: userData.user.id,
    content: post.content,
    parent_id: post.parent_id || null,
  }).select('*, user:users(name, avatar_url)').single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase.from('forum_posts').delete().eq('id', id);
  if (error) throw error;
  return true;
}
