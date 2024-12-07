import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Sidebar: React.FC = () => {
  const [isSidebarVisible, setSidebarVisibility] = useState(
    window.innerWidth >= 1000 // Initially show for screens >= 1000px
  );
  const [isUserManagementVisible, setUserManagementVisibility] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();

  // Show/hide User Management based on the route
  useEffect(() => {
    if (location.pathname.includes("/admin")) {
      setUserManagementVisibility(true);
    } else {
      setUserManagementVisibility(false);
    }
  }, [location.pathname]);

  // Automatically toggle sidebar visibility at 1000px breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
        setSidebarVisibility(true);
      } else {
        setSidebarVisibility(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check to set state on load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        window.innerWidth < 1000 &&
        !(target instanceof HTMLElement && target.closest(".toggle-sidebar"))
      ) {
        setSidebarVisibility(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevents triggering the outside click handler
    setSidebarVisibility((prev) => !prev);
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className="fixed top-5 left-5 z-50 sm-1000:hidden">
        <button
          onClick={toggleSidebar}
          className="toggle-sidebar p-3 bg-[#709ec9] text-white rounded-full shadow-lg focus:outline-none"
        >
          {!isSidebarVisible ? (
            <MenuIcon className="h-6 w-6" />
          ) : (
            <CloseIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full w-64 bg-[#709ec9] flex flex-col justify-between transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
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
              href="/admin/home"
              className="w-full block px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
            >
              Home
            </a>
            {isUserManagementVisible && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-full flex justify-between items-center px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
                >
                  User Management
                  <ArrowDropDownIcon
                    className={`h-5 w-5 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <ul className="ml-12 list-disc">
                    <li>
                      <a
                        href="/admin/user-management"
                        className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                      >
                        Users
                      </a>
                    </li>
                    <li>
                      <a
                        href="/user-management/create-user"
                        className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                      >
                        Create User
                      </a>
                    </li>
                    <li>
                      <a
                        href="/user-management/roles"
                        className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                      >
                        Roles
                      </a>
                    </li>
                    <li>
                      <a
                        href="/user-management/create-roles"
                        className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                      >
                        Create Roles
                      </a>
                    </li>
                  </ul>
                )}
              </div>
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
