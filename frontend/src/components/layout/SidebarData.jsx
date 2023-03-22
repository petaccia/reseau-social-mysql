import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGears,
  faHome,
  faRightToBracket,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";

const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <FontAwesomeIcon icon={faHome} />,
    className: "nav-text",
  },
  {
    title: "Profil",
    path: "user",
    icon: <FontAwesomeIcon icon={faAddressCard} />,
    className: "nav-text",
  },
  {
    title: "Group",
    path: "group",
    icon: <FontAwesomeIcon icon={faUserGroup} />,
    className: "nav-text",
  },
  {
    title: "login",
    path: "login",
    icon: <FontAwesomeIcon icon={faRightToBracket} />,
    className: "nav-text",
  },
  {
    title: "Setting",
    path: "setting",
    icon: <FontAwesomeIcon icon={faGears} />,
    className: "nav-text",
  },
];
export default SidebarData;
