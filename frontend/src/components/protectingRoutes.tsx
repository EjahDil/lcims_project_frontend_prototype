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
    localStorage.setItem('tokenSetTime', Date.now().toString());
    const token = localStorage.getItem('token');
    const tokenSetTime = localStorage.getItem('tokenSetTime');
    let tokenExpirationTimer: NodeJS.Timeout;

    if (token && tokenSetTime) {
        const currentTime = Date.now();
        const timeElapsed = currentTime - parseInt(tokenSetTime, 10);
        const timeRemaining = TOKEN_EXPIRATION_TIME - timeElapsed;

        if (timeRemaining > 0) {
            setIsLoggedIn(true);

            // Set a timer for the remaining time
            tokenExpirationTimer = setTimeout(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('tokenSetTime');
                setIsLoggedIn(false);
            }, timeRemaining);
        } else {
            // Token has expired
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('tokenSetTime');
            setIsLoggedIn(false);
        }
    } else {
        setIsLoggedIn(false);
    }

    setLoading(false);

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
