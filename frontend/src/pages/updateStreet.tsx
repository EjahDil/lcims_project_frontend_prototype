

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateStreet } from "../services/useService_1";

// Props for EditStreetForm
interface EditStreetFormProps {
  initialData: {
    street_name: string;
    zone_code: string;
    description?: string;
    street_id: string;
  };
  onClose: () => void;
}

const EditStreetForm: React.FC<EditStreetFormProps> = ({ initialData, onClose }) => {
  const [formData, setFormData] = useState({
    street_name: initialData.street_name,
    zone_code: initialData.zone_code,
    description: initialData.description || "",
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
      await updateStreet(initialData.street_id, formData);
      setSuccess("Street updated successfully.");
      setTimeout(() => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const { role } = user;

            // Navigate based on the user's role
            if (role === "admin") {
              navigate("/admin/street-management");
            } else {
              navigate("/dashboard/street-management");
            }

             // Reload the page after navigation
            window.location.reload();

          } catch (err) {
            console.error("Error parsing user data from localStorage:", err);
          }
        }
    }, 1000);

          // Call the onClose prop to close the form
          if (onClose) {
            onClose();
          }
          
    } catch (err: any) {
      console.error("Error updating street:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Street</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Street Name */}
          <div>
            <label htmlFor="street_name" className="block text-gray-700">
              Street Name
            </label>
            <input
              type="text"
              id="street_name"
              name="street_name"
              value={formData.street_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Zone Code */}
          <div>
            <label htmlFor="zone_code" className="block text-gray-700">
              Zone Code
            </label>
            <input
              type="text"
              id="zone_code"
              name="zone_code"
              value={formData.zone_code}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description (Optional)
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
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
              Update Street
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStreetForm;
