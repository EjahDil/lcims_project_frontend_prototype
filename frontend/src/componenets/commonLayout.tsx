import React from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";



const Layout: React.FC = () => {
    
    return (
        <React.Fragment>
            <Navbar />

            <main>
                <Outlet />
            </main>
        </React.Fragment>
    )
};

export default Layout;