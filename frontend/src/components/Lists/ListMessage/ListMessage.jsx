import React, { useContext, useMemo } from "react";
import Styles from "./ListMessage.module.scss";
import MessageContext from "../../../contexts/MessageContext/MessageContext.jsx";

const MessageList = () => {
  const { messages } = useContext(MessageContext);

  return (
    <div className={Styles.containerList}>
      <table className={Styles.table}>
        <thead className={Styles.thead}>
          <tr className={Styles.tr}>
            <th>Identifiant</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Date</th>
            <th>Expéditeur</th>
            <th>Destinataire</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody className={Styles.tbody}>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>{message.title}</td>
              <td>{message.description}</td>
              <td>{message.date}</td>
              <td>{message.sender}</td>
              <td>{message.receiver}</td>
              <td>{message.status}</td>
              <div className={Styles.buttonContainer}>
                <button className={Styles.button}>Supprimer</button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessageList;
