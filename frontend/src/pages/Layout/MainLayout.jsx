import React, { useContext } from "react";

import Navbar from "../../components/Desktop/Navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar/Sidebar.jsx";
import AuthContext from "../../contexts/AuthContext/AuthContext.jsx";
import SidebarMobile from "../../components/Mobile/Sidebar/SidebarMobile.jsx";
import NavbarMobile from "../../components/Mobile/Navbar/NavbarMobile.jsx";
import NavbarOriginal from "../../components/navbar/Navbar.jsx";

const MainLayout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated && <NavbarOriginal />}
      {isAuthenticated && <Sidebar />}
      {isAuthenticated && <NavbarMobile />}
      {isAuthenticated && <SidebarMobile />}
      {children}
    </>
  );
};

export default MainLayout;
