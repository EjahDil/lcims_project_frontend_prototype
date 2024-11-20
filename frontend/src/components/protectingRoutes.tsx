import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const TOKEN_EXPIRATION_TIME = 6000; // 10 minutes in milliseconds

const ProtectedRoute: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let tokenExpirationTimer: NodeJS.Timeout;

    if (token) {
      setIsLoggedIn(true);
      
      // Set a timer to remove the token after expiration time
      tokenExpirationTimer = setTimeout(() => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }, TOKEN_EXPIRATION_TIME);
    } else {
      setIsLoggedIn(false);
    }

    setLoading(false);

    // Cleanup the timeout on component unmount
    return () => clearTimeout(tokenExpirationTimer);
  }, []);

  
  useEffect(() => {
    if (!isLoggedIn) {
      // If the user is not logged in, we would immediately redirect (this effect doesn't need extra code here)
    }
  }, [isLoggedIn]); // Trigger the redirect on change of isLoggedIn

  if (loading) {
    return <div>Loading...</div>; // Show a loading state if necessary
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
