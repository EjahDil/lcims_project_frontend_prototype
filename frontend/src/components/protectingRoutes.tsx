import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const TOKEN_EXPIRATION_TIME = 6000000; // 10 minutes in milliseconds

// // // Define the structure of the location state
// // interface LocationState {
// //   from: {
// //     pathname: string;
// //   };
// // };

const ProtectedRoute: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
    return <Navigate to="/login" replace />;

  };

  return <Outlet />;
};

export default ProtectedRoute;


// import React, { useEffect, useState } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const TOKEN_EXPIRATION_TIME = 6000; // 6 seconds for testing purposes

// const ProtectedRoute: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Function to handle token expiration and reset on user activity
//   const resetTokenExpiration = () => {
//     localStorage.setItem('tokenSetTime', Date.now().toString());
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const tokenSetTime = localStorage.getItem('tokenSetTime');
//     let tokenExpirationTimer: NodeJS.Timeout;

//     const checkTokenExpiration = () => {
//       if (token && tokenSetTime) {
//         const currentTime = Date.now();
//         const timeElapsed = currentTime - parseInt(tokenSetTime, 10);
//         const timeRemaining = TOKEN_EXPIRATION_TIME - timeElapsed;

//         if (timeRemaining > 0) {
//           setIsLoggedIn(true);

//           // Set a timer for the remaining time
//           tokenExpirationTimer = setTimeout(() => {
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             localStorage.removeItem('tokenSetTime');
//             setIsLoggedIn(false);
//           }, timeRemaining);
//         } else {
//           // Token has expired
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           localStorage.removeItem('tokenSetTime');
//           setIsLoggedIn(false);
//         }
//       } else {
//         setIsLoggedIn(false);
//       }
//     };

//     // Initially check token expiration when the component mounts
//     checkTokenExpiration();

//     // Add event listeners for mousemove and keydown to reset token expiration time
//     const activityHandler = () => {
//       resetTokenExpiration();
//       checkTokenExpiration();  // Recheck expiration whenever activity is detected
//     };
//     window.addEventListener('mousemove', activityHandler);
//     window.addEventListener('keydown', activityHandler);

//     // Cleanup event listeners and timeout on component unmount
//     return () => {
//       window.removeEventListener('mousemove', activityHandler);
//       window.removeEventListener('keydown', activityHandler);
//       clearTimeout(tokenExpirationTimer);
//     };
//   }, []); // Empty dependency array to ensure this runs only once on mount

//   useEffect(() => {
//     setLoading(false);
//   }, []); // Ensure loading state is turned off after initial render

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading state if necessary
//   }

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
