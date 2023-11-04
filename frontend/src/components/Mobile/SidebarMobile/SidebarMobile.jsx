import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./sidebarMobile.scss";
import {
  FcHome,
  FcPortraitMode,
  FcFeedback,
  FcBusinessman,
} from "react-icons/fc";
import { IoLogOutOutline } from "react-icons/io5";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";

const SidebarMobile = () => {
  const { logout, userType } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="sidebar-mobile d-md-none fixed-bottom d-flex justify-content-around border-top pt-3 ">
      <div className="sidebar-icon mb-3">
        <Link to="/home">
          <FcHome size={30} />
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link to="/profil">
          <FcPortraitMode size={25} />
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link to="/contact">
          <FcFeedback size={25} />
        </Link>
      </div>
      {userType === "adminFamily" && (
        <div className="sidebar-icon">
          <Link to="/admin">
            <FcBusinessman size={25} />
          </Link>
        </div>
      )}
      <div className="sidebar-icon" onClick={handleLogout}>
        <Link to="/login">
          <IoLogOutOutline size={25} />
        </Link>
      </div>
    </div>
  );
};

export default SidebarMobile;