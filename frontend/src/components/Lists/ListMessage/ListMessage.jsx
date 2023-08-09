import React, { useContext, useEffect, useState } from "react";
import Styles from "./ListMessage.module.scss";
import MessageContext from "../../../contexts/MessageContext/MessageContext.jsx";
import CardMessage from "../../Cards/cardMessages/CardMessage.jsx";
import {
  toastSuccess,
  toastError,
  toastInfo,
} from "../../../services/Toastify/toastConfig.jsx";

const MessageList = () => {
  const {
    messages,
    getMessages,
    addMessage,
    deleteMessage,
    deleteAllMessages,
    updateMessage,
    sendMessage,
  } = useContext(MessageContext);

  const [deleteAll, setDeleteAll] = useState(false);

  useEffect(() => {
    getMessages();
    deleteMessage();
  }, []);

  const deleteAllMessage = async () => {
    setDeleteAll(true);
    try {
      await deleteAllMessages();
      // Vérifier si il y a un message
      if (messages.lenght > 0) {
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
      </div>
      <div className={Styles.CardContainer}>
        {messages.map((message) => (
          <CardMessage
            key={message.id}
            message={message}
            addMessage={addMessage}
            deleteMessage={deleteMessage}
            deleteAll={deleteAll}
            updateMessage={updateMessage}
            sendMessage={sendMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
