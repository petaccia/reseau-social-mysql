import React, { useContext, useEffect } from "react";
import Styles from "./ListMessage.module.scss";
import MessageContext from "../../../contexts/MessageContext/MessageContext.jsx";
import CardMessage from "../../Cards/cardMessages/CardMessage.jsx";

const MessageList = () => {
  const {
    messages,
    getMessages,
    addMessage,
    deleteMessage,
    updateMessage,
    sendMessage,
  } = useContext(MessageContext);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className={Styles.containerList}>
      <div className={Styles.CardContainer}>
        {messages.map((message) => (
          <CardMessage
            key={message.id}
            message={message}
            addMessage={addMessage}
            deleteMessage={deleteMessage}
            updateMessage={updateMessage}
            sendMessage={sendMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
