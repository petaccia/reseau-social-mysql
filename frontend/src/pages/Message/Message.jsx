import React from "react";
import Style from "./Message.module.scss";
import MessageList from "../../components/Lists/ListMessage/ListMessage.jsx";

const Message = () => {
  return (
    <div className={Style.container}>
      <h1 className={Style.title}>Message</h1>
      <MessageList />
    </div>
  );
};

export default Message;
