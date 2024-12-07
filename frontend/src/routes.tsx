import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/not-found";
import LoginForm from "./pages/login";
import About from "./pages/about";
import Home from "./pages/home";
//import NavigationWrapper from "./componenets/navigation-wrapper";
import Layout from "./components/commonLayout";
import NavigationWrapper from "./components/navigation-wrapper";
import TaxIdentification from "./pages/taxIdentification";
import RevenueManagement from "./pages/revenueManagement";
import Form from "./pages/form";
import WindowDimensions from "./components/windowSize";
import Registration from "./pages/register";
import ProtectedRoute from "./components/protectingRoutes";
import ChangePassword from "./pages/changePasswordForm";
import Sidebar from "./components/sidebar";
import SidebarLayout from "./components/sideBarLayout";
import UserManagement from "./pages/userManagement";
import PropertyManagement from "./pages/propertyManagement";
import AdminPage from "./pages/admin";
import UserTable from "./pages/usersList";
import CreateUserForm from "./pages/createUser";
import DashboardPage from "./pages/dashboard";
import EditUserForm from "./pages/updateUser";




const router =  createBrowserRouter([
    {
        element : <Layout />,
        children : [
        {
            path : '/',
            element : <Home/> 
        },
        {
            path: '/about',
            element: <About /> 
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
        path : '/login',
        element : <LoginForm/> ,

    },
    {
        path : '/register',
        element : <Registration/> ,

    },
    {
        path : '/create-user',
        element : <CreateUserForm/> ,

    },
    {
        path: "*",
        element: <NotFound/>
    },

    //{
    //     element: <ProtectedRoute />,
    //     children : [
             
            // {
            //     path: '/form',
            //     element:<Form />,
            // },
      //  ]
    //}

    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <SidebarLayout/>,
                children: [
                    {
                        path: '/admin',
                        children: [
                            {
                                path: "home",
                                element:<AdminPage />,

                            },
                            {
                                path: "user-management",
                                element: <UserManagement/>
                            },

                        ],
                    },
                    {
                        path: '/dashboard',
                        children: [
                            {
                                path: "home",
                                element:<DashboardPage/>,

                            },
                            {
                                path: "user-management",
                                element: <UserManagement/>
                            },

                        ],
                    },
                    {
                        path: "/property-management",
                        element: <PropertyManagement/>
                    },
                ],
        
            },
            {
                path: '/form',
                element:<Form />,

            },
            {
                path : '/change-password',
                element : <ChangePassword /> ,
        
            },
            {
                path : '/users',
                element : <UserTable/> ,
        
            },
        ],
    },
    
]);

export default function Route() {
    return <RouterProvider router= {router} />;
};
