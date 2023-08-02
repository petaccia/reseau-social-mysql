import React, { useContext } from "react";
import Styles from "./ListMessage.module.scss";
import MessageContext from "../../../contexts/MessageContext/MessageContext.jsx";

const MessageList = () => {
  const { messages } = useContext(MessageContext);
  return (
    <div className={Styles.containerList}>
      <ul className={Styles.list}>
        {messages.map((message, index) => (
          <li key={message.id}>
            <h2 className={Styles.title}>{message.title}</h2>
            <p className={Styles.description}>{message.Description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
