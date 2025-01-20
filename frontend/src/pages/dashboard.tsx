
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const [text, setText] = useState(" Welcome User to the LCIMS");
  const [username, setUsername] = useState<string | null>(null);


  const navigate = useNavigate();

    // Utility function to capitalize the first letter
    const capitalizeFirstLetter = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

  useEffect(() => {
    // Retrieve and log user object from localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString); // Parse user object
        setUsername(capitalizeFirstLetter(user.username)); // Extract and set the username
      } catch (error) {
        console.error("Error parsing user object:", error);
      }
    }

    const handleResize = () => {
      if (window.innerWidth <= 460) {
        setText(` Welcome ${username || "User"}`);
      } else {
        setText(` Welcome ${username || "User"} to the LCIMS`);
      }
    };

    // Attach resize listener
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the correct text
    handleResize();

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [username]);

  const handleReturnHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 overflow-hidden">

          {/* Image at the top */}
        <div className="fixed top-0 flex justify-center mt-4">
        <img
          src="/assets/img/lcims_new.png"
          alt="LCIMS Logo"
          className="w-40 sm:w-60 lg:w-60 object-contain"
        />
      </div>
      
      <div className="sm-478:ml-20 sm-260:hidden">
        {/* Typing animation applied to the text */}
        <h1 className="relative overflow-hidden whitespace-nowrap border-gray-700 text-4xl font-bold text-black animate-typing sm-1514:text-6xl sm-732:text-xl sm-615:text-[8px]">
          {text}
          <span className="absolute top-0 right-0 border-r-4 border-gray-700 animate-blink"></span>
        </h1>
      </div>

      <div className="fixed bottom-4 text-center">
        <button
          onClick={handleReturnHome}
          className="px-6 py-3 bg-[#709ec9] hover:bg-[#575447] text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Return to Home Page
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
