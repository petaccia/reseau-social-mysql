import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import styles from "./CommentInput.module.scss";

import oceane from "../../../assets/users/oceane.jpg";

const CommentInput = ({ onSend }) => {
  const [currentComment, setCurrentComment] = useState("");

  const handleCommentChange = (e) => {
    setCurrentComment(e.target.value);
  };

  const handleSend = () => {
    if (currentComment) {
      onSend(currentComment);
      setCurrentComment("");
    }
  };
  return (
    <div className={`${styles.containerComments} textarea-with-icon`}>
      <div className={styles.containerImg}>
        <img src={oceane} alt="avatar" className={styles.img} />
        <h5 className={styles.user}>user</h5>
      </div>
      <textarea
        className={styles.textarea}
        type="text"
        value={currentComment}
        onChange={handleCommentChange}
        placeholder="Ajouter un commentaire"
      />
      <span className={styles.iconSend}>
        <RiSendPlaneFill className={styles.icon} onClick={handleSend} />
      </span>
    </div>
  );
};

export default CommentInput;
