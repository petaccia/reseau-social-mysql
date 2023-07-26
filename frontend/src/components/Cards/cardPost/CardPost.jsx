import { useState } from "react";
import { BiComment } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import styles from "./CardPost.module.scss";

import LikeButton from "../../CARDPOST/LikeButton/LikeButton.jsx";
import CommentList from "../../CARDPOST/commentList/CommentList.jsx";
import CommentInput from "../../CARDPOST/commentInput/CommentInput.jsx";

import oceane from "../../../assets/users/oceane.jpg";

const CardPost = ({ image }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showComments, setShowComments] = useState("");

  const [commentList, setCommentList] = useState([]);

  // Change title
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  // Change content
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  // Send comment
  const handleSendComment = (comment) => {
    const newComment = {
      id: commentList.length + 1,
      user: { name: "user1", image: oceane },
      content: comment,
    };
    setCommentList((prevCommentList) => [...prevCommentList, newComment]);
  };

  const handleShare = () => {
    // implantaion de la logique de partage
    // utiliser un systeme de permissin pour savoir si l'utilisateur peut partager ou pas
  };

  return (
    <div className={styles.card}>
      <div
        className={`${styles.cardContainer} ${
          !showComments ? styles.showComments : ""
        } `}
      >
        <img src={image} className={styles["card-img-top"]} alt="..." />
        <input
          className={styles["card-title"]}
          type="text"
          value={title}
          onChange={handleChangeTitle}
          placeholder="Taper votre Titre"
        />
        <textarea
          className={styles["card-text"]}
          type="text"
          value={content}
          onChange={handleChangeContent}
          placeholder="Enter votre contenu"
        />

        <div className={styles.containerIcons}>
          <LikeButton initiallikes={0} initialliked={false} />
          <div
            className={styles.containerComment}
            onClick={() => setShowComments(!showComments)}
          >
            {commentList.length}
            <BiComment className={styles.icon} />
            <span className={styles.comment}>Comment</span>
          </div>
          <div className={styles.containerShare}>
            <RiSendPlaneFill className={styles.icon} />
            <span className={styles.share}>Share</span>
          </div>
        </div>
        {showComments && (
          <div className={styles["card-body"]}>
            <CommentList comments={commentList} />
            <CommentInput onSend={handleSendComment} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPost;
