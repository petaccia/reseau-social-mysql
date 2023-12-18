import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./CardPost.scss";
import LikeButton from "../../UI/ButtonComponent/LikeButton/LikeButton.jsx";
import CommentButton from "../../UI/ButtonComponent/CommentButton/CommentButton.jsx";
import ShareButton from "../../UI/ButtonComponent/ShareButton/ShareButton.jsx";
import CommentsModal from "../../modals/modalComments/ModaleComment.jsx";
import {
  CardContainerPost,
  CardTitlePost,
  CardTextPost,
} from "../../Accessories/styledCards/styledCardPost.jsx";

const CardPost = ({ post, showShareButton }) => {
  // Etat pour ouvrir la modale de commentaire
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour ouvrir et fermer la modale de commentaire
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  


  return (
    <CardContainerPost className="cardPost-container  rounded-4 mb-5">
      <Card className="cardPost  border rounded-4" onClick={handleOpen}>
        <Card.Img
          variant="top"
          className="cardPost-image rounded-top-4"
          src={post.image}
        />
        <Card.Body className="cardPost-body border-bottom border-top ">
          <CardTitlePost className="cardPost-title text-primary  text-center ">
            {post.title}
          </CardTitlePost>
          <CardTextPost className="cardPost-content text-secondary  text-center">
            {post.content}
          </CardTextPost>
          <CardTextPost className="cardPost-container-infoUser d-flex justify-content-around text-">
            <CardTextPost className="cardPost-date text-secondary">
              {post.date}
            </CardTextPost>
            <CardTextPost className="cardPost-user text-secondary">
              {post.user}
            </CardTextPost>
          </CardTextPost>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-around text-primary">
          <LikeButton />
          <CommentButton />
          {showShareButton && <ShareButton />}
        </Card.Footer>
      </Card>
      {isOpen && (
        <CommentsModal comments={post.comments} handleClose={handleClose} />
      )}
    </CardContainerPost>
  );
};

export default CardPost;
