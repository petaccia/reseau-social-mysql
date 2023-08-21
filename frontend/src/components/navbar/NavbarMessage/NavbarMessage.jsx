import React, { useContext, useState } from "react";
import CreateMessage from "../../Messages/CreateMessage/CreateMessage.jsx";
import Styles from "./NavbarMessage.module.scss";
import SelectMessage from "../../SELECTS/SelectMessage/SelectMessage.jsx";
import SearchInput from "../../SearchInput/SearchInput.jsx";

const NavbarMessage = ({
  currentUser,
  setCreateMessage,
  createMessage,
  deleteAllMessage,
  openCreateMessage,
  addMessage,
  messages,
  onSort,
  searchTerm,
  handleSearchChange,
}) => {




  return (
    <div className={Styles.containerNavbar}>
      <div className={Styles.buttonContainer}>
        <SearchInput 
        onChange={handleSearchChange}
        value={searchTerm}
        


        />
        <button className={Styles.button} onClick={openCreateMessage}>
          Ajouter un message
        </button>
        <button className={Styles.button} onClick={deleteAllMessage}>
          Supprimer tous les messages
        </button>
      </div>
     <SelectMessage 
     messages={messages}
     onSort={onSort}
        />
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
