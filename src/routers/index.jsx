import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Login from '../pages/Login';
import HomeLayout from '../layouts/HomeLayout';
import LoginLayout from '../layouts/LoginLayout';
import AdminLayout from '../layouts/AdminLayout';
import SignUp from '../pages/SignUp';
import Dashboard from '../components/Dashboard';
import Countries from '../components/Countries';
import Categories from '../components/Categories';
import Restaurants from '../components/Restaurants';
import Currencies from '../components/Currencies';
import Sliders from '../components/Sliders';
import Setting from '../components/Setting';
import NotFound from '../pages/NotFound';
import Cuisines from '../components/Cuisines';
import Notification from '../components/Notification';


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
        element: <NotFound />,
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
        element: <NotFound />,
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
        path: "/admin/cuisines",
        element: <Cuisines />,
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
        path: "/admin/notification",
        element: <Notification />
      },
      {
        path: "/admin/settings",
        element: <Setting />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  }
]);
export default router;