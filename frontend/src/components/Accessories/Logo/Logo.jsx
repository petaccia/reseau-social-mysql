import React from "react";
import logo from "../../../assets/Logo/logo_noir.png";
import "./Logo.scss";

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo" style={{ backgroundImage: `url(${logo})` }}></div>
    </div>
  );
};

export default Logo;
