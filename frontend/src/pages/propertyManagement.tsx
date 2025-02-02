import { useNavigate } from "react-router-dom";
import PropertiesTable from "../tables/propertiesTable";
import { useEffect, useState } from "react";

const PropertyManagement = () => {

  const [text, setText] = useState("User Management");

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      //console.log("Screen width:", screenWidth);

      // Update text based on screen size
      if (screenWidth <= 537) {
        setText("Properties");
      } else {
        setText("Property Management");
      }
    };

    // Attach resize listener
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the correct text
    handleResize();

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleReturnHome = () => {
    navigate("/"); // Navigate to the home page
  };


  return (
    <div className="p-5 flex flex-col items-center">

       <div
            className="fixed inset-0 -z-10 ml-12 flex justify-center sm-1664:hidden"
            style={{
              backgroundImage: "url('/assets/img/lcims_new.png')",
              backgroundSize: "200px 200px",
              backgroundPosition: "920px",
              backgroundRepeat: "no-repeat",
              filter: "blur(2px)",
              opacity: 0.8,
            }}
          ></div>
      {/* Centered Title */}
      <div className="relative overflow-hidden whitespace-nowrap border-gray-700 text-5xl font-bold text-black-700 w-[20ch] h-[53px] animate-typing text-center sm-478:hidden">
        {text}
        <span className="absolute top-0 right-0 border-r-4 border-gray-700 animate-blink"></span>
      </div>

      <div className="w-full mt-8 sm-1664:hidden">
        <PropertiesTable />
      </div>

      {/* Return to Home Button */}
      <div className="w-full text-center">
        <button
          onClick={handleReturnHome}
          className="px-6 py-3 bg-[#709ec9] hover:bg-[#575447] text-white font-semibold rounded-lg shadow-md sm-1664:hidden transition duration-300"
        >
          Return to Home Page
        </button>
      </div>

            {/* Text visibility control */}
      <div className="hidden sm-1664:flex sm-1664:items-center sm-1664:justify-center sm-1664:h-screen sm-1664:mr-10 sm-398:hidden">
      <p className="text-center text-black font-bold text-[10px]">
        Property Table cannot be displayed on this screen size (Larger Screen Recommended)
      </p>
      </div>

        {/* Text visibility control */}
        {/* <div className="hidden sm-398:flex sm-398:items-center sm-398:justify-start sm-398:h-screen sm-398:mr-10">
        <p className="text-center text-black font-bold text-[10px]">
          Unsupported Device
        </p>
        </div> */}
    </div>
  );
};

export default PropertyManagement;
