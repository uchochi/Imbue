import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { adminLogin as svcLogin, adminLogout as svcLogout, isAdminLoggedIn } from '../services/jobService';

interface AuthCtx {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminLoggedIn());

  const login = useCallback((username: string, password: string) => {
    const ok = svcLogin(username, password);
    if (ok) setIsAuthenticated(true);
    return ok;
  }, []);

  const logout = useCallback(() => {
    svcLogout();
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
