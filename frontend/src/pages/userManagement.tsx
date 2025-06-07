import React, { useState, useEffect } from "react";
import UserTable from "../tables/usersList";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [text, setText] = useState("User Management");


  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/"); // Navigate to the home page
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      //console.log("Screen width:", screenWidth);

      // Update text based on screen size
      if (screenWidth <= 537) {
        setText("Users");
      } else {
        setText("User Management");
      }
    };

    // Attach resize listener
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the correct text
    handleResize();

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      <div className="flex justify-center items-center h-20 mt-10 mr-20 pr-10 sm-1000:ml-20 sm-684:ml-40 sm-684:justify-start sm-398:ml-8 overflow-x-hidden">
        <h1 className="text-5xl font-bold text-black sm-732:text-xl sm-478:text-[10px] sm-537:hidden">
          {text}
        </h1>
      </div>
      <div className="md:block xl:block sm-537:hidden">
        <UserTable />

           {/* Return to Home Button */}
      <div className="bottom-3 w-full text-center overflow-x-hidden">
    <button
      onClick={handleReturnHome}
      className="px-6 py-3 bg-[#709ec9] hover:bg-[#575447] text-white font-semibold rounded-lg shadow-md transition duration-300 sm-732:hidden"
    >
      Return to Home Page
    </button>
      </div>
      </div>

        {/* Text visibility control */}
        <div className="hidden sm-537:flex sm-537:items-center sm-537:justify-center sm-537:h-screen sm-537:mr-10 sm-398:hidden">
        <p className="text-center text-black font-bold text-[10px]">
          Users cannot be displayed on this screen size (Larger Screen Recommended)
        </p>
        </div>

        {/* Text visibility control */}
        <div className="hidden sm-398:flex sm-398:items-center sm-398:justify-start sm-398:h-screen sm-398:mr-10">
        <p className="text-center text-black font-bold text-[10px]">
          Unsupported Device
        </p>
        </div>



    </React.Fragment>
  );
};

export default UserManagement;
