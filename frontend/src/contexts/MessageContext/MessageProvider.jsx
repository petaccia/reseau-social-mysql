import React, { createContext, useState } from "react";

export const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  // ajouter des messages
  const addMessage = (messages) => {
    setMessage(messages);
  };

  // supprimer un message
  const deleteMessage = (index) => {
    setMessage("");
  };

  // envoie des messsges
  const sendMessage = (messages) => {
    setMessage(messages);
  };

  return (
    <MessageContext.Provider
      value={{ message, addMessage, deleteMessage, sendMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
