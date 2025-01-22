import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutButton from "./logoutComponent";

const SecondSidebar: React.FC = () => {
  const [isSidebarVisible, setSidebarVisibility] = useState(
    window.innerWidth >= 1000 // Initially show for screens >= 1000px
  );
  const [isUserManagementVisible, setUserManagementVisibility] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isPropertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const [isStreetDropdownOpen, setStreetDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isCivilStatusDropdownOpen, setIsCivilStatusDropdownOpen] = useState(false);
  const [isTaxDropdownOpen, setTaxDropdownOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();


      // Utility function to capitalize the first letter
  const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
  
     // State to store user data
  const [user, setUser] = useState<{ name: string; initials: string } | null>(
      null
    );
  const [role, setRole] = useState<string | null>(null);
  
    // Fetch user from localStorage
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const initials = parsedUser.username
          ? parsedUser.username
              .split(" ")
              .map((part: string) => part.charAt(0))
              .join("")
          : "JD";
        setUser({ name: parsedUser.username || "John Doe", initials });
        setRole(capitalizeFirstLetter(parsedUser.role))
      }
    }, []);

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
              <span className="text-[#709ec9] font-bold">
                {user?.initials || "JD"}
              </span>
            </div>
            <h3 className="mt-2 font-semibold text-lg">
              {user?.name || "John Doe"}
            </h3>
            <p className="text-sm text-gray-200">{role || " "}</p>
          </div>

          {/* Links */}
          <div className="mt-6">
            <a
              href="/dashboard/home"
              className="w-full block px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
            >
              Dashboard
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
                        href="#"
                        className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                      >
                        Users
                      </a>
                    </li>
                    <li>
                      <a
                        href="/create-user"
                        className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                      >
                        Create User
                      </a>
                    </li>
                    <li>
                      <a
                        href="/role"
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

          {/* Property Management Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPropertyDropdownOpen((prev) => !prev)}
              className="w-full flex justify-between items-center px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
            >
              Property Management
              <ArrowDropDownIcon
                className={`h-5 w-5 transition-transform ${
                  isPropertyDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isPropertyDropdownOpen && (
              <ul className="ml-12 list-disc">
                <li>
                  <a
                    href="/dashboard/property-management"
                    className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                  >
                    All Properties
                  </a>
                </li>
                <li>
                  <a
                    href="/form"
                    className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                  >
                    Register Property
                  </a>
                </li>
              </ul>
            )}
          </div>
              {/* Street Management Dropdown */}
              <div className="relative">
              <button
                onClick={() => setStreetDropdownOpen((prev) => !prev)}
                className="w-full flex justify-between items-center px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
              >
                Street Management
                <ArrowDropDownIcon
                  className={`h-5 w-5 transition-transform ${
                    isStreetDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isStreetDropdownOpen && (
                <ul className="ml-12 list-disc">
                  <li>
                    <a
                      href="/dashbaord/street-management"
                      className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                    >
                      All Streets
                    </a>
                  </li>
                  <li>
                    <a
                      href="/create-street"
                      className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                    >
                      Add Street
                    </a>
                  </li>
                </ul>
              )}
            </div>

             {/* Category Management Dropdown */}
             <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen((prev) => !prev)}
                className="w-full flex justify-between items-center px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
              >
                Category Management
                <ArrowDropDownIcon
                  className={`h-5 w-5 transition-transform ${
                    isCategoryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isCategoryDropdownOpen && (
                <ul className="ml-12 list-disc">
                  <li>
                    <a
                      href="/admin/category-management"
                      className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                    >
                      All Categories
                    </a>
                  </li>
                  <li>
                    <a
                      href="create-category"
                      className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                    >
                      Create New Category
                    </a>
                  </li>
                </ul>
              )}
            </div>
          {/* Tax Identification Dropdown */}
            <div className="relative">
              <button
                onClick={() => setTaxDropdownOpen((prev) => !prev)}
                className="w-full flex justify-between items-center px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
              >
                Tax Identification
                <ArrowDropDownIcon
                  className={`h-5 w-5 transition-transform ${
                    isTaxDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isTaxDropdownOpen && (
                <ul className="ml-12 list-disc">
                  <li>
                    <a
                      href="/dashboard/tax-identification"
                      className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                    >
                      Tax Rates
                    </a>
                  </li>
                  <li>
                    <a
                      href="/dashboard/pay-tax"
                      className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
                    >
                      Pay Tax
                    </a>
                  </li>
                </ul>
              )}
            </div>
            <a
              href="https://dashboard-management.onrender.com/"
              className="w-full block px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
            >
              Revenue Management
            </a>

            <div className="relative">

        <button
          onClick={() => setIsCivilStatusDropdownOpen((prev) => !prev)}
          className="w-full flex justify-between items-center px-4 py-2 text-black rounded-md font-semibold text-left hover:bg-[#575447]"
        >
          Manage Civil Status
          <ArrowDropDownIcon
            className={`h-5 w-5 transition-transform ${
              isCivilStatusDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isCivilStatusDropdownOpen && (
          <ul className="ml-12 list-disc">
            <li>
              <a
                href="https://birth-certificate-generator-1.onrender.com/"
                className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
              >
                Create Civil Status
              </a>
            </li>
            <li>
              <a
                href="/civil-status/records"
                className="text-black font-semibold rounded-md hover:bg-[#575447] block px-2"
              >
                View Records
              </a>
            </li>
          </ul>
        )}
        </div>


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
        <LogoutButton/>
      </div>
      </div>
    </>
  );
};

export default SecondSidebar;
