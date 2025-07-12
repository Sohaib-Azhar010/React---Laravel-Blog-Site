import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return user.role === 'admin'
    ? <Navigate to="/admin/dashboard"   replace />
    : <Navigate to="/author/dashboard"  replace />;
};

export default DashboardRedirect;
