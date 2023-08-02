import React, { useState } from "react";
import MessageContext from "./MessageContext.jsx";

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: "Message 1",
      Description: "Description 1",
    },
    {
      id: 2,
      title: "Message 2",
      Description: "Description 2",
    },
    {
      id: 3,
      title: "Message 3",
      Description: "Description 3",
    },
    {
      id: 4,
      title: "Message 4",
      Description: "Description 4",
    },
    {
      id: 5,
      title: "Message 5",
      Description: "Description 5",
    },
    {
      id: 6,
      title: "Message 6",
      Description: "Description 6",
    },
    {
      id: 7,
      title: "Message 7",
      Description: "Description 7",
    },
    {
      id: 8,
      title: "Message 8",
      Description: "Description 8",
    },
    {
      id: 9,
      title: "Message 9",
      Description: "Description 9",
    },
    {
      id: 10,
      title: "Message 10",
      Description: "Description 10",
    },
    {
      id: 11,
      title: "Message 11",
      Description: "Description 11",
    },
    {
      id: 12,
      title: "Message 12",
      Description: "Description 12",
    },
    {
      id: 13,
      title: "Message 13",
      Description: "Description 13",
    },
    {
      id: 14,
      title: "Message 14",
      Description: "Description 14",
    },
    {
      id: 15,
      title: "Message 15",
      Description: "Description 15",
    },
    {
      id: 16,
      title: "Message 16",
      Description: "Description 16",
    },
    {
      id: 17,
      title: "Message 17",
      Description: "Description 17",
    },
    {
      id: 18,
      title: "Message 18",
      Description: "Description 18",
    },
    {
      id: 19,
      title: "Message 19",
      Description: "Description 19",
    },
    {
      id: 20,
      title: "Message 20",
      Description: "Description 20",
    },
  ]);

  // ajouter des messages
  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // supprimer un message
  const deleteMessage = (index) => {
    setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
  };

  // envoie des messsges
  const sendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <MessageContext.Provider
      value={{ messages, addMessage, deleteMessage, sendMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
