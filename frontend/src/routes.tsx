import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/not-found";
import LoginForm from "./pages/login";
import About from "./pages/about";
import Home from "./pages/home";
//import NavigationWrapper from "./componenets/navigation-wrapper";
import Layout from "./components/commonLayout";
import TaxIdentification from "./pages/taxRates";
import RevenueManagement from "./pages/revenueManagement";
import Form from "./pages/form";
import WindowDimensions from "./components/windowSize";
import Registration from "./pages/register";
import ProtectedRoute from "./components/protectingRoutes";
import ChangePassword from "./pages/changePasswordForm";
import UserManagement from "./pages/userManagement";
import PropertyManagement from "./pages/propertyManagement";
import AdminPage from "./pages/admin";
import UserTable from "./tables/usersList";
import CreateUserForm from "./pages/createUser";
import DashboardPage from "./pages/dashboard";
import FirstSidebarLayout from "./components/firstSideBarLayout";
import SecondSidebarLayout from "./components/secondSideBarLayout";
import AdminRoute from "./components/protectAdminRoute";
import Forbidden from "./pages/forbidden";
import RoleManagement from "./pages/roleManagement";
import CreateRoleForm from "./pages/createRole";
import StreetManagement from "./pages/streetManagement";
import CreateStreetForm from "./pages/createStreet";
import CategoryManagement from "./pages/categoryManagement";
import CreateCategoryForm from "./pages/createCategory";
import PayTaxForm from "./pages/payTax";
import RegisterUserForm from "./pages/registerUser ";
import UserLayout from "./components/userCommonLayout";
import UserHome from "./pages/userhome";
import UserPayTaxForm from "./pages/userPayTax";
import UserPropertyForm from "./pages/userPropertyInfo";
import UserTaxBillForm from "./pages/userTaxRates";
import ProtectDashboard from "./components/protectDashboardRoute";
import CertificatesArchive from "./pages/certificateArchiveRetrieval";



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
        // {
        //     path: "/revenue-management",
        //     element: <RevenueManagement/>,
        // },
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
        path : '/register-user',
        element : <RegisterUserForm/> ,

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
                path: '/admin',
                element: <AdminRoute />, 
                children: [
                  {
                    element: <FirstSidebarLayout />, 
                    children: [
                      {
                        path: 'home',
                        element: <AdminPage />,
                      },
                      {
                        path: 'user-management',
                        element: <UserManagement />,
                      },
                      {
                        path: 'role-management',
                        element: <RoleManagement />,
                      },
                      {
                        path: 'property-management',
                        element: <PropertyManagement />,
                      },
                      {
                        path: 'street-management',
                        element: <StreetManagement/>,
                      },
                      {
                        path: 'category-management',
                        element: <CategoryManagement/>,
                      },
                      {
                        path: 'tax-identification',
                        element: <TaxIdentification/>,
                      },
                      {
                        path: 'revenue-management',
                        element: <RevenueManagement/>,
                      },
                      {
                        path: 'certificate-archive',
                        element: <CertificatesArchive/>,
                      },
                    ],
                  },
                ],
              },

              {
                path: '/dashboard',
                element: <ProtectDashboard />, 
                children: [

                    {
                        element: <SecondSidebarLayout/>,
                        children: [
         
                                    {
                                        path: "home",
                                        element:<DashboardPage />,
        
                                    },
                                    {
                                        path: "property-management",
                                        element: <PropertyManagement/>
                                    },
                                    {
                                        path: 'street-management',
                                        element: <StreetManagement/>,
                                    },
                                    {
                                        path: 'category-management',
                                        element: <CategoryManagement/>,
                                    },
                                    {
                                        path: 'tax-identification',
                                        element: <TaxIdentification/>,
                                    },
                                    {
                                        path: 'revenue-management',
                                        element: <RevenueManagement/>,
                                    },
                                    {
                                        path: 'certificate-archive',
                                        element: <CertificatesArchive/>,
                                    },
        
                        ],
                
                    },
                    
                ]

              },

            {
                path:"/user",
                element : <UserLayout/>,
                children : [
                {
                    path : 'home',
                    element : <UserHome/> 
                },
                {
                    path: 'pay-tax',
                    element: <UserPayTaxForm/> 
                },
                {
                    path: "property-information",
                    element: <UserPropertyForm/>,
                },
                {
                    path: "tax-rates",
                    element: <UserTaxBillForm/>,
                },
                ]
        
        
            },
            {
                path : '/create-user',
                element : <CreateUserForm/> ,
        
            },
            {
                path : '/create-category',
                element : <CreateCategoryForm/> ,
        
            },
            {
                path : '/create-role',
                element : <CreateRoleForm/> ,
        
            },
            {
                path : '/create-street',
                element : <CreateStreetForm/> ,
        
            },
            {
                path : '/pay-tax',
                element : <PayTaxForm/> ,
        
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
            {
                path: "/forbidden",
                element: <Forbidden/>
            },
        ],
    },
    
]);

export default function Route() {
    return <RouterProvider router= {router} />;
};
