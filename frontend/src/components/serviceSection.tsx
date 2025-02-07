import React from "react";
import { DocumentTextIcon, CurrencyDollarIcon, ChartBarIcon } from "@heroicons/react/24/solid"; 
import { FaIdCard  } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const ServiceSection: React.FC = () => {

  const navigate = useNavigate();

  const handleNavigation = () => {
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
          
        } catch (err) {
          console.error("Error parsing user data from localStorage:", err);
        }
      } else {
    
        navigate("/login");
      }
    }, 0);
  };

  const handleRevenueManagementClick = () => {
    setTimeout(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          const { role } = user;
    
          if (role === "admin") {
            navigate("/admin/revenue-management", { replace: true });
          } else {
            navigate("/dashboard/revenue-management", { replace: true });
          }
          
        } catch (err) {
          console.error("Error parsing user data from localStorage:", err);
        }
      } else {
    
        navigate("/login");
      }
    }, 0);
  };


  const handleCertificateArchiveClick = () => {
    setTimeout(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          const { role } = user;
    
          if (role === "admin") {
            navigate("/admin/certificate-archive", { replace: true });
          } else {
            navigate("/dashboard/certificate-archive", { replace: true });
          }
          
        } catch (err) {
          console.error("Error parsing user data from localStorage:", err);
        }
      } else {
    
        navigate("/login");
      }
    }, 0);
  };


  return (
    <div className="container-xxl py-5">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center"> {/* Increased gap */}

          {/* Forms Card */}
          <a href="/form" className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform transform hover:scale-105">
            <div className="flex justify-center">
              <DocumentTextIcon className="h-12 w-12 mb-4 text-[#709ec9]" />
            </div>
            <h5 className="text-xl font-semibold mb-2">Form</h5>
            <p className="text-gray-600">Register your House and Infrastructure</p>
          </a>

          {/* Tax Identification Card */}
          <a
          onClick={handleNavigation}
          className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform transform hover:scale-105 hover:cursor-pointer"
           > 
            <div className="flex justify-center">
              <CurrencyDollarIcon className="h-12 w-12 mb-4 text-[#709ec9]" />
            </div>
            <h5 className="text-xl font-semibold mb-2">Tax Identification</h5>
            <p className="text-gray-600">Know the amount of tax you have to pay</p>
          </a>

          {/* CivilStatus Card */}
          <a onClick={handleCertificateArchiveClick} className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform transform hover:scale-105 cursor-pointer"> 
            <div className="flex justify-center">
            <FaIdCard className="h-12 w-12 mb-4 text-[#709ec9]" />
            </div>
            <h5 className="text-xl font-semibold mb-2">Civil Status</h5>
            <p className="text-gray-600">Civil Status Information</p>
          </a>

          {/* Revenue Management Card */}
          <a onClick={handleRevenueManagementClick} target="_blank" className="bg-white rounded-lg shadow-lg p-8 text-center transition-transform transform hover:scale-105 cursor-pointer"> 
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
