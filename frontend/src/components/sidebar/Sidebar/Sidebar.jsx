import { useContext, useState } from "react";
import {
  FcHome,
  FcPortraitMode,
  FcFeedback,
  FcMenu,
  FcBusinessman,
} from "react-icons/fc";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, Link } from "react-router-dom";
import "./Sidebar.scss";
import logo from "../../../assets/Logo/logo_noir.png";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, userType } = useContext(AuthContext);
  const toggle = () => setIsOpen(!isOpen);


  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className={`contSidebar d-none d-md-block lg h-100 .bg-primary-subtle position-fixed z-3 top-0  ${
        isOpen ? "open" : "close"
      }`}
    >
      <div className={`sidebar   ${isOpen ? "open" : "close"}`}>
        <div className="toggle-container w-100 d-flex justify-content-end align-items-center mb-3 p-2">
          <FcMenu size={30} onClick={toggle} className="toggleIcon " />
        </div>
        <div className="topbar d-flex flex-column align-items-center ">
          <div className="logo w-100 d-flex align-items-center flex-column-reverse top-0 pb-2  ">
            <Link to="/home">
              <img
                src={logo}
                style={{ display: isOpen ? "block" : "none" }}
                className="logoImg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="menu w-100 d-flex flex-column align-items-center  ">
            <NavLink
              to="/home"
              className={`link link-hover bg- w-100  p-2 text-decoration-none  ${
                isOpen ? "open" : "close"
              }`}
            >
              <div className="icon">
                <FcHome size={30} />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text p-2"
              >
                Home
              </div>
            </NavLink>
            <NavLink
              to="/profil"
              className={`link link-hover bg- w-100  p-2 text-decoration-none  ${
                isOpen ? "open" : "close"
              }`}
            >
              <div className="icon">
                <FcPortraitMode size={30} />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text p-2"
              >
                Profile
              </div>
            </NavLink>
            <NavLink
              to="/contact"
              className={`link link-hover bg- w-100  p-2 text-decoration-none  ${
                isOpen ? "open" : "close"
              }`}
            >
              <div className="icon">
                <FcFeedback size={30} />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text p-2"
              >
                Contact
              </div>
            </NavLink>
            {userType === "adminFamily" && (
              <NavLink
                to="/homeAdmin"
                className={`link link-hover bg- w-100  p-2 text-decoration-none  ${
                  isOpen ? "open" : "close"
                }`}
              >
                <div className="icon">
                  <FcBusinessman size={30} />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text p-2"
                >
                  Acceuil admin
                </div>
              </NavLink>
            )}
          </div>
        </div>
        <NavLink to="/connexion/logout" className="link" onClick={handleLogout}>
          <div
            className="logout d-flex align-items-center justify-content-center"
            style={{
              display: isOpen ? "flex" : "flex",
              flexDirection: isOpen ? "column" : "",
              alignItems: isOpen ? "center" : "center",
              position: isOpen ? "absolute" : "absolute",
              bottom: isOpen ? "20px" : "20px",
              width: isOpen ? "100%" : "100%",
            }}
          >
            <div className="logoutIcon">
              <IoLogOutOutline size={30} />
            </div>
            <div
              style={{
                display: isOpen ? "block" : "none",
              }}
              className="logoutText"
            >
              Déconnexion
            </div>
          </div>
        </NavLink>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
