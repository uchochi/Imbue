import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLogin from '../../components/admin/AdminLogin';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/admin" replace />;
  return <AdminLogin />;
}
