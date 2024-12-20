

// import React from "react"



// // const NotFound  = () => {

// //     return (
// //         <React.Fragment>
// //             <h1 className="font-bold text-center">Not Found Page</h1>
// //         </React.Fragment>
// //     )
// // }

// // export default NotFound;

import React, { useEffect, useState } from "react";

const NotFound: React.FC = () => {

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 overflow-hidden">
      <div className="sm-478:ml-20 sm-260:hidden">
        {/* Typing animation applied to the text */}
        <h1 className="relative overflow-hidden whitespace-nowrap border-gray-700 text-3xl font-bold text-black animate-typing sm-1514:text-6xl sm-732:text-xl sm-615:text-[8px] h-[100px]">
          Page Under Construction
          <span className="absolute top-0 right-0 border-r-4 border-gray-700 animate-blink"></span>
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
