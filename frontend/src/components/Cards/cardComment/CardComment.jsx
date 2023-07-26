import React, { useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import ModalComment from "../../modals/modalComments/ModaleComment.jsx";

import Styles from "./CardComment.module.scss";

const CardComment = ({ user, likes = 0, liked, commentList = [] }) => {
  console.info("-------------->commentList", commentList);
  const [commentLike, setCommentLike] = useState(likes);
  const [commentLiked, setCommentLiked] = useState(liked);
  const [showModal, setShowModal] = useState(false);
  const [newCommentCount, setNewCommentCount] = useState(0);

  useEffect(() => {
    setNewCommentCount(commentList.length);
  }, [commentList]);

  const handleCommentLike = () => {
    if (commentLiked) {
      setCommentLike(commentLike - 1);
    } else {
      setCommentLike(commentLike + 1);
    }
    setCommentLiked(!commentLiked);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className={Styles.cardComment}>
      <div className={Styles.containerImage}>
        {user && (
          <img src={user.image} alt={user.name} className={Styles.img} />
        )}

        <div className={Styles.containerLike}>
          {commentLike}
          <BsFillHeartFill
            className={`${Styles.icon} ${commentLiked ? Styles.liked : ""}`}
            style={{ fill: commentLiked ? "#ff2afb" : "#3d4a5e" }}
            onClick={handleCommentLike}
          />
          <span className={Styles.like}>Likes </span>
        </div>
        {user && <h5 className={Styles.user}>{user.name}</h5>}
      </div>
      <div className={Styles.containerButton}>
        <button className={Styles.button} onClick={handleShowModal}>
          {" "}
          Commentaires
        </button>
      </div>
      {commentList.length > 0 ? (
        <ModalComment
          show={showModal}
          handleClose={handleCloseModal}
          comments={commentList}
          user={user}
        />
      ) : (
        <p>Aucun commentaire</p>
      )}
      <p className={Styles.content}>
        {newCommentCount} nouveaux commentaires{newCommentCount !== 0 && "s"}
      </p>
    </div>
  );
};

export default CardComment;
