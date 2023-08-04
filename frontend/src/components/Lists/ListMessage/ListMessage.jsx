import React, { useContext, useEffect } from "react";
import Styles from "./ListMessage.module.scss";
import MessageContext from "../../../contexts/MessageContext/MessageContext.jsx";
import CardMessage from "../../Cards/cardMessages/CardMessage.jsx";

const MessageList = () => {
  const { messages, getMessages } = useContext(MessageContext);

  useEffect(() => {
    getMessages();
  }, []);
  console.log(messages);

  return (
    <div className={Styles.containerList}>
      <div className={Styles.CardContainer}>
        {messages.map((message) => (
          <CardMessage key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
