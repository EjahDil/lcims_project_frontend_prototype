// //import { jwtDecode } from 'jwt-decode';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// // Utility function to check if the JWT token has expired
// // export const isTokenExpired = (token: string): boolean => {
// //   try {
// //     // Split the JWT into its three parts (header, payload, signature)
// //     const parts = token.split('.');
// //     if (parts.length !== 3) {
// //       throw new Error('Invalid token');
// //     }

// //     // Base64 decode the payload (second part of the JWT)
// //     const payload = atob(parts[1]); // atob decodes a base64-encoded string

// //     // Parse the JSON payload to get the decoded data
// //     const decodedPayload = JSON.parse(payload);

// //     // Get the current time in seconds
// //     const currentTime = Date.now() / 1000;

// //     // Check if the token is expired by comparing the exp field with the current time
// //     return decodedPayload.exp < currentTime;
// //   } catch (error) {
// //     console.error("Failed to decode token:", error);
// //     return true; // If decoding fails, assume the token is expired or invalid
// //   }
// // };

// // Define types for the AuthContext
// type AuthContextType = {
//   logout: () => void;
//   checkTokenValidity: () => void;
//   saveAuthData: (token: string, user: any) => void;
//   isLoggedIn: boolean; // Added to track login state
//   user: any | null; // Added to store the current user
// };

// // Create the AuthContext
// const AuthContext = createContext<AuthContextType | null>(null);

// // AuthProvider component to wrap your app
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in
//   const [user, setUser] = useState<any | null>(null); // Store the user data

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
//     setIsLoggedIn(false); // Set login state to false
//     setUser(null); // Clear user data
//     window.location.href = '/login'; // Optionally redirect to the login page
//   };

//   // Save token and user data to localStorage
//   const saveAuthData = (token: string, user: any) => {
//     console.log("Saving  auth data:", { token, user})
//     localStorage.setItem('authToken', token);
//     localStorage.setItem('user', JSON.stringify(user));
//     setIsLoggedIn(true); // Set the login state to true
//     setUser(user); // Store the user data
//   };

//   // Check token validity
//   const checkTokenValidity = () => {
//     const token = localStorage.getItem('authToken');
//     const storedUser = localStorage.getItem('user');

//   //   if (token && !isTokenExpired(token)) {
//   //     setIsLoggedIn(true); // Token is valid, user is logged in
//   //     setUser(storedUser ? JSON.parse(storedUser) : null); // Set user data from localStorage
//   //   } else {
//   //     logout(); // If the token is expired or invalid, logout
//   //   }
//   // };

//   // Check token validity on initialization, only once on mount
//   useEffect(() => {
//     checkTokenValidity(); // Check validity on first load
//   }, []); // The empty dependency array ensures this runs only once

//   return (
//     <AuthContext.Provider value={{ logout, checkTokenValidity, saveAuthData, isLoggedIn, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use AuthContext
// export const UseAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
