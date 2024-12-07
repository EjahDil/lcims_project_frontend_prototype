

import React, { useEffect, useState } from "react";

const DashboardPage: React.FC = () => {

    const [text, setText] = useState(" Welcome User to the LCIMS");

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 460) {
          setText("Welcome User");
        } else {
          setText(" Welcome User to the LCIMS");
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
    <div className="flex justify-center items-center h-screen bg-gray-50 overflow-hidden">
      {/* Slide-in animation applied to the container */}
      <div className="animate-slide-in sm-478:ml-20 sm-260:hidden ">
        {/* Color-change animation applied to the text */}
        <h1 className="text-4xl font-bold text-black animate-color-change sm-1514:text-6xl sm-732:text-xl sm-615:text-[8px]">
         {text}
        </h1>
      </div>
      <style>
        {`
          /* Slide-in animation */
          @keyframes slide-in {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          /* Color-change animation */
          @keyframes color-change {
            0% {
              color: black;
            }
            20% {
              color: black; /* Hold black for 2 seconds */
            }
            40% {
              color: #709ec9;
            }
            60% {
              color: #575447;
            }
            100% {
              color: black;
            }
          }

          .animate-slide-in {
            animation: slide-in 1s ease-in-out forwards; /* Slide-in lasts 1 second */
          }

          .animate-color-change {
            animation: color-change 4s ease-in-out 1s forwards; /* 1s delay after slide-in */
          }
        `}
      </style>
    </div>
  );
};

export default DashboardPage;
