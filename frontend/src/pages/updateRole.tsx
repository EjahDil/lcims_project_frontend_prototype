


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateRole } from "../services/useService_1";

// Props for EditRoleForm
interface EditRoleFormProps {
  initialData: { role_id: string; description: string };
  onClose: () => void;
}

const EditRoleForm: React.FC<EditRoleFormProps> = ({ initialData, onClose }) => {
  const [formData, setFormData] = useState<{ description: string }>({
    description: initialData.description,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await updateRole(initialData.role_id, formData);
      setSuccess("Role updated successfully.");
      setTimeout(() => {
        navigate("/admin/role-management", { replace: true });
        window.location.reload();
      }, 2000);


          // Call the onClose prop to close the form
          if (onClose) {
            onClose();
          }
          
    } catch (err: any) {
      console.error("Error updating role:", err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };


  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Role</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 py-2 px-4 bg-[#709ec9] hover:bg-[#575447] text-white rounded-md font-semibold"
            >
              Update Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoleForm;
