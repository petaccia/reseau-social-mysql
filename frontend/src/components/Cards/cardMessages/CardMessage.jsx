import React, { useEffect, useState } from "react";
import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import Styles from "./CardMessage.module.scss";
import apiConnect from "../../../services/API/apiConnection.jsx";
import {
  toastSuccess,
  toastError,
  toastWarning,
  toastInfo,
  toastNonLu,
} from "../../../services/Toastify/toastConfig.jsx";

const CardMessage = ({ message, addMessage, deleteMessage, sendMessage }) => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [date, setDate] = useState("");
  const [check, setCheck] = useState("");

  // Overture des boutons d'actions
  const [open, setOpen] = useState(false);

  // répondre à un message
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  // Text de Reply
  const [replyText, setReplyText] = useState("");

  // Date du message
  const formatDate = (inputDate) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(inputDate).toLocaleDateString("fr-FR", options);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const [res1, res2, res3, res4] = await Promise.all([
          apiConnect.get(`/user/${message.senderId}`),
          apiConnect.get(`/user/${message.receiverId}`),
          apiConnect.get(`/message/${message.id}`),
          apiConnect.get(`/message/${message.id}`),
        ]);
        setSender(res1.data);
        setReceiver(res2.data);
        setDate(res3.data.createdAt);
        setCheck(res4.data.status);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [message.senderId]);

  // Ouvrir les menu d'actions
  const toggleOpen = () => setOpen(!open);

  // Ouverture de la modal de réponse
  const openReplyModal = () => {
    setIsReplyModalOpen(true);
  };

  // Fermeture de la modal de réponse
  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
    setReplyText("");
  };

  // Text de la réponse
  const replyTextHandler = (e) => {
    setReplyText(e.target.value);
  };

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
        senderId: sender.id,
        receiverId: receiver.id,
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

  // Affiohage du status du message
  const checkStatusInfo = () => {
    if (check === true) {
      toastInfo("Le message a été lu", {
        className: Styles.toastInfo,
        style: {
          color: "white",
        },
      });
      return <BsFillCheckCircleFill className={Styles.iconStatusValid} />;
    }
    toastNonLu("Le message n'a pas été lu");
    return <BsFillExclamationCircleFill className={Styles.iconStatusInvalid} />;
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.card} onClick={checkStatusInfo}>
        <div className={Styles.containerTitle}>
          <h5 className={Styles.cardTitle}>titre : </h5>
          <p className={Styles.title}>{message.title}</p>
        </div>
        <div className={Styles.containerDescription}>
          <h5 className={Styles.cardDescription}>description :</h5>
          <p className={Styles.description}>{message.description}</p>
        </div>
        <div className={Styles.containerContent}>
          <h6>Expéditeur:</h6>
          <p>
            {sender.firstname} {sender.lastname}
          </p>

          <h6>Destinataire:</h6>
          <p>
            {receiver.firstname} {receiver.lastname}
          </p>
          <h6>Date: </h6>
          <p>{formatDate(date)}</p>
        </div>
        <div className={Styles.containerStatus}>
          {check === true ? (
            <BsFillCheckCircleFill className={Styles.iconStatusValid} />
          ) : (
            <BsFillExclamationCircleFill className={Styles.iconStatusInvalid} />
          )}
        </div>
        <div className={Styles.containerToggle}>
          <BsThreeDotsVertical className={Styles.icon} onClick={toggleOpen} />
          {open && (
            <div className={Styles.containerButton}>
              <button
                className={Styles.button}
                onClick={() => {
                  openReplyModal();
                  toggleOpen(false);
                }}
              >
                Répondre
              </button>
              <button className={Styles.button} onclick={deleteMessage}>
                Supprimer
              </button>
            </div>
          )}
        </div>
        <div className={Styles.containerReplyModal}>
          {isReplyModalOpen && (
            <div className={Styles.modal}>
              <div className={Styles.modalHeader}>
                <h6 className={Styles.modalTitle}>Titre </h6>
                <p className={Styles.modalMessageTitle}> {message.title}</p>
              </div>
              <button className={Styles.buttonClose} onClick={closeReplyModal}>
                fermer
              </button>
              <div className={Styles.containerModalDescription}>
                <h6 className={Styles.modalDescription}>description :</h6>
                <p className={Styles.description}>{message.description}</p>
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
      </div>
    </div>
  );
};

export default CardMessage;
