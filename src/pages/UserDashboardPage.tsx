import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User as UserIcon, GraduationCap, MessageSquare, FileText, Award, ShieldAlert, ShieldOff, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, getMyTopics, getMyPosts } from '../services/userService';
import type { UserRow } from '../types/supabase';
import Button from '../components/ui/Button';

function roleLabel(role?: string): string {
  const map: Record<string, string> = {
    apprentice: 'Apprentice',
    instructor: 'Instructor',
    junior_staff: 'Junior Staff',
    senior_instructor: 'Senior Instructor',
    admin: 'Admin',
    user: 'Member',
  };
  return map[role || ''] || (role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Member');
}

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserRow | null>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.id) return;
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const [p, t, ps] = await Promise.all([
          getUserProfile(user.id),
          getMyTopics(user.id),
          getMyPosts(user.id),
        ]);
        if (!active) return;
        setProfile(p);
        setTopics(t);
        setPosts(ps);
      } catch (e: any) {
        setError(e.message || 'Failed to load dashboard');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [user?.id]);

  if (loading) {
    return <div className="mx-auto max-w-5xl px-6 py-20 text-center text-slate-500">Loading your dashboard…</div>;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/forum"><Button variant="secondary">Back to Forum</Button></Link>
      </div>
    );
  }

  const dept = (profile as any)?.department;
  const isMuted = profile?.is_muted;
  const isPaused = profile?.is_paused;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* Profile header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
        <div className="flex items-start gap-5">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.name} className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserIcon size={28} />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900">{profile?.name || user?.name || 'Member'}</h1>
            <p className="text-sm text-slate-500">{profile?.email || user?.email}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <GraduationCap size={14} /> {roleLabel(profile?.role || user?.role)}
              </span>
              {dept?.name && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  <Building2 size={14} /> {dept.name}
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                <Award size={14} /> Knowledge Score: {profile?.knowledge_score ?? 0}
              </span>
            </div>
          </div>
          <Link to="/forum/new" className="no-underline hidden sm:block">
            <Button size="sm">New Topic</Button>
          </Link>
        </div>

        {(isMuted || isPaused) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {isMuted && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                <ShieldOff size={14} /> Muted{profile?.mute_reason ? `: ${profile.mute_reason}` : ''}
              </span>
            )}
            {isPaused && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                <ShieldAlert size={14} /> Paused{profile?.pause_until ? ` until ${new Date(profile.pause_until).toLocaleDateString()}` : ''}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-primary" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{topics.length}</p>
              <p className="text-xs text-slate-500">Topics Started</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <MessageSquare size={20} className="text-green-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{posts.length}</p>
              <p className="text-xs text-slate-500">Replies Posted</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* My Topics */}
        <div>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">My Topics</h2>
          {topics.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
              You haven’t started any topics yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {topics.map((t) => (
                <li key={t.id}>
                  <Link to={`/forum/${t.id}`} className="block rounded-xl border border-slate-200 bg-white p-4 no-underline transition-colors hover:border-primary/40">
                    <p className="font-medium text-slate-900 line-clamp-1">{t.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(t.created_at).toLocaleDateString()} · {(t.forum_posts?.[0]?.count ?? 0)} replies
                      {t.is_pinned && ' · Pinned'} {t.is_archived && ' · Archived'}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* My Replies */}
        <div>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">My Replies</h2>
          {posts.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
              You haven’t replied to any topics yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link to={`/forum/${p.forum_topics?.id}`} className="block rounded-xl border border-slate-200 bg-white p-4 no-underline transition-colors hover:border-primary/40">
                    <p className="text-sm text-slate-700 line-clamp-2">{p.content}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(p.created_at).toLocaleDateString()}
                      {p.forum_topics?.title && ` · in “${p.forum_topics.title}”`}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
