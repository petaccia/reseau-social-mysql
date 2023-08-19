import React from "react";
import Styles from "./MessageAction.module.scss";
import {BsThreeDotsVertical} from "react-icons/bs";

const MessageAction = ({ onReply, onDelete, toggleOpen, open }) => {
  
  

  
  return (
    <div className={Styles.containerToggle}>
      <BsThreeDotsVertical  className={Styles.icon} onClick={toggleOpen} />
      {open && (
        <div className={Styles.containerButton}>
      <button onClick={onReply} className={Styles.button}>Répondre</button>
      <button onClick={onDelete} className={Styles.button}>Supprimer</button>
      <button onClick={onDelete} className={Styles.button}>tout supprimer</button>
      </div>
      )}
      </div>
  )
};

export default MessageAction