import React, { useContext } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar/Sidebar.jsx";
import AuthContext from "../../contexts/AuthContext/AuthContext.jsx";

const MainLayout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated && <Navbar />}
      {isAuthenticated && <Sidebar />}
      {children}
    </>
  );
};

export default MainLayout;
