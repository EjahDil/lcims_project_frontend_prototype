import { useEffect, useState } from 'react';
// import { UseAuth } from '../contexts/authContext'; // Assuming you have an authContext

type LoginCredentials = {
  username: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token: string;
  user: {
    user_id: string;
    username: string;
    email: string;
    role: string;
    permissions: string[];
  };
};

// Type guard to check if the response is of type LoginResponse
const isLoginResponse = (response: any): response is LoginResponse => {
  return response && response.token && response.user;
};

    

export const UseLogin = () => {
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [success, setSuccess] = useState(false);
  // const { saveAuthData } = UseAuth(); // Assuming you have an auth context for saving data

  // // Check if there's a saved token in localStorage
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const user = localStorage.getItem('user');

//  // Check if the data exists and if not already loaded
//   if (token && user) {
//     saveAuthData(token, JSON.parse(user)); // Restore auth data
//   }
//   }, []);


      useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          setLoggedIn(true);
        }
      }, []);


  const login = async ({ username, password }: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    //setLoggedIn(false);

    try {
      const response = await fetch('https://lcims-backend.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const json: LoginResponse | { message: string } = await response.json();

      // Check if the response is of type LoginResponse
      if (!isLoginResponse(json)) {
        setIsLoading(false);
        setError(json.message || 'Login failed');
        return;
      }

      // Save token and user data to localStorage
      localStorage.setItem('token', json.token);
      localStorage.setItem('user', JSON.stringify(json.user));

      // // Save token and user data via context
      // saveAuthData(json.token, json.user);

      // checkTokenValidity();

      // Set success state to true and loading state to false
      setIsLoading(false);
      setSuccess(true);
      //setLoggedIn(true);

      return json.user; // Return user data if needed for further processing
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
      //setLoggedIn(false);
    }
  };

  return { login, isLoading, error, success, isLoggedIn };
};
