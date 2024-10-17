import { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="index.html" className="flex items-center">
            <img src="/img/lcims_logo.jpg" alt="Custom Icon" className="w-8 h-8 mr-3" />
            <h1 className="text-2xl font-bold text-[#709ec9]">LCIMS</h1>
          </a>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="navbar-toggler-icon"
              onClick={toggleNavbar}
              aria-expanded={isOpen}
            >
              <span className="material-icons">menu</span>
            </button>
          </div>
          <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} w-full lg:w-auto`}>
            <div className="navbar-nav flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <a href="index.html" className="nav-item text-gray-700 hover:text-blue-600">Home</a>
              <a href="form.html" className="nav-item text-gray-700 hover:text-blue-600">Forms</a>
              <a href="courses.html" className="nav-item text-gray-700 hover:text-blue-600">Tax Identification</a>
              <a href="courses.html" className="nav-item text-gray-700 hover:text-blue-600">Limbe GIS</a>
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-600 flex items-center">
                  Revenue Management
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="dropdown-menu absolute hidden bg-white shadow-lg mt-2 group-hover:block">
                  <a href="revenuesummary.html" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Revenue Summary</a>
                  <a href="team.html" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</a>
                  <a href="404.html" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">404 Page</a>
                </div>
              </div>
              <a href="contact.html" className="nav-item text-gray-700 hover:text-blue-600">Contact</a>
            </div>
            <a href="#" className="btn-primary py-2 px-4 mt-4 lg:mt-0 lg:ml-6 text-white bg-blue-500 hover:bg-blue-600 rounded">
              Log in or Sign up
              <i className="fa fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
