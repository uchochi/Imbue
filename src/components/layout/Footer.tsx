import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-slate-900 no-underline">
              <img src="/Loseyourip-logo.png" alt="Loseyourip" className="h-8 w-auto" />
            </Link>
            <p className="max-w-xs text-sm text-slate-500">
              Building the future of AI. Join us in shaping what's next.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Careers</p>
              <Link to="/jobs" className="text-sm text-slate-600 hover:text-primary no-underline">Open Positions</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Company</p>
              <a href="mailto:careers@loseyourip.com" className="text-sm text-slate-600 hover:text-primary no-underline">careers@loseyourip.com</a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Loseyourip. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
