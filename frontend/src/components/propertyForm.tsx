import React, { useState, useEffect } from 'react';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { createProperty, fetchCategories } from '../services/useService'; // Adjust the import path as needed
import { fetchStreets } from '../services/useService'; // Import your fetchStreets function
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

interface Street {
  street_id: number;
  street_name: string;
}

interface Category {
  category_id: string;
  category_name: string;
}

const PropertyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    street_name: '',
    zone_code: '',
    category_name: '',
    house_number: '',
    total_area: undefined as number | undefined,
    owner_details: {
      full_name: '',
      contact_number: '',
      email:'',
      identification_type: '',
      identification_number: '',

    },
  });

  const [streets, setStreets] = useState<Street[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    const loadStreets = async () => {
      try {
        setLoading(true);
        const data = await fetchStreets({ page: 1, limit: 50 }); // Fetch streets data
        setStreets(data.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch streets. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadStreets();
  }, []);


  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    loadCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('owner_')) {
      setFormData((prevState) => ({
        ...prevState,
        owner_details: {
          ...prevState.owner_details,
          [name.replace('owner_', '')]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createProperty(formData);
      alert(`Property created successfully! ${response.message}`);
      // Optionally reset the form
      setFormData({
        street_name: '',
        zone_code: '',
        category_name: '',
        house_number: '',
        total_area: undefined,
        owner_details: {
          full_name: '',
          contact_number: '',
          email: '',
          identification_type: '',
          identification_number: '',
        },
      });

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
    }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error creating property: ${error.message}`);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  return (
    <section id="property-form" className="flex justify-center items-center py-8 mb-8">
      <div className="bg-[#709ec9] p-8 rounded-lg shadow-lg w-full max-w-6xl">
        <form id="propertyForm" className="space-y-8" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold flex items-center mb-6 justify-center">
          <FaHome className="translate-y-1 mr-2 mb-2" size={30} />
            Property Registration
          </h1>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Name of Residence Owner</label>
            <input
              type="text"
              name="owner_full_name"
              value={formData.owner_details.full_name}
              onChange={handleInputChange}
              placeholder="Your name"
              className="input w-full p-4 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Phone Number of Residence Owner</label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="tel"
                name="owner_contact_number"
                value={formData.owner_details.contact_number}
                onChange={handleInputChange}
                placeholder="Your Number"
                className="input w-full p-4 pl-10 rounded-lg"
              />
            </div>
          </div>

                {/* Email Address Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-lg font-semibold">
                Email Address of the Owner
              </label>
              <input
                type="email"
                name="owner_email"
                value={formData.owner_details.email}
                placeholder="Email Address"
                onChange={handleInputChange}
                className="input w-full p-4 rounded-lg"
              />
            </div>

          {/* Street Name Selection */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold">Street Name</label>
            <select
              name="street_name"
              value={formData.street_name}
              onChange={handleInputChange}
              required
              className="input w-full p-4 rounded-lg"
            >
              <option value="" disabled>
                {loading ? 'Loading streets...' : 'Select a street'}
              </option>
              {streets.map((street) => (
                <option key={street.street_id} value={street.street_name}>
                  {street.street_name}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500">{error}</p>}
          </div>

                    {/* Category Name Field */}
            <div>
              <label htmlFor="category" className="block text-lg font-semibold">
                Category Name
              </label>
              <select
                name="category_name"
                value={formData.category_name}
                onChange={handleInputChange}
                required
                className="input w-full p-4 rounded-lg"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_name}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>

          {/* Other Inputs */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold">House Number</label>
            <input
              type="text"
              name="house_number"
              value={formData.house_number}
              onChange={handleInputChange}
              placeholder="House Number"
              required
              className="input w-full p-4 rounded-lg"
            />
          </div>
          {/* Identification type */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold">Owner's Identification Type</label>
            <select
              name="owner_identification_type"
              value={formData.owner_details.identification_type}
              onChange={handleInputChange}
              required
              className="input w-full p-4 rounded-lg"
            >
              <option value="" disabled>
                Select Identification Type
              </option>
              <option value="National ID">National ID</option>
              <option value="Passport">Passport</option>
            </select>
          </div>

            {/* Other Inputs */}
            <div className="space-y-2">
            <label className="block text-lg font-semibold">Owner's Identification Number</label>
            <input
              type="text"
              name="owner_identification_number"
              value={formData.owner_details.identification_number}
              onChange={handleInputChange}
              placeholder="Identification Number"
              required
              className="input w-full p-4 rounded-lg"
            />
          </div>


           {/* Zone Code Field */}
            <div className="space-y-2">
              <label htmlFor="zoneCode" className="block text-lg font-semibold">
                Zone Code
              </label>
              <input
                type="text"
                name="zone_code"
                value={formData.zone_code}
                placeholder="Zone Code"
                onChange={handleInputChange}
                className="input w-full p-4 rounded-lg"
              />
            </div>

            {/* Total Area Field */}
            <div className="space-y-2">
              <label htmlFor="totalArea" className="block text-lg font-semibold">
                Total Area
              </label>
              <input
                type="number"
                name ="total_area"
                value={formData.total_area}
                placeholder="Total Area"
                onChange={handleInputChange}
                className="input w-full p-4 rounded-lg"
              />
            </div>

          {/* Submit Button */}
          <div className="text-right">
            <button type="submit" className="text-black-700 bg-[#575447] hover:bg-white px-6 py-3 rounded-lg text-lg">
              Submit
            </button>
          </div>
        </form>

        <footer className="flex items-center justify-center py-6 mt-8">
          <img src="assets/img/lcims_new.png" alt="Limbe City Council Logo" className="w-5 h-5 mr-2" />
          <p className="text-sm">Limbe City Council</p>
        </footer>
      </div>
    </section>
  );
};

export default PropertyForm;
