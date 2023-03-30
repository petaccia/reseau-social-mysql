// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import SidebarData from "./SidebarData";

// function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);

//   const toggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div className="container">
//       <div className={`sidebar ${!collapsed ? "collapsed" : ""}`}>
//         <h1 className="logo">Logo</h1>
//         <div className="menu-bars" onClick={toggleCollapse}>
//           <FontAwesomeIcon icon={collapsed ? faBars : faChevronRight} />
//         </div>
//         <nav className="nav-menu">
//           <ul className="nav-menu-items" onClick={!toggleCollapse}>
//             {SidebarData.map((item, index) => (
//               <li key={index}>
//                 <NavLink
//                   to={item.path}
//                   className={item.className}
//                   activeclassame="active"
//                 >
//                   <div className="icon">{item.icon}</div>
//                   <span className="link-text">
//                     {!collapsed ? "" : item.title}
//                   </span>
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
