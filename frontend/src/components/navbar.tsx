import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./dropDownRevenue";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const navigate = useNavigate();
  

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

  const civilStatusOptions = [
    { label: "Create Civil Status", link: "https://birth-certificate-generator-1.onrender.com/" },
    { label: "Certificate Archive", onClick: handleCertificateArchiveClick}, 
  ];

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


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click is outside the menu and toggle button
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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



                        <div className="flex items-center ml-auto nav-md:hidden space-x-2 sm-168:hidden">
                {/* Buttons */}
                {!isLoggedIn && !isOpen && (
                  <div className="flex space-x-2 sm-478:hidden">
                    <a
                      href="/register-user"
                      className="py-2 px-4 text-white bg-[#709ec9] hover:bg-[#575447] rounded"
                    >
                      Register
                      <i className="fa fa-user-plus ml-2"></i>
                    </a>
                    <a
                      href="/login"
                      className="btn-primary py-2 px-4 text-white bg-[#709ec9] hover:bg-[#575447] rounded"
                    >
                      Log in
                      <i className="fa fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                )}
                {isLoggedIn && !isOpen && (
                  <div className="xs:hidden">
                    <button
                      onClick={handleLogout}
                      className="btn-primary py-2 px-4 text-white bg-[#709ec9] hover:bg-[#575447] rounded"
                    >
                      Logout
                      <i className="fa fa-sign-out ml-2"></i>
                    </button>
                  </div>
                )}
              </div>

                       {/* Hamburger Menu */}
         <div className="ml-2 nav-md:hidden">
                <button
                  type="button"
                  ref={toggleButtonRef}
                  className="text-gray-700 hover:text-blue-600"
                  onClick={toggleNavbar}
                  aria-expanded={isOpen}
                >
                  {isOpen ? (
                    <svg
                      className="w-8s h-8 text-gray-700"
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


                  {/* Navigation Menu */}
                  <div
            ref={menuRef}
            className={`${
              isOpen
                ? "absolute top-12 left-0 w-full bg-white shadow-lg p-4 block"
                : "hidden"
            } nav-md:flex nav-md:relative nav-md:top-0 nav-md:left-0 nav-md:w-auto nav-md:p-0`}
          >
            <div className="flex flex-col nav-md:flex-row nav-md:items-center nav-md:space-y-0 nav-md:space-x-10 space-y-4">
              <a
                href="/"
                className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold"
              >
                Home
              </a>
              <a
                className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold cursor-pointer"
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
                className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold cursor-pointer"
              >
                Tax Identification
              </a>
                  {/* Using Dropdown for Civil Status */}
               <Dropdown label="Civil Status" options={civilStatusOptions} />
              <a
                onClick={handleRevenueManagementClick}
                className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold cursor-pointer"
              >
                Revenue Management
              </a>
              <a
                href="contact.html"
                className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold"
              >
                Contact
              </a>
              {!isLoggedIn ? (
                <>
                  <a
                    href="/register-user"
                    className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold nav-md:hidden"
                  >
                    Register As Property Owner
                  </a>
                  <a
                    href="/login"
                    className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold nav-md:hidden"
                  >
                    Log in
                  </a>
                </>
              ) : (
                <a
                  onClick={handleLogout}
                  className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold hover:cursor-pointer lg-1360:hidden"
                >
                  Logout
                </a>
              )}
            </div>
          </div>

          {/* Desktop Login/Logout Button */}
          <div className="hidden custom-md:flex custom-md:items-center nav-ms:hidden">
          {!isLoggedIn ? (
            <>
              <a
                href="/register-user"
                className="py-2 px-8 mr-4 text-white bg-[#709ec9] hover:bg-[#575447] rounded sm:block"
              >
                Register As PO
                <i className="fa fa-user-plus ml-2"></i>
              </a>
              <a
                href="/login"
                className="py-2 px-8 text-white bg-[#709ec9] hover:bg-[#575447] rounded sm:block"
              >
                Log in
                <i className="fa fa-arrow-right ml-2"></i>
              </a>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="py-2 px-8 text-white bg-[#709ec9] hover:bg-[#575447] rounded sm:block"
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
