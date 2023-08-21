import React from "react";
import CreateMessage from "../../Messages/CreateMessage/CreateMessage.jsx";
import Styles from "./NavbarMessage.module.scss";
import { FcSearch } from "react-icons/fc";
import SelectMessage from "../../SELECTS/SelectMessage/SelectMessage.jsx";

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
     <SelectMessage   />
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
