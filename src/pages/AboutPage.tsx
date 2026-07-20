import { Link } from 'react-router-dom';
import { Target, Lightbulb, Shield, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const pillars = [
  { icon: Target, title: 'Our Mission', desc: 'To build AI systems that are genuinely helpful, transparent, and aligned with human interests. We want to make trustworthy AI the standard, not the exception.' },
  { icon: Lightbulb, title: 'Our Vision', desc: 'A world where artificial intelligence amplifies human potential while respecting human values. Where AI systems are understood, trusted, and beneficial for everyone.' },
  { icon: Shield, title: 'Our Approach', desc: 'We combine cutting-edge research with rigorous engineering. Every model we build undergoes extensive safety testing, and we publish our findings to advance the field.' },
];

const timeline = [
  { year: '2021', title: 'Founded', desc: 'Loseyourip was established with a mission to build trustworthy AI.' },
  { year: '2022', title: 'Seed Round', desc: 'Raised $15M seed round led by top-tier investors.' },
  { year: '2023', title: 'First Product', desc: 'Launched our core AI platform to early access users.' },
  { year: '2024', title: 'Series A', desc: 'Closed $120M Series A to scale the team and platform.' },
  { year: '2025', title: 'Global Expansion', desc: 'Expanded to 12 countries with 150+ team members.' },
];

const teams = [
  { name: 'Leadership', count: 8, desc: 'Guiding our vision and strategy' },
  { name: 'Engineering', count: 65, desc: 'Building the core platform' },
  { name: 'Research', count: 30, desc: 'Pushing the frontiers of AI' },
  { name: 'Design & Product', count: 20, desc: 'Crafting the user experience' },
  { name: 'Operations', count: 15, desc: 'Keeping everything running smoothly' },
  { name: 'Marketing & Sales', count: 12, desc: 'Sharing our story with the world' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-slate-100 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent mb-6">
            Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Building AI you can <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">trust</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500 leading-relaxed">
            We believe AI should be powerful, safe, and aligned with human values. Our team is dedicated to creating artificial intelligence that earns trust through transparency, reliability, and alignment.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <p.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Our Journey</h2>
            <p className="mt-2 text-slate-500">Key milestones in our story so far.</p>
          </div>
          <div className="space-y-6">
            {timeline.map((t) => (
              <div key={t.year} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="text-lg font-bold text-primary w-16 shrink-0">{t.year}</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{t.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Our Teams</h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-500">Over 150 talented individuals working together across 6 key teams.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((t) => (
            <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{t.name}</h3>
                <span className="text-2xl font-bold text-primary">{t.count}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-10 text-center text-white">
          <h2 className="text-2xl font-bold">Come build with us</h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">Explore open roles and help shape the future of trustworthy AI.</p>
          <Link to="/jobs" className="no-underline">
            <Button variant="secondary" size="lg" className="mt-6 bg-white text-primary hover:bg-white/90">
              View Open Positions <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
