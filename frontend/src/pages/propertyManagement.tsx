import { useNavigate } from "react-router-dom";
import PropertiesTable from "../tables/propertiesTable";

const PropertyManagement = () => {

  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/"); // Navigate to the home page
  };


  return (
    <div className="p-5 flex flex-col items-center">

       <div
            className="fixed inset-0 -z-10 ml-12 flex justify-center"
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
      <div className="relative overflow-hidden whitespace-nowrap border-gray-700 text-5xl font-bold text-black-700 w-[20ch] h-[53px] animate-typing text-center">
        Property Management
        <span className="absolute top-0 right-0 border-r-4 border-gray-700 animate-blink"></span>
      </div>

      <div className="mt-16 w-full">
        <PropertiesTable />
      </div>


      {/* Return to Home Button */}
      <div className="w-full text-center">
        <button
          onClick={handleReturnHome}
          className="px-6 py-3 text-black bg-[#FF4C4C] hover:bg-[#1C1C1C] hover:text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Return to Home Page
        </button>
      </div>
    </div>
  );
};

export default PropertyManagement;
