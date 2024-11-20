import React from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import Footer from "./footer";



const Layout: React.FC = () => {
    
    return (
        <React.Fragment>
            <Navbar />

            <main>
                <Outlet />
            </main>

             <Footer/> 
        </React.Fragment>
    )
};

export default Layout;