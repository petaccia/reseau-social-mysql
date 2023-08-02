import React, { useState } from "react";
import MessageContext from "./MessageContext.jsx";

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: "Message 1",
      description: "Description 1",
      sender: "sender 1",
      receiver: "receiver 1",
      status: "status 1",
      date: "date 1",
    },
    {
      id: 2,
      title: "Message 2",
      description: "Description 2",
      sender: "sender 2",
      receiver: "receiver 2",
      status: "status 2",
      date: "date 2",
    },
    {
      id: 3,
      title: "Message 3",
      description: "Description 3",
      sender: "sender 3",
      receiver: "receiver 3",
      status: "status 3",
      date: "date 3",
    },
    {
      id: 4,
      title: "Message 4",
      description: "Description 4",
      sender: "sender 4",
      receiver: "receiver 4",
      status: "status 4",
      date: "date 4",
    },
    {
      id: 5,
      title: "Message 5",
      description: "Description 5",
      sender: "sender 5",
      receiver: "receiver 5",
      status: "status 5",
      date: "date 5",
    },
    {
      id: 6,
      title: "Message 6",
      description: "Description 6",
      sender: "sender 6",
      receiver: "receiver 6",
      status: "status 6",
      date: "date 6",
    },
    {
      id: 7,
      title: "Message 7",
      description: "Description 7",
      sender: "sender 7",
      receiver: "receiver 7",
      status: "status 7",
      date: "date 7",
    },
    {
      id: 8,
      title: "Message 8",
      description: "Description 8",
      sender: "sender 8",
      receiver: "receiver 8",
      status: "status 8",
      date: "date 8",
    },
    {
      id: 9,
      title: "Message 9",
      description: "Description 9",
      sender: "sender 9",
      receiver: "receiver 9",
      status: "status 9",
      date: "date 9",
    },
    {
      id: 10,
      title: "Message 10",
      description: "Description 10",
      sender: "sender 10",
      receiver: "receiver 10",
      status: "status 10",
      date: "date 10",
    },
    {
      id: 11,
      title: "Message 11",
      description: "Description 11",
      sender: "sender 11",
      receiver: "receiver 11",
      status: "status 11",
      date: "date 11",
    },
    {
      id: 12,
      title: "Message 12",
      description: "Description 12",
      sender: "sender 12",
      receiver: "receiver 12",
      status: "status 12",
      date: "date 12",
    },
    {
      id: 13,
      title: "Message 13",
      description: "Description 13",
      sender: "sender 13",
      receiver: "receiver 13",
      status: "status 13",
      date: "date 13",
    },
    {
      id: 14,
      title: "Message 14",
      description: "Description 14",
      sender: "sender 14",
      receiver: " receiver 14",
      status: "status 14",
      date: "date 14",
    },
    {
      id: 15,
      title: "Message 15",
      description: "Description 15",
      sender: "sender 15",
      receiver: "receiver 15",
      status: "status 15",
      date: "date 15",
    },
    {
      id: 16,
      title: "Message 16",
      description: "Description 16",
      sender: "sender 16",
      receiver: "receiver 16",
      status: "status 16",
      date: "date 16",
    },
    {
      id: 17,
      title: "Message 17",
      description: "Description 17",
      sender: "sender 17",
      receiver: "receiver 17",
      status: "status 17",
      date: "date 17",
    },
    {
      id: 18,
      title: "Message 18",
      description: "Description 18",
      sender: "sender 18",
      receiver: "receiver 18",
      status: "status 18",
      date: "date 18",
    },
    {
      id: 19,
      title: "Message 19",
      description: "Description 19",
      sender: "sender 19",
      receiver: "receiver 19",
      status: "status 19",
      date: "date 19",
    },
    {
      id: 20,
      title: "Message 20",
      description: "Description 20",
      sender: "sender 20",
      receiver: "receiver 20",
      status: "status 20",
      date: "date 20",
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
