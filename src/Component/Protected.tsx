import { Navigate, Outlet } from 'react-router-dom';

export default function  ProtectedRoute() {
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

