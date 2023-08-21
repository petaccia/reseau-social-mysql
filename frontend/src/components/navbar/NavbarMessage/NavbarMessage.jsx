import React from "react";
import CreateMessage from "../../Messages/CreateMessage/CreateMessage.jsx";
import Styles from "./NavbarMessage.module.scss";
import { FcSearch } from "react-icons/fc";

const NavbarMessage = ({
  currentUser,
  setCreateMessage,
  createMessage,
  deleteAllMessage,
  openCreateMessage,
  addMessage,
}) => {
  return (
    <div className={Styles.containerNavbar}>
      <div className={Styles.searchContainer}>
        <FcSearch alt="icon de recherche" className={Styles.searchIcon} />
        <input
          type="search"
          value={""}
          onChange={(e) => {}}
          placeholder="Rechercher"
          className={Styles.searchInput}
        />
      </div>
      <div className={Styles.buttonContainer}>
        <button className={Styles.button} onClick={openCreateMessage}>
          Ajouter un message
        </button>
        <button className={Styles.button} onClick={deleteAllMessage}>
          Supprimer tous les messages
        </button>
      </div>
      <div className={Styles.selectMessage}>
        <select name="message" className={Styles.selectMessage}>
          <option value="">Trier par</option>
          <option value="all">Tous les messages</option>
          <option value="messages">Messages en cours</option>
          <option value="sent">Messages envoyés</option>
          <option value="received">Messages reçus</option>
          <option value="date">Date plus récente</option>
          <option value="date">Date plus ancienne</option>
          <option value="destination">Destinataire</option>
          <option value="expéditeur">Expéditeur</option>
        </select>
      </div>
      <CreateMessage
        addMessage={addMessage}
        currentUser={currentUser}
        setCreateMessage={setCreateMessage}
        createMessage={createMessage}
      />
    </div>
  );
};

export default NavbarMessage;
