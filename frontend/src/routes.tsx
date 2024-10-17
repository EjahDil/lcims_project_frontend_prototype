import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/not-found";
import Login from "./pages/login";
import About from "./pages/about";
import PropertyForm from "./pages/propertyForm";
import InfrastructureForm from "./pages/infrastructureForm";
import Home from "./pages/home";
//import NavigationWrapper from "./componenets/navigation-wrapper";
import Layout from "./componenets/commonLayout";
import NavigationWrapper from "./componenets/navigation-wrapper";



const router =  createBrowserRouter([
    {
        element : <Layout />,
        children : [{
            path : "*",
            element: <NotFound /> ,
        },
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
            element: <About/> 
        },
        {
            path: "/propertyform",
            element :  <PropertyForm/>
        },
        {
            path: "/infrastructureform",
            element : <InfrastructureForm/>,
        
        }
            
        ]
    }
]);

export default function Routes() {
    return <RouterProvider router= {router} />;
};