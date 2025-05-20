import { Navigate, Outlet } from 'react-router-dom';
import AdminLayout from '../page/admin/AdminLayout';
import { useEffect, useState } from 'react';

const ProtectedAdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // or loading spinner
  }

  return isAuthenticated ? <AdminLayout /> : <Navigate to="/auth/admin/login" replace />;
};

export default ProtectedAdminLayout;