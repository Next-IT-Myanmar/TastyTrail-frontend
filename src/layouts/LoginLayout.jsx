import React from 'react';
import { Outlet } from 'react-router-dom';
import LoginHeader from '../components/LoginNavbar';
import Footer from '../components/Footer';

const LoginLayout = () => {
  return (
    <>
      <LoginHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LoginLayout;