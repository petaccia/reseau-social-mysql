import React, { useState } from "react";
import Styles from "./CreateMessage.module.scss";
import SelectUser from "../../SELECTS/selectUser/SelectUser.jsx";
import {
  toastError,
  toastSuccess,
} from "../../../services/Toastify/toastConfig";
import ReadStatusMessageReceiver from "../../Status/readStatusReceiver/ReadStatusMessageReceiver.jsx";

const CreateMessage = ({
  currentUser,
  addMessage,
  setCreateMessage,
  createMessage,
}) => {
  const [showStatus, setShowStatus] = useState(false);
  const [selectedReceiverId, setSelectedReceiverId] = useState("");
  const [newMessage, setNewMessage] = useState({
    title: "",
    description: "",
    message: "",
    senderId: "",
    receiverId: "",
  });

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
        statusRead: "sent",
      };
      console.log("messageWithUser", messageWithUser),
        console.log("receiverId", selectedReceiverId),
        console.log("currentUserId", currentUser.id);

      await addMessage(messageWithUser);
      closeCreateMessage();
      toastSuccess("Votre message a bien été ajouté");
      setNewMessage({
        title: "",
        description: "",
        message: "",
        senderId: "",
        receiverId: "",
      });
    } catch (error) {
      console.error(error);
      toastError("Erreur lors de l'ajout du message");
    }
  };

  const number = (e) => {
    setSelectedReceiverId(e.target.value);
  };

  return (
    <div className={Styles.containerCreateMessage}>
      {createMessage && (
        <div className={Styles.modal}>
          <SelectUser
            value={selectedReceiverId}
            onChange={(e) => {
              number(e);
            }}
          />
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
              name="description"
              value={newMessage.description}
              onChange={handleChange}
              placeholder="Description du message"
            />
            <textarea
              className={Styles.textareaMessage}
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
    </div>
  );
};

export default CreateMessage;
