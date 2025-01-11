

import React, { useState } from "react";
import { updateCategoryRate, CategoryRateData } from "../services/useService";
import { useNavigate } from "react-router-dom";
import { CategoryRate } from "../tables/taxRatesTable";

// Props for EditTaxForm
interface EditTaxFormProps {
  initialData: CategoryRate;
  onClose: () => void;
}

const EditTaxForm: React.FC<EditTaxFormProps> = ({ initialData, onClose }) => {
  const [formData, setFormData] = useState<CategoryRateData>(initialData);
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
      await updateCategoryRate(initialData.category_id, formData);
      setSuccess("Tax rate updated successfully.");
      setTimeout(() => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const { role } = user;
      
            if (role === "admin") {
              navigate("/admin/tax-identification", { replace: true });
            } else {
              navigate("/dashboard/tax-identification", { replace: true });
            }

            window.location.reload();
            
          } catch (err) {
            console.error("Error parsing user data from localStorage:", err);
          }
        }
      }, 2000);

            // Call the onClose prop to close the form
          if (onClose) {
            onClose();
          }

    } catch (err: any) {
      console.error("Error updating tax rate:", err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Tax Rate</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Fixed Amount */}
          <div>
            <label htmlFor="fixed_amount" className="block text-gray-700">
              Fixed Amount
            </label>
            <input
              type="number"
              id="fixed_amount"
              name="fixed_amount"
              value={formData.fixed_amount}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Effective Date */}
          <div>
            <label htmlFor="effective_date" className="block text-gray-700">
              Effective Date
            </label>
            <input
              type="date"
              id="effective_date"
              name="effective_date"
              value={formData.effective_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="end_date" className="block text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
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
              Update Tax Rate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaxForm;
