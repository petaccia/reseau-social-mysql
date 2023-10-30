import React, { useState } from "react";
import { BiComment, BiShare } from "react-icons/bi";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "./CardPost.scss";
import LikeButton from "../../CARDPOST/LikeButton/LikeButton.jsx";

const CardPost = ({ image }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <Card className="card-post mb-5">
      <Card.Img src={image} alt="Card-image" />
      <div className="card-body-post d-flex justify-content-around align-items-center ">
        <div className="button" role="button">
          <LikeButton />
        </div>
        <div className="button" role="button">
          <BiComment size={18} />
          <span className="title mx-2">Comment</span>
        </div>
        <div className="button" role="button">
          <BiShare size={18} />
          <span className="title mx-2">Share</span>
        </div>
      </div>

      <Card.Body className="card-body-post">
        <Card.Title
          className="
        card-title-post
        text-center
        font-weight-bold
        text-uppercase
        mb-3
        mt-3
        "
        >
          Title
        </Card.Title>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            value={title}
            onChange={handleChangeTitle}
            placeholder="Taper votre Titre"
            style={{ width: "100%" }}
            required
            className="form-control"
          />
        </InputGroup>
        <Card.Title className="card-title-post text-center font-weight-bold text-uppercase">
          Content
        </Card.Title>
        <InputGroup>
          <FormControl
            as="textarea"
            value={content}
            onChange={handleChangeContent}
            placeholder="Enter votre contenu"
          />
        </InputGroup>
      </Card.Body>
    </Card>
  );
};

export default CardPost;
