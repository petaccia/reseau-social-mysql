import React, { useState } from "react";
import MessageContext from "./MessageContext.jsx";
import apiConnect from "../../services/API/apiConnection.jsx";

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  // recuperer les messages
  const getMessages = async () => {
    try {
      const res = await apiConnect.get("/messages");
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  // ajouter des messages
  const addMessage = async (message) => {
    try {
      const res = await apiConnect.post("/messages", message);
      setMessages((prevMessages) => [...prevMessages, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  // supprimer un message
  const deleteMessage = async (id) => {
    try {
      const res = await apiConnect.delete(`/messages/${id}`);
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // envoie des messsges
  const sendMessage = async (message) => {
    try {
      const res = await apiConnect.post("/messages", message);
      setMessages((prevMessages) => [...prevMessages, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  // modifier un message
  const updateMessage = async (mes) => {
    try {
      const res = await apiConnect.put(`/messages/${mes.id}`, mes);
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === res.data.id ? res.data : message
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        getMessages,
        addMessage,
        deleteMessage,
        sendMessage,
        updateMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
