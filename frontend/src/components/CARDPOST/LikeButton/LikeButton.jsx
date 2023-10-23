import React, { useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import styles from "./LikeButton.module.scss";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };
  return (
    <div className={styles.containerHeart} onClick={handleLike}>
      {likes}
      <BsFillHeartFill
        className={`${styles.icon} ${liked ? styles.liked : ""} `}
        style={{ fill: liked ? "#ff2afb" : " #3d4a5e" }}
      />
      <span className={styles.likes}>Likes</span>
    </div>
  );
};

export default LikeButton;
