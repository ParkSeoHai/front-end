import { Navigate } from 'react-router-dom';
import { useAuthAdmin } from '../hooks/useAuthAdmin';

const ProtectedAdminRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  const { admin } = useAuthAdmin();
  if (!adminToken || admin?.user?.VaiTro !== 'admin') {
    return <Navigate to="/auth/admin/login" replace />;
  }
  return children;
};

export default ProtectedAdminRoute;