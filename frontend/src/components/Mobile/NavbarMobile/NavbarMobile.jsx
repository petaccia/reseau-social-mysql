import React from "react";
import { Link } from "react-router-dom";
import "./NavbarMobile.scss";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillEnvelopeFill } from "react-icons/bs";

const NavbarMobile = () => {
  return (
    <div className="navbar_mobile d-flex justify-content-around mt-3 d-lg-none ">
      <Link to="/notification">
        <IoMdNotificationsOutline size={25} className="icon" />
      </Link>
      <Link to="/message">
        <BsFillEnvelopeFill size={25} className="icon" />
      </Link>
    </div>
  );
};

export default NavbarMobile;
