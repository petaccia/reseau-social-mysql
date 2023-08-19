import React, { useContext } from "react";
import Styles from "./MessageFooter.module.scss";
import MessageContext from "../../../contexts/MessageContext/MessageContext.jsx";
import UserContext from "../../../contexts/UserContext/UserContext.jsx";

const MessageFooter = ({ messageUser }) => {
  // Récupérer les informations des utilisateurs
  const { users } = useContext(UserContext);
  // console.log("users", users);

  // Récupérer les informations du message
  const { messages } = useContext(MessageContext);
  // console.log("message", messages);

  // Vérifcation de la nullité/undefined
  if (!users || !messages) {
    return null;
  }

  // Utiliser les données des contexts pour obtenir les informations des utilisateurs et des messages
const sender = users.find((user) => user.id === messageUser.senderId);
// console.log("sender", sender);
const receiver = users.find((user) => user.id === messageUser.receiverId);
// console.log("receiver", receiver);
const date = messageUser.createdAt;
  // const check = message.status;

  // Vérification  de la nullité/undefined
  if (!sender || !receiver) {
    return null;
  }

  // Format de la date
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

  return (
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
  );
};

export default MessageFooter;
