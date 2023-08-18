import React, { useState } from "react";
import MessageContext from "./MessageContext.jsx";
import apiConnect from "../../services/API/apiConnection.jsx";

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  // recuperer les messages
  const getMessages = async () => {
    try {
      const res = await apiConnect.get("/message");
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  // ajouter des messages
  const addMessage = async (message) => {
    try {
      const res = await apiConnect.post("/message", message);
      setMessages((prevMessages) => [...prevMessages, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  // supprimer un message
  const deleteMessage = async (id) => {
    try {
      const res = await apiConnect.delete(`/message/${id}`);
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id, res.data)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // supprimer tous les messages
  const deleteAllMessages = async () => {
    try {
      const res = await apiConnect.delete("/messages");
      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  };

  // envoie des messsges
  const sendMessage = async (message) => {
    try {
      const res = await apiConnect.post("/message", message);
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

  // Marquage du message comme lu par le destinataire
   const markReadMessage = async (id) => {
  try {
    const res = await apiConnect.put(`/message/read/${id}`);
    if (res.status === 200) {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
        message.id === res.data.id ? {...message, statusRead: true, viewedAt: new Date()} : message
        )
      );
    } else {
      console.error("Erreur du marquage de la lecture du message: ", res);
    }
  } catch (err) {
    console.error(err); 
  }
   };
  return (
    <MessageContext.Provider
      value={{
        messages,
        getMessages,
        addMessage,
        deleteMessage,
        deleteAllMessages,
        sendMessage,
        updateMessage,
        markReadMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
