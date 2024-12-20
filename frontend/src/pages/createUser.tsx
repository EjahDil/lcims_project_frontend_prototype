import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/formContainer";
import { createUser } from "../services/useService"; // Import the createUser function
import Select, { SingleValue } from "react-select"

const CreateUserForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    digital_address: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        role: "",
        digital_address: "",
      });

      // Redirect to the users page after success
      setTimeout(() => {
        navigate("/admin/user-management");
      }, 2000);
    } catch (err: any) {
      console.error("Error creating user:", err);
      setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };


    // Options for the select dropdown
    const roleOptions = [
      { value: "admin", label: "Admin" },
      { value: "property_registrator", label: "Property Registrator" },
      { value: "tax_officer", label: "Tax Officer" },
      { value: "city_officer", label: "City Officer" },
    ];
  
    // Custom styles for react-select with Tailwind CSS
    const customStyles = {
      control: (provided: any) => ({
        ...provided,
        borderColor: "#ccc", // Border color
        borderRadius: "0.375rem", // rounded-md
        padding: "0.5rem", // padding
        boxShadow: "none",
        "&:hover": {
          borderColor: "#575447", // Hover border color
        },
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? "#709ec9"  // Background color when the option is selected
          : state.isFocused
          ? "#fff"  // Background color when the option is hovered (focused)
          : provided.backgroundColor,  // Default background color for other states
        color: state.isSelected ? "#fff" : "#333", // Text color when selected
        //padding: "0.75rem 1rem", // Padding for the options

        "&:hover": {
          backgroundColor: "#575447", // Hover background color
          color: "#fff", // Hover text color
        },
        cursor: "pointer",
      }),

      placeholder: (provided: any) => ({
        ...provided,
        color: "#aaa", // Placeholder color
      }),
      singleValue: (provided: any) => ({
        ...provided,
        color: "#333", // Text color for selected value
      }),
    };


  // This function is now designed to handle the select value properly
  const handleRoleChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    // When the user selects an option, update the formData with the new value
    if (selectedOption) {
      setFormData({
        ...formData,
        role: selectedOption.value, // Update formData with the selected value
      });
    }
  };


  return (
    <FormContainer title="Create New User">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Email */}
        <div>
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
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange = {handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Role */}
              {/* <div>
        <label htmlFor="role" className="block text-gray-700">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md bg-white hover:bg-gray-100 focus:outline-none"
        >
          <option value="" disabled hidden className="text-gray-500">
            Select Role
          </option>
          <option value="Admin" className="hover:bg-[#575447]">Admin</option>
          <option value="Property Registrator" className="hover:bg-[#575447]">Property Registrator</option>
          <option value="Tax Officer" className="hover:bg-[#575447]">Tax Officer</option>
          <option value="City Officer" className="hover:bg-[#575447]">City Officer</option>
        </select>
      </div> */}



      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-gray-700">
          Role
        </label>
        <Select
          id="role"
          name="role"
          value={roleOptions.find(option => option.value === formData.role)}
          onChange={handleRoleChange}
          options={roleOptions}
          placeholder="Select Role"
          styles={customStyles} // Apply Tailwind styles
        />
      </div>


        {/* Digital Address (optional) */}
        <div>
          <label htmlFor="digital_address" className="block text-gray-700">
            Digital Address
          </label>
          <input
            type="text"
            id="digital_address"
            name="digital_address"
            value={formData.digital_address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 py-2 px-4 bg-[#709ec9] hover:bg-[#575447] text-white rounded-md font-semibold"
          >
            Create User
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default CreateUserForm;
