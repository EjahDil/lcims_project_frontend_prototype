import React from 'react';

const InfrastructureForm: React.FC = () => {
  return (
    <section id="infrastructure-form" className="flex justify-center items-center py-8 mb-8">
      <div className="bg-[#709ec9] p-8 rounded-lg shadow-lg w-full max-w-7xl">
        <form id="infrastructureForm" className="space-y-8 max-w-7xl">
          <h1 className="text-3xl font-bold flex items-center mb-6 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="translate-y-1 mr-2">
              <path d="M3 9.5L12 3l9 6.5V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            Infrastructure and Services Information
          </h1>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Service or Infrastructure Type</label>
            <input type="text" placeholder="Type of Service or Infrastructure" required className="input w-full p-4 rounded-lg" />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Service or Infrastructure Subdivision</label>
            <input type="text" placeholder="Subdivision" required className="input w-full p-4 rounded-lg" />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Service or Infrastructure Street</label>
            <input type="text" placeholder="Name of the Street" className="input w-full p-4 rounded-lg" />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Service or Infrastructure Quarter</label>
            <input type="text" placeholder="Name of the Quarter" required className="input w-full p-4 rounded-lg" />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold">Service or Infrastructure GPS Coordinates</label>
            <input type="text" placeholder="GPS Coordinates" required className="input w-full p-4 rounded-lg" />
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

export default InfrastructureForm;
