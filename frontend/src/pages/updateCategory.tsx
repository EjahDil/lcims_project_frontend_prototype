import React, { useState } from "react";
import { updateCategory } from "../services/useService_1";
import { useNavigate } from "react-router-dom";

// Props for EditCategoryForm
interface EditCategoryFormProps {
  initialData: {
    category_id: string;
    category_name: string;
    description?: string;
  };
  onClose: () => void;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({
  initialData,
  onClose,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await updateCategory(parseInt(formData.category_id), {
        category_name: formData.category_name,
        description: formData.description,
      });

      setSuccess("Category updated successfully.");
      setTimeout(() => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const { role } = user;

            if (role === "admin") {
              navigate("/admin/category-management", { replace: true });
            } else {
              navigate("/dashboard/category-management", { replace: true });
            }

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
      console.error("Error updating category:", err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Category</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Category Name */}
          <div>
            <label htmlFor="category_name" className="block text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              id="category_name"
              name="category_name"
              value={formData.category_name}
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
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 py-2 px-4 bg-[#709ec9] hover:bg-[#575447] text-white rounded-md font-semibold"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryForm;
