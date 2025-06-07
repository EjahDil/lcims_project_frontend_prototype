import { useState, useEffect, useRef } from "react";

const UserNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  //const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");

    if (isConfirmed) {
        localStorage.removeItem("token"); // Remove the token from localStorage
        setIsLoggedIn(false);
        window.location.reload();
    }
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
            <a href="/user/home" className="flex items-center">
              <img
                src="/assets/img/lcims_logo.jpg"
                alt="Custom Icon"
                className="w-8 h-8 mr-3"
              />
              <h1 className="text-2xl font-bold text-[#709ec9]">LCIMS</h1>
            </a>
          </div>

          <div className="flex items-center ml-auto lg-1399:hidden space-x-2 sm-168:hidden">
            {isLoggedIn && !isOpen && (
              <button
                onClick={handleLogout}
                className="py-2 px-4 text-white bg-[#709ec9] hover:bg-[#575447] rounded xs:hidden"
              >
                Logout
                <i className="fa fa-sign-out ml-2"></i>
              </button>
            )}
            <button
              type="button"
              ref={toggleButtonRef}
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

          {/* Navigation Menu */}
          <div
            ref={menuRef}
            className={`${
              isOpen
                ? "absolute top-12 left-0 w-full bg-white shadow-lg p-4 block"
                : "hidden"
            } nav-md:flex nav-md:relative nav-md:top-0 nav-md:left-0 nav-md:w-full nav-md:p-0`}
          >
            <div className="flex flex-col nav-md:flex-row nav-md:justify-center nav-md:items-center nav-md:w-full nav-md:space-y-0 nav-md:space-x-10 space-y-4">
              <a
                href="/user/home"
                className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold"
              >
                Home
              </a>
              <a
                href="/user/pay-tax"
                className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold"
              >
                Tax Payment
              </a>
              <a
                href="/user/property-information"
                className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold"
              >
                Property Information
              </a>
              <a
                href="/user/tax-rates"
                className="nav-item block text-gray-700 hover:text-[#709ec9] font-bold"
              >
                Tax Rates

              </a>

               <div className="nav-md:absolute nav-md:right-4">
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center text-white bg-[#709ec9] hover:bg-[#575447] font-bold py-2 px-6 rounded ml-auto nav-md:ml-0"
                >
                  Logout

                  <i className="fa fa-sign-out ml-2"></i>
                </button>
                
              )}
                </div>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
