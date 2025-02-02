import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/formContainer";
import { createUser } from "../services/useService"; // Import the createUser function

const RegisterUserForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",  // Set default role to "user"
    digital_address: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      // Call the createUser function from the API service
      const response = await createUser(formData);

      console.log("User Created Successfully", response);

      setSuccess("User created successfully");
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "user", 
        digital_address: "",
      });

      // Redirect to the users page after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      console.error("Error creating user:", err);
      setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <FormContainer title="New Property Owner">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        {/* Username */}
        <div className="relative">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full px-4 py-2 border rounded-md pl-8"
          />
          <i className="fa fa-user absolute left-3 top-9 text-gray-400"></i>
        </div>

        {/* Email */}
        <div className="relative">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md pl-8"
          />
           <i className="fa fa-envelope absolute left-3 top-9 text-gray-400 pointer-events-none"></i>
        </div>

      {/* Password */}
      <div className="relative">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md pl-8 pr-10"
          />
          <i className="fa fa-lock absolute left-3 top-9 text-gray-400"></i>
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-9 text-gray-400 focus:outline-none"
          >
            <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
          </button>
        </div>


        {/* Digital Address (optional) */}
        <div className="relative">
          <label htmlFor="digital_address" className="block text-gray-700">
            Digital Address
          </label>
          <input
            type="text"
            id="digital_address"
            name="digital_address"
            value={formData.digital_address}
            onChange={handleChange}
            required
            placeholder="Digital Address"
            className="w-full px-4 py-2 border rounded-md pl-8"
          />
           <i className="fa fa-map-marker absolute left-3 top-9 text-gray-400"></i>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 py-2 px-4 bg-[#709ec9] hover:bg-[#575447] text-white rounded-md font-semibold"
          >
            Register As PO
          </button>
        </div>

        {/* Anchor link to return to homepage */}
        <div className="flex justify-center mt-4">
          <a
            href="/"
            className="text-sm text-black hover:underline font-bold"
          >
            Return to homepage
          </a>
        </div>

      </form>
    </FormContainer>
  );
};

export default RegisterUserForm;
