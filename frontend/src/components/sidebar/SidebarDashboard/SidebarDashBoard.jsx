import { useState } from "react";
import { FcHome, FcManager, FcFeedback, FcMenu ,FcSettings,FcRight} from "react-icons/fc";
import { NavLink, useLocation, Link } from "react-router-dom";
import Styles from "./SidebarDashboard.module.scss";
import logo from "../../../assets/Logo/logo_noir.png";

const SidebarDashBoard = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/homeAdmin",
      name: "Acceuil",
      icon: <FcHome />,
    },
    {
      path: "/profilAdmin",
      name: "Profile",
      icon: <FcManager />,
    },
    {
      path: "/contactAdmin",
      name: "Contact",
      icon: <FcFeedback />,
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <FcSettings />,
    },
    {
      name: "retour au site",
      icon: <FcRight />,
    },
  ];
  const location = useLocation();

  return (
    <div className={Styles.container}>
      <div
        style={{ width: isOpen ? "16rem" : "4rem" }}
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
              style={{ marginLeft: isOpen ? "10rem" : "0px" }}
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
      </div>
      <main>{children}</main>
    </div>
  );
};

export default SidebarDashBoard;
