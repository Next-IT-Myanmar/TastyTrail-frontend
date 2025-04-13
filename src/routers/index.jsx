import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Login from '../pages/login';
import HomeLayout from '../layouts/HomeLayout';
import LoginLayout from '../layouts/LoginLayout';
import AdminLayout from '../layouts/AdminLayout';
import SignUp from '../pages/SignUp';
import Dashboard from '../components/dashboard';
import Countries from '../components/Countries';
import Categories from '../components/Categories';
import Restaurants from '../components/Restaurants';
import Currencies from '../components/Currencies';
import Sliders from '../components/Sliders';
import Setting from '../components/Setting';


const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  // },
  // {
  //   path: "/login",
  //   element: <Login />,
  // }
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      }
    ]
  },
  {
    path: "/",
    Component: LoginLayout,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      }
    ]
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/countries",
        element: <Countries />,
      },
      {
        path: "/admin/categories",
        element: <Categories />,
      },
      {
        path: "/admin/restaurants",
        element: <Restaurants />,
      },
      {
        path: "/admin/currencies",
        element: <Currencies  />,
      },
      {
        path: "/admin/sliders",
        element: <Sliders />,
      },
      {
        path: "/admin/settings",
        element: <Setting />,
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      }
    ]
  }
]);
export default router;