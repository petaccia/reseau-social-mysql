import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import SidebarData from "./SidebarData";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="container">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <h1 className="logo">Logo</h1>
        <div className="menu-bars" onClick={toggleCollapse}>
          <FontAwesomeIcon icon={collapsed ? faBars : faChevronLeft} />
        </div>
        <nav className="nav-menu">
          <ul className="nav-menu-items" onClick={toggleCollapse}>
            {SidebarData.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={item.className}
                  activeClassName="active"
                >
                  <div className="icon">{item.icon}</div>
                  <span className="link-text">{collapsed ? "" : item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
