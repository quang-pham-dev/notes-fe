import Header from 'components/Header/index';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
