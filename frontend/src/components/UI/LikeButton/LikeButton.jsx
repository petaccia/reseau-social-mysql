import React, { useState } from "react";
import  "./LikeButton.scss";
import { FaRegHeart } from "react-icons/fa";

const LikeButton = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(true);
    setLikeCount(likeCount === 0 ? 1 : likeCount + 1);

  };
  return (
    <div className="containerHeart" onClick={handleLike}>
      <span className="heartText">Likes</span>
      <FaRegHeart size={20} color={liked ? "#FF6465EB" : " #3d4a5e"} />
        <span className="likes">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
