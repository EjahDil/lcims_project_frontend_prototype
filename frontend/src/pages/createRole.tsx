

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/formContainer";
import { createRole } from "../services/useService_1";

const CreateRoleForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role_name: "",
    description: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      // Call the createRole function from the API service
      const response = await createRole(formData);

      console.log("Role Created Successfully", response);

      setSuccess("Role created successfully");
      setFormData({
        role_name: "",
        description: "",
      });

      // Redirect to the roles management page after success
      setTimeout(() => {
        navigate("/admin/role-management");
      }, 2000);
    } catch (err: any) {
      console.error("Error creating role:", err);
      setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <FormContainer title="Create New Role">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        {/* Role Name */}
        <div>
          <label htmlFor="role_name" className="block text-gray-700">
            Role Name
          </label>
          <input
            type="text"
            id="role_name"
            name="role_name"
            value={formData.role_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 py-2 px-4 bg-[#709ec9] hover:bg-[#575447] text-white rounded-md font-semibold"
          >
            Create Role
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default CreateRoleForm;
