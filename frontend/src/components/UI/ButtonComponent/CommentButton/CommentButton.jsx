import React, { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import "./commentbutton.scss";

const commentButton = () => {
  // Etat pour le nombre de commentaires
  const [commentCount, setCommentCount] = useState(0);

  // Incrementer le nombre de commentaires
  const handleCommentCount = () => {
    setCommentCount(commentCount + 1);
  };

  return (
    <div onClick={handleCommentCount} >
      <FaRegCommentDots size={20} className="commentIcon mx-2 " />
      <span>{commentCount}</span>
    </div>
  );
};

export default commentButton;
