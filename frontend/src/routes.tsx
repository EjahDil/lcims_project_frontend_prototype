import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/not-found";
import Login from "./pages/login";
import About from "./pages/about";
import Home from "./pages/home";
//import NavigationWrapper from "./componenets/navigation-wrapper";
import Layout from "./components/commonLayout";
import NavigationWrapper from "./components/navigation-wrapper";
import TaxIdentification from "./pages/taxIdentification";
import RevenueManagement from "./pages/revenueManagement";
import Form from "./pages/form";
import WindowDimensions from "./components/windowSize";




const router =  createBrowserRouter([
    {
        element : <Layout />,
        children : [
        {
            path : '/',
            element : <Home/> 
        },
        {
            path : '/login',
            element : <Login/> ,

        },
        {
            path: '/about',
            element: <About /> 
        },
        {
            path: '/form',
            element:<Form />,
        },
        {
            path: "/tax-identification",
            element: <TaxIdentification/>,
        },
        {
            path: "/revenue-management",
            element: <RevenueManagement/>,
        },
        ]

    },
    {
        path: "window-size",
        element: <WindowDimensions />
    },
    {
        path: "*",
        element: <NotFound/>
    },
    
]);

export default function Route() {
    return <RouterProvider router= {router} />;
};
