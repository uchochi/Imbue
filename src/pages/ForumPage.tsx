import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MessageSquare, Plus, Pin, Archive, Lock, Trash2, AlertTriangle, X } from 'lucide-react';
import { getTopics, deleteTopic, updateTopic } from '../services/forumService';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import type { ForumTopic } from '../types';

export default function ForumPage() {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';
  const welcome = searchParams.get('welcome') === '1';
  const [showVerifyBanner, setShowVerifyBanner] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getTopics();
    setTopics(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // Show the email-verification reminder if the user is logged in but unverified.
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (u && !u.email_confirmed_at) {
        setShowVerifyBanner(true);
      }
    });
  }, []);

  // Occasional reminder: re-surface the banner every 3rd forum visit (stored in sessionStorage).
  useEffect(() => {
    if (!welcome && showVerifyBanner) return;
    const visits = Number(sessionStorage.getItem('forum_visits') || '0') + 1;
    sessionStorage.setItem('forum_visits', String(visits));
    if (visits % 3 === 0) setShowVerifyBanner(true);
  }, [welcome, showVerifyBanner]);

  const dismissBanner = () => {
    setShowVerifyBanner(false);
    sessionStorage.removeItem('forum_visits');
    if (welcome) {
      searchParams.delete('welcome');
      setSearchParams(searchParams, { replace: true });
    }
  };

  const handlePin = async (topic: ForumTopic) => {
    await updateTopic(topic.id, { is_pinned: !topic.is_pinned });
    await load();
  };

  const handleArchive = async (topic: ForumTopic) => {
    await updateTopic(topic.id, { is_archived: !topic.is_archived });
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this topic permanently?')) return;
    await deleteTopic(id);
    await load();
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  const visibleTopics = topics.filter(t => !t.is_archived || isAdmin);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {(welcome || showVerifyBanner) && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle size={20} className="mt-0.5 flex-shrink-0 text-amber-500" />
          <div className="flex-1 text-sm text-amber-800">
            <p className="font-medium">Welcome to the forum! 🎉</p>
            <p className="mt-1">
              You can post and reply right away. For your security, please verify your email when you get a chance —
              check your inbox for the confirmation link. You can do this anytime; we'll only remind you occasionally.
            </p>
          </div>
          <button onClick={dismissBanner} className="rounded-lg p-1.5 text-amber-500 hover:bg-amber-100 cursor-pointer" title="Dismiss">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dataset Training Forum</h1>
          <p className="mt-1 text-sm text-slate-500">Learn how to format datasets for AI. Ask questions, share tips, and get help.</p>
        </div>
        {user && (
          <Link to="/forum/new" className="no-underline">
            <Button><Plus size={18} />New Topic</Button>
          </Link>
        )}
      </div>

      {visibleTopics.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <MessageSquare size={40} className="text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700">No topics yet</h3>
          <p className="mt-1 text-sm text-slate-500">
            {user ? 'Be the first to start a discussion!' : 'Sign in to create a new topic.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleTopics.map((topic) => (
            <div
              key={topic.id}
              className={`rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md ${
                topic.is_pinned ? 'border-primary/30 bg-primary/[0.02]' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/forum/${topic.id}`}
                    className="text-lg font-semibold text-slate-900 hover:text-primary no-underline transition-colors"
                  >
                    {topic.title}
                  </Link>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    {topic.is_pinned && (
                      <Badge variant="blue"><Pin size={12} /> Pinned</Badge>
                    )}
                    {topic.is_locked && (
                      <Badge variant="red"><Lock size={12} /> Locked</Badge>
                    )}
                    {topic.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                        {tag}
                      </span>
                    ))}
                    <span>by {topic.user?.name || 'Unknown'}</span>
                    <span>{new Date(topic.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handlePin(topic)}
                      className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                        topic.is_pinned ? 'text-primary hover:bg-primary/10' : 'text-slate-400 hover:bg-slate-100'
                      }`}
                      title={topic.is_pinned ? 'Unpin' : 'Pin'}
                    >
                      <Pin size={14} />
                    </button>
                    <button
                      onClick={() => handleArchive(topic)}
                      className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                        topic.is_archived ? 'text-yellow-600 hover:bg-yellow-50' : 'text-slate-400 hover:bg-slate-100'
                      }`}
                      title={topic.is_archived ? 'Unarchive' : 'Archive'}
                    >
                      <Archive size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(topic.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
