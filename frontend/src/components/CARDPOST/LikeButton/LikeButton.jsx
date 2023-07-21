import React, { useState } from "react";
import styles from "./LikeButton.module.scss";
import { BsFillHeartFill } from "react-icons/bs";
import { PropTypes } from "prop-types";

const LikeButton = ({ initiallikes = 0, initialliked = false }) => {
  const [likes, setLikes] = useState(initiallikes);
  const [liked, setLiked] = useState(initialliked);

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

LikeButton.propTypes = {
  initiallikes: PropTypes.number,
  initialliked: PropTypes.bool,
};

export default LikeButton;
