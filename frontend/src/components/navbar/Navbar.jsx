import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBorderAll,
  faCircleUser,
  faEnvelope,
  faHome,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import "./navBar.scss";
import { Link } from "react-router-dom";
import { faMoon } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <span>Logo</span>
          <FontAwesomeIcon icon={faHome} className='iconLeft' />
          <FontAwesomeIcon icon={faMoon}  className='iconLeft'/>
          <FontAwesomeIcon icon={faBorderAll}  className='iconLeft'/>
            <FontAwesomeIcon icon={faMagnifyingGlass}  className='iconLeft'/>
            <input type="text" placeholder="search..." className="search"/>
        </Link>
      </div>
      <div className="right">
        <FontAwesomeIcon icon={faUser} className='iconRight' />
        <FontAwesomeIcon icon={faEnvelope} className='iconRight'/>
        <FontAwesomeIcon icon={faBell} className='iconRight'/>
        <div className="user">
          <FontAwesomeIcon icon={faCircleUser} className='iconRightUser'/>
          <span>John doe</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
