import React from "react";
import Navbar from "../../components/Shared/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
        <div className="absolute z-10">
  <Navbar />
        </div>
    
      <Outlet />
    </div>
  );
};

export default Layout;
