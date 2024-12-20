import React, { useState } from 'react';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { createProperty } from '../services/useService'; // Adjust the import path as needed

const PropertyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    street_name: '',
    zone_code: '',
    category_name: '',
    house_number: '',
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
    total_area: undefined as number | undefined,
    owner_details: {
      full_name: '',
      contact_number: '',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        latitude: undefined,
        longitude: undefined,
        total_area: undefined,
        owner_details: {
          full_name: '',
          contact_number: '',
        },
      });
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="translate-y-1 mr-2"
            >
              <path d="M3 9.5L12 3l9 6.5V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            Property Information
          </h1>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Name of Residence Owner</label>
            <input
              type="text"
              name="owner_full_name"
              value={formData.owner_details.full_name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
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
                required
                className="input w-full p-4 pl-10 rounded-lg"
              />
            </div>
          </div>

          {/* Additional Inputs */}
          <div className="space-y-2">
            <label className="block text-lg font-semibold">Street Name</label>
            <input
              type="text"
              name="street_name"
              value={formData.street_name}
              onChange={handleInputChange}
              placeholder="Street where the Residence is found"
              required
              className="input w-full p-4 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Category</label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleInputChange}
              placeholder="Property Category"
              required
              className="input w-full p-4 rounded-lg"
            />
          </div>

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

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Latitude</label>
            <input
              type="number"
              name="latitude"
              value={formData.latitude || ''}
              onChange={handleInputChange}
              placeholder="Latitude of the property"
              required
              className="input w-full p-4 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Longitude</label>
            <input
              type="number"
              name="longitude"
              value={formData.longitude || ''}
              onChange={handleInputChange}
              placeholder="Longitude of the property"
              required
              className="input w-full p-4 rounded-lg"
            />
          </div>

          <div className="text-right">
            <button type="submit" className="text-black-700 bg-[#575447] hover:bg-white px-6 py-3 rounded-lg text-lg">
              Submit
            </button>
          </div>
        </form>

        {/* Footer Section */}
        <footer className="flex items-center justify-center py-6 mt-8">
          <img src="assets/img/lcims_new.png" alt="Limbe City Council Logo" className="w-5 h-5 mr-2" />
          <p className="text-sm">Limbe City Council</p>
        </footer>
      </div>
    </section>
  );
};

export default PropertyForm;
