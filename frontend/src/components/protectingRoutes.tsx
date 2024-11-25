import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const TOKEN_EXPIRATION_TIME = 600000; // 10 minutes in milliseconds

// // Define the structure of the location state
// interface LocationState {
//   from: {
//     pathname: string;
//   };
// };


const ProtectedRoute: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const token = localStorage.getItem('token');
    let tokenExpirationTimer: NodeJS.Timeout;
    

    if (token) {
      setIsLoggedIn(true);

      // Set a timer to remove the token after expiration time
      tokenExpirationTimer = setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
      }, TOKEN_EXPIRATION_TIME);
    } else {
      setIsLoggedIn(false);
    }

    setLoading(false);

    // Cleanup the timeout on component unmount
    return () => clearTimeout(tokenExpirationTimer);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state if necessary
  }

  if (!isLoggedIn) {
    // Redirect to login with the current location as state
    return <Navigate to="/login" state = {{from: location}} replace />;

  };

  return <Outlet />;
};

export default ProtectedRoute;
