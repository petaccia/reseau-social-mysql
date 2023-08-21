import React, { useContext, useEffect, useState } from "react";
import Styles from "./ListMessage.module.scss";
import MessageContext from "../../../contexts/MessageContext/MessageContext.jsx";
import CardMessage from "../../Cards/cardMessages/CardMessage.jsx";
import {
  toastSuccess,
  toastError,
  toastInfo,
} from "../../../services/Toastify/toastConfig.jsx";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import NavbarMessage from "@components/navbar/NavbarMessage/NavbarMessage";

const MessageList = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    messages,
    getMessages,
    addMessage,
    deleteMessage,
    deleteAllMessages,
    sendMessage,
  } = useContext(MessageContext);
  
  const [createMessage, setCreateMessage] = useState(false);

  const [deleteAll, setDeleteAll] = useState(false);
  const [sortedMessages, setSortedMessages] = useState(messages);
  
  useEffect(() => {
    getMessages();
  }, [ currentUser ]);

  const openCreateMessage = () => {
    setCreateMessage(true);
  }
  
  const deleteAllMessage = async () => {
    setDeleteAll(true);
    try {
      await deleteAllMessages();
      if (messages.length > 0) {
        // Correction de la faute de frappe "lenght" à "length"
        toastSuccess("Tous les messages ont été supprimés");
      } else {
        toastInfo("Vous n'avez plus de messages");
      }
    } catch (error) {
      toastError("Erreur lors de la suppression des messages");
    }
  };


  return (
    <div className={Styles.containerList}>
      <div className={Styles.containerNavbar}>
      <NavbarMessage 
      currentUser={currentUser}
      setCreateMessage={setCreateMessage}
      createMessage={createMessage}
      deleteAllMessage={deleteAllMessage}
      openCreateMessage={openCreateMessage}
      addMessage={addMessage}
      messages={messages}
      onSort={setSortedMessages}
      />
      </div>
      <div className={Styles.cardContainer}>
      {sortedMessages.map((message) => (
        <CardMessage
          key={message.id}
          message={message}
          deleteMessage={deleteMessage}
          deleteAll={deleteAll}
          sendMessage={sendMessage}
          currentUser={currentUser}
        />
      ))}
    </div>
    </div>
  );
};

export default MessageList;
