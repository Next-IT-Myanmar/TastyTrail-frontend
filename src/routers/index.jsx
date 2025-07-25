import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Login from '../pages/Login';
import HomeLayout from '../layouts/HomeLayout';
import LoginLayout from '../layouts/LoginLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';
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
import Subscribers from '../components/Subscribers';
import Notification from '../components/Notification';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsCondition from '../pages/TermsCondition';


const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-conditions",
        element: <TermsCondition />,
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
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
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
        path: "/admin/subscribers",
        element: <Subscribers />, 
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