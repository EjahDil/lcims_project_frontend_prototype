import React from "react"
import { Outlet } from "react-router-dom"
import FirstSidebar from "./firstsidebar";



const FirstSidebarLayout: React.FC = () => {
    return (
        <React.Fragment>

            <div className="flex overflow-x-hidden">
                <FirstSidebar/>

                <div className="flex-1 ml-40 sm-1000:ml-64 p-4">
                    <Outlet/>

                </div>
            </div>
        </React.Fragment>
    );
};

export default FirstSidebarLayout;