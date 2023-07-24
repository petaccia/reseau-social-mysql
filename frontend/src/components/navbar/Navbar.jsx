import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FcSearch } from "react-icons/fc";
import { BiLogIn } from "react-icons/bi";
import styles from "./Navbar.module.scss";

function Navbar({ famille }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.familyContainer}>
          <span className={styles.familyName}>{famille}Petaccia</span>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.searchContainer}>
            <FcSearch alt="icon de recherche" className={styles.searchIcon} />
            <input
              type="search"
              value={searchText}
              onChange={handleSearch}
              placeholder="Rechercher"
              className={styles.searchInput}
            />
          </div>
          <div className={styles.connectContainer}>
            <Link to="/connexion" className={styles.link}>
              <div className={styles.textContainer}>
                <span className={styles.text}>S'inscrire</span>
                <span className={styles.text}>/Se connecter</span>
              </div>
              <BiLogIn
                alt="icon de connexion ou d'inscription"
                className={styles.icon}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
