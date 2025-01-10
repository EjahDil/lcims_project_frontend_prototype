import { useState, useEffect } from "react";
import Dropdown from "./dropDownRevenue";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const dropDownOptions = [
    { label: "Revenue Summary", link: "" },
    { label: " Revenue Dashboard", link: "" },
  ];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleTaxNavigation = () => {
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


  const handleDashboardClick = () => {
    setTimeout(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          const { role } = user;
    
          if (role === "admin") {
            navigate("/admin/home", { replace: true });
          } else {
            navigate("/dashboard/home", { replace: true });
          }
          
        } catch (err) {
          console.error("Error parsing user data from localStorage:", err);
        }
      } else {
    
        navigate("/login");
      }
    }, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    setIsLoggedIn(false); 
    window.location.reload();
    // Update the state to reflect logged-out status
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set logged-in state based on token presence
  }, []);

  return (
    <nav className="bg-white shadow sticky top-0 z-50 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LCIMS Logo and Title to the extreme left */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="assets/img/lcims_logo.jpg"
                alt="Custom Icon"
                className="w-8 h-8 mr-3"
              />
              <h1 className="text-2xl font-bold text-[#709ec9]">LCIMS</h1>
            </a>
          </div>

          {/* Mobile login/logout button and hamburger */}
          <div className="flex items-center ml-auto custom-md:hidden space-x-2 sm-168:hidden">
            {!isLoggedIn && !isOpen && (
              <a
                href="/login"
                className="btn-primary py-2 px-4 text-white bg-[#709ec9] hover:bg-[#575447] rounded xs:hidden"
              >
                Log in
                <i className="fa fa-arrow-right ml-2"></i>
              </a>
            )}
            {isLoggedIn && !isOpen && (
              <button
                onClick={handleLogout}
                className="btn-primary py-2 px-4 text-white bg-[#709ec9] hover:bg-[#575447] rounded xs:hidden"
              >
                Logout
                <i className="fa fa-sign-out ml-2"></i>
              </button>
            )}
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600"
              onClick={toggleNavbar}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg
                  className="w-8 h-8 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

              {/* Desktop Navigation Links */}
          <div
          className={`${
          isOpen ? "absolute top-12 left-0 w-full bg-white shadow-lg p-4 block" : "hidden"
          } custom-md:flex custom-md:relative custom-md:top-0 custom-md:left-0 custom-md:w-auto custom-md:p-0 custom-md:bg-transparent`}
          >
          <div className="flex flex-col custom-md:flex-row custom-md:items-center custom-md:space-y-0 custom-md:space-x-10 space-y-4">
          <a
          href="/"
          className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold"
          >
          Home
          </a>
          <a
          className="nav-item block text-gray-700 hover:text-[#709ec9] hover:cursor-pointer font-bold"
          onClick={handleDashboardClick}
          >
          Dashboard
          </a>
          <a
          href="/form"
          className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold"
          >
          Form
          </a>
          <a
          onClick={handleTaxNavigation}
          className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold hover:cursor-pointer"
          >
          Tax Identification
          </a>
          <a
          href="courses.html"
          className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold"
          >
          Civil Status
          </a>
          <Dropdown label="Revenue Management" options={dropDownOptions} />
          <a
          href="contact.html"
          className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold"
          >
          Contact
          </a>
          </div>

          </div>

          {/* Desktop Login/Logout Button */}
          <div className="hidden custom-md:flex custom-md:items-center">
            {!isLoggedIn ? (
              <a
                href="/login"
                className="btn-primary py-2 px-8 text-white bg-[#709ec9] hover:bg-[#575447] rounded hidden sm:block"
              >
                Log in
                <i className="fa fa-arrow-right ml-2"></i>
              </a>
            ) : (
              <button
                onClick={handleLogout}
                className="btn-primary py-2 px-8 text-white bg-[#709ec9] hover:bg-[#575447] rounded hidden sm:block"
              >
                Logout
                <i className="fa fa-sign-out ml-2"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
