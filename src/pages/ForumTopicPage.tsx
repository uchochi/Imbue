import { useState, useEffect, type FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Lock, Pin, Trash2, Reply, AlertTriangle, X } from 'lucide-react';
import { getTopic, getPosts, createPost, deletePost } from '../services/forumService';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import type { ForumTopic, ForumPost } from '../types';

export default function ForumTopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const { user } = useAuth();
  const [topic, setTopic] = useState<ForumTopic | undefined>();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [showVerifyBanner, setShowVerifyBanner] = useState(false);

  const isAdmin = user?.role === 'admin';

  const load = async () => {
    if (!topicId) return;
    const [t, p] = await Promise.all([getTopic(topicId), getPosts(topicId)]);
    setTopic(t);
    setPosts(p);
    setLoading(false);
  };

  useEffect(() => { load(); }, [topicId]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (u && !u.email_confirmed_at) setShowVerifyBanner(true);
    });
  }, [topicId]);

  const handleReply = async (e: FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !topicId) return;
    setSending(true);
    await createPost({ topic_id: topicId, content: replyContent.trim(), parent_id: replyingTo });
    setReplyContent('');
    setReplyingTo(null);
    await load();
    setSending(false);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await deletePost(id);
    await load();
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;
  if (!topic) return <div className="mx-auto max-w-4xl px-6 py-12"><p className="text-slate-500">Topic not found.</p></div>;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {showVerifyBanner && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle size={20} className="mt-0.5 flex-shrink-0 text-amber-500" />
          <div className="flex-1 text-sm text-amber-800">
            <p className="font-medium">Heads-up: verify your email</p>
            <p className="mt-1">
              You can keep posting and replying. Whenever you're free, check your inbox and confirm your email
              address to secure your account. We'll only remind you occasionally.
            </p>
          </div>
          <button onClick={() => setShowVerifyBanner(false)} className="rounded-lg p-1.5 text-amber-500 hover:bg-amber-100 cursor-pointer" title="Dismiss">
            <X size={16} />
          </button>
        </div>
      )}
      <Link to="/forum" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-6 no-underline transition-colors">
        <ArrowLeft size={16} />
        Back to Forum
      </Link>

      {/* Topic header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          {topic.is_pinned && <Badge variant="blue"><Pin size={12} /> Pinned</Badge>}
          {topic.is_locked && <Badge variant="red"><Lock size={12} /> Locked</Badge>}
          {topic.tags.map(tag => (
            <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-slate-900">{topic.title}</h1>
        <p className="mt-2 text-sm text-slate-500">
          Posted by {topic.user?.name || 'Unknown'} · {new Date(topic.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Original post */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 mb-8 shadow-sm">
        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{topic.content}</p>
      </div>

      {/* Replies */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">{posts.length} {posts.length === 1 ? 'Reply' : 'Replies'}</h2>
        {posts.length === 0 && (
          <p className="text-sm text-slate-500 py-8 text-center">No replies yet. Be the first to respond!</p>
        )}
        {posts.map((post) => (
          <div key={post.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  {(post.user?.name || 'U')[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{post.user?.name || 'Unknown'}</p>
                  <p className="text-xs text-slate-500">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {user && (
                  <button
                    onClick={() => setReplyingTo(post.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                    title="Reply"
                  >
                    <Reply size={14} />
                  </button>
                )}
                {(isAdmin || post.author_id === user?.id) && (
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
          </div>
        ))}
      </div>

      {/* Reply form */}
      {user ? (
        <form onSubmit={handleReply} className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {replyingTo && (
            <p className="text-xs text-slate-500 mb-2">
              Replying to a post{' '}
              <button type="button" onClick={() => setReplyingTo(null)} className="text-primary underline cursor-pointer">Cancel</button>
            </p>
          )}
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Write a Reply</h3>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
            placeholder="Share your thoughts..."
          />
          <div className="mt-3 flex justify-end">
            <Button type="submit" disabled={sending || !replyContent.trim()}>
              {sending ? 'Posting...' : 'Post Reply'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-500">
            <Link to="/admin/login" className="text-primary font-medium">Sign in</Link> to reply to this topic.
          </p>
        </div>
      )}
    </div>
  );
}
