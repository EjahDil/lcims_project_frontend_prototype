import React from "react";
import { CurrencyDollarIcon, HomeIcon, ChartPieIcon } from "@heroicons/react/24/solid";

const UserServiceSection: React.FC = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"> {/* Updated grid columns */}

          {/* Tax Payment Card */}
          <a
            href="/user/pay-tax"
            className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform transform hover:scale-105"
          >
            <div className="flex justify-center">
              <CurrencyDollarIcon className="h-12 w-12 mb-4 text-[#709ec9]" />
            </div>
            <h5 className="text-xl font-semibold mb-2">Tax Payment</h5>
            <p className="text-gray-600">Pay your taxes quickly and securely online.</p>
          </a>

          {/* Property Information Card */}
          <a
            href="/user/property-information"
            className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform transform hover:scale-105"
          >
            <div className="flex justify-center">
              <HomeIcon className="h-12 w-12 mb-4 text-[#709ec9]" />
            </div>
            <h5 className="text-xl font-semibold mb-2">Property Information</h5>
            <p className="text-gray-600">Access detailed records of your properties.</p>
          </a>

          {/* Tax Rates Card */}
          <a
            href="/user/tax-rates"
            className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform transform hover:scale-105"
          >
            <div className="flex justify-center">
              <ChartPieIcon className="h-12 w-12 mb-4 text-[#709ec9]" />
            </div>
            <h5 className="text-xl font-semibold mb-2">Tax Rates</h5>
            <p className="text-gray-600">View the current tax rates applicable to your properties.</p>
          </a>

        </div>
      </div>
    </div>
  );
};

export default UserServiceSection;
