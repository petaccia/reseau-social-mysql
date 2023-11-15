import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavbarMobile.scss";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import UserContext from "../../../contexts/UserContext/UserContext.jsx";

const NavbarMobile = () => {
  const { currentUser } = useContext(UserContext);

  // Vérifier si l'image du profil existe ou sinon afficher un avatar par defaut
  const profilePicture = currentUser.profilePicture
    ? `${import.meta.env.VITE_BACKEND_URL}/${currentUser.profilePicture}`
    : null;

  return (
    <div className="navbar_mobile d-flex justify-content-around mt-3 d-md-none ">
      <Link to="/notification">
        <IoMdNotificationsOutline size={25} className="icon" />
      </Link>
      <Link to="/ProfilUser">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="profil de l'utilisateur"
            className="imgAvatar"
          />
        ) : (
          <RxAvatar size={25} className="icon" />
        )}
      </Link>
      <Link to="/message">
        <BsFillEnvelopeFill size={25} className="icon" />
      </Link>
    </div>
  );
};

export default NavbarMobile;
