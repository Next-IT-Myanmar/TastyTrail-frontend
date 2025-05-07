import React from 'react';
import { Outlet } from 'react-router-dom';
import LoginHeader from '../components/LoginNavbar';

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