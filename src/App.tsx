import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import ForumPage from './pages/ForumPage';
import ForumTopicPage from './pages/ForumTopicPage';
import NewTopicPage from './pages/NewTopicPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/admin/LoginPage';
import SignupPage from './pages/admin/SignupPage';
import DashboardPage from './pages/admin/DashboardPage';
import CreateJobPage from './pages/admin/CreateJobPage';
import EditJobPage from './pages/admin/EditJobPage';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/forum/:topicId" element={<ForumTopicPage />} />
            <Route path="/forum/new" element={<NewTopicPage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/signup" element={<SignupPage />} />
            <Route
              path="/admin"
              element={<ProtectedAdminRoute><DashboardPage /></ProtectedAdminRoute>}
            />
            <Route
              path="/admin/jobs/new"
              element={<ProtectedAdminRoute><CreateJobPage /></ProtectedAdminRoute>}
            />
            <Route
              path="/admin/jobs/:id/edit"
              element={<ProtectedAdminRoute><EditJobPage /></ProtectedAdminRoute>}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
