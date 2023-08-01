import { useContext, useState } from "react";
import { FcHome, FcPortraitMode, FcFeedback, FcMenu } from "react-icons/fc";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, useLocation, Link } from "react-router-dom";
import Styles from "./Sidebar.module.scss";
import logo from "../../../assets/Logo/logo_noir.png";
import AuthContext from "../../../contexts/AuthContext.jsx";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/home",
      name: "home",
      icon: <FcHome />,
    },
    {
      path: "/profil",
      name: "Profile",
      icon: <FcPortraitMode />,
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <FcFeedback />,
    },
  ];
  const logoutItem = {
    path: "/connexion/logout",
    name: "Déconnexion",
    icon: <IoLogOutOutline />,
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={Styles.container}>
      <div
        style={{
          width: isOpen ? "13rem" : "4rem",
          position: isOpen ? "fixed" : "",
        }}
        className={Styles.sidebar}
      >
        <div className={Styles.top_section}>
          <div className={Styles.logoContainer}>
            <Link to="/">
              <img
                src={logo}
                style={{ display: isOpen ? "block" : "none" }}
                className={Styles.logo}
                alt="logo"
              />
            </Link>
            <div
              style={{ marginLeft: isOpen ? "8rem" : "0px" }}
              className={Styles.bars}
            >
              <FcMenu onClick={toggle} />
            </div>
          </div>
          <div className={Styles.iconContainer}>
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={`${Styles.link} ${
                  location.pathname === item.path ? Styles.active : ""
                }`}
              >
                <div className={Styles.icon}>{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={Styles.link_text}
                >
                  {item.name}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <NavLink
          to={logoutItem.path}
          className={`${Styles.link_Logout}${
            location.pathname === logoutItem.path ? Styles.active : ""
          }`}
          onClick={handleLogout}
        >
          <div
            className={Styles.ContainerIconLogout}
            style={{
              display: isOpen ? "flex" : "flex",
              flexDirection: isOpen ? "column" : "",
              alignItems: isOpen ? "center" : "center",
              position: isOpen ? "absolute" : "absolute",
              bottom: isOpen ? "20px" : "20px",
              width: isOpen ? "100%" : "100%",
            }}
          >
            <div
              className={Styles.iconLogout}
              style={{ display: isOpen ? "30px" : "20px" }}
            >
              {logoutItem.icon}
            </div>
            <div
              style={{
                display: isOpen ? "block" : "none",
              }}
              className={Styles.link_text_Logout}
            >
              {logoutItem.name}
            </div>
          </div>
        </NavLink>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
