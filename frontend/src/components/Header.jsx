import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="header-container">
      <h1>Je suis le header</h1>
      <FontAwesomeIcon icon={faHome} />
    </div>
  );
}

export default Header;
