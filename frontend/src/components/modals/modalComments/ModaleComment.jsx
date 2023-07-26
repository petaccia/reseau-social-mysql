import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { BsFillHeartFill } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { BiComment } from "react-icons/bi";
import Styles from "./ModaleComment.module.scss";

const ModalComment = ({ show, handleClose, comments, user }) => {
  const [selectedComment, setSelectedComment] = useState([]);

  useEffect(() => {
    const userComments = comments.filter(
      (comment) => comment.user.name === user.name
    );
    setSelectedComment(userComments);
  }, [comments, user]);

  console.info("------------->comments", comments);

  const handleLike = (commentId) => {
    console.info("commentId", commentId);
  };

  const handleShare = (commentId) => {
    console.info("commentId", commentId);
  };

  const handleReply = (commentId) => {
    console.info("commentId", commentId);
  };

  return (
    <Modal
      show={show && selectedComment.length > 0}
      onHide={handleClose}
      className={Styles.modal}
    >
      <Modal.Header className={Styles.header}>
        <div className={Styles.containerImg}>
          <img src={user.image} alt={user.name} className={Styles.img} />
          <h5 className={Styles.user}>{user.name}</h5>
        </div>
        <Modal.Title className={Styles.title}>Commentaires</Modal.Title>
      </Modal.Header>
      <Modal.Body className={Styles.body}>
        {selectedComment.map((comment, index) => (
          <div key={index} className={Styles.containerComment}>
            <div className={Styles.containerText}>
              <p className={Styles.content}>{comment.content}</p>
              <div className={Styles.containerDateIcon}>
                <div className={Styles.date}>
                  {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className={Styles.containerIcons}>
                  <BsFillHeartFill
                    className={Styles.icon}
                    // eslint-disable-next-line
                    onClick={() => handleLike(comment._id)}
                  />
                  <RiSendPlaneFill
                    className={Styles.icon}
                    // eslint-disable-next-line
                    onClick={() => handleShare(comment._id)}
                  />
                  <BiComment
                    className={Styles.icon}
                    // eslint-disable-next-line
                    onClick={() => handleReply(comment._id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer className={Styles.footer}>
        <button className={Styles.button} onClick={handleClose}>
          Fermer
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComment;
