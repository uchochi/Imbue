const sections = [
  { title: 'What Are Cookies', content: 'Cookies are small text files stored on your device when you visit a website. They help us recognize your browser, remember your preferences, and improve your experience on our platform.' },
  { title: 'Essential Cookies', content: 'These cookies are necessary for the platform to function properly. They handle authentication, security, and session management. You cannot opt out of essential cookies as the platform would not work without them.' },
  { title: 'Analytics Cookies', content: 'We use analytics cookies to understand how visitors interact with our platform. This helps us measure performance, identify popular features, and improve the overall user experience. All data is aggregated and anonymized.' },
  { title: 'Preference Cookies', content: 'These cookies remember your settings and choices, such as language preference, theme selection, and dashboard layout. They provide a more personalized experience across your visits.' },
  { title: 'Third-Party Cookies', content: 'Some cookies are placed by third-party services embedded in our platform, such as analytics providers. We do not control these cookies. Please refer to the respective third party’s privacy policy for more information.' },
  { title: 'Managing Cookies', content: 'You can control and manage cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that disabling certain cookies may affect the functionality of our platform.' },
  { title: 'Cookie Retention', content: 'Session cookies are deleted when you close your browser. Persistent cookies remain for a set period, typically between 30 days and 1 year, depending on their purpose.' },
  { title: 'Changes to This Policy', content: 'We may update this Cookie Policy periodically. Any changes will be posted on this page with an updated revision date. Continued use of our platform after changes constitutes acceptance.' },
];

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Cookie Policy</h1>
      <p className="mt-2 text-sm text-slate-400">Last updated: July 1, 2026</p>
      <p className="mt-6 text-slate-500 leading-relaxed">
        This policy explains how Loseyourip uses cookies and similar technologies when you visit our website and use our platform.
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
        Questions about our cookie practices? Contact us at <span className="text-primary">privacy@loseyourip.com</span>
      </p>
    </div>
  );
}
