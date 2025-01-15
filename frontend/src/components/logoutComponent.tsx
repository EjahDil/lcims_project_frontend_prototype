

import React from "react"
import { useNavigate } from "react-router-dom"


const LogoutButton : React.FC = () => {

    const navigate = useNavigate();

    const handlelogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem('user');
        localStorage.removeItem('tokenSetTime');

        navigate("/login")
    };

    return (
        <button
        onClick={handlelogout}
        className="w-full block px-4 py-2 bg-[#1C1C1C] hover:bg-[#2E2E2E] text-white rounded-md font-semibold text-left transition duration-300"
      >
        Logout
      </button>
    );

};

export default LogoutButton;