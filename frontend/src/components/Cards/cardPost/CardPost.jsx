import React, { useState } from "react";
// import { BiComment, BiShare } from "react-icons/bi";
import { Card } from "react-bootstrap";
// import InputGroup from "react-bootstrap/InputGroup";
// import FormControl from "react-bootstrap/FormControl";
import "./CardPost.scss";
import LikeButton from "../../UI/LikeButton/LikeButton.jsx";
import CommentButton from "../../UI/CommentButton/CommentButton.jsx";
import ShareButton from "../../UI/ShareButton/ShareButton.jsx";
import CommentsModal from "../../modals/modalComments/ModaleComment.jsx";
import {
  CardContainerPost,
  CardTitlePost,
  CardTextPost,
} from "../../Accessories/styledCards/styledCardPost.jsx";

const CardPost = ({ post }) => {
  // Etat pour ouvrir la modale de commentaire
  const [isOpen, setIsOpen] = useState(false);
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  // Fonction pour ouvrir et fermer la modale de commentaire
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  // const handleChangeContent = (e) => {
  //   setContent(e.target.value);
  // };

  return (
    <CardContainerPost>
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
          <ShareButton />
        </Card.Footer>
      </Card>
      {isOpen && (
        <CommentsModal comments={post.comments} handleClose={handleClose} />
      )}
    </CardContainerPost>
  );
};

export default CardPost;
