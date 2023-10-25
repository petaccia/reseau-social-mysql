import React, { useContext } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar/Sidebar.jsx";
import AuthContext from "../../contexts/AuthContext/AuthContext.jsx";
import SidebarMobile from "../../components/Mobile/Sidebar/SidebarMobile.jsx";
import NavbarMobile from "../../components/Mobile/Navbar/NavbarMobile.jsx";

const MainLayout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated && <Navbar />}
      {isAuthenticated && <Sidebar />}
      {isAuthenticated && <NavbarMobile />}
      {isAuthenticated && <SidebarMobile />}
      {children}
    </>
  );
};

export default MainLayout;
