import React, { useContext, useEffect, useState } from "react";
import Styles from "./ListMessage.module.scss";
import MessageContext from "../../../contexts/MessageContext/MessageContext.jsx";
import CardMessage from "../../Cards/cardMessages/CardMessage.jsx";
import {
  toastSuccess,
  toastError,
  toastInfo,
} from "../../../services/Toastify/toastConfig.jsx";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import NavbarMessage from "@components/navbar/NavbarMessage/NavbarMessage";
import UserContext from "../../../contexts/UserContext/UserContext.jsx";

const MessageList = () => {
  const { currentUser } = useContext(AuthContext);
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
  
  const [createMessage, setCreateMessage] = useState(false);

  const [deleteAll, setDeleteAll] = useState(false);
  const [sortedMessages, setSortedMessages] = useState(messages);
  const  [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    getMessages();
  }, [ currentUser,]);

  const openCreateMessage = () => {
    setCreateMessage(true);
  }
  
  const deleteAllMessage = async () => {
    setDeleteAll(true);
    try {
      await deleteAllMessages();
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
    console.log("good to go",e.target.value);
    setSearchTerm(e.target.value);
  };

  const getFirstName = (id) => {
    const user = users.find((user) => user.id === id);
    return user.firstname + " " + user.lastname;
  }
  
  // flitre de recherche de message par nom ou prénom de l'utilisateur
  const filteredMessages = messages.filter((message) => {
   const sender = getFirstName(message.senderId);
   const receiver = getFirstName(message.receiverId);
  
   if (sender.toLowerCase().includes(searchTerm.toLowerCase()) || receiver.toLowerCase().includes(searchTerm.toLowerCase())) {
     return message;
   }
  });

  useEffect(() => {
    if (searchTerm) {
      setSortedMessages(filteredMessages);
    } else {
      setSortedMessages(messages);
    }
  }, [searchTerm, messages, filteredMessages]);
  
  
  return (
    <div className={Styles.containerList}>
      <div className={Styles.containerNavbar}>
      <NavbarMessage 
      currentUser={currentUser}
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
          currentUser={currentUser}
          updateViewStatus={updateViewStatus}
        />
      ))}
    </div>
    </div>
  );
};

export default MessageList;
