import { useNavigate } from "react-router-dom";
import TaxRatesTable from "../tables/taxRatesTable";

const TaxIdentification = () => {



  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/"); // Navigate to the home page
  };

    return (
      <div className="p-5 flex flex-col items-center">

          <div
            className="fixed inset-0 -z-10 ml-12 flex justify-center sm-1245:hidden"
            style={{
              backgroundImage: "url('/assets/img/lcims_new.png')",
              backgroundSize: "200px 200px",
              backgroundPosition: "900px",
              backgroundRepeat: "no-repeat",
              filter: "blur(2px)",
              opacity: 0.8,
            }}
          ></div>

        {/* Centered Title */}
        <div className="relative overflow-hidden whitespace-nowrap border-gray-700 text-5xl font-bold text-black-700 w-[20ch] h-[53px] animate-typing text-center sm-1245:hidden">
          Tax Identification
          <span className="absolute top-0 right-0 border-r-4 border-gray-700 animate-blink"></span>
        </div>
  
        <div className="mt-16 w-full sm-1245:hidden">
          <TaxRatesTable/>
        </div>


                 {/* Return to Home Button */}
      <div className="bottom-2 w-full text-center sm-1245:hidden">
        <button
          onClick={handleReturnHome}
          className="px-6 py-3 bg-[#709ec9] hover:bg-[#575447] text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Return to Home Page
        </button>
      </div>

           {/* Text visibility control */}
           <div className="hidden sm-1245:flex sm-1245:items-center sm-1245:justify-center sm-1245:h-screen sm-1245:mr-10">
      <p className="text-center text-black font-bold text-[10px]">
        Tax Rate Table cannot be displayed on this screen size (Larger Screen Recommended)
      </p>
      </div>
      </div>
    );
  };
  
  export default TaxIdentification;
  