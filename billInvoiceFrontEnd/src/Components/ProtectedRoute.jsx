import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Protected route component that redirects to login if not authenticated
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // If still loading auth state, you could show a loading spinner
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;