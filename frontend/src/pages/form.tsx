// import React from 'react';
// import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'; // Only where needed

// const Forms: React.FC = () => {
//   return (
//     <div>

//       {/* Infrastructure and Services Information Form */}
//       <section id="serinfo" className="mb-8">
//         <form id="infrastructureForm" className="space-y-6">
//           <h1 className="text-2xl font-bold flex items-center mb-4">
//             {/* Inline SVG for home icon */}
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
//               <path d="M3 9.5L12 3l9 6.5V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//             </svg>
//             Infrastructure and Services Information
//           </h1>

//           <div className="space-y-2">
//             <label className="block">Service or Infrastructure Type</label>
//             <input type="text" placeholder="Type of Service or Infrastructure" required className="input" />
//           </div>

//           <div className="space-y-2">
//             <label className="block">Service or Infrastructure Subdivision</label>
//             <small className="block text-gray-600">With additional information below the label</small>
//             <input type="text" placeholder="Subdivision" required className="input" />
//           </div>

//           <div className="space-y-2">
//             <label className="block">Service or Infrastructure Street</label>
//             <input type="text" placeholder="Name of the Street" className="input" />
//             <small className="block text-gray-600">Or additional text below</small>
//           </div>

//           <div className="space-y-2">
//             <label className="block">Service or Infrastructure Quarter</label>
//             <input type="text" placeholder="Name of the Quarter" required className="input" />
//             <small className="block text-gray-600">Or additional text below</small>
//           </div>

//           <div className="space-y-2">
//             <label className="block">Service or Infrastructure GPS Coordinates</label>
//             <input type="text" placeholder="GPS Coordinates" required className="input" />
//           </div>

//           <div className="text-right">
//             <button type="submit" className="submit-button">Submit</button>
//           </div>
//         </form>
//       </section>

//       {/* Property Information Form */}
//       <section id="propinfo" className="mb-8">
//         <form id="propertyForm" className="space-y-6">
//           <h1 className="text-2xl font-bold flex items-center mb-4">
//             {/* Inline SVG for home icon */}
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
//               <path d="M3 9.5L12 3l9 6.5V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//             </svg>
//             Property Information
//           </h1>

//           <div className="space-y-2">
//             <label className="block">Name of Residence Owner</label>
//             <input type="text" placeholder="Your name" required className="input" />
//           </div>

//           <div className="space-y-2">
//             <label className="block">Phone Number of Residence Owner</label>
//             <small className="block text-gray-600">With additional information below the label</small>
//             {/* Using react-icons for Phone icon */}
//             <div className="flex items-center">
//               <PhoneIcon className="w-5 h-5 mr-2 text-gray-500" />
//               <input type="tel" placeholder="Your Number" required className="input" />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="block">Residence Type</label>
//             <input type="text" placeholder="Type of Residence" required className="input" />
//           </div>

//           <div className="space-y-2">
//             <label className="block">Residence's Street</label>
//             <input type="text" placeholder="Street where the Residence is found" required className="input" />
//           </div>

//           <div className="space-y-2">
//             <label className="block">Residence's Quarter</label>
//             <input type="text" placeholder="Quarter where the residence is found" required className="input" />
//           </div>

//           <div className="space-y-2">
//             <label className="block">Residence's GPS Coordinates</label>
//             {/* Using Heroicons for Map Pin icon */}
//             <div className="flex items-center">
//               <MapPinIcon className="w-5 h-5 mr-2 text-gray-500" />
//               <input type="text" placeholder="GPS Coordinates" required className="input" />
//             </div>
//           </div>

//           <div className="text-right">
//             <button type="submit" className="submit-button">Submit</button>
//           </div>
//         </form>
//       </section>

//       {/* Footer Section */}
//       <footer className="flex flex-col items-center py-6">
//         <img src="assets/img/lcims_new.png" alt="Limbe City Council Logo" className="w-20 mb-2" />
//         <p className="text-sm">Limbe City Council</p>
//       </footer>
//     </div>
//   );
// };

// export default Forms;

import React from 'react'; 
import InfrastructureForm from '../components/infrastructureForm';
import PropertyForm from '../components/propertyForm';
import FormNavigation from '../components/formNav';

const Form: React.FC = () => {
  return (
    <div className="container mx-auto p-4 flex">
      {/* Forms Section */}
      <div className="w-full ml-16 pr-2 space-y-10 sm-732:w-full sm-732:ml-2">
        {/* <InfrastructureForm /> */}
        <PropertyForm />
      </div>

      {/* Navigation Section */}
      {/* <div className="w-1/4 h-screen ml-4">
        <FormNavigation />
      </div> */}
    </div>
  );
};

export default Form;


