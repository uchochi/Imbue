import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Footer from '../components/Footer';

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/jobs', label: 'Open Positions' },
    { to: '/forum', label: 'Forum' },
  ];

  const legacyAdmin = typeof window !== 'undefined' && sessionStorage.getItem('loseyourip_admin');
  const isAdmin = (user?.role === 'admin') || legacyAdmin;
  const showUserDashboard = isAuthenticated && !isAdmin;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-slate-900 no-underline">
            <img src="/Loseyourip-logo.png" alt="Loseyourip" className="h-10 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-lg px-4 py-2 text-sm font-medium no-underline transition-colors ${
                  pathname === l.to ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={`rounded-lg px-4 py-2 text-sm font-medium no-underline transition-colors ${
                  pathname.startsWith('/admin') && pathname !== '/admin/login' ? 'bg-accent/10 text-accent' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Dashboard
              </Link>
            )}
            {showUserDashboard && (
              <Link
                to="/dashboard"
                className={`rounded-lg px-4 py-2 text-sm font-medium no-underline transition-colors ${
                  pathname === '/dashboard' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                My Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
            ) : (
              <Link to="/admin/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 cursor-pointer">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {links.concat(
                isAdmin
                  ? [{ to: '/admin', label: 'Dashboard' }]
                  : showUserDashboard
                    ? [{ to: '/dashboard', label: 'My Dashboard' }]
                    : []
              ).concat(
                isAuthenticated
                  ? [{ to: '#', label: 'Logout' }]
                  : [{ to: '/admin/login', label: 'Sign In' }]
              ).map((l) => (
                l.label === 'Logout' ? (
                  <button
                    key={l.label}
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 cursor-pointer"
                  >
                    {l.label}
                  </button>
                ) : (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-4 py-2.5 text-sm font-medium no-underline ${
                      pathname === l.to ? 'bg-primary/10 text-primary' : 'text-slate-600'
                    }`}
                  >
                    {l.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </nav>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
