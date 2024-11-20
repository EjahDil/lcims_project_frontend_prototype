import React from 'react';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

const PropertyForm: React.FC = () => {
  return (
    <section id="property-form" className="flex justify-center items-center py-8 mb-8">
      <div className="bg-[#709ec9] p-8 rounded-lg shadow-lg w-full max-w-6xl">
        <form id="propertyForm" className="space-y-8">
          <h1 className="text-3xl font-bold flex items-center mb-6 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="translate-y-1 mr-2">
              <path d="M3 9.5L12 3l9 6.5V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            Property Information
          </h1>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Name of Residence Owner</label>
            <input type="text" placeholder="Your name" required className="input w-full p-4 rounded-lg" />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Phone Number of Residence Owner</label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="tel"
                placeholder="Your Number"
                required
                className="input w-full p-4 pl-10 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Residence Type</label>
            <input type="text" placeholder="Type of Residence" required className="input w-full p-4 rounded-lg" />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Residence's Street</label>
            <input type="text" placeholder="Street where the Residence is found" required className="input w-full p-4 rounded-lg" />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Residence's Quarter</label>
            <input type="text" placeholder="Quarter where the residence is found" required className="input w-full p-4 rounded-lg" />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Residence's GPS Coordinates</label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="GPS Coordinates"
                required
                className="input w-full p-4 pl-10 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Category</label>
            <input type="text" placeholder="Property Category" required className="input w-full p-4 rounded-lg" />
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
