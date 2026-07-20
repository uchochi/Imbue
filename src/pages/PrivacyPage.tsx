const sections = [
  { title: 'Information We Collect', content: 'We collect information you provide directly, such as your name, email address, and payment information when you create an account. We also collect usage data including API calls, model interactions, and device information to improve our services.' },
  { title: 'How We Use Your Information', content: 'We use your information to provide, maintain, and improve our services; process transactions; send communications; detect and prevent fraud; and comply with legal obligations. We do not use your data to train our models without explicit consent.' },
  { title: 'Data Sharing', content: 'We do not sell your personal information. We may share data with trusted service providers who assist in operating our platform, when required by law, or to protect the rights and safety of Loseyourip and its users.' },
  { title: 'Data Security', content: 'We implement industry-standard security measures including encryption at rest and in transit, regular security audits, access controls, and SOC 2 Type II compliance. However, no method of transmission over the internet is 100% secure.' },
  { title: 'Data Retention', content: 'We retain your account information for as long as your account is active. API logs are retained for 90 days. You may request deletion of your data at any time by contacting support@loseyourip.com.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, delete, or port your personal data. You may also opt out of certain data processing activities. Contact us at privacy@loseyourip.com to exercise these rights.' },
  { title: 'International Transfers', content: 'Your data may be processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers, including standard contractual clauses where required.' },
  { title: 'Changes to This Policy', content: 'We may update this policy from time to time. We will notify you of material changes via email or through our platform at least 30 days before they take effect.' },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-400">Last updated: July 1, 2026</p>
      <p className="mt-6 text-slate-500 leading-relaxed">
        At Loseyourip, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our platform and services.
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
        Questions about this policy? Contact us at <span className="text-primary">privacy@loseyourip.com</span>
      </p>
    </div>
  );
}
