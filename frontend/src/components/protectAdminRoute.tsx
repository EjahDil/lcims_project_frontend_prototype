

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute: React.FC = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Check if the user has the admin role
  if (user?.role !== 'admin') {
    // Redirect to a forbidden or login page if not an admin
    return <Navigate to="/forbidden" />;
  }

  // Render the Outlet for nested routes if the user is an admin
  return <Outlet />;
};

export default AdminRoute;
