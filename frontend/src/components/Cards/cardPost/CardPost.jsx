import React, { useState } from "react";
// import { BiComment, BiShare } from "react-icons/bi";
import Card from "react-bootstrap/Card";
// import InputGroup from "react-bootstrap/InputGroup";
// import FormControl from "react-bootstrap/FormControl";
import "./CardPost.scss";
import LikeButton from "../../UI/LikeButton/LikeButton.jsx";
import CommentButton from "../../UI/CommentButton/CommentButton.jsx";
import ShareButton from "../../UI/ShareButton/ShareButton.jsx";
import CommentsModal from "../../modals/modalComments/ModaleComment.jsx";

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
    <>
    <Card className="cardPost w-50  border rounded-4" onClick={handleOpen}>
      <Card.Img
        variant="top"
        className="cardPost-image rounded-top-4"
        src={post.image}
      />
      <Card.Body className="cardPost-body border-bottom border-top ">
        <Card.Title className="cardPost-title text-primary fs-2 text-center ">
          {post.title}
        </Card.Title>
        <Card.Text className="cardPost-content text-secondary fs-4 text-center">
          {post.content}
        </Card.Text>
        <Card.Text className="cardPost-container-infoUser d-flex justify-content-around text-">
          <Card.Text className="cardPost-date text-secondary">
            {post.date}
          </Card.Text>
          <Card.Text className="cardPost-user text-secondary">
            {post.user}
          </Card.Text>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-around text-primary">
        <LikeButton />
        <CommentButton />
        <ShareButton />
      </Card.Footer>
    </Card>
    {isOpen && <CommentsModal comments={post.comments} handleClose={handleClose} />}
    </>
  );
};

export default CardPost;
