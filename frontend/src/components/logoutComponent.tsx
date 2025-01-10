

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
        className="w-full block px-4 py-2 bg-red-500 text-black rounded-md font-semibold text-left hover:bg-red-600"
      >
        Logout
      </button>
    );

};

export default LogoutButton;