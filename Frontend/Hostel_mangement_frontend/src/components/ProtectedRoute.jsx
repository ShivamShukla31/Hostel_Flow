import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { storage } from '../utils/helpers';

const getRequiredRole = (pathname) => {
  if (pathname.startsWith('/student')) return 'Student';
  if (pathname.startsWith('/rector')) return 'Rector';
  if (pathname.startsWith('/worker')) return 'Worker';
  return null;
};

const ProtectedRoute = ({ children }) => {
  const token = storage.getToken();
  const user = storage.getUser();
  const location = useLocation();
  const requiredRole = getRequiredRole(location.pathname);

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    const redirectMap = {
      Student: '/student/dashboard',
      Rector: '/rector/dashboard',
      Worker: '/worker/dashboard'
    };
    return <Navigate to={redirectMap[user?.role] || '/login'} replace />;
  }

  return children;
};

export default ProtectedRoute;
