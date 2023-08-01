import React, { createContext, useState } from "react";

export const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  // ajouter des messages
  const addMessage = (messages) => {
    setMessage((prevMessages) => [...prevMessages, messages]);
  };

  // supprimer un message
  const deleteMessage = (index) => {
    setMessage((prevMessages) =>  prevMessages.filter((_, i) => i !== index));
  };

  // envoie des messsges
  const sendMessage = (messages) => {
    setMessage((prevMessages) => [...prevMessages, messages]);
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
