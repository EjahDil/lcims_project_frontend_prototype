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
import Sidebar from "./components/firstsidebar";
import SidebarLayout from "./components/firstSideBarLayout";
import UserManagement from "./pages/userManagement";
import PropertyManagement from "./pages/propertyManagement";
import AdminPage from "./pages/admin";
import UserTable from "./tables/usersList";
import CreateUserForm from "./pages/createUser";
import DashboardPage from "./pages/dashboard";
import EditUserForm from "./pages/updateUser";
import PropertyList from "./tables/propertiesTable";
import FirstSidebarLayout from "./components/firstSideBarLayout";
import SecondSidebarLayout from "./components/secondSideBarLayout";




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
                element: <FirstSidebarLayout/>,
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

                            {
                                path: "property-management",
                                element: <PropertyManagement/>
                            },
                        ],
                    },

                ],
        
            },

            {
                element: <SecondSidebarLayout/>,
                children: [
                    {
                        path: '/dashboard',
                        children: [
                            {
                                path: "home",
                                element:<AdminPage />,

                            },
                            {
                                path: "property-management",
                                element: <PropertyManagement/>
                            },
                        ],
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
            {
                path: "*",
                element: <NotFound/>
            },
        ],
    },
    
]);

export default function Route() {
    return <RouterProvider router= {router} />;
};
