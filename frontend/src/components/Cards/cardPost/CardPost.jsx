import React, { useState } from "react";
// import { BiComment, BiShare } from "react-icons/bi";
import Card from "react-bootstrap/Card";
// import InputGroup from "react-bootstrap/InputGroup";
// import FormControl from "react-bootstrap/FormControl";
import "./CardPost.scss";
import { FaRegCommentDots, FaRegHeart, FaShareSquare } from "react-icons/fa";
import LikeButton from "../../UI/LikeButton/LikeButton.jsx";

const CardPost = ({ post }) => {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  // const handleChangeTitle = (e) => {
  //   setTitle(e.target.value);
  // };

  // const handleChangeContent = (e) => {
  //   setContent(e.target.value);
  // };

  return (
    <Card className="cardPost w-50 mb-4 border ">
      <Card.Img variant="top" className="cardPost-image" src={post.image} />
      <Card.Body className="cardPost-body border-bottom border-top ">
        <Card.Title className="cardPost-title text-primary ">
          {post.title}
        </Card.Title>
        <Card.Text className="cardPost-content text-secondary">
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
        <FaRegCommentDots
          size={20}
          onClick={() => console.log("Comment on post")}
        />
        <FaShareSquare size={20} onClick={() => console.log("Share post")} />
      </Card.Footer>
    </Card>
  );
};

export default CardPost;
