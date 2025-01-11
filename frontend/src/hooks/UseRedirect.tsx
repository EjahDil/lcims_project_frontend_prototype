

// You can replace this with a function to get the logged-in user's role
export const getRole = () => {
  // Retrieve the user object from localStorage, parse it, and return the role
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    console.log(parsedUser.role)
    return parsedUser.role || ""; // Assuming the role is part of the user object
  }
  return ""; // Return an empty string if no user or role is found
};

// export const UseRedirect = () => {
//   const location = useLocation();
//   const role = getRole(); // Get the user's role
//   const defaultPath = "/dashboard/home"
  
//   // Set default redirection paths based on role
//   const redirectPath = role
//     //(location.state as { from?: { pathname: string } })?.from?.pathname || 
//     // (role === "admin" ? "/admin/home" : defaultPath);

//   return redirectPath;
// };


// export const UseRedirect = () => {
//   const role = getRole(); // Get the user's role
//   let redirectPath = "/dashboard/home"; // Default path for non-admin users

//   // Set redirection paths based on role
//   if (role === "admin") {
//     redirectPath = "/admin/home";
//   }

//   console.log(redirectPath)

//   return redirectPath;
// };

// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const getRole = () => {
//   // Retrieve the user object from localStorage, parse it, and return the role
//   const user = localStorage.getItem("user");
//   if (user) {
//     const parsedUser = JSON.parse(user);
//     console.log(parsedUser.role);
//     return parsedUser.role || ""; // Assuming the role is part of the user object
//   }
//   return ""; // Return an empty string if no user or role is found
// };

// export const UseRedirect = (defaultPath: string = "/dashboard") => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const role = getRole(); // Get the user's role
  
//   // Determine the redirect path
//   const redirectPath =
//     (location.state as { from?: { pathname: string } })?.from?.pathname ||
//     (role === "admin" ? "/admin" : defaultPath);

//   // Redirect if the role is admin
//   useEffect(() => {
//     if (role === "admin" || redirectPath !== defaultPath) {
//       navigate(redirectPath, { replace: true });
//     }
//   }, [role, redirectPath, navigate]);

//   return redirectPath; // Return for reference (optional)
// };


// import { useLocation } from "react-router-dom";

// // Function to get the logged-in user's username
// const getUsername = () => {
//   // Retrieve the user object from localStorage, parse it, and return the username
//   const user = localStorage.getItem("user");
//   if (user) {
//     const parsedUser = JSON.parse(user);
//     console.log(parsedUser.username);
//     return parsedUser.username || ""; // Assuming the username is part of the user object
//   }
//   return ""; // Return an empty string if no user or username is found
// };

// export const UseRedirect = (defaultPath: string = "/dashboard") => {
//   const location = useLocation();
//   const username = getUsername(); // Get the user's username
  
//   // Set default redirection paths based on username
//   const redirectPath =
//     (location.state as { from?: { pathname: string } })?.from?.pathname || 
//     (username === 'dilan' ? "/dilan" : username === 'michel' ? "/michel" : "/");

//   return redirectPath;
// };
