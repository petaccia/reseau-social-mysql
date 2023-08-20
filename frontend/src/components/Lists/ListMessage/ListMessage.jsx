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
import CreateMessage from "../../Messages/CreateMessage/CreateMessage.jsx";

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
      <div className={Styles.buttonContainer}>
        <button className={Styles.button} onClick={deleteAllMessage}>
          Supprimer tous les messages
        </button>
        <button className={Styles.button} onClick={openCreateMessage}>
          Ajouter un message
        </button>
        <CreateMessage
          addMessage={addMessage}
          currentUser={currentUser}
          setCreateMessage={setCreateMessage}
          createMessage={createMessage}
        />
      </div>
      <div className={Styles.cardContainer}>
      {messages.map((message) => (
        <CardMessage
          key={message.id}
          message={message}
          deleteMessage={deleteMessage}
          deleteAll={deleteAll}
          sendMessage={sendMessage}
        />
      ))}
    </div>
    </div>
  );
};

export default MessageList;
