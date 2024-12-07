import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import { updateUser } from "../services/useService";

// Define the User interface
interface User {
  user_id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  digital_address: string;
}

// Define props for EditUserForm
interface EditUserFormProps {
  user: User;
  onClose: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: "",
    role: user.role,
    digital_address: user.digital_address,
    status: user.status,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "property_registrator", label: "Property Registrator" },
    { value: "tax_officer", label: "Tax Officer" },
    { value: "city_officer", label: "City Officer" },
  ];

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: "#ccc",
      borderRadius: "0.375rem",
      padding: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#575447",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#709ec9" : state.isFocused ? "#fff" : provided.backgroundColor,
      color: state.isSelected ? "#fff" : "#333",
      "&:hover": {
        backgroundColor: "#575447",
        color: "#fff",
      },
      cursor: "pointer",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#aaa",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#333",
    }),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    if (selectedOption) {
      setFormData({
        ...formData,
        role: selectedOption.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await updateUser(user.user_id.toString(), formData); // Call update API
      setSuccess("User updated successfully.");
      setTimeout(() => navigate("/users"), 2000);
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit User</h2>

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
              Password (Leave blank to keep current)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <Select
              id="role"
              name="role"
              value={roleOptions.find((option) => option.value === formData.role)}
              onChange={handleRoleChange}
              options={roleOptions}
              placeholder="Select Role"
              styles={customStyles}
            />
          </div>

          {/* Digital Address */}
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
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
