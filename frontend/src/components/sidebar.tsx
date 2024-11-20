import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isSidebarVisible, setSidebarVisibility] = useState(true);
  const [isUserManagementVisible, setUserManagementVisibility] = useState(true);

  const location = useLocation();

  // Show/hide User Management based on the route
  useEffect(() => {
    if (location.pathname === "/admin") {
      setUserManagementVisibility(true);
    } else {
      setUserManagementVisibility(false);
    }
  }, [location.pathname]);

  // Automatically toggle sidebar visibility at sm-732 breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setSidebarVisibility(false);
      } else {
        setSidebarVisibility(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Hamburger Button */}
      <div className="fixed top-5 left-5 z-50 sm-1000:hidden">
        <button
          onClick={() => setSidebarVisibility((prev) => !prev)}
          className="p-3 bg-[#709ec9] text-white rounded-full shadow-lg focus:outline-none"
        >
          {isSidebarVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-[#709ec9] flex flex-col justify-between transition-all duration-300 ${
          isSidebarVisible ? "block" : "hidden"
        }`}
      >
        {/* Sidebar Content */}
        <div className="space-y-4 p-4 mt-12">
          {/* User Profile */}
          <div className="text-center text-white mb-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center">
              <span className="text-[#709ec9] font-bold">JD</span>
            </div>
            <h3 className="mt-2 font-semibold text-lg">John Doe</h3>
            <p className="text-sm text-gray-200">Administrator</p>
          </div>

          {/* Links */}
          <div className="mt-6">
            <a
              href="/home"
              className="w-full block px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
            >
              Home
            </a>
            {isUserManagementVisible && (
              <a
                href="/user-management"
                className="w-full block px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
              >
                User Management
              </a>
            )}
            <a
              href="/property-management"
              className="w-full block px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
            >
              Property Management
            </a>
            <a
              href="/street-management"
              className="w-full block px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
            >
              Street Management
            </a>
            <a
              href="/category-management"
              className="w-full block px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
            >
              Category Management
            </a>
            <a
              href="/tax-identification"
              className="w-full block px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
            >
              Tax Identification
            </a>

            {/* Change Password */}
            <a
              href="/change-password"
              className="w-full block px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
            >
              Change Password
            </a>
          </div>
        </div>

        {/* Logout Link */}
        <div className="p-4">
          <a
            href="/logout"
            className="w-full block px-4 py-2 bg-red-500 text-black rounded-md font-semibold text-left hover:bg-red-600"
          >
            Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
