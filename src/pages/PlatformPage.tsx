import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Brain, Lock, BarChart3, Globe } from 'lucide-react';
import Button from '../components/ui/Button';

const features = [
  { icon: Brain, title: 'Advanced Inference Engine', desc: 'State-of-the-art reasoning capabilities with support for complex multi-step workflows and chain-of-thought prompting.' },
  { icon: Shield, title: 'Built-in Safety Guardrails', desc: 'Automated content filtering, hallucination detection, and alignment scoring on every API call.' },
  { icon: Zap, title: 'Real-Time Streaming', desc: 'Sub-100ms time-to-first-token with optimized streaming endpoints for interactive applications.' },
  { icon: Lock, title: 'Enterprise Security', desc: 'SOC 2 Type II certified, end-to-end encryption, data residency options, and custom deployment zones.' },
  { icon: BarChart3, title: 'Observability Dashboard', desc: 'Monitor usage, latency, cost, and quality metrics in real-time with built-in analytics and alerting.' },
  { icon: Globe, title: 'Global Edge Network', desc: 'Deploy inference endpoints across 12 regions for low-latency access worldwide.' },
];

const models = [
  { name: 'Loseyourip-7B', desc: 'Fast, efficient model for everyday tasks and prototyping.' },
  { name: 'Loseyourip-70B', desc: 'High-capability model balancing performance and cost.' },
  { name: 'Loseyourip-Max', desc: 'Flagship alignment model with a 200K context window.' },
];

export default function PlatformPage() {
  return (
    <div>
      <section className="border-b border-slate-100 bg-slate-50/50">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Platform</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 leading-relaxed">
            A complete AI platform built for developers who need powerful, safe, and reliable infrastructure. From prototype to production in minutes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <f.icon size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Models</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {models.map((m) => (
              <div key={m.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-primary">{m.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Ready to get started?</h2>
          <p className="mx-auto mt-3 max-w-md text-slate-500">Explore the forum and connect with the community building on Loseyourip.</p>
          <Link to="/forum" className="no-underline">
            <Button size="lg" className="mt-6">
              Join the Forum <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
