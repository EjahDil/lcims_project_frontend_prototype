

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/formContainer";
import { createStreet } from "../services/useService_1";

const CreateStreetForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    street_name: "",
    zone_code: "",
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
      // Call the createStreet function from the API service
      const response = await createStreet(formData);

      console.log("Street Created Successfully", response);

      setSuccess("Street created successfully");
      setFormData({
        street_name: "",
        zone_code: "",
        description: "",
      });

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


          } catch (err) {
            console.error("Error parsing user data from localStorage:", err);
          }
        }
    }, 2000);
    } catch (err: any) {
      console.error("Error creating street:", err);
      setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <FormContainer title="Create New Street">
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
            Create Street
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default CreateStreetForm;
