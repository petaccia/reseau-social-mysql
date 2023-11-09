import React from "react";
import { FaShareSquare } from "react-icons/fa";
import "./ShareButton.scss";

const ShareButton = () => {
  // ajout d'un événement lors du clic sur le bouton de partage
  const handleShare = () => {
    console.log("Partager");
  };

  return (
    <div onClick={handleShare}>
      <FaShareSquare  size={20} className="shareIcon" />
    </div>
  );
};

export default ShareButton;
