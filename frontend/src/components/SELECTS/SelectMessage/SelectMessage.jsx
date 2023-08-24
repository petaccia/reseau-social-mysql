import React, { useContext } from "react";
import Styles from "./SelectMessage.module.scss";
import OptionMessageDate from "../../OPTIONSELECT/OptionMessageDate/OptionMessageDate.jsx";
import OptionMessageInProgress from "../../OPTIONSELECT/OptionMessageInProgress/OptionMessageInProgress.jsx";
import OptionMessageSent from "../../OPTIONSELECT/OptionMessageSent/OptionMessageSent";
import OptionMessageReceiver from "../../OPTIONSELECT/OptionMessageReceiver/OptionMessageReceiver";
import OptionMessageRead from "../../OPTIONSELECT/OptionMessageRead/OptionMessageRead";
import OptionMessageUnread from "../../OPTIONSELECT/OptionMessageUnread/OptionMessageUnread.jsx";
import OptionMessageRecipient from "../../OPTIONSELECT/OptionMessageRecipient/OptionMessageRecipient";
import UserContext from "../../../contexts/UserContext/UserContext.jsx";
import OptionMessgeSender from "../../OPTIONSELECT/OptionMessageSender/OptionMessageSender.jsx";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";

const SelectMessage = ({ onSort, messages }) => {
  console.log("messages", messages);
  const {users} = useContext(UserContext);
  console.log("users", users);
  const {currentUser} = useContext(AuthContext);
  console.log("currentUser",currentUser);

  const getRecipient = (receiverId) => {
    const user = users.find((user) => user.id === receiverId);
    return user.firstname + " " + user.lastname
  }

  const getSender = (senderId) => {
    const user = users.find((user) => user.id === senderId);
    return user.firstname + " " + user.lastname
  }
  const sortByDate = (order) => {
    let sorted = [...messages];
    switch (order) {
      case "desc_createdAt":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "asc_createdAt":
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "inProgress":
        sorted = sorted.filter((message) => {
          return message.statusRead === "inProgress";
        });
        break;
      case "sent":
        sorted = sorted.filter((message) => {
          return  message.statusRead === "sent";
        })
        break;
      case "received":
        sorted = sorted.filter((message) => {
          return (message.receiverId === currentUser.id && message.status === false) || message.statusRead === "delivered";
        })
        break;
      case "read":
        sorted = sorted.filter((message) => {

          return message.status === true || message.statusRead === "read"; 
        })
        break;
        case "unread":
        sorted = sorted.filter((message) => {
          return  (message.receiverId === currentUser.id && message.status === false) || message.statusRead === "unread";           
        })
        break;
        case "recipient":
        sorted.sort((a, b) => {
          const recipientA = getRecipient(a.receiverId);
          const recipientB = getRecipient(b.receiverId);
          return recipientA.localeCompare(recipientB);
        })
        break;
        case "sender":
        sorted.sort((a, b) => {
          const senderA = getSender(a.senderId);
          const senderB = getSender(b.senderId);
          return senderA.localeCompare(senderB);
        })
        break;
    }
    onSort(sorted);
    console.log("sorted", sorted);
  };

  return (
    <div className={Styles.selectMessage}>
      <select
        name="message"
        onChange={(e) => sortByDate(e.target.value)}
        className={Styles.selectMessage}
      >
        <option value="">Trier par</option>
        <option value="all">Tous les messages</option>
        <OptionMessageInProgress />
        <OptionMessageSent />
        <OptionMessageReceiver />
        <OptionMessageRead />
        <OptionMessageUnread />
        <OptionMessageDate />
        <OptionMessageRecipient />
        <OptionMessgeSender />
      </select>
    </div>
  );
};

export default SelectMessage;
