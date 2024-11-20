

import React from "react"
import { useNavigate } from "react-router-dom"


const LogoutButton : React.FC = () => {

    const navigate = useNavigate();

    const handlelogout = () => {

        localStorage.removeItem("token");


        navigate("/login")
    };

    return (
        <button
        onClick={handlelogout}
        className="w-3/4 sm:w-1/2 py-2 px-4 bg-[#709ec9] hover:bg-[#575447] text-white rounded-md font-semibold transition"
        >
            Logout
        </button>
    );

};

export default LogoutButton;