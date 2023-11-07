import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarMobile.scss";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillEnvelopeFill } from "react-icons/bs";
import UserContext from "../../../contexts/UserContext/UserContext.jsx";

const NavbarMobile = () => {
  const { currentUser } = useContext(UserContext);
  const [userProfilPicture, setUserProfilPicture] = useState("");

  useEffect(() => {
    if (currentUser.profilePicture) {
      const imageUrl = currentUser.profilePicture;
      setUserProfilPicture(imageUrl);
    }
  }, [currentUser]);

  console.log("currentUser in NavbarMobile", currentUser.profilePicture);
  return (
    <div className="navbar_mobile d-flex justify-content-around mt-3 d-lg-none ">
      <Link to="/notification">
        <IoMdNotificationsOutline size={25} className="icon" />
      </Link>
      <Link to="/ProfilUser">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${userProfilPicture}`}
          alt="profil de l'utilisateur"
          className="imgAvatar"
        />
      </Link>
      <Link to="/message">
        <BsFillEnvelopeFill size={25} className="icon" />
      </Link>
    </div>
  );
};

export default NavbarMobile;
