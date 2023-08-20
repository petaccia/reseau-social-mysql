import React from "react";
import Styles from "./MessageAction.module.scss";
import {BsThreeDotsVertical} from "react-icons/bs";

const MessageAction = ({ onReply, onDelete, toggleOpen, open }) => {
  
  

  
  return (
    <div className={Styles.containerToggle} onClick={(e) => e.stopPropagation()}>
      <BsThreeDotsVertical  className={Styles.icon} onClick={() => {
        toggleOpen();
        setDeleteCard(false)}} />
      {open && (
        <div className={Styles.containerButton}>
      <button onClick={(e) => { 
        e.stopPropagation();
         onReply()}} 
         className={Styles.button}>Répondre</button>
      <button onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }} className={Styles.button}>Supprimer</button>
      <button onClick={(e) => {
        e.stopPropagation();
        deleteAll();
      }} className={Styles.button}>tout supprimer</button>
      </div>
      )}
      </div>
  )
};

export default MessageAction