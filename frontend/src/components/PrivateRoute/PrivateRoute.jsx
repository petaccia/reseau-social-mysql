import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext/AuthContext.jsx";

const PrivateRoute = ({ exceptedRoutes }) => {
  const { isAuthenticated, userType } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/connexion/login" replace={true} />;
  }
  if (exceptedRoutes && userType !== "adminFamily") {
    return <Navigate to="/home" replace={true} />;
  }
  return <Outlet />;
};

export default PrivateRoute;
