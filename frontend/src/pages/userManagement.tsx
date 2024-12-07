import React, { useState, useEffect } from "react";
import UserTable from "./usersList";

const UserManagement = () => {
  const [text, setText] = useState("User Management");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      console.log("Screen width:", screenWidth);

      // Update text based on screen size
      if (screenWidth <= 394) {
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
      <div className="flex justify-center items-center h-20 mt-10 mr-20 pr-10 sm-1000:ml-20 overflow-x-hidden">
        <h1 className="text-4xl font-bold text-black animate-slide-in sm-732:text-xl sm-478:text-[10px]">
          {text}
        </h1>
        <style>
          {`
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
            .animate-slide-in {
              animation: slide-in 1s ease-in-out;
            }
          `}
        </style>
      </div>
      <div className="hidden md:block lg:hidden xl:block sm-732:hidden sm-732:overflow-x-hidden">
        <UserTable />
      </div>
    </React.Fragment>
  );
};

export default UserManagement;
