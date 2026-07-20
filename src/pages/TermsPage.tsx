const sections = [
  { title: 'Acceptance of Terms', content: 'By accessing or using the Loseyourip platform, you agree to be bound by these Terms of Service. If you do not agree, do not use our services. We may update these terms; continued use constitutes acceptance of changes.' },
  { title: 'Description of Service', content: 'Loseyourip provides AI inference APIs, developer tools, and a platform for building applications powered by large language models. Our services include model access, fine-tuning, and related developer infrastructure.' },
  { title: 'Account Registration', content: 'You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.' },
  { title: 'Acceptable Use', content: 'You may not use our services to generate harmful, illegal, or misleading content; to circumvent safety features; to reverse-engineer our models; or to violate any applicable laws. We reserve the right to suspend access for violations.' },
  { title: 'API Usage and Rate Limits', content: 'API access is subject to usage limits based on your plan. Exceeding rate limits may result in temporary throttling or suspension. We provide monitoring tools to help you track your usage.' },
  { title: 'Pricing and Payment', content: 'Free tier usage is subject to monthly limits. Paid plans are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by applicable law.' },
  { title: 'Intellectual Property', content: 'Loseyourip retains all rights to its platform, models, and technology. You retain ownership of content you create using our APIs. We do not claim ownership over your outputs.' },
  { title: 'Disclaimer of Warranties', content: 'Our services are provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free service. AI-generated outputs may contain inaccuracies and should be verified independently.' },
  { title: 'Limitation of Liability', content: 'Loseyourip shall not be liable for any indirect, incidental, special, or consequential damages. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.' },
  { title: 'Termination', content: 'Either party may terminate this agreement at any time. Upon termination, your access to our services will cease. We may retain your data as required by law or for legitimate business purposes.' },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-slate-400">Last updated: July 1, 2026</p>
      <p className="mt-6 text-slate-500 leading-relaxed">
        These Terms of Service govern your use of the Loseyourip platform and services. Please read them carefully before using our platform.
      </p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-lg font-semibold text-slate-900">{s.title}</h2>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">{s.content}</p>
          </section>
        ))}
      </div>
      <p className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
        Questions about these terms? Contact us at <span className="text-primary">legal@loseyourip.com</span>
      </p>
    </div>
  );
}
