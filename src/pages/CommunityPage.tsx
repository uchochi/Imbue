import { MessageCircle, Code2, Users, BookOpen } from 'lucide-react';

const channels = [
  { icon: MessageCircle, title: 'Discord Server', desc: 'Join 12,000+ developers chatting about AI, sharing projects, and getting help in real-time.', action: 'Join Discord' },
  { icon: Code2, title: 'GitHub Discussions', desc: 'Ask questions, share ideas, and collaborate on open source projects with the community.', action: 'Visit GitHub' },
  { icon: Users, title: 'Meetups & Events', desc: 'Local and virtual meetups in 15+ cities. Connect with fellow builders in person.', action: 'View Events' },
  { icon: BookOpen, title: 'Community Blog', desc: 'Tutorials, case studies, and stories written by community members using Loseyourip.', action: 'Read Stories' },
];

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Community</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-slate-500">
          Connect with thousands of developers, researchers, and AI enthusiasts building with Loseyourip.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {channels.map((c) => (
          <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <c.icon size={20} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">{c.desc}</p>
            <span className="mt-4 inline-block text-sm font-medium text-primary">{c.action} &rarr;</span>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Join the conversation</h2>
        <p className="mx-auto mt-3 max-w-md text-slate-500">
          Whether you are just getting started or building production systems, there is a place for you.
        </p>
        <a href="#" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 mt-6 font-semibold text-white no-underline transition-colors hover:bg-primary-dark">
          <MessageCircle size={16} /> Join our Discord
        </a>
      </div>
    </div>
  );
}
