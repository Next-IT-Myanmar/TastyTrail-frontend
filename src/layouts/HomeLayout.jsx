import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/LandingNavbar';
import Footer from '../components/Footer';

const HomeLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default HomeLayout;