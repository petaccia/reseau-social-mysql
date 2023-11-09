import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarMessage from "../../navbar/NavbarMessage/NavbarMessage.jsx";
import Styles from "./ListMessage.module.scss";
import MessageContext from "../../../contexts/MessageContext/MessageContext.jsx";
import CardMessage from "../../Cards/cardMessages/CardMessage.jsx";
import {
  toastSuccess,
  toastError,
  toastInfo,
} from "../../../services/Toastify/toastConfig.jsx";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import UserContext from "../../../contexts/UserContext/UserContext.jsx";

const MessageList = () => {
  const { authUser } = useContext(AuthContext);
  const { users } = useContext(UserContext);
  const {
    messages,
    getMessages,
    addMessage,
    deleteMessage,
    deleteAllMessages,
    sendMessage,
    updateViewStatus,
  } = useContext(MessageContext);
  // naviguer avec uselocation
  const location = useLocation();
  const queryParms = new URLSearchParams(location.search);
  // naviguer vers sort messages
  const sortParams = queryParms.get("sort");

  const [createMessage, setCreateMessage] = useState(false);

  const [deleteAll, setDeleteAll] = useState(false);
  const [sortedMessages, setSortedMessages] = useState(messages);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMessages();
  }, [authUser]);

  const openCreateMessage = () => {
    setCreateMessage(true);
  };

  const deleteAllMessage = async () => {
    setDeleteAll(true);
    try {
      deleteAllMessages();
      if (messages.length > 0) {
        // Correction de la faute de frappe "lenght" à "length"
        toastSuccess("Tous les messages ont été supprimés");
      } else {
        toastInfo("Vous n'avez plus de messages");
      }
    } catch (error) {
      toastError("Erreur lors de la suppression des messages");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getFirstName = (id) => {
    const foundUser = users.find((user) => user.id === id);
    return `${foundUser.firstname} ${foundUser.lastname}`;
  };

  useEffect(() => {
    let filtered = [...messages];

    // Filtrage par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter((message) => {
        const sender = getFirstName(message.senderId);
        const receiver = getFirstName(message.receiverId);
        return (
          sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
          receiver.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Filtrage des messages non lus
    if (sortParams === "unread") {
      filtered = filtered.filter(
        (message) =>
          (message.receiverId === authUser.id && message.status === false) ||
          message.statusRead === "unread"
      );
    }

    setSortedMessages(filtered);
  }, [searchTerm, messages, sortParams]);

  return (
    <div className={Styles.containerList}>
      <div className={Styles.containerNavbar}>
        <NavbarMessage
          currentUser={authUser}
          setCreateMessage={setCreateMessage}
          createMessage={createMessage}
          deleteAllMessage={deleteAllMessage}
          openCreateMessage={openCreateMessage}
          addMessage={addMessage}
          messages={messages}
          onSort={setSortedMessages}
          handleSearchChange={handleSearchChange}
          searchTerm={searchTerm}
        />
      </div>
      <div className={Styles.cardContainer}>
        {sortedMessages.map((message) => (
          <CardMessage
            key={message.id}
            message={message}
            deleteMessage={deleteMessage}
            deleteAll={deleteAll}
            sendMessage={sendMessage}
            currentUser={authUser}
            updateViewStatus={updateViewStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
