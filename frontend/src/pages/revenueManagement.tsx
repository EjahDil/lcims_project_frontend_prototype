

import { useNavigate } from "react-router-dom";
import RevenueChart from "@/components/revenueTracking";

const RevenueManagement = () => {


  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/"); // Navigate to the home page
  };


    return (
      <div className="p-5 flex flex-col items-center">

        {/* Centered Title */}
        <div className="relative overflow-hidden whitespace-nowrap border-gray-700 text-5xl font-bold text-black-700 w-[20ch] h-[53px] animate-typing text-center sm-1002:hidden" >
          Revenue Management
          <span className="absolute top-0 right-0 border-r-4 border-gray-700 animate-blink"></span>
        </div>
  
        <div className="mt-8 w-full sm-1002:hidden">
          <RevenueChart/>
        </div>


              {/* Return to Home Button */}
      <div className="mt-14 w-full text-center sm-1002:hidden">
        <button
          onClick={handleReturnHome}
          className="px-6 py-3 bg-[#709ec9] hover:bg-[#575447] text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Return to Home Page
        </button>
      </div>


            {/* Text visibility control */}
        <div className="hidden sm-1002:flex sm-1002:items-center sm-1002:justify-center sm-1002:h-screen sm-1002:mr-10">
      <p className="text-center text-black font-bold text-[10px]">
        Revenue Management dashboard cannot be displayed on this screen size (Larger Screen Recommended)
      </p>
      </div>
      </div>
    );
  };
  
  export default RevenueManagement;
  