import { useAuth } from '../../context/AuthContext';
import AdminLogin from '../../components/admin/AdminLogin';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    window.location.href = '/admin';
    return null;
  }
  return <AdminLogin />;
}
