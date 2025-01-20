import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./usernavbar";



const UserLayout: React.FC = () => {
    
    return (
        <React.Fragment>
            <UserNavbar />

            <main>
                <Outlet />
            </main>
            
        </React.Fragment>
    )
};

export default UserLayout;