import React, { useContext } from "react";
import Styles from "./SelectMessage.module.scss";
import OptionMessageDate from "../../OPTIONSELECT/OptionMessageDate/OptionMessageDate.jsx";
import OptionMessageInProgress from "../../OPTIONSELECT/OptionMessageInProgress/OptionMessageInProgress.jsx";
import OptionMessageSent from "../../OPTIONSELECT/OptionMessageSent/OptionMessageSent.jsx";
import OptionMessageReceiver from "../../OPTIONSELECT/OptionMessageReceiver/OptionMessageReceiver.jsx";
import OptionMessageRead from "../../OPTIONSELECT/OptionMessageRead/OptionMessageRead.jsx";
import OptionMessageUnread from "../../OPTIONSELECT/optionMessageUnread/OptionMessageUnread.jsx";
import OptionMessageRecipient from "../../OPTIONSELECT/OptionMessageRecipient/OptionMessageRecipient.jsx";
import UserContext from "../../../contexts/UserContext/UserContext.jsx";
import OptionMessgeSender from "../../OPTIONSELECT/OptionMessageSender/OptionMessageSender.jsx";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";

const SelectMessage = ({ onSort, messages }) => {
  const { users } = useContext(UserContext);
  const { authUser } = useContext(AuthContext);

  const getRecipient = (receiverId) => {
    const recipientUser = users.find((user) => user.id === receiverId);
    return `${recipientUser.firstname} ${recipientUser.lastname}`;
  };

  const getSender = (senderId) => {
    const senderUser = users.find((user) => user.id === senderId);
    return `${senderUser.firstname} ${senderUser.lastname}`;
  };
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
          return message.statusRead === "sent";
        });
        break;
      case "received":
        sorted = sorted.filter((message) => {
          return (
            (message.receiverId === authUser.id && message.status === false) ||
            message.statusRead === "delivered"
          );
        });
        break;
      case "read":
        sorted = sorted.filter((message) => {
          return message.status === true || message.statusRead === "read";
        });
        break;
      case "unread":
        sorted = sorted.filter((message) => {
          return (
            (message.receiverId === authUser.id && message.status === false) ||
            message.statusRead === "unread"
          );
        });
        break;
      case "recipient":
        sorted.sort((a, b) => {
          const recipientA = getRecipient(a.receiverId);
          const recipientB = getRecipient(b.receiverId);
          return recipientA.localeCompare(recipientB);
        });
        break;
      case "sender":
        sorted.sort((a, b) => {
          const senderA = getSender(a.senderId);
          const senderB = getSender(b.senderId);
          return senderA.localeCompare(senderB);
        });
        break;
      default:
        throw new Error(`Unexpected order: ${order} `);
    }
    onSort(sorted);
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
