

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProperty } from "../services/useService";



// Define the Property interface
interface Property {
  property_id: number; 
  category_name: string;
  type: string;
  status: string;
  digital_address: string;
  house_number:string
  owner_details: {
    full_name: string;
    contact_number: string;
    email: string;
  };
}


// Define props for EditPropertyForm
interface EditPropertyFormProps {
  property: Property;
  onClose: () => void;
}

const EditPropertyForm: React.FC<EditPropertyFormProps> = ({ property, onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    owner_name: property.owner_details.full_name,
    owner_number: property.owner_details.contact_number,
    owner_email: property.owner_details.email,
    category_name: property.category_name,
    type: property.type,
    digital_address: property.digital_address,
    status: property.status,
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
      await updateProperty(property.property_id.toString(), formData);
      setSuccess("Property updated successfully.");
      setTimeout(() => {
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const user = JSON.parse(localStorage.getItem("user") || "{}");
              const { role } = user;

              // Navigate based on the user's role
              if (role === "admin") {
                navigate("/admin/property-management");
              } else {
                navigate("/dashboard/property-management");
              }

               // Reload the page after navigation
              window.location.reload();

            } catch (err) {
              console.error("Error parsing user data from localStorage:", err);
            }
          }
      }, 2000);
    } catch (err: any) {
      console.error("Error updating property:", err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Property</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Owner */}
          <div>
            <label htmlFor="owner_name" className="block text-gray-700">
              Owner's Name
            </label>
            <input
              type="text"
              id="owner_name"
              name="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="owner_number" className="block text-gray-700">
              Owner's Number
            </label>
            <input
              type="text"
              id="owner_number"
              name="owner_number"
              value={formData.owner_number}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="owner_email" className="block text-gray-700">
              Owner's Email
            </label>
            <input
              type="email"
              id="owner_email"
              name="owner_email"
              value={formData.owner_email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

            {/* Property Name */}
            <div>
          <label htmlFor="name" className="block text-gray-700">
            Property Category Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.category_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-gray-700">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.digital_address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 py-2 px-4 bg-[#709ec9] hover:bg-[#575447] text-white rounded-md font-semibold"
            >
              Update Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPropertyForm;
