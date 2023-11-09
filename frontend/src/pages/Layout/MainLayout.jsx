import React, { useContext } from "react";

import NavbarOriginal from "../../components/Desktop/Navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar/Sidebar.jsx";
import AuthContext from "../../contexts/AuthContext/AuthContext.jsx";
import SidebarMobile from "../../components/Mobile/SidebarMobile/SidebarMobile.jsx";
import NavbarMobile from "../../components/Mobile/NavbarMobile/NavbarMobile.jsx";

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
