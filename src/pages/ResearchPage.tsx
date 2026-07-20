import { FileText } from 'lucide-react';

const papers = [
  { title: 'Scaling Alignment: Lessons from Training Loseyourip-Max', authors: 'J. Chen, A. Patel, M. Rodriguez et al.', venue: 'NeurIPS 2026', abstract: 'We present the techniques used to align our largest model, achieving state-of-the-art performance on safety benchmarks while maintaining strong capability across standard evaluations.' },
  { title: 'Real-Time Hallucination Detection in Large Language Models', authors: 'S. Kim, L. Wang, R. Gupta', venue: 'ICML 2026', abstract: 'A lightweight, production-deployable system for detecting hallucinated content in LLM outputs with 94% precision and sub-millisecond latency.' },
  { title: 'Constitutional AI at Scale: A Practical Framework', authors: 'A. Patel, J. Chen, D. Thompson', venue: 'ICLR 2026', abstract: 'We describe a practical framework for implementing constitutional AI principles in production systems, including evaluation methodology and failure mode analysis.' },
  { title: 'Efficient Fine-Tuning with LoRA++: Dynamic Rank Adaptation', authors: 'M. Rodriguez, S. Kim', venue: 'arXiv 2026', abstract: 'An improvement to LoRA that dynamically adjusts adapter rank during training, achieving comparable performance to full fine-tuning at a fraction of the compute cost.' },
  { title: 'Measuring What Matters: New Benchmarks for AI Trustworthiness', authors: 'L. Wang, J. Chen, A. Patel, D. Thompson', venue: 'NeurIPS 2025', abstract: 'We introduce a comprehensive benchmark suite for evaluating AI trustworthiness across honesty, safety, fairness, and robustness dimensions.' },
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Research</h1>
      <p className="mt-3 max-w-xl text-lg text-slate-500">
        Our published papers and ongoing research in AI alignment, safety, and capabilities.
      </p>

      <div className="mt-12 space-y-6">
        {papers.map((p) => (
          <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <FileText size={16} className="text-primary" />
              <span className="text-xs font-medium text-primary">{p.venue}</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-900">{p.title}</h2>
            <p className="mt-1 text-xs text-slate-400">{p.authors}</p>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">{p.abstract}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
