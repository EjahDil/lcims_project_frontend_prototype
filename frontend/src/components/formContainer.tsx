import React from "react";
import { useNavigate } from "react-router-dom"; // Import the navigation hook

interface FormContainerProps {
  children: React.ReactNode;
  title: string;
  showButton?: boolean; // Optional prop to toggle the button
}

const FormContainer: React.FC<FormContainerProps> = ({ children, title, showButton = false }) => {
  const navigate = useNavigate(); // Initialize navigation

  const handleButtonClick = () => {
    navigate("/change-password"); // Redirect to /change-password
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#709ec9]">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg mb-4">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">{title}</h2>

        {/* Render children */}
        {children}

        {/* Conditionally render the button */}
        {showButton && (
          <button
            type="button"
            onClick={handleButtonClick} // Add the onClick handler
            className="absolute top-4 right-4 py-2 px-4 bg-white hover:bg-[#575447] text-black rounded-md font-semibold"
          >
            Change Password
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-center py-6 mt-4">
        <img src="assets/img/lcims_new.png" alt="Limbe City Council Logo" className="w-5 h-5 mr-2" />
        <p className="text-sm">Limbe City Council</p>
      </footer>
    </div>
  );
};

export default FormContainer;
