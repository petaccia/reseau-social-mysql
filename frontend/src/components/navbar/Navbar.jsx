import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FcSearch } from "react-icons/fc";
import { IoMdNotificationsOutline } from "react-icons/io";
import styles from "./Navbar.module.scss";
import userImage from "../../assets/users/laure.jpg";

const Navbar = ({ famille }) => {
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
            <div className={styles.iconContainer}>
              <Link to="/notification" className={styles.link}>
                <IoMdNotificationsOutline
                  alt="icon de notification"
                  className={styles.icon}
                />
              </Link>
              <div>
                <img src={userImage} alt="avatar" className={styles.imgUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
