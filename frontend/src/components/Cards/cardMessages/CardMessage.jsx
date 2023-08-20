import React, { useState } from "react";
import Styles from "./CardMessage.module.scss";

import MessageAction from "../../Messages/MessageActions/MessageAction.jsx";
import MessageFooter from "../../Messages/MessageFooter/MessageFooter.jsx";
import MessageStatus from "../../Messages/MessageStatus/MessageStatus.jsx";
import MessageBody from "../../Messages/MessageBody/MessageBody.jsx";
import ReplyModal from "../../modals/ReplyModal/ReplyModal.jsx";
import ReadStatusMessageReceiver from "../../Status/readStatusReceiver/ReadStatusMessageReceiver.jsx";

import {
  toastSuccess,
  toastError,
} from "../../../services/Toastify/toastConfig.jsx";
import DeleteMessage from "../../Messages/DeleteMessage/DeleteMessage.jsx";

const CardMessage = ({ message, deleteMessage, deleteAll, sendMessage }) => {
  // Overture des boutons d'actions
  const [open, setOpen] = useState(false);

  // répondre à un message
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  // Text de Reply
  const [replyText, setReplyText] = useState("");

  
    // supprimer un message avec l'animation
    const [deleteCard, setDeleteCard] = useState(false);


  // Ouvrir les menu d'actions
  const toggleOpen = () => setOpen(!open);

  // Ouverture de la modal de réponse
  const openReplyModal = () => {
    setIsReplyModalOpen(true);
  };

  // Text de la réponse
  const replyTextHandler = (e) => {
    setReplyText(e.target.value);
  };

  const checkStatusInfo = () => {
    setDeleteCard(false);
    toggleOpen();
  };

  // Fermeture de la modal de réponse
  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
    setReplyText("");
  };
  // Suppression du message
  const handleDelete = async () => {
    setDeleteCard(true);
    setTimeout(async () => {
      try {
        await deleteMessage(message.id);
        toastSuccess("Le message a bien été supprimé");
      } catch (error) {
        console.error(error);
        toastError("Erreur lors de la suppression du message");
      }
    }, 3000);
  };

  return (
    // <div className={Styles.containerCardMessage}>
    <div className={Styles.containerCard} onClick={checkStatusInfo}>
      <div className={`${Styles.card} ${
          deleteCard || deleteAll ? Styles.animateOut : ""
        }`}
      >
      {/* <ReadStatusMessageReceiver messageId={message.id}></ReadStatusMessageReceiver> */}
      <DeleteMessage
        onDelete={handleDelete}
      
      />
      {/* Composant de la card du status du message */}
      <MessageStatus check={message.status} />
      <MessageBody
        message={message}
        title={message.title}
        description={message.description}
      />
      <MessageFooter messageUser={message} />
      <MessageAction
        onReply={openReplyModal}
        toggleOpen={toggleOpen}
        open={open}
        onDelete={handleDelete}
      />
      <ReplyModal
        isReplyModalOpen={isReplyModalOpen}
        closeReplyModal={closeReplyModal}
        replyTextHandler={replyTextHandler}
        title={message.title}
        description={message.description}
        message={message}
        check={message.status}
        sender={message.senderId}
        receiver={message.receiverId}
        replyText={replyText}
        sendMessage={sendMessage}
      />
    </div>
    </div>
  );
};

export default CardMessage;
