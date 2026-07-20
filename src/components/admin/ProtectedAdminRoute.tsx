import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminLoggedIn } from '../../services/jobService';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const hasLegacyAdmin = isAdminLoggedIn();
  const isAdmin = user?.role === 'admin';

  if (!isAuthenticated && !hasLegacyAdmin) return <Navigate to="/admin/login" replace />;
  if (!isAdmin && !hasLegacyAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
}
