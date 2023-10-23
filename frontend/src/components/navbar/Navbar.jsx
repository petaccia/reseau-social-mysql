import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FcSearch } from "react-icons/fc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillEnvelopeFill } from "react-icons/bs";
import styles from "./Navbar.module.scss";
// import userImage from "../../assets/users/laure.jpg";
import MessageContext from "../../contexts/MessageContext/MessageContext.jsx";
import AuthContext from "../../contexts/AuthContext/AuthContext.jsx";
import UserContext from "../../contexts/UserContext/UserContext.jsx";

const Navbar = ({ famille }) => {
  const [searchText, setSearchText] = useState("");

  // Context pour recuperer le user connecté
  const { authUser } = useContext(AuthContext);
  const { currentUser } = useContext(UserContext);

  // Context pour récupérer les message de la BDD
  const { messages, getMessages } = useContext(MessageContext);

  useEffect(() => {
    getMessages();
  }, []);

  // Calculer le nombre de message non lus
  const unreadMessagesCount = messages.filter(
    (message) =>
      message.receiverId === authUser.id &&
      (message.status === false || message.statusRead === "unread")
  ).length;

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
              <Link
                to="/message?sort=unread"
                className={styles.link}
                onClick={() => console.info("click message")}
              >
                <BsFillEnvelopeFill className={styles.icon} />
                {unreadMessagesCount > 0 && (
                  <span className={styles.bubble}>{unreadMessagesCount}</span>
                )}
              </Link>
            </div>
            <div className={styles.profileContainer}>
              <div className={styles.profileTooltip}>
                <Link to="/profilUser" className={styles.link}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      currentUser.profilePicture
                    }`}
                    alt="avatar"
                    className={styles.imgUser}
                  />
                  <div className={styles.tooltipText}>Profil</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
