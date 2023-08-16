import React, { useContext, useEffect, useState } from "react";
import Styles from "./ListMessage.module.scss";
import UserContext from "../../../contexts/UserContext/UserContext.jsx";
import MessageContext from "../../../contexts/MessageContext/MessageContext.jsx";
import CardMessage from "../../Cards/cardMessages/CardMessage.jsx";
import {
  toastSuccess,
  toastError,
  toastInfo,
} from "../../../services/Toastify/toastConfig.jsx";
import SelectUser from "../../selectUser/selectUser.jsx";

const MessageList = () => {
  const { currentUser, currentUserLogin } = useContext(UserContext);
  console.log(currentUser);
  const {
    messages,
    getMessages,
    addMessage,
    deleteMessage,
    deleteAllMessages,
    sendMessage,
  } = useContext(MessageContext);

  const [deleteAll, setDeleteAll] = useState(false);
  const [createMessage, setCreateMessage] = useState(false);
  const [newMessage, setNewMessage] = useState({
    title: "",
    description: "",
    message: "",
  });
  const [selectedReceiverId, setSelectedReceiverId] = useState("");
  
  const credentials = {
    email: "example@gmail.com",
    password: "mot de passe",
  };
  useEffect(() => {
    currentUserLogin(credentials);
    getMessages();
  }, []);

  const deleteAllMessage = async () => {
    setDeleteAll(true);
    try {
      await deleteAllMessages();
      if (messages.length > 0) { // Correction de la faute de frappe "lenght" à "length"
        toastSuccess("Tous les messages ont été supprimés");
      } else {
        toastInfo("Vous n'avez plus de messages");
      }
    } catch (error) {
      toastError("Erreur lors de la suppression des messages");
    }
  };

  const openCreateMessage = () => {
    setCreateMessage(true);
  };

  const closeCreateMessage = () => {
    setCreateMessage(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMessage((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateMessage = async () => {
    if (!currentUser) {
      toastError("Veuillez vous connecter");
      return;
    }
    if (!selectedReceiverId) {
      toastError("Veuillez choisir un destinataire");
      return;
    }
    if (!newMessage.title || !newMessage.description || !newMessage.message) {
      toastError("Veuillez remplir tous les champs");
      return;
    }
    try {
      const messageWithUser = {
        ...newMessage,
        senderId: currentUser.id,
        receiverId: selectedReceiverId,
        status: false,
      };
    
      await addMessage(messageWithUser);
      closeCreateMessage();
      toastSuccess("Votre message a bien été ajouté");
      setNewMessage({
        title: "",
        description: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toastError("Erreur lors de l'ajout du message");
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
      </div>
      <div className={Styles.containerCreateMessage}>
        {createMessage && (
          <div className={Styles.modal}>
            <SelectUser value={selectedReceiverId} onChange={(e) => setSelectedReceiverId(e.target.value)} />
            <button className={Styles.buttonClose} onClick={closeCreateMessage}>
              X
            </button>
            <div className={Styles.containerModalInput}>
              <input
                className={Styles.inputTitle}
                type="text"
                name="title"
                value={newMessage.title}
                onChange={handleChange}
                placeholder="Titre du message ..."
              />
              <textarea
                className={Styles.textareaDescription}
                type="text"
                name="description"
                value={newMessage.description}
                onChange={handleChange}
                placeholder="Description du message"
              />
              <textarea
                className={Styles.textareaMessage}
                type="text"
                name="message"
                value={newMessage.message}
                onChange={handleChange}
                placeholder="Votre message ..."
              />
            </div>
            <div className={Styles.containerModalButton}>
              <button
                className={Styles.buttonCreateMessage}
                onClick={handleCreateMessage}
              >
                Envoyer
              </button>
            </div>
          </div>
        )}
        <div className={Styles.CardContainer}>
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
    </div>
  );
};

export default MessageList;
