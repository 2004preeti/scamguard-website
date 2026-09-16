import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute: Blocks unauthorized users from viewing the Admin Dashboard.
 * Only accessible if a valid 'adminToken' exists in localStorage.
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
