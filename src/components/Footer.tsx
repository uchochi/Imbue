import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/platform', label: 'Platform' },
      { to: '/research', label: 'Research' },
      { to: '/community', label: 'Community' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { to: '/jobs', label: 'Open Positions' },
      { to: '/forum', label: 'Forum' },
      { to: '/dashboard', label: 'My Dashboard' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/terms', label: 'Terms of Service' },
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/cookies', label: 'Cookie Policy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="no-underline">
              <img src="/Loseyourip-logo.png" alt="Loseyourip" className="h-9 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-500 leading-relaxed">
              Building AI that is safe, powerful, and aligned with human values.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-slate-900">{col.title}</h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-slate-500 no-underline transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Loseyourip. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
