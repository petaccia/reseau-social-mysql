import { useState } from "react";
import { FcHome, FcPortraitMode, FcFeedback, FcMenu } from "react-icons/fc";
import { NavLink, useLocation, Link } from "react-router-dom";
import Styles from "./Sidebar.module.scss";
import logo from "../../assets/Logo/logo_noir.png";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/home",
      name: "home",
      icon: <FcHome />,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <FcPortraitMode />,
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <FcFeedback />,
    },
  ];
  const location = useLocation();

  return (
    <div className={Styles.container}>
      <div
        style={{ width: isOpen ? "13rem" : "4rem" }}
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
                key={index.path}
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

export default Sidebar;
