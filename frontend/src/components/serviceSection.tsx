import React from "react";
import { DocumentTextIcon, CurrencyDollarIcon, HomeIcon, ChartBarIcon } from "@heroicons/react/24/solid"; 

const ServiceSection: React.FC = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center"> {/* Increased gap */}

          {/* Forms Card */}
          <a href="/propertyform" className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform transform hover:scale-105">
            <div className="flex justify-center">
              <DocumentTextIcon className="h-12 w-12 mb-4 text-[#709ec9]" />
            </div>
            <h5 className="text-xl font-semibold mb-2">Forms</h5>
            <p className="text-gray-600">Register your House and Infrastructure</p>
          </a>

          {/* Tax Identification Card */}
          <a href="/tax-identification" className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform transform hover:scale-105"> 
            <div className="flex justify-center">
              <CurrencyDollarIcon className="h-12 w-12 mb-4 text-[#709ec9]" />
            </div>
            <h5 className="text-xl font-semibold mb-2">Tax Identification</h5>
            <p className="text-gray-600">Know the amount of tax you have to pay</p>
          </a>

          {/* Limbe GIS Card */}
          <a href="/limbe-gis" className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform transform hover:scale-105"> 
            <div className="flex justify-center">
              <HomeIcon className="h-12 w-12 mb-4 text-[#709ec9]" />
            </div>
            <h5 className="text-xl font-semibold mb-2">Limbe GIS</h5>
            <p className="text-gray-600">Know where exactly you are going to Limbe</p>
          </a>

          {/* Revenue Management Card */}
          <a href="/revenue-management" className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform transform hover:scale-105"> 
            <div className="flex justify-center">
              <ChartBarIcon className="h-12 w-12 mb-4 text-[#709ec9]" />
            </div>
            <h5 className="text-xl font-semibold mb-2">Revenue Management</h5>
            <p className="text-gray-600">Control the revenue intake into the Limbe City Council</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
