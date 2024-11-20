import React, { useState } from "react";
import FormContainer from "../components/formContainer";
import { UseLogin } from "../hooks/UseLogin"; // Import the useLogin hook
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
// import { isTokenExpired } from "../contexts/authContext";



const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", password: "" }); // Use username instead of email
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { login, isLoading, error, success } = UseLogin(); // Destructure login, isLoading, error, and success from the hook
  const navigate = useNavigate(); // useNavigate hook to redirect after login

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = {
      username: formData.username,
      password: formData.password,
    };

    const user = await login(credentials);
    const token = localStorage.getItem("token") // Call the login function


  
  //   if (user) {
  //     // Handle successful login, redirect to the form page
  //     console.log("Login successful", user);
  //     navigate("/form"); // Redirect to the form page after successful login
  //   }
  // };

        // isTokenExpired(token as string);



      if (user){
        console.log("Login successful", user);
        navigate("/form");
      };
  }

  return (
    <FormContainer title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block ml-1 font-semibold text-lg  ">Username</label>
        <input
          type="text" // Change input type to text for username
          name="username" // Use 'username' instead of 'email'
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Username"
          required
        />
        <div className="relative space-y-4">
        <label className="block ml-1 font-semibold text-lg  ">Password</label>
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle the password visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/3 text-gray-500"
          >
            {showPassword ? "Hide" : "Show"} {/* Toggle between 'Show' and 'Hide' */}
          </button>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-3/4 sm:w-1/2 py-2 px-4 bg-[#709ec9] hover:bg-[#575447] text-white rounded-md font-semibold transition"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? "Logging in..." : "Login"} {/* Show loading text while the login is in progress */}
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>} {/* Show error if any */}
        {success && <p className="text-green-500 text-center">Login successful!</p>} {/* Show success message */}
      </form>
    </FormContainer>
  );
};

export default LoginForm;
