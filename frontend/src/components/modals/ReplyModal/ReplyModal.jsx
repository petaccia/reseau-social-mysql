import React from "react";
import Styles from "./ReplyModal.module.scss";
import { toastSuccess, toastError, toastWarning } from "../../../services/Toastify/toastConfig.jsx";

const ReplyModal = ( {isReplyModalOpen, closeReplyModal, replyTextHandler, title, description, message, check, sender, receiver, replyText, sendMessage }) => {
  

    // Envoie de la réponse
    const sendReply = async () => {
      // Vérification si le champ de réponse est vide
      if (!replyText) {
        toastWarning("Veuillez remplir le champ de réponse");
        return;
      }
      try {
        await sendMessage({
          title: message.title,
          description: message.description,
          message: replyText,
          senderId: sender,
          receiverId: receiver,
          status: check,
        });
        toastSuccess("Votre message a bien été envoyé");
        closeReplyModal();
      } catch (error) {
        console.error(error);
        toastError("Erreur lors de l'envoi du message", {
          className: Styles.toastSuccess,
          style: {
            top: "150px",
            right: "100px",
            boxShadow: "5px 2px 1px red",
            backgroundColor: "#10131e",
            color: "red",
          },
        });
      }
    };

  

  
  return (
    <div className={Styles.containerReplyModal}>
    {isReplyModalOpen && (
      <div className={Styles.modal}>
        <div className={Styles.modalHeader}>
          <h6 className={Styles.modalTitle}>Titre </h6>
          <p className={Styles.modalMessageTitle}> {title}</p>
        </div>
        <button className={Styles.buttonClose} onClick={closeReplyModal}>
          fermer
        </button>
        <div className={Styles.containerModalDescription}>
          <h6 className={Styles.modalDescription}>description :</h6>
          <p className={Styles.description}>{description}</p>
        </div>
        <div className={Styles.containerModalContent}>
          <textarea
            className={Styles.textarea}
            type="text"
            id=""
            cols="90"
            rows="5"
            value={replyText}
            onChange={replyTextHandler}
            placeholder="Votre réponse ..."
          />
          <div className={Styles.containerModalButton}>
            <button className={Styles.buttonSend} onClick={sendReply}>
              Envoyer
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)
};

export default ReplyModal