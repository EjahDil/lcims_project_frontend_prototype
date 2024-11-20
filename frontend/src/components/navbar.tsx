import { useState } from "react";
import Dropdown from "./dropDownRevenue";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownOptions = [
    { label: "Revenue Summary", link:""},
    { label: "Dashboard", link:""},
  ];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LCIMS Logo and Title to the extreme left */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img src="assets/img/lcims_logo.jpg" alt="Custom Icon" className="w-8 h-8 mr-3" />
              <h1 className="text-2xl font-bold text-[#709ec9]">LCIMS</h1>
            </a>
          </div>

          {/* Mobile login button and hamburger */}
          <div className="flex items-center ml-auto custom-md:hidden space-x-2 sm-168:hidden">
            {!isOpen && (
              <a
                href="#"
                className="btn-primary py-2 px-4 text-white bg-[#709ec9] hover:bg-[#575447] rounded xs:hidden"
              >
                Log in
                <i className="fa fa-arrow-right ml-2"></i>
              </a>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className={`custom-md:flex ${isOpen ? 'hidden' : 'hidden'} w-full custom-md:w-auto`}>
            <div className="navbar-nav flex flex-col custom-md:flex-row items-center space-y-4 custom-md:space-y-0 custom-md:space-x-10">
              <a href="/" className="nav-item text-gray-700 hover:text-[#709ec9] font-bold">Home</a>
              <a href="/form" className="nav-item text-gray-700 hover:text-[#709ec9] font-bold">Forms</a>
              <a href="courses.html" className="nav-item text-gray-700 hover:text-[#709ec9] font-bold">Tax Identification</a>
              <a href="courses.html" className="nav-item text-gray-700 hover:text-[#709ec9] font-bold">Limbe GIS</a>
              <Dropdown label="Revenue Management" options={dropDownOptions} />
              <a href="contact.html" className="nav-item text-gray-700 hover:text-[#709ec9] font-bold">Contact</a>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-16 right-0 bg-white shadow-lg w-64 p-4 z-40 sm-168:hidden">
              <div className="flex flex-col space-y-2">
                <a href="/" className="block py-2 text-gray-700 hover:text-[#709ec9]">Home</a>
                <a href="/form" className="block py-2 text-gray-700 hover:text-[#709ec9]">Forms</a>
                <a href="courses.html" className="block py-2 text-gray-700 hover:text-[#709ec9]">Tax Identification</a>
                <a href="courses.html" className="block py-2 text-gray-700 hover:text-[#709ec9]">Limbe GIS</a>
                <Dropdown label="Revenue Management" options={dropDownOptions} />
                <a href="contact.html" className="block py-2 text-gray-700 hover:text-[#709ec9]">Contact</a>
                <a href="" className="block py-2 text-gray-700 hover:text-[#709ec9]">Log in</a>
              </div>
            </div>
          )}

          {/* Desktop Login/Sign-up Button */}
          <div className="hidden custom-md:flex custom-md:items-center">
            <a
              href="#"
              className="btn-primary py-2 px-8 text-white bg-[#709ec9] hover:bg-[#575447] rounded hidden sm:block"
            >
              Log in
              <i className="fa fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
