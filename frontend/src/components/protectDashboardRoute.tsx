
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectDashboard: React.FC = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Check if the user has the role "user"
  if (user?.role === 'property_owner') {
    // Redirect to a forbidden or login page if the role is "user"
    return <Navigate to="/forbidden" />;
  }

  // Render the Outlet for nested routes if the user is not a "user"
  return <Outlet />;
};

export default ProtectDashboard;
